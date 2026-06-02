/**
 * Procedural Vinyl Audio Synthesizer Engine
 * 
 * Generates analog surface static, sparse dust crackles, amplifier hum,
 * and needle scratch sound effects procedurally using the Web Audio API.
 * Safely guarded for Server-Side Rendering (SSR) environments.
 */

class VinylAudioEngine {
  constructor() {
    this.ctx = null;
    this.mainGain = null;
    this.humOsc = null;
    this.crackleSource = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.speed = 1.0;
  }

  /**
   * Initializes the AudioContext and sets up the nodes on first interaction.
   */
  init() {
    if (this.ctx) return;
    if (typeof window === "undefined") return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      this.ctx = new AudioContextClass();
      
      // Create main gain node for smooth fade-ins and fade-outs
      this.mainGain = this.ctx.createGain();
      this.mainGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.mainGain.connect(this.ctx.destination);

      // Create static background generators
      this.setupHum();
      this.setupCrackle();
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser.", e);
    }
  }

  /**
   * Generates a 50Hz low hum oscillator (analog amplifier static).
   */
  setupHum() {
    if (!this.ctx) return;

    this.humOsc = this.ctx.createOscillator();
    this.humOsc.type = "sine";
    this.humOsc.frequency.value = 55; // A1 frequency, classic mains hum

    // Very low volume, just to act as background warmth
    const humGain = this.ctx.createGain();
    humGain.gain.setValueAtTime(0.005, this.ctx.currentTime);

    this.humOsc.connect(humGain);
    humGain.connect(this.mainGain);
    this.humOsc.start(0);
  }

  /**
   * Generates a custom procedural buffer filled with static and sparse pops.
   */
  setupCrackle() {
    if (!this.ctx) return;

    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * 4; // 4 seconds of unique static
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    
    // Generate pink noise approximation + random click impulses
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      
      // Pink noise filter coefficient
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      
      // Faint background surface noise
      data[i] *= 0.05; 

      // Inject sparse sharp pop spikes
      if (Math.random() < 0.00015) {
        const amplitude = (Math.random() * 2 - 1) * 0.35;
        // Apply exponential decay to simulate the stylus settling
        for (let j = 0; j < 15 && (i + j) < bufferSize; j++) {
          data[i + j] += amplitude * Math.exp(-j * 0.3);
        }
      }
    }

    this.crackleSource = this.ctx.createBufferSource();
    this.crackleSource.buffer = buffer;
    this.crackleSource.loop = true;

    // Run crackles through a warm bandpass filter (removes high shrill and low boom)
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 1000;
    bandpass.Q.value = 0.6;

    this.crackleSource.connect(bandpass);
    bandpass.connect(this.mainGain);
    this.crackleSource.start(0);
  }

  /**
   * Fades in the background record static.
   */
  play() {
    this.init();
    if (!this.ctx) return;

    // Resume context if suspended (browser security)
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isPlaying = true;
    
    if (!this.isMuted) {
      // Fade in surface noise over 1.2s to match platter speedup
      this.mainGain.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 1.2);
    }
  }

  /**
   * Fades out the background record static.
   */
  pause() {
    if (!this.ctx || !this.isPlaying) return;

    this.isPlaying = false;
    // Fade out volume over 0.8s
    this.mainGain.gain.linearRampToValueAtTime(0.0, this.ctx.currentTime + 0.8);
  }

  /**
   * Synthesizes a quick abrasive friction sound (stylus sliding onto outer groove).
   */
  triggerNeedleDrop() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    // Create a temporary noise burst node
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * 0.25; // 250ms scratch duration
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    // Filter to sweep down in frequency, mimicking the needle settling
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(3000, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.2);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.22);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination); // bypass main gain to sound immediate

    source.start(0);
  }

  /**
   * Synthesizes a quick pull sound (stylus leaving the groove).
   */
  triggerNeedleLift() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * 0.15; // 150ms duration
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(4000, this.ctx.currentTime + 0.1);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    source.start(0);
  }

  /**
   * Sets speed ratio (pitch adjustment for 33 vs 45 RPM).
   * @param {number} rpm - 33 or 45
   */
  setSpeed(rpm) {
    this.speed = rpm === 45 ? 1.35 : 1.0;
    
    if (!this.ctx) return;
    
    // Shift amplifier hum frequency proportionally
    if (this.humOsc) {
      this.humOsc.frequency.setValueAtTime(rpm === 45 ? 74.25 : 55, this.ctx.currentTime);
    }
  }

  /**
   * Toggles the mute state.
   * @returns {boolean} - New mute state
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (!this.ctx) return this.isMuted;

    if (this.isMuted) {
      this.mainGain.gain.setValueAtTime(0, this.ctx.currentTime);
    } else if (this.isPlaying) {
      this.mainGain.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 0.5);
    }

    return this.isMuted;
  }

  /**
   * Cleans up node contexts on component unmount.
   */
  close() {
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
      this.mainGain = null;
      this.humOsc = null;
      this.crackleSource = null;
    }
  }
}

// Global Singleton Instance
const vinylAudioEngine = new VinylAudioEngine();
export default vinylAudioEngine;
