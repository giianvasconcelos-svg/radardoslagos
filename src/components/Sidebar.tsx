import { Noticia } from "../data/noticias";
import { fontesNoticias } from "../data/fontes";

interface SidebarProps {
  noticias: Noticia[];
}

export default function Sidebar({ noticias }: SidebarProps) {
  const maisLidas = noticias.slice(0, 5);

  return (
    <aside className="space-y-6">
      {/* Mais Lidas */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-800 to-cyan-700 px-5 py-3">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            🔥 Mais Lidas
          </h3>
        </div>
        <div className="p-4">
          {maisLidas.map((noticia, index) => (
            <div
              key={noticia.id}
              className="flex gap-3 py-3 border-b border-gray-100 last:border-0 cursor-pointer group"
            >
              <span className="text-2xl font-black text-blue-200 group-hover:text-cyan-500 transition-colors min-w-[28px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                  {noticia.titulo}
                </h4>
                <span className="text-xs text-gray-400 mt-1 block">
                  {noticia.categoria}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fontes externas */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-blue-800 px-5 py-3">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            🗞️ Fontes da Região
          </h3>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-3">
            Consulte também outros veículos que cobrem a Região dos Lagos.
          </p>
          <ul className="space-y-1">
            {fontesNoticias.map((fonte) => (
              <li key={fonte.url}>
                <a
                  href={fonte.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <span>{fonte.nome}</span>
                  <span aria-hidden="true" className="text-gray-400">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-blue-800 to-cyan-700 rounded-xl shadow-md p-6 text-center">
        <div className="text-3xl mb-3">📬</div>
        <h3 className="text-white font-bold text-lg mb-2">
          Fique por dentro!
        </h3>
        <p className="text-blue-200 text-sm mb-4">
          Receba as principais notícias da Região dos Lagos direto no seu e-mail.
        </p>
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 text-sm mb-3 outline-none focus:border-cyan-400 focus:bg-white/15 transition-all"
        />
        <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-cyan-500/30">
          Inscrever-se Grátis
        </button>
      </div>

      {/* Tempo */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          ☀️ Clima na Região
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🌡️</div>
            <div className="text-lg font-bold text-gray-800">32°C</div>
            <div className="text-xs text-gray-500">Cabo Frio</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🌊</div>
            <div className="text-lg font-bold text-gray-800">26°C</div>
            <div className="text-xs text-gray-500">Mar</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">💨</div>
            <div className="text-lg font-bold text-gray-800">15km/h</div>
            <div className="text-xs text-gray-500">Vento</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">💧</div>
            <div className="text-lg font-bold text-gray-800">65%</div>
            <div className="text-xs text-gray-500">Umidade</div>
          </div>
        </div>
      </div>

      {/* Redes Sociais */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-3">📱 Siga-nos</h3>
        <div className="grid grid-cols-2 gap-2">
          <a href="#" className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 rounded-lg p-2.5 transition-colors text-sm">
            <span className="text-blue-600">📘</span>
            <span className="text-gray-700 font-medium">Facebook</span>
          </a>
          <a href="#" className="flex items-center gap-2 bg-pink-50 hover:bg-pink-100 rounded-lg p-2.5 transition-colors text-sm">
            <span className="text-pink-600">📸</span>
            <span className="text-gray-700 font-medium">Instagram</span>
          </a>
          <a href="#" className="flex items-center gap-2 bg-sky-50 hover:bg-sky-100 rounded-lg p-2.5 transition-colors text-sm">
            <span className="text-sky-600">🐦</span>
            <span className="text-gray-700 font-medium">Twitter</span>
          </a>
          <a href="#" className="flex items-center gap-2 bg-red-50 hover:bg-red-100 rounded-lg p-2.5 transition-colors text-sm">
            <span className="text-red-600">▶️</span>
            <span className="text-gray-700 font-medium">YouTube</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
