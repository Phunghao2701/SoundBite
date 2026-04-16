import React from "react";
import { AudioWaveform } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-dark-900/50 backdrop-blur-sm py-10 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <AudioWaveform className="text-primary" size={20} />
              <h2 className="text-xl font-bold text-white tracking-tight">
                SFX<span className="text-gradient">Hub</span>
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              Premium Sound Effects for Creators.
            </p>
          </div>

          <div className="flex gap-6 text-gray-500 text-sm font-medium">
            <a href="#" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Freesound API
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 text-center text-gray-600 text-xs">
          © {new Date().getFullYear()} SFX Hub. Engineered with precision.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
