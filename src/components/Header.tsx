import { useState } from "react";

interface HeaderProps {
  categoriaAtiva: string;
  onCategoriaChange: (categoria: string) => void;
  categorias: string[];
}

export default function Header({ categoriaAtiva, onCategoriaChange, categorias }: HeaderProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState("");

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-950/50 text-blue-200 text-xs py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>📍 Região dos Lagos - RJ</span>
          <div className="flex gap-4">
            <span>📅 {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌊</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Radar dos Lagos
              </h1>
              <p className="text-cyan-300 text-xs md:text-sm font-medium">
                Notícias em tempo real da Região dos Lagos
              </p>
            </div>
          </div>

          {/* Search bar - desktop */}
          <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm border border-white/20">
            <input
              type="text"
              placeholder="Buscar notícias..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="bg-transparent text-white placeholder-blue-200 outline-none w-48 text-sm"
            />
            <button className="text-cyan-300 hover:text-white ml-2">
              🔍
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden text-white text-2xl"
          >
            {menuAberto ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-blue-900/50 border-t border-blue-700/50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop nav */}
          <div className="hidden md:flex gap-1 py-2 overflow-x-auto">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoriaChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  categoriaAtiva === cat
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                    : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile nav */}
          {menuAberto && (
            <div className="md:hidden py-3 flex flex-wrap gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onCategoriaChange(cat);
                    setMenuAberto(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    categoriaAtiva === cat
                      ? "bg-cyan-500 text-white"
                      : "text-blue-200 bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
