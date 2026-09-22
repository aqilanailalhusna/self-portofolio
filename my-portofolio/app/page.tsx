import React from "react";
import { defaultProjectImage, experiences, projectImages } from "@/data/data";
import SkillGlobe from "@/component/skillsGlobe";
import PolaroidCard from "@/component/polaroidCard";
import Navbar from "@/component/navbar";

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
    const res = await fetch(`https://api.github.com/users/aqilanailalhusna/repos?sort=updated&per_page=30`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    
    const repos: Repository[] = await res.json();
    
    return repos;
  } catch {
    return [];
  }
}

export default async function Home() {
  const projects = await getGithubProjects("aqilanailalhusna");

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 pt-28 space-y-24">
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

        <section id="skills" className="space-y-6 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold">Skills</h2>
          <div className="my-8 flex flex-col md:flex-row items-center justify-center gap-28 md:gap-48">
            <div>
              <SkillGlobe />
            </div>
            <div className="text-left max-w-xs">
              <p className="text-slate-300">
                Here is the tech stack and skill set I’ve implemented across my recent work.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-10 w-full mx-auto scroll-mt-28">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
          <p className="text-slate-400 text-sm md:text-base">Things I've Built and Co-Built</p>
        </div>

        <div className="flex flex-col gap-8 relative items-left">
          {projects.length > 0 ? (
            projects.map((project, index) => {
              const projectImage = projectImages[project.name] || defaultProjectImage;

              return (
                <div key={project.id} className="relative flex flex-col items-center">
                  
                  <div className="w-full flex flex-col md:flex-row gap-6 items-center shadow-lg">
                    
                    <div className="w-full md:w-1/2 h-64 overflow-hidden bg-slate-800 flex-shrink-0 relative group">
                      <img
                        src={projectImage}
                        alt={project.name}
                        className="w-full h-full object-cover transition duration-500"
                      />
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col justify-between h-full space-y-4 text-left">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xl md:text-2xl font-bold text-white capitalize">
                            {project.name.replace(/-/g, " ")}
                          </h3>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                          {project.description || "Tidak ada deskripsi untuk repositori ini."}
                        </p>
                      </div>

                      <div className="pt-2">
                        <a
                          href={project.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs md:text-sm font-semibold rounded-lg transition duration-200 shadow-md"
                        >
                          <span>View Repository</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-slate-500 text-center w-full">Gagal memuat repositori...</p>
          )}
        </div>
      </section>

        <section id="experiences" className="space-y-6 w-full mx-auto scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold">Experiences</h2>

          <div className="flex gap-8 overflow-x-auto pb-8 pt-4 px-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-800">
            {experiences.map((exp, index) => (
              <PolaroidCard
                key={index}
                title={exp.title}
                year={exp.year}
                desc={exp.desc}
                images={[exp.img]}
                rotate={exp.rotate}
              />
            ))}
          </div>
        </section>

      </main>

      <footer id="contact" className="w-full bg-red-900/80 border-t border-red-800 py-12 px-6 mt-12 text-center space-y-6 scroll-mt-28">
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
            href="https://github.com/aqilanailalhusna"
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
        <p className="text-xs text-red-200/60 pt-4">© 2026 A's Portfolio.</p>
      </footer>
    </div>
  );
}