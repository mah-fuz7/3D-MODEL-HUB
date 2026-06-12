import { Link } from "react-router";

const Card = ({ modal }) => {
  const { name, category, description, thumbnail ,_id} = modal;

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col w-full">

      {/* Image — full width, fixed height, dark bg for 3D model transparency */}
      <div className="w-full h-52 shrink-0 overflow-hidden bg-gray-900">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">

        <span className="self-start bg-indigo-100 text-indigo-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {category}
        </span>

        <h3 className="text-sm font-bold text-gray-900 leading-snug">
          {name}
        </h3>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">
          {description}
        </p>

        {/* View Details — centered text link like the screenshot */}
        <Link to={`/productsDetails/${_id}`} className="mt-auto rounded-2xl p-3 text-center bg-purple-600">
          <button  className="text-white text-sm font-semibold  hover:underline bg-transparent border-none cursor-pointer">
            View Details
          </button >
        </Link>

      </div>
    </div>
  );
};

export default Card;