import { useState } from "react";
import { createMemory } from "../services/memoryService";
import { toast } from "react-toastify";

export default function AddMemory() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    tags: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoading(true);

      await createMemory({
        ...form,
        tags: form.tags.split(",").map(t => t.trim()),
        imageFile: image,
      });

      toast.success("Memory added successfully ❤️");

      setForm({ title: "", description: "", date: "", tags: "" });
      setImage(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Add a New Memory
            </h1>
            <p className="text-gray-500">Capture a special moment forever</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-rose-400 transition-colors duration-300 bg-gray-50">
                <input 
                  type="file" 
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 file:cursor-pointer cursor-pointer"
                />
                {image && (
                  <p className="mt-3 text-sm text-green-600 font-medium">
                    ✓ {image.name}
                  </p>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Title
              </label>
              <input
                name="title"
                placeholder="Give this memory a title..."
                className="border-2 border-gray-200 rounded-xl p-4 w-full focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Story
              </label>
              <textarea
                name="description"
                placeholder="Tell the story behind this moment..."
                className="border-2 border-gray-200 rounded-xl p-4 w-full h-32 resize-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Date
              </label>
              <input
                type="date"
                name="date"
                className="border-2 border-gray-200 rounded-xl p-4 w-full focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tags
              </label>
              <input
                name="tags"
                placeholder="Mom, Dad, Sister (comma separated)"
                className="border-2 border-gray-200 rounded-xl p-4 w-full focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300"
                value={form.tags}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white font-semibold px-8 py-4 rounded-full w-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed mt-8"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "💾 Save Memory"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}