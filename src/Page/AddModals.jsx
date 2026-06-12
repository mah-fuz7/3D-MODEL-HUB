import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const AddModal = () => {
  const {user}=useAuth()
  const axios = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnail: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ axios.post is INSIDE handleSubmit — runs only on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newModal = {
      name: formData.name,
            category: formData.category,

      description: formData.description,

      thumbnail: formData.thumbnail,
      created_at:new Date(),
      downloads:0,
      created_by:user.email
    };
console.log(newModal)
    axios
      .post("/modals", newModal)
      .then(() => {
        toast.success("Model added successfully");
        navigate("/allproducts");
      })
      .catch(() => {
        toast.error("Failed to add model");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#1c1c2e] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white/[0.06] border border-white/10 rounded-2xl p-6 sm:p-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            Add New 3D Model
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Fill in the details below to publish a new model
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">
              Model Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Space Suit 3D Model"
              required
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the model, its uses, tools used to create it..."
              required
              rows={4}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">
              Image URL
            </label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <p className="text-gray-500 text-xs">
              Paste a direct link to the thumbnail image
            </p>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full bg-[#1c1c2e] border border-white/15 rounded-xl px-4 py-2.5 text-gray-300 text-sm focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer appearance-none"
            >
              <option value="" disabled>Select a category</option>
              <option value="Space">Space</option>
              <option value="Foods">Foods</option>
              <option value="Characters">Characters</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Plants">Plants</option>
              <option value="Architecture">Architecture</option>
              <option value="Animals">Animals</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm py-3 rounded-xl transition-all mt-1"
          >
            {loading ? "Adding..." : "+ Add Model"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddModal;