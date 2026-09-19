import React from "react";
import {skills, experiences} from "@/data/data";
import SkillGlobe from "@/component/skillsGlobe";

type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
};

// Fungsi Fetching Data GitHub API
async function getGithubProjects(username: string): Promise<Repository[]> {
  try {
    const res = await fetch(`https://api.github.com/users/aqilanailalhusna/repos?sort=updated&per_page=10`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const repos: Repository[] = await res.json();
    return repos.filter((repo) => !repo.fork);
  } catch {
    return [];
  }
}

export default async function Home() {
  // Ganti dengan Username GitHub kamu
  const projects = await getGithubProjects("aqilanailalhusna");

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col font-sans">
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 space-y-24">
        
        {/* 1. INTRODUCTION SECTION */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 pt-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hello, I'm <span className="text-red-500">A</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              I am an undergraduate Computer Science student interested in Machine Learning, Data Analytics, and Web Development.
            </p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl relative">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 2. SKILLS SECTION (Translucent Slider Card) */}
        <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Skills</h2>
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <SkillGlobe />
        </div>
      </section>

        {/* 3. PROJECTS SECTION (GitHub API) */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-red-400 capitalize">
                      {project.name.replace(/-/g, " ")}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-3">
                      {project.description || "No description provided for this repository."}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-xs pt-4 border-t border-slate-800/50">
                    <span className="px-3 py-1 bg-slate-800 rounded-md font-medium text-slate-300">
                      {project.language || "Code"}
                    </span>
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-medium transition"
                    >
                      Repository ↗
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 col-span-2 text-center">Loading repositories or user not found...</p>
            )}
          </div>
        </section>

        {/* 4. EXPERIENCES SECTION (Polaroid Card with Hover Image Swap) */}
        <section className="space-y-8 relative">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Experiences</h2>
          
          {/* Garis Gantung Dekoratif */}
          <div className="absolute top-12 left-0 right-0 h-[1px] bg-slate-800 -z-10 hidden md:block"></div>

          <div className="flex flex-wrap justify-center gap-12 pt-4">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`group w-72 bg-slate-200 text-slate-900 p-4 rounded-sm shadow-2xl transition duration-300 transform hover:scale-105 ${exp.rotate}`}
              >
                {/* Kontainer Gambar Polaroid dengan Efek Slide/Swap */}
                <div className="relative w-full h-48 overflow-hidden bg-slate-300 mb-4">
                  <img
                    src={exp.img1}
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:-translate-x-full"
                  />
                  <img
                    src={exp.img2}
                    alt={`${exp.title} hover`}
                    className="absolute inset-0 w-full h-full object-cover translate-x-full transition-transform duration-500 group-hover:translate-x-0"
                  />
                </div>
                
                {/* Keterangan Polaroid */}
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-lg leading-tight">{exp.title}</h3>
                    <span className="text-xs font-semibold text-slate-600">{exp.year}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 5. CONTACT / FOOTER SECTION */}
      <footer className="w-full bg-red-900/80 border-t border-red-800 py-12 px-6 mt-12 text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-white">Let's Connect</h2>
        <div className="flex justify-center items-center gap-6 text-sm font-medium">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-slate-200 hover:text-white"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-slate-200 hover:text-white"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="mailto:example@gmail.com"
            className="hover:underline text-slate-200 hover:text-white"
          >
            Email
          </a>
          <span>•</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-slate-200 hover:text-white"
          >
            Instagram
          </a>
        </div>
        <p className="text-xs text-red-200/60 pt-4">© 2026 A's Portfolio. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}