"use client";

import React, { useState } from "react";

type PolaroidProps = {
  title: string;
  year: string;
  desc: string;
  images: string[]; 
  rotate?: string;
};

export default function PolaroidCard({ title, year, desc, images, rotate = "" }: PolaroidProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div
      onClick={handleNextImage}
      onMouseEnter={handleNextImage} // Berganti gambar saat mouse masuk/hover
      className={`cursor-pointer group w-72 bg-slate-200 text-slate-900 p-4 rounded-sm shadow-2xl transition duration-300 transform hover:scale-105 ${rotate}`}
    >
      {/* Container Gambar */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-300 mb-4 select-none">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${title} - ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
        <div className="absolute bottom-2 right-2 z-20 flex gap-1 bg-black/40 px-2 py-1 rounded-full">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === currentIndex ? "bg-white w-3" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Teks Keterangan Polaroid */}
      <div className="space-y-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-bold text-lg leading-tight">{title}</h3>
          <span className="text-xs font-semibold text-slate-600">{year}</span>
        </div>
        <p className="text-xs text-slate-600 leading-snug">{desc}</p>
      </div>
    </div>
  );
}