// Tipe data spesifik untuk repositori GitHub
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
  const res = await fetch(`https://api.github.com/users/aqilanailalhusna/repos?sort=updated&per_page=6`, {
    next: { revalidate: 3600 } // Data di-cache & di-refresh otomatis setiap 1 jam
  });

  if (!res.ok) {
    return [];
  }

  const repos: Repository[] = await res.json();
  
  return repos.filter((repo) => !repo.fork);
}

export default async function Home() {
  const projects = await getGithubProjects('USERNAME_GITHUB_KAMU');

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
      <div className="mx-auto mt-5 max-w-5xl w-full flex items-center justify-center gap-6">
        <h1 className="text-4xl md:text-6xl font-bold text-center">A's Portofolio</h1>
      </div>

      <div className="max-w-5xl w-full my-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <p className="text-lg text-slate-300">
            I am an undergraduate student from University. Interested in Data Science and Machine Learning.
          </p>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <img src="/profile.jpg" alt="Profile Picture" className="w-32 h-32 rounded-full object-cover border-2 border-slate-800" />
        </div>
      </div>

      <div className="max-w-5xl w-full my-12 flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Skills</h1>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 w-full">
          <div className="bg-slate-800 p-4 rounded-lg text-center">Python</div>
          <div className="bg-slate-800 p-4 rounded-lg text-center">JavaScript</div>
          <div className="bg-slate-800 p-4 rounded-lg text-center">SQL</div>
          <div className="bg-slate-800 p-4 rounded-lg text-center">Machine Learning</div>
          <div className="bg-slate-800 p-4 rounded-lg text-center">Data Analysis</div>
          <div className="bg-slate-800 p-4 rounded-lg text-center">Excel</div>
          <div className="bg-slate-800 p-4 rounded-lg text-center">C</div>
        </div>
      </div>

      <div className="max-w-5xl w-full my-12 flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-blue-400 capitalize">
                    {project.name.replace(/-/g, ' ')}
                  </h2>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-3">
                    {project.description || 'Tidak ada deskripsi pada repositori ini.'}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                  <span className="px-3 py-1 bg-slate-800 rounded-md font-medium text-slate-300">
                    {project.language || 'Code'}
                  </span>
                  
                  <div className="flex items-center gap-4">
                    <span>⭐ {project.stargazers_count}</span>
                    <a 
                      href={project.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 hover:underline font-medium"
                    >
                      Lihat Repo ↗
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 col-span-2 text-center">Gagal memuat repositori atau repositori tidak ditemukan.</p>
          )}
        </div>
      </div>
    </main>

    <footer>
      <div className="max-w-5xl w-full py-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4mb-4">
          <h1 className="text-2xl font-bold">Let's Connect</h1>
          <div className="flex flex-row items-center gap-8">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              LinkedIn
            </a>
            <a href="https://intagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Instagram
            </a>
            <a href="https://gmail.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Email
            </a>
          </div>
        </div>
        <div className="text-slate-500 text-sm mt-16">
          &copy; {new Date().getFullYear()} A's Portofolio. All rights reserved.
        </div>
      </div>
    </footer>

    </div>
    
  );
}