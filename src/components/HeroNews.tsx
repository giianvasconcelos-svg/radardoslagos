import { Noticia } from "../data/noticias";

interface HeroNewsProps {
  noticias: Noticia[];
}

export default function HeroNews({ noticias }: HeroNewsProps) {
  const destaquePrincipal = noticias[0];
  const destaqueSecundario = noticias[1];

  if (!destaquePrincipal) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main featured */}
        <div className="lg:col-span-2 relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl">
          <img
            src={destaquePrincipal.imagem}
            alt={destaquePrincipal.titulo}
            className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="inline-block bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              {destaquePrincipal.categoria}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-white mb-2 leading-tight">
              {destaquePrincipal.titulo}
            </h2>
            <p className="text-blue-100 text-sm md:text-base line-clamp-2 mb-3">
              {destaquePrincipal.resumo}
            </p>
            <div className="flex items-center gap-3 text-blue-200 text-xs">
              <span>✍️ {destaquePrincipal.autor}</span>
              <span>•</span>
              <span>
                {new Date(destaquePrincipal.data).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Secondary featured */}
        {destaqueSecundario && (
          <div className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl">
            <img
              src={destaqueSecundario.imagem}
              alt={destaqueSecundario.titulo}
              className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                {destaqueSecundario.categoria}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                {destaqueSecundario.titulo}
              </h3>
              <p className="text-blue-100 text-sm line-clamp-2 mb-2">
                {destaqueSecundario.resumo}
              </p>
              <div className="flex items-center gap-2 text-blue-200 text-xs">
                <span>✍️ {destaqueSecundario.autor}</span>
                <span>•</span>
                <span>
                  {new Date(destaqueSecundario.data).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
