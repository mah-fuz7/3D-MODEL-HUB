import { useParams, useNavigate, Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
// import DownloadStatistics from "./DownloadStatistics";

const Mydownloads = () => {
  const { id } = useParams();
  const axios = useAxiosSecure();
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await axios.post(`/downloads/${id}`);
      // Update the download count
      setModal((prev) => ({
        ...prev,
        downloads: prev.downloads + 1,
      }));
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`/modals/${id}`)
      .then((res) => {
        setModal(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [axios, id]);

  // format date: "2025-10-31T15:00:37.625Z" → "31 Oct 2025"
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1c1c2e] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading model...</p>
        </div>
      </div>
    );
  }

  if (!modal) {
    return (
      <div className="min-h-screen bg-[#1c1c2e] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg font-bold mb-2">Model not found</p>
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-400 text-sm hover:underline"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1c1c2e] px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-5 transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white/[0.05] border border-white/10 rounded-2xl overflow-hidden">

          {/* Thumbnail */}
          <div className="w-full h-56 sm:h-72 lg:h-96 bg-gray-900 overflow-hidden">
            <img
              src={modal.thumbnail}
              alt={modal.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-5 sm:p-7">

            {/* Title row + action buttons */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
              <div className="flex flex-col gap-2">
                <span className="self-start bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {modal.category}
                </span>
                <h1 className="text-white text-xl sm:text-2xl font-bold leading-snug">
                  {modal.name}
                </h1>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 flex-wrap sm:flex-nowrap shrink-0">
                <Link
                  to={`/modals/${id}/update`}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  ✏️ Update
                </Link>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 active:scale-95 border border-white/15 text-gray-300 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {downloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      ⬇️ Download ({modal.downloads})
                    </>
                  )}
                </button>
                <button
                  onClick={() => setStatsOpen(true)}
                  className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95"
                >
                  📊 Stats
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3">
                <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider mb-1">
                  Downloads
                </p>
                <p className="text-white text-lg font-bold">{modal.downloads}</p>
              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3">
                <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider mb-1">
                  Added
                </p>
                <p className="text-white text-sm font-semibold">
                  {formatDate(modal.created_at)}
                </p>
              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 col-span-2 sm:col-span-1">
                <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider mb-1">
                  Author
                </p>
                <p className="text-indigo-400 text-sm font-semibold truncate">
                  {modal.created_by}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-white/10 pt-5">
              <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider mb-3">
                Description
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                {modal.description}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Download Statistics Modal */}
      <DownloadStatistics isOpen={statsOpen} onClose={() => setStatsOpen(false)} />
    </div>
  );
};

export default Mydownloads;