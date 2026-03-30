export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Lead<span className="text-blue-600">Flow</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Webs profesionales para negocios locales. Generadas con IA.
        </p>
        <div className="flex gap-4 justify-center text-sm text-gray-400">
          <span>🇪🇸 España</span>
          <span>🇦🇷 Argentina</span>
          <span>🇺🇾 Uruguay</span>
        </div>
      </div>
    </main>
  );
}
