export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌊</span>
              <h3 className="text-xl font-bold text-white">Radar dos Lagos</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              O principal portal de notícias da Região dos Lagos do Rio de Janeiro.
              Cobertura completa de Cabo Frio, Búzios, Arraial do Cabo, Araruama,
              Saquarema, Rio das Ostras e Macaé.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors text-sm">📘</a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors text-sm">📸</a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors text-sm">🐦</a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors text-sm">▶️</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Editorias</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Política</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Economia</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Turismo</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Meio Ambiente</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Esportes</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Cultura</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">📧 contato@radardoslagos.com.br</li>
              <li className="flex items-center gap-2">📱 (22) 99999-0000</li>
              <li className="flex items-center gap-2">📍 Cabo Frio - RJ</li>
            </ul>
            <div className="mt-4">
              <h4 className="text-white font-bold mb-2">Cidades</h4>
              <div className="flex flex-wrap gap-1">
                {["Cabo Frio", "Búzios", "Arraial", "Araruama", "Saquarema", "Rio das Ostras", "Macaé"].map((cidade) => (
                  <span key={cidade} className="text-xs bg-gray-800 px-2 py-1 rounded">
                    {cidade}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Radar dos Lagos. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Anuncie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
