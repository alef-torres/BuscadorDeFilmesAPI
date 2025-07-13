const inputFilmeNome = document.getElementById('caixaPesquisaNome')
const cartazesFilmes = document.getElementById('cards-filmes')
const btnPesquisar = document.getElementById('buscar')
const modal = document.getElementById('modal')
const modalBody = document.getElementById('modal-body')
const fecharModal = document.getElementById('fechar-modal')

async function consultarAPI() {
  const nomeFilme = inputFilmeNome.value.trim().replace(/\s+/g, '+')
  const URL = `http://www.omdbapi.com/?apikey=909dc5cb&t=${nomeFilme}`

  try {
    const resp = await fetch(URL)
    const dados = await resp.json() //essa constante contem todos os dados do filme pesquisado

    if (dados.Response === 'False') {
      cartazesFilmes.innerHTML = '<p>Filme não encontrado.</p>'
      return
    }

    const cardFilme = document.createElement('div')
    cardFilme.className = 'card-filme'
    cardFilme.innerHTML = ` 
      <img src="${dados.Poster}" alt="Pôster de ${dados.Title}">
      <h2>${dados.Title}</h2>
      <span>${dados.Year}</span>
      <p>${dados.Plot}</p>
      <button class="btn-detalhes">Mais detalhes</button>
    `
    cartazesFilmes.appendChild(cardFilme)

    // Evento do botão "Mais detalhes"
    const btnDetalhes = cardFilme.querySelector('.btn-detalhes')
    btnDetalhes.addEventListener('click', () => {
      modalBody.innerHTML = `
        <h2>${dados.Title}</h2>
        <p><strong>Diretor:</strong> ${dados.Director}</p>
        <p><strong>Roteiro:</strong> ${dados.Writer}</p>
        <p><strong>Atores:</strong> ${dados.Actors}</p>
        <p><strong>Gênero:</strong> ${dados.Genre}</p>
        <p><strong>Lançamento:</strong> ${dados.Released}</p>
        <p><strong>Duração:</strong> ${dados.Runtime}</p>
        <p><strong>Idioma:</strong> ${dados.Language}</p>
        <p><strong>País:</strong> ${dados.Country}</p>
        <p><strong>Nota IMDb:</strong> ${dados.imdbRating}</p>
        <p><strong>Votos:</strong> ${dados.imdbVotes}</p>
        <p><strong>Premiações:</strong> ${dados.Awards}</p>
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
