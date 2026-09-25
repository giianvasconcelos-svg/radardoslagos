import { useState } from "react";

interface HeaderProps {
  categoriaAtiva: string;
  onCategoriaChange: (categoria: string) => void;
  categorias: string[];
  termoBusca: string;
  onBuscaChange: (termo: string) => void;
}

export default function Header({
  categoriaAtiva,
  onCategoriaChange,
  categorias,
  termoBusca,
  onBuscaChange,
}: HeaderProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ao submeter, mantém o termo já digitado
  };

  const limparBusca = () => {
    onBuscaChange("");
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-950/50 text-blue-200 text-xs py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>📍 Região dos Lagos - RJ</span>
          <div className="hidden sm:flex gap-4">
            <span>
              📅{" "}
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-3">
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
          <form
            onSubmit={handleSubmit}
            className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm border border-white/20 focus-within:border-cyan-400 focus-within:bg-white/15 transition-all"
          >
            <input
              type="text"
              placeholder="Buscar notícias..."
              value={termoBusca}
              onChange={(e) => onBuscaChange(e.target.value)}
              className="bg-transparent text-white placeholder-blue-200 outline-none w-56 text-sm"
            />
            {termoBusca && (
              <button
                type="button"
                onClick={limparBusca}
                className="text-blue-200 hover:text-white ml-1 text-sm"
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="text-cyan-300 hover:text-white ml-2 transition-colors"
              aria-label="Pesquisar"
            >
              🔍
            </button>
          </form>

          {/* Mobile search toggle */}
          <button
            onClick={() => setBuscaAberta(!buscaAberta)}
            className="md:hidden text-white text-xl bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            aria-label="Abrir busca"
          >
            🔍
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden text-white text-xl bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            aria-label="Menu"
          >
            {menuAberto ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile search bar (expanded) */}
        {buscaAberta && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setBuscaAberta(false);
            }}
            className="md:hidden mt-3 flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm border border-white/20"
          >
            <input
              type="text"
              placeholder="Buscar notícias..."
              value={termoBusca}
              onChange={(e) => onBuscaChange(e.target.value)}
              autoFocus
              className="bg-transparent text-white placeholder-blue-200 outline-none flex-1 text-sm"
            />
            {termoBusca && (
              <button
                type="button"
                onClick={limparBusca}
                className="text-blue-200 hover:text-white ml-1"
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="text-cyan-300 hover:text-white ml-2"
              aria-label="Pesquisar"
            >
              🔍
            </button>
          </form>
        )}
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
