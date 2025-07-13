const inputFilmeNome = document.getElementById('caixaPesquisaNome')
const cartazesFilmes = document.getElementById('cards-filmes')
const btnPesquisar = document.getElementById('buscar')
const modal = document.getElementById('modal')
const modalBody = document.getElementById('modal-body')
const fecharModal = document.getElementById('fechar-modal')

let filmes = []

async function consultarAPI() {
  const nomeFilme = inputFilmeNome.value.trim().replace(/\s+/g, '+')
  const URL = `https://www.omdbapi.com/?apikey=909dc5cb&t=${nomeFilme}`

  let ca = ""

  try {
    const resp = await fetch(URL)
    const dados = await resp.json() //essa constante contem todos os dados do filme pesquisado

    if (dados.Response === 'False') {
      alert("Campo de pesquisa vazio")
      return
    }

    let filmeExiste = filmes.some(filme => filme.Title === dados.Title)

    if (filmeExiste) {
      alert("Esse filme já foi pesquisado anteriormente")
      return
    }

    console.log(dados)
    filmes.push(dados)

    const cardFilme = document.createElement('div')
    cardFilme.className = 'card-filme'
    cardFilme.innerHTML = ` 
      <img src="${dados.Poster}" alt="Pôster de ${dados.Title}">
      <h2><strong>${dados.Title}</strong></h2>
      <p><strong>${dados.Year}</strong></p>
      <p><strong>Gênero:</strong> ${dados.Genre}</p>
      <p><strong>Lançamento:</strong> ${dados.Released}</p>
      <p><strong>Duração:</strong> ${dados.Runtime}</p>
      <p><strong>Nota IMDb:</strong> ${dados.imdbRating}</p>
      <button class="btn-detalhes">Mais detalhes</button>
    `
    const btnRemover = document.createElement('button');
    btnRemover.className = 'botao-remover'
    btnRemover.textContent = 'X';
    btnRemover.addEventListener('click', apagarConteudo)
    function apagarConteudo() {
      filmes = filmes.filter(filme => filme.Title !== dados.Title)
      cardFilme.remove();
    }

    cardFilme.appendChild(btnRemover)

    cartazesFilmes.appendChild(cardFilme)

    // Evento do botão "Mais detalhes"
    const btnDetalhes = cardFilme.querySelector('.btn-detalhes')
    btnDetalhes.addEventListener('click', () => {
      modalBody.innerHTML = `
        <h2>${dados.Title}</h2>
        <p><strong>Diretor:</strong> ${dados.Director}</p>
        <p><strong>Roteiro:</strong> ${dados.Writer}</p>
        <p><strong>Atores:</strong> ${dados.Actors}</p>
        <p><strong>Idioma:</strong> ${dados.Language}</p>
        <p><strong>País:</strong> ${dados.Country}</p>
        <p><strong>Votos:</strong> ${dados.imdbVotes}</p>
        <p><strong>Premiações:</strong> ${dados.Awards}</p>
        <p><strong>Sinopse:</strong>${dados.Plot}</p>
      `
      modal.classList.remove('hidden')
    })

  } catch (error) {
    console.log('Erro ao consultar API:', error)
  }

  inputFilmeNome.value = ''
}

// Fechar modal
fecharModal.addEventListener('click', () => {
  modal.classList.add('hidden')
})

// Fechar clicando fora do modal
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden')
  }
})

btnPesquisar.addEventListener('click', consultarAPI)
