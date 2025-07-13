# 🎬 BuscadorDeFilmesAPI

Este projeto é um buscador de filmes que consome a [API OMDb](http://www.omdbapi.com) e exibe as informações em cartões interativos na tela.

## 🔧 Como funciona

O usuário digita o nome de um filme em um campo de busca, e o site envia uma requisição para a API com este nome. A API retorna os dados do filme, como título, ano, gênero, duração, nota no IMDb, entre outros. Esses dados são então exibidos dinamicamente na tela como um card.

### Exemplo de requisição

```javascript
const nomeFilme = inputFilmeNome.value.trim().replace(/\s+/g, '+');
const URL = `http://www.omdbapi.com/?apikey=[SUA CHAVE]=${nomeFilme}`;
const resp = await fetch(URL);
const dados = await resp.json();
```

### Exemplo de URL gerada

```
http://www.omdbapi.com/?apikey=[SUA CHAVE]t=star+wars
```

### Exemplo de resposta

```json
{
  "Title": "Star Wars: Episode IV - A New Hope",
  "Year": "1977",
  "Genre": "Action, Adventure, Fantasy",
  "Released": "25 May 1977",
  "Runtime": "121 min",
  "imdbRating": "8.6",
  "Poster": "https://m.media-amazon.com/images/...",
  ...
}
```

## 🧠 Funcionalidades

- Busca por título do filme.
- Exibição de informações principais em cards.
- Botão para visualizar mais detalhes.
- Botão para remover o card da tela.
- Evita duplicidade de filmes já exibidos.

## 🗂 Estrutura dos cards gerados

Cada card inclui:

- Pôster do filme
- Título
- Ano de lançamento
- Gênero
- Data de lançamento
- Duração
- Nota do IMDb
- Botão para mais detalhes
- Botão de remover

## 🖼 Modal de detalhes

Ao clicar em “Mais detalhes”, um modal é exibido com informações adicionais, como:

- Diretor
- Roteirista
- Atores
- Idioma
- País
- Votos no IMDb
- Premiações
- Sinopse completa

---

✅ Projeto simples, ideal para praticar consumo de APIs com `fetch` e manipulação do DOM com JavaScript.
