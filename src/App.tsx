import { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import HeroNews from "./components/HeroNews";
import NewsCard from "./components/NewsCard";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { noticias as noticiasIniciais, categorias, Noticia } from "./data/noticias";
import { supabase } from "./lib/supabase";

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [termoBusca, setTermoBusca] = useState("");
  const [modoAdmin, setModoAdmin] = useState(
    () =>
      new URLSearchParams(window.location.search).has("admin") ||
      window.location.hash.includes("type=invite") ||
      window.location.hash.includes("type=recovery"),
  );
  const [noticias, setNoticias] = useState<Noticia[]>(noticiasIniciais);

  useEffect(() => {
    supabase.from("noticias")
      .select("id,titulo,resumo,conteudo,categoria,data,imagem,autor,destaque")
      .order("data", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) setNoticias(data as Noticia[]);
      });
  }, []);

  // Normaliza texto para busca (sem acentos e em minúsculas)
  const normalizar = (texto: string) =>
    texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const termoNormalizado = normalizar(termoBusca.trim());

  // Filtra notícias por categoria E termo de busca
  const noticiasFiltradas = useMemo(() => {
    return noticias.filter((n) => {
      const matchCategoria =
        categoriaAtiva === "Todas" || n.categoria === categoriaAtiva;
      if (!matchCategoria) return false;

      if (!termoNormalizado) return true;

      const camposBusca = normalizar(
        `${n.titulo} ${n.resumo} ${n.categoria} ${n.autor}`
      );
      return camposBusca.includes(termoNormalizado);
    });
  }, [noticias, categoriaAtiva, termoNormalizado]);

  const noticiasDestaque = noticiasFiltradas.filter((n) => n.destaque);
  const noticiasLista =
    categoriaAtiva === "Todas" && !termoBusca
      ? noticiasFiltradas.slice(2)
      : noticiasFiltradas;

  const mostrarHero =
    categoriaAtiva === "Todas" && !termoBusca && noticiasDestaque.length > 0;

  const handleCategoriaChange = (cat: string) => {
    setCategoriaAtiva(cat);
    setTermoBusca("");
  };

  const handleBuscaChange = (termo: string) => {
    setTermoBusca(termo);
    if (termo && categoriaAtiva !== "Todas") {
      setCategoriaAtiva("Todas");
    }
  };

  const handleSalvarNoticias = async (novasNoticias: Noticia[]) => {
    setNoticias(novasNoticias);
    const { error: deleteError } = await supabase.from("noticias").delete().neq("id", 0);
    if (deleteError) return alert("Não foi possível salvar as notícias.");
    const { error } = await supabase.from("noticias").insert(novasNoticias);
    if (error) alert("Não foi possível salvar as notícias.");
  };

  // Se estiver no modo admin, renderiza o painel admin
  if (modoAdmin) {
    return (
      <AdminPanel
        noticias={noticias}
        onSalvarNoticias={handleSalvarNoticias}
        onVoltar={() => setModoAdmin(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        categoriaAtiva={categoriaAtiva}
        onCategoriaChange={handleCategoriaChange}
        categorias={categorias}
        termoBusca={termoBusca}
        onBuscaChange={handleBuscaChange}
        onAdminClick={() => setModoAdmin(true)}
      />

      {/* Hero Section - só mostra quando não há busca */}
      {mostrarHero && <HeroNews noticias={noticiasDestaque} />}

      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="bg-white text-red-600 text-xs font-bold px-2 py-0.5 rounded animate-pulse shrink-0">
            URGENTE
          </span>
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <p className="inline-block animate-marquee text-sm">
              ⚡ Temporada de verão 2026 bate recorde de turistas na Região dos
              Lagos • 🌊 Qualidade da água da Lagoa de Araruama atinge melhor
              nível em uma década • 🏄 Campeonato de Surf em Saquarema atrai
              atletas internacionais • 🏗️ Nova ciclovia entre Búzios e Cabo Frio
              terá obras iniciadas em março
            </p>
          </div>
        </div>
      </div>

      {/* Indicador de busca ativa */}
      {termoBusca && (
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="text-gray-800 text-sm">
                  Resultados para{" "}
                  <strong className="text-blue-700">"{termoBusca}"</strong>
                </p>
                <p className="text-gray-600 text-xs mt-0.5">
                  {noticiasFiltradas.length}{" "}
                  {noticiasFiltradas.length === 1
                    ? "notícia encontrada"
                    : "notícias encontradas"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setTermoBusca("")}
              className="text-sm text-blue-700 hover:text-blue-900 font-medium bg-white hover:bg-gray-50 px-4 py-1.5 rounded-full border border-blue-200 transition-colors"
            >
              ✕ Limpar busca
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">
              {termoBusca
                ? "Resultados da busca"
                : categoriaAtiva === "Todas"
                ? "Últimas Notícias"
                : categoriaAtiva}
            </h2>
          </div>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {noticiasFiltradas.length}{" "}
            {noticiasFiltradas.length === 1 ? "notícia" : "notícias"}
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
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  Nenhuma notícia encontrada
                </h3>
                <p className="text-gray-500 mb-4">
                  {termoBusca ? (
                    <>
                      Não encontramos resultados para{" "}
                      <strong>"{termoBusca}"</strong>.
                    </>
                  ) : (
                    <>Não há notícias na categoria "{categoriaAtiva}" no momento.</>
                  )}
                </p>
                <button
                  onClick={() => {
                    setTermoBusca("");
                    setCategoriaAtiva("Todas");
                  }}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-5 py-2 rounded-full text-sm transition-colors"
                >
                  Ver todas as notícias
                </button>
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
