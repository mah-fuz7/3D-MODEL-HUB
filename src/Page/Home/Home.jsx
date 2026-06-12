import Banner from "../../Components/Banner";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Card from "../../Components/Card";
// import useAuth from "../../hooks/useAuth";

const Home = () => {
    const [search,setSearch]=useState("")
console.log(search)
  const [modals, setModals] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxiosSecure();
  // const {user}=useAuth()
//  console.log(user?.accessToken)

  useEffect(() => {
    axios
      .get(`/latestmodals?search=${search}`)
      .then((data) => {
        setModals(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [axios,search]);

  return (
    <div className="min-h-screen bg-[#1c1c2e]">
      <Banner />

      {/* Section heading */}
      <div className="px-6 pt-10 pb-4">
        <h2 className="text-white text-2xl font-bold">Latest 3D Models</h2>
        <p className="text-gray-400 text-sm mt-1">
          Explore our newest additions
        </p>
          <input className=" bg-white p-1.5 rounded-2xl text-2xl text-black font-bold border-none cursor-text mt-2 " onChange={(e)=>setSearch(e.target.value)}></input>
      </div>

      {/* Card grid */}
      <div className="px-6 pb-16">
        {loading ? (
          // Skeleton loader — 6 placeholder cards
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="w-full h-52 bg-gray-300" />
                  <div className="p-4 flex flex-col gap-3">
                    <div className="h-3 w-16 bg-gray-200 rounded-full" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    <div className="h-3 w-full bg-gray-100 rounded" />
                    <div className="h-3 w-5/6 bg-gray-100 rounded" />
                    <div className="h-3 w-2/3 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
          </div>
        ) : modals.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No models found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {modals.map((modal) => (
              <Card key={modal._id} modal={modal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;