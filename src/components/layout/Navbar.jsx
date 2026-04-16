import { Search, AudioWaveform } from "lucide-react";

const Navbar = ({ setQuery }) => {
  return (
    <nav className="glass sticky top-0 z-50 py-4 px-6 border-b border-white/10 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center neon-glow">
            <AudioWaveform className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            SFX<span className="text-gradient">Hub</span>
          </h1>
        </div>
        
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm hiệu ứng âm thanh..."
            className="w-full bg-dark-800/50 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-dark-800 transition-all duration-300"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== '') {
                setQuery(e.target.value.trim());
              }
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
