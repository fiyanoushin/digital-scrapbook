import { useEffect, useState } from "react";
import { getMemories } from "../services/memoryService";
import MemoryCard from "../components/MemoryCard";

export default function Home() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMemories();
  }, []);

  async function loadMemories() {
    try {
      const data = await getMemories();
      setMemories(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <p className="text-xl text-gray-500 animate-pulse">Loading memories...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-3">
            Family Memories <span className="text-rose-500">❤️</span>
          </h1>
          <p className="text-lg text-gray-500 font-light">
            Our private little corner of the internet
          </p>
        </div>

        {memories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No memories yet. Add the first one ❤️</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}