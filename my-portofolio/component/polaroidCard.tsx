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
    onMouseEnter={handleNextImage}
    className={`flex-shrink-0 w-[280px] min-w-[280px] snap-center cursor-pointer group bg-slate-200 text-slate-900 p-4 rounded-sm shadow-2xl transition-all duration-300 transform hover:scale-105 ${rotate}`}
  >
    {/* Container Foto Polaroid (Tinggi foto juga dikunci h-48 atau h-52) */}
    <div className="relative w-full h-48 w-48 overflow-hidden bg-slate-300 mb-4 select-none rounded-sm">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${title} - ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Indikator titik */}
      {images.length > 1 && (
        <div className="absolute bottom-2 right-2 z-20 flex gap-1 bg-black/50 px-2 py-1 rounded-full">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-white w-3" : "bg-white/50 w-1.5"
              }`}
            />
          ))}
        </div>
      )}
    </div>

    {/* Detail Teks */}
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