import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import CategoryTabs from "../components/sound/CategoryTabs";
import SoundGrid from "../components/sound/SoundGrid";
import Footer from "../components/layout/Footer";
import Pagination from "../components/ui/Pagination";

const Home = () => {
  const [sounds, setSounds] = useState([]);
  const [query, setQuery] = useState("meme");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    setPage(1); // Reset về trang đầu khi đổi search
  };

  useEffect(() => {
    const fetchSounds = async () => {
      setLoading(true);
      try {
        // Sử dụng MyInstants API (Vượt qua lỗi 502 của Freesound)
        // Lưu ý: API này phân trang theo trang 1, 2, 3...
        const url = `https://myinstants-api.vercel.app/api/search?query=${query}&page=${page}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Lỗi rồi: ${res.status}`);

        const data = await res.json();

        // Map lại dữ liệu để khớp với Props của SoundCard
        const formattedSounds = data.map((item) => ({
          id: item.slug || Math.random(),
          name: item.title,
          // MyInstants để link mp3 ở trường 'sound'
          previews: { "preview-hq-mp3": item.sound },
          // Waveform có thể dùng image thumbnail của meme đó
          images: { waveform_m: item.image || "" },
        }));

        setSounds(formattedSounds);

        // MyInstants API này thường không trả về total_count chính xác trong search
        // Mình sẽ giả định nếu có kết quả thì cho phép bấm Next trang tiếp theo
        setTotalCount(data.length === 0 ? 0 : 1000);
      } catch (err) {
        console.error("Lỗi gọi API MyInstants:", err);
        setSounds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSounds();
  }, [query, page]);

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col">
      <Navbar setQuery={handleQueryChange} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <CategoryTabs activeCategory={query} setCategory={handleQueryChange} />

        {loading ? (
          <div className="flex justify-center items-center h-64 flex-col gap-4">
            <div className="flex gap-2 items-end h-16">
              <span
                className="w-2 bg-indigo-500 h-1/3 rounded-t-sm animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></span>
              <span
                className="w-2 bg-purple-500 h-full rounded-t-sm animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></span>
              <span
                className="w-2 bg-indigo-500 h-1/2 rounded-t-sm animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></span>
              <span
                className="w-2 bg-purple-500 h-4/5 rounded-t-sm animate-bounce"
                style={{ animationDelay: "450ms" }}
              ></span>
              <span
                className="w-2 bg-indigo-500 h-2/3 rounded-t-sm animate-bounce"
                style={{ animationDelay: "600ms" }}
              ></span>
            </div>
            <p className="text-gray-400 font-medium tracking-widest text-sm uppercase animate-pulse">
              Đang tải âm thanh...
            </p>
          </div>
        ) : (
          <>
            {sounds.length > 0 ? (
              <>
                <SoundGrid sounds={sounds} />
                <Pagination
                  currentPage={page}
                  totalCount={totalCount}
                  onPageChange={(newPage) => {
                    setPage(newPage);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500">
                  Không tìm thấy âm thanh nào cho "{query}"
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
