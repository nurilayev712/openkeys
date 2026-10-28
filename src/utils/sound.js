// Web Audio API Sound Synthesizer for OpenKeys
class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('openkeys_muted') === 'true';
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('openkeys_muted', this.muted);
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  playTick(speedFactor = 1) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Roulette card tick
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Random pitch variance for realism
    const baseFreq = 700 + Math.random() * 80;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.035);
  }

  playOpen() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Laser swoosh unboxing sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(850, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.45);
  }

  playWin(rarity = 'milspec') {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const isHighTier = ['covert', 'special', 'pubglegend', 'pubgmythic'].includes(rarity);

    // Bass boom for epic drops
    if (isHighTier) {
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(110, this.ctx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.6);
      subGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start();
      subOsc.stop(this.ctx.currentTime + 0.7);
    }

    // Chord synthesis
    const notes = isHighTier ? [523.25, 659.25, 783.99, 1046.50] : [440, 554.37, 659.25];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isHighTier ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + (idx * 0.08));

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime + (idx * 0.08));
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + (idx * 0.08));
      osc.stop(this.ctx.currentTime + 1.25);
    });
  }

  playCoins() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const pitches = [987.77, 1318.51, 1567.98];
    pitches.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + (idx * 0.06));

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + (idx * 0.06));
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (idx * 0.06) + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + (idx * 0.06));
      osc.stop(this.ctx.currentTime + (idx * 0.06) + 0.22);
    });
  }
}

export const sound = new SoundManager();
