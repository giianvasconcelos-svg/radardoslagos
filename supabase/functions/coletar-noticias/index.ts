import { createClient } from "npm:@supabase/supabase-js@2.98.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://giianvasconcelos-svg.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const fontes = [
  { nome: "Lagos Informa", feed: "https://lagosinforma.com.br/feed/" },
  { nome: "Lagos Notícia", feed: "https://lagosnoticia.com.br/feed/" },
  { nome: "g1 Região dos Lagos", feed: "https://g1.globo.com/rss/g1/rj/regiao-dos-lagos/" },
  { nome: "R Lagos Notícias", feed: "https://rlagosnoticias.com.br/feed/" },
  { nome: "Fonte Certa", feed: "https://fontecerta.com/feed/" },
  { nome: "Portal Costa do Sol", feed: "https://portalcostadosol.com.br/feed/" },
  { nome: "RC24H", feed: "https://rc24h.com.br/feed/" },
  { nome: "Jornal Portal Lagos", feed: "https://jornalportallagos.com.br/feed/" },
  { nome: "Agência Brasil", feed: "https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml", filtrarRegiao: true },
];

const termosRegiao = /regi[aã]o dos lagos|cabo frio|búzios|buzios|arraial do cabo|araruama|saquarema|rio das ostras|iguaba|são pedro da aldeia|macaé/i;

function valor(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return (match?.[1] || "").replace(/^<!\[CDATA\[|\]\]>$/g, "").trim();
}

function textoLimpo(valorOriginal: string) {
  return valorOriginal
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function categoria(texto: string) {
  if (/pol[ií]tica|prefeit|vereador|eleiç/i.test(texto)) return "Política";
  if (/turis|praia|hotel|viagem/i.test(texto)) return "Turismo";
  if (/ambient|lagoa|saneamento|clima/i.test(texto)) return "Meio Ambiente";
  if (/esporte|futebol|surf|campeonato/i.test(texto)) return "Esportes";
  if (/cultura|show|festival|música|cinema/i.test(texto)) return "Cultura";
  if (/polícia|crime|preso|segurança|acidente/i.test(texto)) return "Segurança";
  if (/econom|emprego|comércio|empresa/i.test(texto)) return "Economia";
  return "Região";
}

function imagemDoItem(item: string, conteudo: string) {
  return item.match(/<(?:media:content|enclosure)[^>]+url=["']([^"']+)/i)?.[1] ||
    conteudo.match(/<img[^>]+src=["']([^"']+)/i)?.[1] || null;
}

async function lerFonte(fonte: typeof fontes[number]) {
  const resposta = await fetch(fonte.feed, { headers: { "User-Agent": "RadarDosLagos/1.0" } });
  if (!resposta.ok) throw new Error(`${fonte.nome}: HTTP ${resposta.status}`);
  const xml = await resposta.text();
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)]
    .slice(0, 8)
    .map((match) => {
      const item = match[1];
      const titulo = textoLimpo(valor(item, "title"));
      const descricaoBruta = valor(item, "description");
      const resumo = textoLimpo(descricaoBruta).slice(0, 500);
      const fonteUrl = textoLimpo(valor(item, "link"));
      const dataOriginal = valor(item, "pubDate");
      const data = Number.isNaN(Date.parse(dataOriginal))
        ? new Date().toISOString().slice(0, 10)
        : new Date(dataOriginal).toISOString().slice(0, 10);
      return {
        titulo,
        resumo,
        conteudo: `Leia a matéria completa em ${fonte.nome}: ${fonteUrl}`,
        categoria: categoria(`${titulo} ${resumo}`),
        data,
        imagem: imagemDoItem(item, descricaoBruta),
        autor: fonte.nome,
        fonte_nome: fonte.nome,
        fonte_url: fonteUrl,
        status: "pendente",
      };
    })
    .filter((item) => item.titulo && item.fonte_url)
    .filter((item) => !fonte.filtrarRegiao || termosRegiao.test(`${item.titulo} ${item.resumo}`));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return new Response("Não autorizado", { status: 401, headers: corsHeaders });

  const admin = createClient(supabaseUrl, serviceKey);
  const { data: userData } = await admin.auth.getUser(token);
  if (!userData.user) return new Response("Não autorizado", { status: 401, headers: corsHeaders });
  const { data: permitido } = await admin
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (!permitido) return new Response("Acesso negado", { status: 403, headers: corsHeaders });

  const resultados = await Promise.allSettled(fontes.map(lerFonte));
  const artigos = resultados.flatMap((resultado) => resultado.status === "fulfilled" ? resultado.value : []);
  const { data, error } = await admin
    .from("noticias_pendentes")
    .upsert(artigos, { onConflict: "fonte_url", ignoreDuplicates: true })
    .select("id");

  if (error) {
    return Response.json({ erro: error.message }, { status: 500, headers: corsHeaders });
  }
  return Response.json(
    { adicionadas: data?.length || 0, consultadas: fontes.length },
    { headers: corsHeaders },
  );
});
