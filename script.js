//elementos do html
const html = document.querySelector('html')
const displayTempo = document.querySelector('#timer')
const titulo = document.querySelector('.app__title')
const botaoIniciar = document.querySelector('.app_card-primary-button')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const botoes = document.querySelectorAll('.app__card-button')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iconeIniciarOuPausar = document.querySelector('.app__card-primary-butto-icon')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('/sons/beep.mp3')
const tempoNaTela = document.querySelector('#timer')
musica.loop = true


let tempoDecorridoEmSegundos = 1500
let intervalId = null



musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

//mudança de wallpaper
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade, <br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
               `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
               `
        default:
            break;
    }
}


const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        alert('Tempo finalizado')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervalId) {
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    intervalId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iconeIniciarOuPausar.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervalId)
    iniciarOuPausarBt.textContent = "Começar"
    intervalId = null
    iconeIniciarOuPausar.setAttribute('src', `/imagens/play_arrow.png`)
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()