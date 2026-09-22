"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
       <a
          href="#"
          className="text-xl font-bold tracking-tight text-white hover:text-red-500 transition duration-300"
        >
          A<span className="text-red-500">.</span>
        </a>

    <ul className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <li>
            <a
              href="#skills"
              className="hover:text-white transition duration-200"
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:text-white transition duration-200"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#experiences"
              className="hover:text-white transition duration-200"
            >
              Experiences
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-white transition duration-200"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}