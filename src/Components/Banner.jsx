import { Link } from "react-router";
import f1 from "../assets/f1.jpg";
import { useState } from "react";

const Banner = () => {
  // console.log(search)

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${f1})`,
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold"><span className="text-red-600">3D</span> Modal Hub</h1>
      
          <Link to={'/allproducts'} className="btn btn-primary">All Modal</Link >
        </div>
      </div>
    </div>
  );
};

export default Banner;