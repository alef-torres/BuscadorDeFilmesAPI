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
      inputFilmeNome.value = ''
      return
    }

    console.log(dados)
    filmes.push(dados)

    const cardFilme = document.createElement('div')
    cardFilme.className = 'card-filme'
    cardFilme.innerHTML = `<img src="${dados.Poster}" alt="Pôster de ${dados.Title}">`

    const cardFilmeConteudo = document.createElement('div')
    cardFilmeConteudo.className = 'card-filme-conteudo'

    const btnDetalhes = document.createElement('button')
    btnDetalhes.className = 'btn-detalhes'
    btnDetalhes.textContent = 'Mais detalhes'

    const btnRemover = document.createElement('button')
    btnRemover.className = 'botao-remover'
    btnRemover.innerHTML = '<img src="x.png" alt=""></img>'
    btnRemover.addEventListener('click', apagarConteudo)

    function apagarConteudo() {
      filmes = filmes.filter(filme => filme.Title !== dados.Title)
      cardFilme.remove()
    }

    const btnsContainer = document.createElement('div')
    btnsContainer.className = 'card-filme-conteudo-btns'
    btnsContainer.appendChild(btnDetalhes)
    btnsContainer.appendChild(btnRemover)

    cardFilmeConteudo.innerHTML = `
      <h2>${dados.Title}</h2>
      <span>Ano: ${dados.Year}</span>
      <span>Gênero: ${dados.Genre}</span>
      <span>Lançamento: ${dados.Released}</span>
      <span>Duração: ${dados.Runtime}</span>
      <span>Crítica: ${dados.imdbRating}</span>
`

    cardFilmeConteudo.appendChild(btnsContainer)

    cardFilme.appendChild(cardFilmeConteudo)
    cartazesFilmes.appendChild(cardFilme)

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
    <p><strong>Sinopse:</strong> ${dados.Plot}</p>
  `
      modal.classList.remove('hidden')
    })


  } catch (error) {
    console.log('Erro ao consultar API:', error)
  }

  inputFilmeNome.value = ''
}

fecharModal.addEventListener('click', () => {
  modal.classList.add('hidden')
})

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden')
  }
})

btnPesquisar.addEventListener('click', consultarAPI)
