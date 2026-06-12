import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Card from "../Components/Card";
// import useAuth from "../hooks/useAuth";

const AllProducts = () => {
  const [category, setCategory] = useState("all");
  const [modals, setModals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const axios = useAxiosSecure();
  // const {user}=useAuth()
//  console.log(user?.accessToken)
 console.log(search)
//  const token=user?.accessToken

  // useEffect(() => {
  //   axios
  //     .get("/modals")
  //     .then((res) => {
  //       setModals(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }, [axios,token]);

  useEffect(()=>{
axios.get(`/search?modals=${search}&category=${category}`)
.then((res)=>{
  setModals(res.data)
  setLoading(false)
}).catch((err) => {
        console.log(err);
        setLoading(false);
      });
  },[axios,search,category])



  return (
    <div className="min-h-screen bg-black">

      {/* Page header */}
      <div className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-6">
        <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
          All 3D Models
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          {loading ? "Loading..." : `${modals.length} models available`}
        </p>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search models..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mt-4 px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-indigo-500 text-sm"
        />

      </div>
      {/* drop down */}
<div className="dropdown">
  {/* button shows selected category */}
  <div tabIndex={0} role="button" className="btn m-1">
    {category === "all" ? "All Categories" : category}
  </div>

  <ul
    tabIndex={0}
    className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
  >
    <li>
      <a onClick={() => setCategory("all")}>All</a>
    </li>

    <li>
      <a onClick={() => setCategory("Foods")}>Foods</a>
    </li>

    <li>
      <a onClick={() => setCategory("characters")}>characters</a>
    </li>

    <li>
      <a onClick={() => setCategory("plants")}>plants</a>
    </li>
    <li>
      <a onClick={() => setCategory("space")}>space</a>
    </li>
    <li>
      <a onClick={() => setCategory("vehicles")}>vehicles</a>
    </li>
    <li>
      <a onClick={() => setCategory("Animals")}>Animals</a>
    </li>
  </ul>
</div>
      {/* Grid */}
      <div className="px-4 sm:px-6 lg:px-10 pb-16">
        {loading ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="w-full h-40 sm:h-52 bg-gray-300" />
                  <div className="p-4 flex flex-col gap-3">
                    <div className="h-3 w-16 bg-gray-200 rounded-full" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    <div className="h-3 w-full bg-gray-100 rounded" />
                    <div className="h-3 w-5/6 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
          </div>
        ) : modals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <p className="text-4xl sm:text-5xl">🔍</p>
            <p className="text-white font-semibold text-base sm:text-lg">
              No models found
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Try a different search or category
            </p>
            
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {modals.map((modal) => (
              <Card key={modal._id} modal={modal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;