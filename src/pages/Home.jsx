import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import CategoryTabs from "../components/sound/CategoryTabs";
import SoundGrid from "../components/sound/SoundGrid";
import Footer from "../components/layout/Footer";
import Pagination from "../components/ui/Pagination";

const API_KEY = import.meta.env.VITE_FREESOUND_KEY;

const Home = () => {
  const [sounds, setSounds] = useState([]);
  const [query, setQuery] = useState("meme");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Reset về trang 1 mỗi khi đổi từ khóa tìm kiếm
  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  useEffect(() => {
    const fetchSounds = async () => {
      setLoading(true);
      try {
        const url = `https://freesound.org/apiv2/search/text/?query=${query}&fields=id,name,previews,images&page_size=24&page=${page}`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Token ${API_KEY}`,
          },
        });
        if (!res.ok) {
          throw new Error(`Lỗi rồi: ${res.status}`);
        }
        const data = await res.json();
        setSounds(data.results || []);
        setTotalCount(data.count || 0);
      } catch (err) {
        console.error("Lỗi gọi API Freesound:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSounds();
  }, [query, page]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Truyền hàm reset page vào Navbar và Tabs */}
      <Navbar setQuery={handleQueryChange} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <CategoryTabs activeCategory={query} setCategory={handleQueryChange} />

        {loading ? (
          <div className="flex justify-center items-center h-64 flex-col gap-4">
            <div className="flex gap-2 items-end h-16">
              <span className="w-2 bg-primary h-1/3 rounded-t-sm animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 bg-secondary h-full rounded-t-sm animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 bg-primary h-1/2 rounded-t-sm animate-bounce" style={{ animationDelay: '300ms' }}></span>
              <span className="w-2 bg-secondary h-4/5 rounded-t-sm animate-bounce" style={{ animationDelay: '450ms' }}></span>
              <span className="w-2 bg-primary h-2/3 rounded-t-sm animate-bounce" style={{ animationDelay: '600ms' }}></span>
            </div>
            <p className="text-gray-400 font-medium tracking-widest text-sm uppercase animate-pulse">Loading Sounds...</p>
          </div>
        ) : (
          /* Dùng Fragment để bọc 2 component này lại */
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
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
