import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, AudioWaveform } from "lucide-react";

const SoundCard = ({ sound }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false); // Xử lý lỗi ảnh waveform
  const audioRef = useRef(null);

  // Dùng proxy để tránh lỗi 502/CORS khi fetch từ Vercel
  const getProxyUrl = (url) => {
    if (!url) return "";
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
  };

  const previewUrl = sound.previews["preview-hq-mp3"];
  // Nếu bị chặn nặng quá, đôi khi phải dùng proxy cho cả audio (nhưng thử trực tiếp trước)
  const safePreviewUrl = previewUrl;

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    try {
      // Bọc link audio qua proxy AllOrigins để lách luật CORS/502
      const proxiedAudioUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(previewUrl)}`;
      if (!audioRef.current) {
        audioRef.current = new Audio(proxiedAudioUrl);
        audioRef.current.onended = () => setIsPlaying(false);
        // Bắt lỗi nếu file audio không load được (lỗi 502)
        audioRef.current.onerror = () => {
          alert("Không thể tải âm thanh này từ server Freesound.");
          setIsPlaying(false);
        };
      }

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Playback error:", err);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    } catch (e) {
      console.error("Audio init error:", e);
    }
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(safePreviewUrl);
      if (!response.ok) throw new Error("Network response was not ok");
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
      // Fallback: Mở tab mới nếu fetch bị chặn CORS
      window.open(safePreviewUrl, "_blank");
    }
  };

  // Sử dụng proxy cho waveform để tránh lỗi 502 Bad Gateway
  const waveformImg = imgError ? "" : getProxyUrl(sound.images.waveform_m);

  return (
    <div className="relative group rounded-2xl overflow-hidden glass hover:border-primary/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 bg-slate-900 border border-white/5">
      {/* Abstract Blur Background */}
      {!imgError && (
        <div
          className="absolute inset-0 z-0 opacity-20 filter blur-xl mix-blend-screen scale-150 group-hover:scale-125 group-hover:opacity-40 transition-all duration-700"
          style={{
            backgroundImage: `url(${waveformImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}

      <div className="absolute inset-0 z-0 bg-dark-900/80 group-hover:bg-dark-900/60 transition-colors duration-500"></div>

      <div className="relative z-10 p-5 flex flex-col h-full justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className="text-white text-base font-medium truncate mb-1 group-hover:text-primary transition-colors"
              title={sound.name}
            >
              {sound.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <AudioWaveform
                size={14}
                className={isPlaying ? "text-primary animate-pulse" : ""}
              />
              <span className={isPlaying ? "text-primary" : ""}>
                {isPlaying ? "Đang phát..." : "Hiệu ứng âm thanh"}
              </span>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="w-10 h-10 rounded-full flex justify-center items-center bg-white/5 hover:bg-primary hover:text-dark-900 text-gray-400 border border-white/10 hover:border-primary transition-all flex-shrink-0"
          >
            <Download size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={togglePlay}
            className={`w-14 h-14 rounded-full flex justify-center items-center shadow-lg transition-all duration-300 ${
              isPlaying
                ? "bg-indigo-600 text-white transform scale-95"
                : "bg-white text-slate-900 hover:scale-105 hover:bg-indigo-500 hover:text-white"
            }`}
          >
            {isPlaying ? (
              <Pause size={24} className="fill-current" />
            ) : (
              <Play size={24} className="fill-current ml-1" />
            )}
          </button>

          <div className="flex-1 flex items-center justify-between h-8 opacity-60">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-200 ${isPlaying ? "bg-indigo-500" : "bg-gray-600"}`}
                style={{
                  height: isPlaying
                    ? `${Math.max(30, Math.random() * 100)}%`
                    : "20%",
                  transitionDelay: `${i * 30}ms`,
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
