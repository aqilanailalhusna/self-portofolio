import React from "react";
import {experiences} from "@/data/data";
import SkillGlobe from "@/component/skillsGlobe";
import PolaroidCard from "@/component/polaroidCard";

type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
};

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
  const projects = await getGithubProjects("aqilanailalhusna");

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col font-sans">
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 space-y-24">
        
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 pt-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hello, I'm Aqila Nailal Husna
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

        <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Skills</h2>
        <div className= "my-8 flex flex-row items-center justify-center gap-32">
          <div>
            <SkillGlobe />
          </div>
          <div className="text-center">
            <p className="text-slate-300">Here are the skills I have applied to my projects</p>
          </div>
        </div>
        </section>

        <section className="space-y-6 max-w-5xl w-full mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Projects</h2>
          <h3 className="text-lg text-slate-400 text-center">Things I've Built and Co-Built</h3>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-800">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-[300px] md:w-[380px] snap-center bg-slate-900/60 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-red-400 capitalize">
                      {project.name.replace(/-/g, " ")}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-3">
                      {project.description || "Tidak ada deskripsi untuk repositori ini."}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs pt-4 border-t border-slate-800/50">
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-medium transition"
                    >
                      Repository
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center w-full">Gagal memuat repositori...</p>
            )}
          </div>
        </section>

        <section className="space-y-6 max-w-5xl w-full mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Experiences</h2>

        {/* Pembungkus Scroll Menyamping */}
        <div className="flex gap-8 overflow-x-auto pb-8 pt-4 px-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-800">
          {experiences.map((exp, index) => (
            <PolaroidCard
              key={index}
              title={exp.title}
              year={exp.year}
              desc={exp.desc}
              images={exp.img ? [exp.img] : []} 
              rotate={exp.rotate}
            />
          ))}
        </div>
      </section>

      </main>

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