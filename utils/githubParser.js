/**
 * GitHub Repository to Vinyl Vault Parser
 * 
 * This utility processes a raw GitHub repository payload (from the GitHub API)
 * and its README.md markdown content, dynamically transforming them into a 
 * structured project record for the Vinyl Vault database schema.
 */

/**
 * Maps a GitHub repo topic/tag list to a standard store category.
 * @param {string[]} topics - GitHub repo topics (e.g. ['argocd', 'kubernetes'])
 * @returns {string} - Vault Category
 */
function determineCategory(topics = []) {
  const t = topics.map(x => x.toLowerCase());
  
  if (t.some(x => ['security', 'iot', 'lora', 'esp32', 'cryptography', 'firmware'].includes(x))) {
    return "Security & IoT";
  }
  if (t.some(x => ['eks', 'kubernetes', 'jenkins', 'terraform', 'argocd', 'gitops', 'ci-cd', 'devops'].includes(x))) {
    return "DevOps & Cloud";
  }
  if (t.some(x => ['sagemaker', 'pyspark', 'librosa', 'ml', 'ai', 'data-science', 'hadoop', 'spark'].includes(x))) {
    return "Data & AI";
  }
  return "Full-Stack & AI"; // default category
}

/**
 * Picks a random vibrant Tailwind gradient and matching SVG label color
 * based on the repository ID or name (for deterministic visual consistency).
 * @param {string} repoName 
 * @returns {{color: string, labelColor: string}}
 */
