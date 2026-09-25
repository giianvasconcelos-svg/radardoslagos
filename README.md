# 🌊 Radar dos Lagos - Portal de Notícias

Portal de notícias completo da Região dos Lagos do Rio de Janeiro, com painel administrativo para gerenciamento de conteúdo.

## 🚀 Funcionalidades

### Site Público
- ✅ Listagem de notícias por categoria
- ✅ Busca em tempo real (título, resumo, categoria, autor)
- ✅ Busca inteligente (ignora acentos)
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Seção de destaques com imagens grandes
- ✅ Ticker de notícias urgentes
- ✅ Sidebar com widgets (mais lidas, newsletter, clima)
- ✅ Filtros por categoria

### Painel Administrativo
- ✅ Login seguro (usuário: `admin` | senha: `admin123`)
- ✅ Dashboard com estatísticas
- ✅ Criar novas notícias
- ✅ Editar notícias existentes
- ✅ Excluir notícias
- ✅ Marcar notícias como destaque
- ✅ Upload de imagens via URL
- ✅ Persistência via localStorage

## 🔐 Acesso ao Painel Admin

1. Clique no botão **"🔐 Admin"** no cabeçalho do site (desktop ou mobile)
2. Faça login com:
   - **Usuário:** `admin`
   - **Senha:** `admin123`
3. Você será redirecionado para o painel administrativo

## 📝 Como Adicionar Notícias

### Pelo Painel Admin:

1. **Acesse o painel** (botão Admin no header)
2. **Faça login** com as credenciais acima
3. **Clique em "Nova Notícia"** (botão verde)
4. **Preencha os campos:**
   - Título (obrigatório)
   - Resumo (obrigatório)
   - Conteúdo completo (opcional)
   - Categoria (selecione do menu)
   - Autor (obrigatório)
   - URL da imagem (opcional - usa imagem padrão se vazio)
   - Marque como destaque (opcional)
5. **Clique em "Publicar Notícia"**

### Editar/Excluir Notícias:

- **Editar:** Clique no botão "✏️ Editar" ao lado da notícia
- **Excluir:** Clique no botão "🗑️ Excluir" (confirmação necessária)

## 📂 Estrutura do Projeto

```
src/
├── App.tsx                    # Componente principal
├── main.tsx                   # Entry point
├── index.css                  # Estilos globais
├── components/
│   ├── Header.tsx            # Cabeçalho com navegação e busca
│   ├── HeroNews.tsx          # Seção de destaques
│   ├── NewsCard.tsx          # Card de notícia individual
│   ├── Sidebar.tsx           # Barra lateral com widgets
│   ├── Footer.tsx            # Rodapé
│   └── AdminPanel.tsx        # Painel administrativo
└── data/
    └── noticias.ts           # Dados iniciais das notícias
```

## 🎨 Categorias Disponíveis

- Política
- Economia
- Turismo
- Meio Ambiente
- Esportes
- Cultura
- Segurança

## 💾 Persistência de Dados

As notícias são salvas automaticamente no `localStorage` do navegador. Isso significa:

- ✅ As notícias persistem entre sessões
- ✅ Você pode adicionar/editar/excluir e as mudanças são mantidas
- ⚠️ Os dados são salvos apenas no navegador local
- ⚠️ Limpar dados do navegador resetará para as notícias padrão

## 🔍 Funcionalidades de Busca

A busca é **inteligente** e funciona em:
- Título da notícia
- Resumo
- Categoria
- Autor

**Exemplos:**
- Digite `ciclovia` → encontra notícias sobre ciclovias
- Digite `lagoa` → encontra notícias sobre a Lagoa de Araruama
- Digite `búzios` ou `buzios` → ambos funcionam (ignora acentos)
- Digite `surf` → encontra notícias sobre surf

## 🎯 Estatísticas do Dashboard

O painel admin mostra:
- 📰 Total de notícias cadastradas
- ⭐ Quantidade de notícias em destaque
- 📂 Número de categorias utilizadas

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Vite** - Build tool
- **LocalStorage** - Persistência de dados

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- 📱 Celulares (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1440px+)

## 🎨 Personalização

### Mudar Credenciais do Admin

Edite o arquivo `src/components/AdminPanel.tsx`:

```typescript
// Linha ~60
if (usuario === "admin" && senha === "admin123") {
```

Altere para suas credenciais desejadas.

### Mudar Notícias Iniciais

Edite o arquivo `src/data/noticias.ts` e modifique o array `noticias`.

### Resetar Notícias

Para voltar às notícias padrão:

1. Abra o console do navegador (F12)
2. Execute: `localStorage.clear()`
3. Recarregue a página

## 🚀 Deploy

Para fazer deploy:

```bash
# Instalar dependências
npm install

# Build de produção
npm run build

# Os arquivos estarão em dist/
```

## 📄 Licença

Projeto criado para a Região dos Lagos - RJ

---

**Desenvolvido com ❤️ para a Região dos Lagos**
