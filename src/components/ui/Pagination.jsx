import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalCount, onPageChange }) {
  const pageSize = 24;
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift("...");
    range.unshift(1);
    if (currentPage + delta < totalPages - 1) range.push("...");
    range.push(totalPages);
    return range;
  };

  const pages = getVisiblePages();

  return (
    <div className="flex justify-center items-center space-x-3 mt-16 mb-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full glass hover:border-primary/50 text-gray-400 hover:text-primary hover:shadow-[0_0_15px_rgba(0,210,255,0.3)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
            currentPage === page
              ? "bg-gradient-to-br from-primary to-secondary text-white neon-glow transform scale-110"
              : page === "..."
                ? "bg-transparent text-gray-500 cursor-default"
                : "glass hover:border-primary/50 text-gray-400 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full glass hover:border-primary/50 text-gray-400 hover:text-primary hover:shadow-[0_0_15px_rgba(0,210,255,0.3)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
