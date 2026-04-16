import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, Volume2, AudioWaveform } from "lucide-react";

const SoundCard = ({ sound }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const previewUrl = sound.previews["preview-hq-mp3"];

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(previewUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${sound.name}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      window.open(previewUrl, "_blank");
    }
  };

  // Background style using the awkward waveform as an abstract blurry painting
  const bgStyle = {
    backgroundImage: `url(${sound.images.waveform_m})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden glass hover:border-primary/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1">
      {/* Abstract Blur Background from Waveform */}
      <div 
        className="absolute inset-0 z-0 opacity-20 filter blur-xl mix-blend-screen scale-150 group-hover:scale-125 group-hover:opacity-40 transition-all duration-700"
        style={bgStyle}
      ></div>
      
      {/* Overlay to darken the blur */}
      <div className="absolute inset-0 z-0 bg-dark-900/80 group-hover:bg-dark-900/60 transition-colors duration-500"></div>

      {/* Content Container */}
      <div className="relative z-10 p-5 flex flex-col h-full justify-between gap-4">
        
        {/* Top Info */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 
              className="text-white text-base font-medium truncate mb-1 group-hover:text-primary transition-colors"
              title={sound.name}
            >
              {sound.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <AudioWaveform size={14} className={isPlaying ? "text-primary animate-pulse" : ""} />
              <span className={isPlaying ? "text-primary" : ""}>
                {isPlaying ? "Đang phát..." : "Hiệu ứng âm thanh"}
              </span>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="w-10 h-10 rounded-full flex justify-center items-center bg-white/5 hover:bg-primary hover:text-dark-900 text-gray-400 border border-white/10 hover:border-primary transition-all flex-shrink-0 neon-glow"
            title="Tải xuống"
          >
            <Download size={18} />
          </button>
        </div>

        {/* Bottom Play Area */}
        <div className="flex items-center gap-4 mt-2">
          {/* Circular Play Button */}
          <button 
            onClick={togglePlay}
            className={`w-14 h-14 rounded-full flex justify-center items-center shadow-lg transition-all duration-300 ${
              isPlaying 
                ? "bg-gradient-to-r from-primary to-secondary text-white transform scale-95" 
                : "bg-white text-dark-900 hover:scale-105 hover:bg-primary"
            }`}
          >
            {isPlaying ? (
              <Pause size={24} className="fill-current" />
            ) : (
              <Play size={24} className="fill-current ml-1" />
            )}
          </button>

          {/* Audio Visualizer Effect (Fake) */}
          <div className="flex-1 flex items-center justify-between h-8 opacity-60">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 rounded-full transition-all duration-200 ${isPlaying ? 'bg-primary' : 'bg-gray-600'}`}
                style={{ 
                  height: isPlaying ? `${Math.max(20, Math.random() * 100)}%` : '20%',
                  animationDelay: `${i * 50}ms`
                }}
              ></div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SoundCard;
