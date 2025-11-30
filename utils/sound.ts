
export const playFailSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.error("Audio play failed", e);
  }
};

export const playMatchSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.error("Audio play failed", e);
  }
};

const getEnglishVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  // Prioritize US English, then any English
  return voices.find(v => v.lang === 'en-US') || 
         voices.find(v => v.lang.startsWith('en')) || 
         voices[0];
};

export const speakColor = (colorName: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(`It's ${colorName} color`);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1;
    
    const voice = getEnglishVoice();
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  }
};

export const speakWin = () => {
  if ('speechSynthesis' in window) {
    // Do NOT cancel here. Let it queue up after the color announcement.
    
    const utterance = new SpeechSynthesisUtterance("You Won! Great Job, Super Star!");
    utterance.rate = 0.9;
    utterance.pitch = 1.1; 
    utterance.volume = 1;
    
    const voice = getEnglishVoice();
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  }
};
