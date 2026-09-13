export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
      <div className= "mx-auto mt-5 max-w-5xl w-full flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl md:text-6xl font-bold text-center">Aqila Nailal Husna's Portofolio</h1>
      </div>
      <div className="max-w-5xl w-full my-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className= "flex-1 space-y-6 text-justify-center">
          <p className="text-lg text-slate-300">
            I am an undergraduate student from Bina Nusantara University. Interested in Data Science and Machine Learning.
          </p>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <img src="/profile.jpg" alt="Profile Picture" className="w-32 h-32 rounded-full" />
        </div>
      </div>


      
    </main>
  );
}