
import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => (
  <div className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-xl banner-3d-scene">

    <img
      src={assets.main_banner_bg}
      alt="Cafe Cage"
      className="w-full h-[300px] md:h-[450px] lg:h-[520px] object-cover"
    />

    <video
  className="absolute inset-0 w-full h-56 md:h-96 lg:h-[650px] object-cover"
      autoPlay
      muted
      loop
      playsInline
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    >
      <source src="/Video/cafe-banner.mp4" type="Video/mp4" />
    </video>

    <div className="absolute inset-0 flex items-end justify-end gap-3 px-4 pb-6 md:px-10 md:pb-8 bg-black/20">

      <Link
        to="/products"
        className="px-5 md:px-9 py-3 bg-emerald-400 hover:bg-amber-300 rounded text-white shadow-md"
      >
        Order Now
      </Link>

      <Link
        to="/products"
        className="hidden md:flex px-5 md:px-9 py-3 text-white hover:text-primary"
      >
        View Menu
      </Link>

    </div>
  </div>
);

export default MainBanner;
