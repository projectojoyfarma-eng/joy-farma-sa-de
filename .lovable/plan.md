# Plano: catálogo JOYFARMA com padrões de UX de e-commerce

## Estado actual (verificado)
- Uma só página: `src/routes/index.tsx` (categorias + catálogo vazio, filtragem via `?categoria=`).
- Categorias: `src/lib/categories.ts` (15, ordem fixa, testada em `src/test/categories.test.ts`).
- Não existem produtos, componentes de catálogo, número de WhatsApp nem imagens de produto.
- **Os anexos (ZIP com 11 JPEGs e as 2 fotos de referência) não estão acessíveis nesta sessão** — a pasta de uploads não existe. A importação depende de os reenviar.

## O que será construído (identidade própria, sem copiar a Wells)
1. **Página de categoria** `/categoria/$slug`: título, contagem ("N produtos"), breadcrumbs, lista de produtos.
2. **Barra lateral de filtros** (gaveta em telemóvel): marca e apresentação (comprimidos, xarope, pomada…), gerados apenas a partir dos dados reais. Sem subcategorias até serem fornecidas.
3. **Pesquisa** no cabeçalho (nome/marca), página `/pesquisa?q=`.
4. **Ordenação**: nome A–Z / Z–A, marca. Sem preço.
5. **Cartão de produto**: imagem individual em fundo neutro, nome exacto, marca, apresentação, botão "Pedir pelo WhatsApp" com mensagem pré-preenchida com o nome do produto.
6. **Página de produto** `/produto/$slug` com os mesmos dados e o botão WhatsApp.
7. A página inicial mantém as 15 categorias; os cartões passam a ligar à página de categoria.

## Dados necessários (do utilizador)
- Número oficial de WhatsApp (sem ele, o botão fica oculto).
- Reenvio do ZIP de 11 JPEGs.
- Confirmação da categoria de cada produto quando não for óbvia.

## Importação das imagens
- Inspeccionar cada JPEG: individual vs montagem.
- Montagens: recortar cada embalagem; descartar recortes ilegíveis.
- Nome/marca/dosagem só quando legíveis na embalagem; caso contrário, perguntar.
- Detectar duplicados entre imagens antes de criar produtos.
- Gestacare Lactação e Ducray Anacaps Reactiv **não** serão adicionados.
- Imagens enviadas para o CDN de assets (`.asset.json`), não ficheiros binários no repositório.
- Tabela de revisão (imagem → produto proposto → categoria) para aprovar antes de publicar no catálogo.

## Detalhes técnicos
- `src/lib/products.ts`: tipo `Product { slug, name, brand, presentation, categorySlug, image }` e lista estática (sem Cloud, por agora; migrável depois).
- `src/lib/catalog.ts`: funções puras de filtrar/pesquisar/ordenar + contagem.
- `src/lib/whatsapp.ts`: construtor de link `wa.me` com o número numa constante.
- Componentes novos em `src/components/catalog/`: `SiteHeader` (extraído de index), `ProductCard`, `FilterPanel`, `SortSelect`, `SearchBox`, `Breadcrumbs`.
- Rotas novas: `categoria.$slug.tsx`, `produto.$slug.tsx`, `pesquisa.tsx`, cada uma com `head()` próprio; filtros/ordenação em search params validados.
- Testes: filtro por categoria, pesquisa, ordenação, contagem, slug de categoria inválido → 404, link WhatsApp; manter o teste das 15 categorias.

## Riscos
- Leitura errada de texto em embalagens recortadas → mitigado pela tabela de revisão.
- Recortes de baixa resolução → descartar em vez de usar imagens fracas.
- Categoria ambígua → confirmação do utilizador.
- Direitos das fotos das embalagens → responsabilidade do utilizador confirmar.

## Validação no Preview
- Playwright em 375/768/1280 px: página inicial, categoria com filtros, pesquisa, ordenação, produto.
- Confirmar contagens, ausência de preços, link WhatsApp correcto, títulos das páginas.
- Correr testes e verificar o registo de build. Sem publicar.
