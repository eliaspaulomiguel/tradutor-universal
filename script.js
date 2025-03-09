let fromTexto = document.querySelector('#fromTexto')
let toTexto = document.querySelector('#toTexto')
let exchange = document.querySelector('#exchange')
let btntraduzir = document.querySelector('.traduzir')
let btnIcons = document.querySelectorAll('i')
let idiomaOrigem = document.querySelector('#idiomaOrigem')
let idiomaDestino = document.querySelector('#idiomaDestino')

// Lista de idiomas disponíveis (código + nome)
const idiomas = {
    "af": "Africâner",
    "ar": "Árabe",
    "zh-CN": "Chinês (Simplificado)",
    "zh-TW": "Chinês (Tradicional)",
    "cs": "Tcheco",
    "da": "Dinamarquês",
    "nl": "Holandês",
    "en": "Inglês",
    "fr": "Francês",
    "de": "Alemão",
    "el": "Grego",
    "hi": "Hindi",
    "hu": "Húngaro",
    "it": "Italiano",
    "ja": "Japonês",
    "ko": "Coreano",
    "no": "Norueguês",
    "pl": "Polonês",
    "pt": "Português",
    "ro": "Romeno",
    "ru": "Russo",
    "es": "Espanhol",
    "sv": "Sueco",
    "tr": "Turco",
    "uk": "Ucraniano"
};

// Colocar os idiomas dentro da tag select
function preencherSection() {
    for (let codigo in idiomas){
        let opcao = document.createElement('option')
        opcao.value = codigo
        opcao.textContent = idiomas[codigo]
        idiomaOrigem.appendChild(opcao.cloneNode(true))
        idiomaDestino.appendChild(opcao)

        idiomaOrigem.value = 'pt'
        idiomaDestino.value = 'en'
    }
    
}

// Carregar os idiomas juntamente com a pagina
document.addEventListener('DOMContentLoaded', preencherSection)

// Operar ou manipular a Api
function funApi() {
    let idiomaOrigem = document.querySelector('#idiomaOrigem').value
    let idiomaDestino = document.querySelector('#idiomaDestino').value
    if (!fromTexto.value) {
        alert('Digite algo!')
        return 
    }
    if (idiomaOrigem === idiomaDestino) {
        alert('Os idiomas de origem e destino são iguais. Escolha idiomas diferentes!')
        return 
    }
    btntraduzir.innerHTML = 'Traduzindo...'
    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fromTexto.value)}&langpair=${idiomaOrigem}|${idiomaDestino}`
    try{
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            toTexto.value = data.responseData.translatedText
            btntraduzir.innerHTML = 'Traduzir'
        })
    }catch (error) {
        console.error('Erro ao traduzir:', error);
        alert('Ocorreu um erro ao traduzir. Tente novamente.')
    }
}

// Traduzir assim que clicar no botão
btntraduzir.addEventListener('click',funApi)

// botões de controlo (Copiar e som)
btnIcons.forEach((btni) => {
    btni.addEventListener('click', (evt) => {
        let clicado = evt.target
        if (clicado.id == 'from'){
            if(clicado.classList.contains('bx-copy')){
                navigator.clipboard.writeText(fromTexto.value)
            //console.log(clicado)
            }else {
                let utterance = new SpeechSynthesisUtterance(fromTexto.value)
               
                speechSynthesis.speak(utterance)
               // console.log('Clicou no volume do from')
            }
            
        }else {
            if(clicado.classList.contains('bx-copy')){
                navigator.clipboard.writeText(toTexto.value)
            //console.log(clicado)
            }else {
                let utterance = new SpeechSynthesisUtterance(toTexto.value)
                
                speechSynthesis.speak(utterance)
                //console.log('Clicou no volume do to')
            }
        }
        
    })
})

// Trocar os dados da caixa de origem e destino
exchange.addEventListener('click', () => {
    // Alternar o conteudo da caixa
    let from = fromTexto.value
    fromTexto.value = toTexto.value
    toTexto.value = from 

    // Alternar o idioma
    let fromIdioma = idiomaOrigem.value
    idiomaOrigem.value = idiomaDestino.value
    idiomaDestino.value = fromIdioma
})