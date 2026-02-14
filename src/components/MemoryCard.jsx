import { deleteMemory } from "../services/memoryService";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MemoryCard({ memory }) {
  const [isHovered, setIsHovered] = useState(false);

  async function handleDelete() {
    const confirmDelete = window.confirm("Delete this memory?");
    if (!confirmDelete) return;

    try {
      await deleteMemory(memory);
      toast.success("Memory deleted");
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
    }
  }
    
  return (
    <div 
      className="break-inside-avoid mb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative group">
        {/* Delete Button - appears on hover */}
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-rose-600 text-gray-600 hover:text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Image with zoom effect */}
        <div className="overflow-hidden rounded-t-2xl">
          <img
            src={memory.signedUrl}
            alt={memory.title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold text-gray-800 leading-snug">
            {memory.title}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {memory.description}
          </p>

          <p className="text-xs text-gray-400 font-medium">
            {new Date(memory.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          {/* Tags */}
          {memory.tags && memory.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {memory.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium border border-amber-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}