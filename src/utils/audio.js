// Web Audio API synthesizers for retro Doom sound effects
// This works without external assets!

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSelect() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.warn('Audio failed to play', e);
  }
}

export function playShoot(weapon = 'pistol') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (weapon === 'pistol') {
      // Noise buffer for blast
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.1);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.1);

      // Add a metallic click
      const click = ctx.createOscillator();
      const clickGain = ctx.createGain();
      click.type = 'triangle';
      click.frequency.setValueAtTime(600, now);
      clickGain.gain.setValueAtTime(0.05, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      click.connect(clickGain);
      clickGain.connect(ctx.destination);
      click.start(now);
      click.stop(now + 0.03);
    } 
    else if (weapon === 'shotgun') {
      // Heavy boom (noise + low osc sweep)
      const duration = 0.3;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + duration);

      // Bass punch
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
      oscGain.gain.setValueAtTime(0.2, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);

      // Shotgun reload pumps! (after 0.4s and 0.6s)
      const pump1Time = now + 0.45;
      const oscPump1 = ctx.createOscillator();
      const gainPump1 = ctx.createGain();
      oscPump1.type = 'triangle';
      oscPump1.frequency.setValueAtTime(200, pump1Time);
      oscPump1.frequency.exponentialRampToValueAtTime(500, pump1Time + 0.08);
      gainPump1.gain.setValueAtTime(0.08, pump1Time);
      gainPump1.gain.exponentialRampToValueAtTime(0.001, pump1Time + 0.08);
      oscPump1.connect(gainPump1);
      gainPump1.connect(ctx.destination);
      oscPump1.start(pump1Time);
      oscPump1.stop(pump1Time + 0.08);

      const pump2Time = now + 0.6;
      const oscPump2 = ctx.createOscillator();
      const gainPump2 = ctx.createGain();
      oscPump2.type = 'triangle';
      oscPump2.frequency.setValueAtTime(450, pump2Time);
      oscPump2.frequency.exponentialRampToValueAtTime(150, pump2Time + 0.1);
      gainPump2.gain.setValueAtTime(0.08, pump2Time);
      gainPump2.gain.exponentialRampToValueAtTime(0.001, pump2Time + 0.1);
      oscPump2.connect(gainPump2);
      gainPump2.connect(ctx.destination);
      oscPump2.start(pump2Time);
      oscPump2.stop(pump2Time + 0.1);
    } 
    else if (weapon === 'plasma') {
      // Sci-fi pew
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2000, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.12);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } 
    else if (weapon === 'bfg') {
      // BFG charging sweep, then massive boom
      const duration = 0.5; // Charge time
      const oscCharge = ctx.createOscillator();
      const gainCharge = ctx.createGain();
      oscCharge.type = 'sine';
      oscCharge.frequency.setValueAtTime(100, now);
      oscCharge.frequency.exponentialRampToValueAtTime(1800, now + duration);
      gainCharge.gain.setValueAtTime(0.02, now);
      gainCharge.gain.linearRampToValueAtTime(0.15, now + duration);
      oscCharge.connect(gainCharge);
      gainCharge.connect(ctx.destination);
      oscCharge.start(now);
      oscCharge.stop(now + duration);

      // The blast at now + duration
      const blastTime = now + duration;
      
      // Giant bass sweep
      const oscBlast = ctx.createOscillator();
      const gainBlast = ctx.createGain();
      oscBlast.type = 'sawtooth';
      oscBlast.frequency.setValueAtTime(180, blastTime);
      oscBlast.frequency.linearRampToValueAtTime(20, blastTime + 0.6);
      gainBlast.gain.setValueAtTime(0.4, blastTime);
      gainBlast.gain.exponentialRampToValueAtTime(0.001, blastTime + 0.6);
      
      // Noise burst for BFG explosion
      const bufferSize = ctx.sampleRate * 0.8;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, blastTime);
      filter.frequency.exponentialRampToValueAtTime(40, blastTime + 0.8);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, blastTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, blastTime + 0.8);

      oscBlast.connect(gainBlast);
      gainBlast.connect(ctx.destination);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      oscBlast.start(blastTime);
      oscBlast.stop(blastTime + 0.6);
      noise.start(blastTime);
      noise.stop(blastTime + 0.8);
    }
  } catch (e) {
    console.warn('Audio failed to play', e);
  }
}

export function playHurt() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(60, now + 0.18);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch (e) {
    console.warn('Audio failed to play', e);
  }
}

export function playPowerup() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Quick chiptune arpeggio going up
    const notes = [300, 450, 600, 900, 1350];
    const noteLength = 0.06;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + (idx * noteLength));
      
      gain.gain.setValueAtTime(0.06, now + (idx * noteLength));
      gain.gain.exponentialRampToValueAtTime(0.001, now + (idx * noteLength) + noteLength);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + (idx * noteLength));
      osc.stop(now + (idx * noteLength) + noteLength);
    });
  } catch (e) {
    console.warn('Audio failed to play', e);
  }
}

export function playMonsterGrowl() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.linearRampToValueAtTime(30, now + 0.3);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(93, now);
    osc2.frequency.linearRampToValueAtTime(25, now + 0.3);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.3);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.3);
    osc2.stop(now + 0.3);
  } catch (e) {
    console.warn('Audio failed to play', e);
  }
}

export function playMonsterDeath() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Screech/growl + noise blast
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);

    // Crackling noise for monster dissolving
    const bufferSize = ctx.sampleRate * 0.35;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.35);
  } catch (e) {
    console.warn('Audio failed to play', e);
  }
}
