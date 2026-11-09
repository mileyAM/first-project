/**
 * AMM Sounz - Interactive Web Audio Beat Synthesizer
 * Plays synthesized beat rhythms directly in browser using Web Audio API
 */

let audioCtx = null;
let currentPlaying = null;
let beatInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playKick(ctx, time) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(130, time);
  osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.35);
  gain.gain.setValueAtTime(0.9, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.35);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.35);
}

function playSnare(ctx, time) {
  // Noise buffer for snare snap
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 800;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.4, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(time);
}

function playSynth(ctx, time, freq) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freq, time);
  gain.gain.setValueAtTime(0.12, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.25);
}

function startBeat(beatType) {
  const ctx = getAudioContext();
  let step = 0;
  
  const bpm = beatType === 'neon-lofi' ? 85 : 140;
  const intervalMs = (60 / bpm / 4) * 1000;

  const notes = beatType === 'neon-lofi' 
    ? [220, 261.63, 329.63, 392.00] 
    : [130.81, 155.56, 174.61, 196.00];

  beatInterval = setInterval(() => {
    const now = ctx.currentTime;
    
    // Kick on step 0 and 8
    if (step % 8 === 0 || (beatType === 'heavy-drill' && step % 16 === 10)) {
      playKick(ctx, now);
    }
    // Snare on step 4 and 12
    if (step % 8 === 4) {
      playSnare(ctx, now);
    }
    // Hi-hat / synth rhythm
    if (step % 2 === 0) {
      const note = notes[(step / 2) % notes.length];
      playSynth(ctx, now, note);
    }

    step = (step + 1) % 16;
  }, intervalMs);
}

function stopBeat() {
  if (beatInterval) {
    clearInterval(beatInterval);
    beatInterval = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const playButtons = document.querySelectorAll('.play-beat-btn');
  const statusEl = document.getElementById('playerStatus');

  playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const beat = btn.getAttribute('data-beat');

      if (currentPlaying === beat) {
        // Stop current
        stopBeat();
        currentPlaying = null;
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
        if (statusEl) statusEl.textContent = 'Audio Engine Ready';
        showToast('Playback stopped');
      } else {
        // Reset previous buttons
        playButtons.forEach(b => {
          b.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
        });

        stopBeat();
        startBeat(beat);
        currentPlaying = beat;
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
        if (statusEl) statusEl.innerHTML = `<span style="color: var(--neon-cyan);">▶ Playing: ${beat.replace('-', ' ').toUpperCase()}</span>`;
        showToast(`Playing track preview: ${beat.replace('-', ' ').toUpperCase()}`);
      }
    });
  });
});