function generateDeterministicVinylTheme(repoName = "") {
  const gradients = [
    { color: "from-emerald-600 via-teal-500 to-cyan-600", labelColor: "#059669" }, // Emerald/Teal
    { color: "from-blue-600 via-indigo-500 to-purple-600", labelColor: "#2563eb" }, // Blue/Indigo
    { color: "from-amber-600 via-red-500 to-rose-600", labelColor: "#d97706" }, // Amber/Rose
    { color: "from-violet-600 via-purple-500 to-fuchsia-600", labelColor: "#7c3aed" }, // Violet/Fuchsia
    { color: "from-pink-500 via-rose-500 to-red-600", labelColor: "#ec4899" }, // Pink/Rose
    { color: "from-cyan-500 via-sky-500 to-blue-600", labelColor: "#06b6d4" }  // Cyan/Sky
  ];
  
  // Simple hashing algorithm based on repoName character codes
  let hash = 0;
  for (let i = 0; i < repoName.length; i++) {
    hash = repoName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

/**
 * Parses README.md text to extract key achievements, problem statements, and outcomes.
 * It uses regular expressions to scan headers (e.g., # Features, # Architecture, # Impact)
 * and isolates bullet points under those headers to assemble vinyl tracks.
 * 
 * @param {string} readmeText - Markdown content of the repository's README
 * @returns {Array<{name: string, desc: string}>} - List of tracks (A-Side, B-Side, etc.)
 */
export function parseReadmeToTracks(readmeText = "") {
  if (!readmeText) return [];
  
  const tracks = [];
  
  // Normalize line endings
  const cleanReadme = readmeText.replace(/\r\n/g, "\n");
  
  // Section splitter (matches #, ##, or ### headers)
  const sections = cleanReadme.split(/\n(?=#+\s)/);
  
  let aSideTracks = [];
  let bSideTracks = [];
  let bonusTracks = [];

  for (const section of sections) {
    const lines = section.trim().split("\n");
    const headerLine = lines[0] || "";
    const headerText = headerLine.replace(/^#+\s+/, "").trim().toLowerCase();
    
    // Extract list items (lines starting with - , * , or + or numbered lists)
    const bulletPoints = lines
      .slice(1)
      .map(line => line.trim())
      .filter(line => line.startsWith("-") || line.startsWith("*") || line.startsWith("+") || /^\d+\.\s/.test(line))
      .map(line => line.replace(/^[-*+]\s+/, "").replace(/^\d+\.\s+/, "").trim());
    
    if (bulletPoints.length === 0) continue;

    // Categorize section into A-Side (implementation/problem) vs B-Side (metrics/impact)
    if (
      headerText.includes("problem") || 
      headerText.includes("architecture") || 
      headerText.includes("feature") || 
      headerText.includes("design") ||
      headerText.includes("technical details")
    ) {
      bulletPoints.forEach((bullet, index) => {
        if (aSideTracks.length < 2) {
          aSideTracks.push({
            name: `A-Side: ${headerText.charAt(0).toUpperCase() + headerText.slice(1)} (Part ${index + 1})`,
            desc: bullet
          });
        }
      });
    } else if (
      headerText.includes("impact") || 
      headerText.includes("result") || 
      headerText.includes("performance") || 
      headerText.includes("metric") ||
      headerText.includes("outcome")
    ) {
      bulletPoints.forEach((bullet, index) => {
        if (bSideTracks.length < 2) {
          bSideTracks.push({
            name: `B-Side: Performance & Impact (Track ${index + 1})`,
            desc: bullet
          });
        }
      });
    } else {
      // General fallbacks
      bulletPoints.forEach((bullet, index) => {
        if (bonusTracks.length < 2) {
          bonusTracks.push({
            name: `Bonus Track: ${headerText.charAt(0).toUpperCase() + headerText.slice(1)}`,
            desc: bullet
          });
        }
      });
    }
  }

  // Combine tracks (limit to a realistic album length: 4-5 tracks max)
  const allTracks = [...aSideTracks, ...bSideTracks, ...bonusTracks];
  
  // If no sections matched, parse any bullet points from the top of the README
  if (allTracks.length === 0) {
    const fallbackBullets = cleanReadme
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.startsWith("-") || l.startsWith("*"))
      .map(l => l.replace(/^[-*]\s+/, "").trim())
      .slice(0, 4);

    fallbackBullets.forEach((bullet, idx) => {
      const side = idx < 2 ? "A-Side" : "B-Side";
      allTracks.push({
        name: `${side}: Track ${idx + 1}`,
        desc: bullet
      });
    });
  }

  return allTracks.slice(0, 4); // return top 4 tracks
}

/**
 * Main parser function: Converts raw GitHub repo data to a Vinyl Vault record object.
 * 
 * @param {Object} repoData - Payload containing GitHub repo metadata and readme content
 * @param {string} repoData.name - Repository name (e.g. 'saas-cicd-pipeline')
 * @param {string} [repoData.description] - Short description of the project
 * @param {string[]} [repoData.topics] - Array of strings representing tags
 * @param {string} [repoData.readme] - Complete README.md text content
 * @param {string} [repoData.created_at] - Repository creation date string
 * 
 * @returns {Object} - Complete Vinyl Record object formatted for data/vault.js
 */
export function parseGitHubRepoToVinyl(repoData) {
  if (!repoData || !repoData.name) {
    throw new Error("Invalid GitHub repository data provided.");
  }

  // Generate ID and friendly title from name
  const id = repoData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  // Convert repo-name-like strings to Title Case: "my-project-repo" -> "My Project Repo"
  const title = repoData.name
    .split(/[-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Extract release year
  const releaseYear = repoData.created_at 
    ? new Date(repoData.created_at).getFullYear() 
    : new Date().getFullYear();

  // Custom visual theme based on name
  const { color, labelColor } = generateDeterministicVinylTheme(repoData.name);

  // Parse category and tags
  const category = determineCategory(repoData.topics || []);
  const tags = repoData.topics && repoData.topics.length > 0 
    ? repoData.topics.map(t => t.charAt(0).toUpperCase() + t.slice(1)) 
    : ["GitHub API", "Open Source"];

  // Parse README to create Tracks
  const tracks = parseReadmeToTracks(repoData.readme);

  // Return schema-conforming object
  return {
    id,
    title,
    subtitle: repoData.description || "Open Source Repository",
    category,
    releaseYear,
    color,
    labelColor,
    tags,
    tracks: tracks.length > 0 ? tracks : [
      {
        name: "A-Side: Repository Description",
        desc: repoData.description || "An engineering project hosted on GitHub containing technical implementations."
      },
      {
        name: "B-Side: GitHub Metadata",
        desc: `This record was parsed automatically from github.com/${repoData.owner || 'YashK3086'}/${repoData.name}`
      }
    ]
  };
}
