/**
 * Procedural Vinyl Audio Synthesizer Engine & Jukebox Music Player
 * 
 * Generates analog surface static, sparse dust crackles, amplifier hum,
 * needle scratch effects, and procedural genre-themed 30-second music previews.
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

    // Jukebox preview state
    this.jukeboxAudio = null;
    this.jukeboxSynthTimer = null;
    this.synthNotes = [];
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
        for (let j = 0; j < 15 && (i + j) < bufferSize; j++) {
          data[i + j] += amplitude * Math.exp(-j * 0.3);
        }
      }
    }

    this.crackleSource = this.ctx.createBufferSource();
    this.crackleSource.buffer = buffer;
    this.crackleSource.loop = true;

    // Highpass filter to remove muddy rumble, leaving crisp mechanical crackle
    const highpass = this.ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 400;

    const crackleGain = this.ctx.createGain();
    crackleGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    this.crackleSource.connect(highpass);
    highpass.connect(crackleGain);
    crackleGain.connect(this.mainGain);

    this.crackleSource.start(0);
  }

  /**
   * Starts playing turntable surface static.
   * Also aliased as play() for backward compatibility with TurntableDeck.
   */
  play() { return this.start(); }

  start() {
    this.init();
    if (!this.ctx || this.isPlaying) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isPlaying = true;

    if (!this.isMuted) {
      this.mainGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.mainGain.gain.setValueAtTime(this.mainGain.gain.value, this.ctx.currentTime);
      this.mainGain.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 1.2);
    }
  }

  /**
   * Stops playing turntable surface static.
   * Also aliased as pause() for backward compatibility with TurntableDeck.
   */
  pause() { return this.stop(); }

  stop() {
    if (!this.ctx || !this.isPlaying) return;

    this.isPlaying = false;
    this.mainGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.mainGain.gain.setValueAtTime(this.mainGain.gain.value, this.ctx.currentTime);
    this.mainGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
  }

  /**
   * Needle lift whoosh sound (subtle sweep upward).
   */
  triggerNeedleLift() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(4000, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1000, this.ctx.currentTime + 0.1);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

    const src = this.ctx.createBufferSource();
    const buf = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.12), this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);
    src.buffer = buf;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    src.start(0);
  }

  /**
   * Needle drop pop sound.
   */
  triggerNeedleDrop() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(0);
    osc.stop(this.ctx.currentTime + 0.08);
  }

  /**
   * Synthesizes DJ vinyl scratch ("chick-a chick-a") sound effect.
   */
  triggerScratch(direction = 1, intensity = 1.0) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const duration = 0.08 + Math.random() * 0.04;
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      const envelope = Math.sin(progress * Math.PI);
      const noise = (Math.random() * 2 - 1) * 0.35;
      data[i] = noise * envelope;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 3.5 + Math.random() * 1.5;

    const startFreq = direction >= 0 ? 600 : 2800;
    const endFreq = direction >= 0 ? 2400 + Math.random() * 600 : 500 + Math.random() * 300;

    filter.frequency.setValueAtTime(startFreq, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(100, endFreq), now + duration);

    const tonalOsc = this.ctx.createOscillator();
    tonalOsc.type = direction >= 0 ? "sawtooth" : "triangle";
    const baseTone = direction >= 0 ? 180 : 380;
    const endTone = direction >= 0 ? 420 + Math.random() * 80 : 140 + Math.random() * 40;
    tonalOsc.frequency.setValueAtTime(baseTone, now);
    tonalOsc.frequency.exponentialRampToValueAtTime(Math.max(60, endTone), now + duration);

    const tonalGain = this.ctx.createGain();
    tonalGain.gain.setValueAtTime(0.08 * intensity, now);
    tonalGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    const mainScratchGain = this.ctx.createGain();
    mainScratchGain.gain.setValueAtTime(0.45 * intensity, now);
    mainScratchGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noiseSource.connect(filter);
    filter.connect(mainScratchGain);
    tonalOsc.connect(tonalGain);
    tonalGain.connect(mainScratchGain);
    mainScratchGain.connect(this.ctx.destination);

    noiseSource.start(now);
    tonalOsc.start(now);
    tonalOsc.stop(now + duration);
  }

  /**
   * Plays actual 30-second audio preview of the track via previewAudioUrl (iTunes audio),
   * falling back to procedural genre synthesis if missing or blocked.
   */
  playTrackPreview(track, onProgress, onEnded) {
    this.stopJukeboxPreview();
    this.init();

    if (this.isMuted) return;

    if (track && track.previewAudioUrl) {
      try {
        const audio = new Audio(track.previewAudioUrl);
        this.jukeboxAudio = audio;

        audio.ontimeupdate = () => {
          if (audio.duration) {
            const cur = audio.currentTime;
            const total = audio.duration;
            const pct = (cur / total) * 100;
            if (onProgress) onProgress(cur, total, pct);
          }
        };

        audio.onended = () => {
          this.stopJukeboxPreview();
          if (onEnded) onEnded();
        };

        audio.onerror = (e) => {
          console.warn("Real audio preview failed, falling back to synthesis", e);
          this.startJukeboxSynthesis(track.genre || "Rock", onProgress, onEnded);
        };

        const promise = audio.play();
        if (promise !== undefined) {
          promise.catch((err) => {
            console.warn("Autoplay error playing preview audio, falling back to synthesis", err);
            this.startJukeboxSynthesis(track.genre || "Rock", onProgress, onEnded);
          });
        }
        return;
      } catch (err) {
        console.warn("Error initializing preview Audio element", err);
      }
    }

    // Fallback if no previewAudioUrl is available
    this.startJukeboxSynthesis(track?.genre || "Rock", onProgress, onEnded);
  }

  /**
   * Plays a 30-second rich procedural genre groove for the Jukebox Lounge.
   * Plays realistic rhythmic drums, bassline, and melodic chords matching the artist's genre.
   */
  startJukeboxSynthesis(genre = "Rock", onProgress, onEnded) {
    this.stopJukeboxPreview();
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    let elapsed = 0;
    const totalDuration = 30; // 30 seconds
    const intervalMs = 250; // sixteenth/eighth note ticks

    // Determine scale and tempo based on genre
    const isMetal = genre.toLowerCase().includes("metal") || genre.toLowerCase().includes("rock");
    const isHipHop = genre.toLowerCase().includes("hip-hop") || genre.toLowerCase().includes("rap");
    const isElectronic = genre.toLowerCase().includes("electronic") || genre.toLowerCase().includes("house") || genre.toLowerCase().includes("garage");

    const scale = isMetal 
      ? [110, 123.47, 130.81, 146.83, 164.81, 220] // A Minor Power scale
      : isHipHop 
      ? [130.81, 146.83, 155.56, 174.61, 196, 220] // C Minor Pentatonic
      : [146.83, 164.81, 196, 220, 261.63, 293.66]; // D Minor Synth scale

    let step = 0;

    this.jukeboxSynthTimer = setInterval(() => {
      elapsed += (intervalMs / 1000);
      if (elapsed >= totalDuration) {
        this.stopJukeboxPreview();
        if (onEnded) onEnded();
        return;
      }

      if (onProgress) {
        onProgress(elapsed, totalDuration, (elapsed / totalDuration) * 100);
      }

      // 1. Drum pattern (Kick on 0, 8; Snare on 4, 12; Hi-hat on every 2)
      const currentStep16 = step % 16;
      const now = this.ctx.currentTime;

      if (currentStep16 === 0 || currentStep16 === 8 || (isElectronic && currentStep16 % 4 === 0)) {
        // Kick drum
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.frequency.setValueAtTime(120, now);
        kickOsc.frequency.exponentialRampToValueAtTime(35, now + 0.12);
        kickGain.gain.setValueAtTime(0.4, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        kickOsc.connect(kickGain);
        kickGain.connect(this.ctx.destination);
        kickOsc.start(now);
        kickOsc.stop(now + 0.13);
      }

      if (currentStep16 === 4 || currentStep16 === 12) {
        // Snare drum / Clap
        const snareNoise = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.1), this.ctx.sampleRate);
        const sData = snareNoise.getChannelData(0);
        for (let i = 0; i < sData.length; i++) sData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.03));
        const sSource = this.ctx.createBufferSource();
        sSource.buffer = snareNoise;
        const sFilter = this.ctx.createBiquadFilter();
        sFilter.type = "highpass";
        sFilter.frequency.value = 1200;
        const sGain = this.ctx.createGain();
        sGain.gain.setValueAtTime(0.2, now);
        sGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        sSource.connect(sFilter);
        sFilter.connect(sGain);
        sGain.connect(this.ctx.destination);
        sSource.start(now);
      }

      // 2. Bassline / Melodic Chords
      if (currentStep16 % 2 === 0) {
        const noteIndex = (Math.floor(step / 4) + (currentStep16 % 4)) % scale.length;
        const freq = scale[noteIndex];
        const toneOsc = this.ctx.createOscillator();
        const toneGain = this.ctx.createGain();
        
        toneOsc.type = isMetal ? "sawtooth" : isElectronic ? "triangle" : "sine";
        toneOsc.frequency.setValueAtTime(freq, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = isMetal ? "lowpass" : "bandpass";
        filter.frequency.value = isMetal ? 1800 : 1200;
        filter.Q.value = 2.0;

        toneGain.gain.setValueAtTime(0.12, now);
        toneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        toneOsc.connect(filter);
        filter.connect(toneGain);
        toneGain.connect(this.ctx.destination);

        toneOsc.start(now);
        toneOsc.stop(now + 0.24);
      }

      step++;
    }, intervalMs);
  }

  /**
   * Stops Jukebox preview (both audio element and procedural synthesizer).
   */
  stopJukeboxPreview() {
    if (this.jukeboxAudio) {
      try {
        this.jukeboxAudio.pause();
        this.jukeboxAudio.src = "";
      } catch (e) {}
      this.jukeboxAudio = null;
    }

    if (this.jukeboxSynthTimer) {
      clearInterval(this.jukeboxSynthTimer);
      this.jukeboxSynthTimer = null;
    }
  }

  /**
   * Sets speed ratio.
   */
  setSpeed(rpm) {
    this.speed = rpm === 45 ? 1.35 : 1.0;
    if (!this.ctx) return;
    if (this.humOsc) {
      this.humOsc.frequency.setValueAtTime(rpm === 45 ? 74.25 : 55, this.ctx.currentTime);
    }
  }

  /**
   * Mute toggle.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.ctx) return this.isMuted;

    if (this.isMuted) {
      this.mainGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.stopJukeboxPreview();
    } else if (this.isPlaying) {
      this.mainGain.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 0.5);
    }

    return this.isMuted;
  }

  close() {
    this.stopJukeboxPreview();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
      this.mainGain = null;
      this.humOsc = null;
      this.crackleSource = null;
    }
  }
}

const vinylAudioEngine = new VinylAudioEngine();
export default vinylAudioEngine;
