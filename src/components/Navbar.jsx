import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-rose-600 transition-colors duration-300">
          Family Memories <span className="text-rose-500">❤️</span>
        </Link>
        
        <Link 
          to="/add" 
          className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          + Add Memory
        </Link>
      </div>
    </nav>
  );
}