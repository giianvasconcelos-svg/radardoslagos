import { Noticia } from "../data/noticias";

interface NewsCardProps {
  noticia: Noticia;
}

export default function NewsCard({ noticia }: NewsCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={noticia.imagem}
          alt={noticia.titulo}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-800/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {noticia.categoria}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
          {noticia.titulo}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {noticia.resumo}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-[10px] font-bold">
              {noticia.autor.charAt(0)}
            </div>
            <span className="font-medium">{noticia.autor}</span>
          </div>
          <time>
            {new Date(noticia.data).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "short",
            })}
          </time>
        </div>
      </div>
    </article>
  );
}
