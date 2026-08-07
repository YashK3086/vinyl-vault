import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, HRFlowable

def generate_resume(pdf_path):
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    style_name = ParagraphStyle(
        'Name',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#000000')
    )
    
    style_contact = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#333333')
    )
    
    style_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#000000'),
        textTransform='uppercase',
        spaceAfter=3,
        spaceBefore=8
    )
    
    style_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#000000')
    )
    
    style_subtitle = ParagraphStyle(
        'ItemSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#222222')
    )
    
    style_right = ParagraphStyle(
        'ItemRight',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13,
        alignment=2, # Right align
        textColor=colors.HexColor('#222222')
    )
    
    style_right_bold = ParagraphStyle(
        'ItemRightBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        alignment=2, # Right align
        textColor=colors.HexColor('#000000')
    )

    style_bullet = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        textColor=colors.HexColor('#222222'),
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2
    )

    style_skill_label = ParagraphStyle(
        'SkillLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12.5,
        textColor=colors.HexColor('#000000')
    )
    
    style_skill_body = ParagraphStyle(
        'SkillBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        textColor=colors.HexColor('#222222')
    )

    story = []

    # Header with photo on right if photo exists
    photo_path = r"c:\Users\yashv\Downloads\PORTFOLIO\public\Close-up.jpeg"
    header_text = [
        Paragraph("Yashvardhan Khanna", style_name),
        Spacer(1, 4),
        Paragraph("Bangalore, India | +91 9772292339 | yashvardhankhanna360@gmail.com", style_contact),
        Paragraph("github.com/YashK3086 | linkedin.com/in/yashvardhan-khanna", style_contact),
        Paragraph("credly.com/yashvardhan-khanna | portfolio", style_contact),
    ]

    if os.path.exists(photo_path):
        img = Image(photo_path, width=70, height=85)
        header_table = Table([[header_text, img]], colWidths=[470, 70])
        header_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('ALIGN', (1,0), (1,0), 'RIGHT'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(header_table)
    else:
        story.extend(header_text)

    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#000000'), spaceBefore=2, spaceAfter=6))

    # Helper for Section Heading with Line
    def add_section_heading(title):
        story.append(Paragraph(title, style_heading))
        story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#444444'), spaceBefore=2, spaceAfter=6))

    # EDUCATION
    add_section_heading("EDUCATION")
    
    edu_table_data = [
        [
            Paragraph("<b>SRM Institute of Science and Technology</b>", style_title),
            Paragraph("Chennai, TN", style_right_bold)
        ],
        [
            Paragraph("<i>B.Tech in Computer Science (Cloud Computing) – CGPA: 7.97 / 10.0 (No Backlogs)</i>", style_subtitle),
            Paragraph("2023 – 2027", style_right)
        ],
        [Spacer(1, 4), Spacer(1, 4)],
        [
            Paragraph("<b>Delhi Public School</b>", style_title),
            Paragraph("Jodhpur, RJ", style_right_bold)
        ],
        [
            Paragraph("<i>Class XII (CBSE): 83.4% | Class X (CBSE): 90.2%</i>", style_subtitle),
            Paragraph("2021 – 2023", style_right)
        ],
    ]
    t_edu = Table(edu_table_data, colWidths=[410, 130])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_edu)

    story.append(Spacer(1, 4))

    # TECHNICAL SKILLS
    add_section_heading("TECHNICAL SKILLS")
    
    skills = [
        ("Core Programming & Engineering:", "Python, C++, Java, SQL, Linux, Yaml, Data Structures, Algorithms"),
        ("Cloud, DevOps & Release Planning:", "AWS (EC2, Lambda, S3, VPC, SageMaker), Docker, Terraform, CI/CD Pipelines, Git, GitHub Actions, Jenkins"),
        ("Software Architecture & Data Systems:", "PySpark, AWS Glue, PostgreSQL, Relational Data Modeling (1NF-BCNF), REST APIs"),
        ("Experimental AI & Innovation:", "Responsible AI Workflows, LLM Integration, Prompt Engineering, Predictive Modeling"),
        ("Best Practices & Methods:", "Software Development Lifecycle (SDLC), Agile/Scrum, System Verification, Reliability, Strategic Problem-Solving"),
    ]

    skill_rows = []
    for label, val in skills:
        skill_rows.append([
            Paragraph(f"<b>{label}</b> {val}", style_skill_body)
        ])
    
    t_skills = Table(skill_rows, colWidths=[540])
    t_skills.setStyle(TableStyle([
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
    ]))
    story.append(t_skills)

    story.append(Spacer(1, 4))

    # EXPERIENCE
    add_section_heading("EXPERIENCE")
    
    exp_header = [
        [
            Paragraph("<b>Wissen Technology</b>", style_title),
            Paragraph("Bangalore, India", style_right_bold)
        ],
        [
            Paragraph("<i>Technical Intern – Cloud Engineering & AI Initiatives</i>", style_subtitle),
            Paragraph("Jul 21, 2026 – Present", style_right)
        ]
    ]
    t_exp = Table(exp_header, colWidths=[390, 150])
    t_exp.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_exp)
    story.append(Spacer(1, 2))

    exp_bullets = [
        "Building cloud infrastructure automation and enterprise data orchestration pipelines.",
        "Contributing to internal release planning and deployment workflows utilizing Terraform and GitOps to enforce strict engineering standards.",
        "Supporting multi-VM staging environments and building containerized applications (Docker) to optimize system reliability and software scaling."
    ]
    for bullet in exp_bullets:
        story.append(Paragraph(f"• {bullet}", style_bullet))

    story.append(Spacer(1, 4))

    # ENGINEERING PROJECTS
    add_section_heading("ENGINEERING PROJECTS")

    projects = [
        (
            "Smart Serverless Web App & Experimental AI Systems",
            "Next.js, SageMaker, Lambda, n8n",
            [
                "Participated in system specification and design of a SaaS platform, using AWS Glue and PySpark to build data pipelines that reduced latency.",
                "Applied experimental AI by integrating a SageMaker KNN model via REST APIs for real-time recommendations and operational efficiency."
            ]
        ),
        (
            "Automated Deployment Pipeline & Release Management",
            "AWS EKS, Jenkins, Terraform, GitOps",
            [
                "Wrote high-quality software and IaC scripts with Terraform and Jenkins to automate environment provisioning and release planning.",
                "Implemented custom validation safeguards within CI/CD workflows to accelerate continuous recovery and boost team collaboration under tight deadlines."
            ]
        ),
        (
            "IoT Secure Stream Cipher Protocol & System Architecture",
            "ESP32, C++, ChaCha20, Agile",
            [
                "Implemented a lightweight 256-bit encryption protocol in C++ for hardware nodes, executing direct driver code for high-performance data transfers.",
                "Architected an asynchronous nonce-synchronization scheme to minimize data overhead, collaborating in an Agile team across structured sprints."
            ]
        ),
        (
            "Corporate Financial Data Warehouse & System Modeling",
            "SQL, Data Modeling, PostgreSQL",
            [
                "Designed a normalized (BCNF) relational schema from first principles to support strategic analytics and reduce redundancy by 35%.",
                "Built backend logging and audit validation workflows using transactional triggers and cursors to ensure continuous reliability and data governance."
            ]
        ),
    ]

    for proj_title, proj_tech, proj_bullets in projects:
        p_table = Table([[
            Paragraph(f"<b>{proj_title}</b> | <i>{proj_tech}</i>", style_title)
        ]], colWidths=[540])
        p_table.setStyle(TableStyle([
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 1),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ]))
        story.append(p_table)
        for bullet in proj_bullets:
            story.append(Paragraph(f"• {bullet}", style_bullet))
        story.append(Spacer(1, 3))

    story.append(Spacer(1, 2))

    # CERTIFICATIONS & LEADERSHIP
    add_section_heading("CERTIFICATIONS & LEADERSHIP")

    cert_rows = [
        [Paragraph("<b>Certifications:</b> Cisco Certified Ethical Hacker; Python and SQL for Data Analytics, GitHub CoPilot-300.", style_skill_body)],
        [Paragraph("<b>Strategic Leadership & Values:</b> School Head Boy (managed student operations); MUN Organizing Committee (Delegate Affairs Team); National-level Cycle Polo athlete proving collaborative teamwork.", style_skill_body)]
    ]
    t_certs = Table(cert_rows, colWidths=[540])
    t_certs.setStyle(TableStyle([
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t_certs)

    doc.build(story)
    print("PDF generated successfully at:", pdf_path)

if __name__ == "__main__":
    out_pdf = r"c:\Users\yashv\Downloads\PORTFOLIO\public\Yashvardhan_Khanna_Resume.pdf"
    generate_resume(out_pdf)
