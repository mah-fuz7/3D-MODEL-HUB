import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UpdateModal = () => {
  const { id } = useParams();
  const axios = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    thumbnail: "",
    category: "",
  });

  // ✅ Load existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/modals/${id}`);

        const { name, thumbnail, category } = res.data;

        setFormData({
          name: name || "",
          thumbnail: thumbnail || "",
          category: category || "",
        });
      } catch (err) {
        console.log(err);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, [id, axios]);

  // ✅ handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.patch(`/modals/${id}`, formData);

      toast.success("Model updated successfully");

      navigate(`/productsDetails/${id}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update model");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c2e] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

        {/* Back */}
        <button
          onClick={() => navigate(`/productsDetails/${id}`)}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-5 transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 sm:p-8">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
            <span className="text-indigo-400 text-lg">✏️</span>
            <div>
              <h1 className="text-white text-base font-bold">
                Update Model
              </h1>
              <p className="text-gray-500 text-xs">
                Edit the fields you want to change
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Name */}
            <div>
              <label className="text-gray-300 text-[11px] font-bold uppercase">
                Model Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm"
                placeholder="e.g. Space Suit 3D Model"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="text-gray-300 text-[11px] font-bold uppercase">
                Image URL
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-gray-300 text-[11px] font-bold uppercase">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-[#1c1c2e] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm"
              >
                <option value="">Select a category</option>
                <option value="Space">Space</option>
                <option value="Foods">Foods</option>
                <option value="Characters">Characters</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Plants">Plants</option>
                <option value="Architecture">Architecture</option>
                <option value="Animals">Animals</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 font-semibold py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;