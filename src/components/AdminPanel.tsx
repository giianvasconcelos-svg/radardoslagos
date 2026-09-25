import { useState, useEffect } from "react";
import { Noticia } from "../data/noticias";

interface AdminPanelProps {
  noticias: Noticia[];
  onSalvarNoticias: (noticias: Noticia[]) => void;
  onVoltar: () => void;
}

export default function AdminPanel({
  noticias,
  onSalvarNoticias,
  onVoltar,
}: AdminPanelProps) {
  const [logado, setLogado] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");

  const [editando, setEditando] = useState<Noticia | null>(null);
  const [mostrandoForm, setMostrandoForm] = useState(false);

  // Form state
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [categoria, setCategoria] = useState("Turismo");
  const [imagem, setImagem] = useState("");
  const [autor, setAutor] = useState("");
  const [destaque, setDestaque] = useState(false);

  const categorias = [
    "Política",
    "Economia",
    "Turismo",
    "Meio Ambiente",
    "Esportes",
    "Cultura",
    "Segurança",
  ];

  // Login simples (admin/admin123)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario === "admin" && senha === "admin123") {
      setLogado(true);
      setErroLogin("");
    } else {
      setErroLogin("Usuário ou senha incorretos");
    }
  };

  const handleLogout = () => {
    setLogado(false);
    setUsuario("");
    setSenha("");
  };

  const limparForm = () => {
    setTitulo("");
    setResumo("");
    setConteudo("");
    setCategoria("Turismo");
    setImagem("");
    setAutor("");
    setDestaque(false);
    setEditando(null);
    setMostrandoForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !resumo || !autor) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (editando) {
      // Atualizar notícia existente
      const atualizadas = noticias.map((n) =>
        n.id === editando.id
          ? {
              ...n,
              titulo,
              resumo,
              conteudo,
              categoria,
              imagem: imagem || n.imagem,
              autor,
              destaque,
            }
          : n
      );
      onSalvarNoticias(atualizadas);
    } else {
      // Adicionar nova notícia
      const novaNoticia: Noticia = {
        id: Date.now(),
        titulo,
        resumo,
        conteudo,
        categoria,
        data: new Date().toISOString().split("T")[0],
        imagem:
          imagem ||
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
        autor,
        destaque,
      };
      onSalvarNoticias([novaNoticia, ...noticias]);
    }

    limparForm();
  };

  const handleEditar = (noticia: Noticia) => {
    setEditando(noticia);
    setTitulo(noticia.titulo);
    setResumo(noticia.resumo);
    setConteudo(noticia.conteudo);
    setCategoria(noticia.categoria);
    setImagem(noticia.imagem);
    setAutor(noticia.autor);
    setDestaque(noticia.destaque);
    setMostrandoForm(true);
  };

  const handleDeletar = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta notícia?")) {
      const atualizadas = noticias.filter((n) => n.id !== id);
      onSalvarNoticias(atualizadas);
    }
  };

  // Tela de login
  if (!logado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Painel Admin
            </h1>
            <p className="text-gray-500 text-sm">
              Radar dos Lagos - Gerenciamento de Notícias
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuário
              </label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Digite seu usuário"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {erroLogin && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                {erroLogin}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all"
            >
              Entrar
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={onVoltar}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Voltar ao site
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
              <strong>Demo:</strong> usuário: <code>admin</code> | senha:{" "}
              <code>admin123</code>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Painel principal
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Admin */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌊</span>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Painel Administrativo
              </h1>
              <p className="text-xs text-gray-500">
                Radar dos Lagos - Gerenciamento de Notícias
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onVoltar}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              👁️ Ver Site
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total de Notícias</p>
                <p className="text-3xl font-bold text-gray-800">
                  {noticias.length}
                </p>
              </div>
              <div className="text-4xl">📰</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Destaques</p>
                <p className="text-3xl font-bold text-gray-800">
                  {noticias.filter((n) => n.destaque).length}
                </p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Categorias</p>
                <p className="text-3xl font-bold text-gray-800">
                  {new Set(noticias.map((n) => n.categoria)).size}
                </p>
              </div>
              <div className="text-4xl">📂</div>
            </div>
          </div>
        </div>

        {/* Botão Nova Notícia */}
        {!mostrandoForm && (
          <button
            onClick={() => {
              limparForm();
              setMostrandoForm(true);
            }}
            className="mb-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-all flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Nova Notícia
          </button>
        )}

        {/* Formulário */}
        {mostrandoForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editando ? "Editar Notícia" : "Nova Notícia"}
              </h2>
              <button
                onClick={limparForm}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Digite o título da notícia"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resumo *
                </label>
                <textarea
                  value={resumo}
                  onChange={(e) => setResumo(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Breve descrição da notícia"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conteúdo Completo
                </label>
                <textarea
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Conteúdo completo da notícia"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria *
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Autor *
                  </label>
                  <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Nome do autor"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL da Imagem
                </label>
                <input
                  type="url"
                  value={imagem}
                  onChange={(e) => setImagem(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Deixe vazio para usar imagem padrão
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="destaque"
                  checked={destaque}
                  onChange={(e) => setDestaque(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="destaque" className="text-sm text-gray-700">
                  Marcar como notícia em destaque
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white font-bold px-6 py-2.5 rounded-lg shadow-lg transition-all"
                >
                  {editando ? "Atualizar" : "Publicar"} Notícia
                </button>
                <button
                  type="button"
                  onClick={limparForm}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Notícias */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">
              Todas as Notícias ({noticias.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {noticias.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-5xl mb-3">📭</div>
                <p className="text-gray-500">
                  Nenhuma notícia cadastrada ainda.
                </p>
              </div>
            ) : (
              noticias.map((noticia) => (
                <div
                  key={noticia.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={noticia.imagem}
                      alt={noticia.titulo}
                      className="w-20 h-20 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-gray-800 line-clamp-2">
                          {noticia.titulo}
                        </h3>
                        {noticia.destaque && (
                          <span className="text-yellow-500 text-xl shrink-0">
                            ⭐
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {noticia.resumo}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          {noticia.categoria}
                        </span>
                        <span>✍️ {noticia.autor}</span>
                        <span>
                          📅{" "}
                          {new Date(noticia.data).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleEditar(noticia)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDeletar(noticia.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
