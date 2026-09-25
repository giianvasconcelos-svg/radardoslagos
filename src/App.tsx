import { useState } from "react";
import Header from "./components/Header";
import HeroNews from "./components/HeroNews";
import NewsCard from "./components/NewsCard";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { noticias, categorias } from "./data/noticias";

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");

  const noticiasFiltradas =
    categoriaAtiva === "Todas"
      ? noticias
      : noticias.filter((n) => n.categoria === categoriaAtiva);

  const noticiasDestaque = noticias.filter((n) => n.destaque);
  const noticiasLista = categoriaAtiva === "Todas"
    ? noticias.slice(2)
    : noticiasFiltradas;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        categoriaAtiva={categoriaAtiva}
        onCategoriaChange={setCategoriaAtiva}
        categorias={categorias}
      />

      {/* Hero Section - only show when "Todas" is selected */}
      {categoriaAtiva === "Todas" && <HeroNews noticias={noticiasDestaque} />}

      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="bg-white text-red-600 text-xs font-bold px-2 py-0.5 rounded animate-pulse shrink-0">
            URGENTE
          </span>
          <div className="overflow-hidden whitespace-nowrap">
            <p className="inline-block animate-marquee text-sm">
              ⚡ Temporada de verão 2026 bate recorde de turistas na Região dos Lagos •
              🌊 Qualidade da água da Lagoa de Araruama atinge melhor nível em uma década •
              🏄 Campeonato de Surf em Saquarema atrai atletas internacionais •
              🏗️ Nova ciclovia entre Búzios e Cabo Frio terá obras iniciadas em março
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">
              {categoriaAtiva === "Todas" ? "Últimas Notícias" : categoriaAtiva}
            </h2>
          </div>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {noticiasLista.length} {noticiasLista.length === 1 ? "notícia" : "notícias"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Grid */}
          <div className="lg:col-span-2">
            {noticiasLista.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {noticiasLista.map((noticia) => (
                  <NewsCard key={noticia.id} noticia={noticia} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  Nenhuma notícia encontrada
                </h3>
                <p className="text-gray-500">
                  Não há notícias na categoria "{categoriaAtiva}" no momento.
                </p>
              </div>
            )}

            {/* Load More */}
            {noticiasLista.length > 0 && (
              <div className="text-center mt-8">
                <button className="bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5">
                  Carregar mais notícias
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar noticias={noticias} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
