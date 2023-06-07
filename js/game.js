/*Global Variables*/
const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star")
let starsList = document.querySelectorAll(".stars li")

/*Function array take cards*/ 
const characters = [  
   'beth',
   'jerry',
   'jessica',
   'morty',
   'pessoa-passaro',
   'pickle-rick',
   'rick',
   'summer',
   'meeseeks',
   'scroopy',
]

const createElement = (tag, className) => {
   const element = document.createElement(tag)
   element.className = className
   return element
}

let firstCard = ''
let secondCard = ''

/*Function verify end game */
const checkEndGame = () => {
  const disableCards = document.querySelectorAll('.disable-card')

  if (disableCards.length == 20) {
    clearInterval(this.loop)
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`)
  }
}

/*Function verify cards game */
const checkCards = () => {
   const firstCharacter = firstCard.getAttribute('data-character')
   const secondCharacter = secondCard.getAttribute('data-character')

   if (firstCharacter == secondCharacter) {

      firstCard.firstChild.classList.add('disable-card')
      secondCard.firstChild.classList.add('disable-card')

        firstCard = ''
        secondCard = ''

        checkEndGame()

   } else {
    setTimeout(() => {
        firstCard.classList.remove('reveal-card')
        secondCard.classList.remove('reveal-card')

        firstCard = ''
        secondCard = ''
    }, 600)
   }

}

/*Function reveal card */
const revealCard = ({target}) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return
  }

  if(firstCard == "" && !target.parentNode.className.includes("grid")){
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
    console.log(target.parentNode)
}else if(secondCard === "" && !target.parentNode.className.includes("grid")){
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;
    console.log(target.parentNode)

    checkCards();

  }

}

/*Function create cards */
const createCard = (character) => {

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url(../images/${character}.png)`

    card.appendChild(front)
    card.appendChild(back)
    
   card.addEventListener('click', revealCard)
   card.setAttribute('data-character', character)

   return card
}

/*Function Load Cards  */

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters] /*Function duplicate array cards */

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5) /*Function random array cards */

    shuffledArray.forEach((character) => {
        const card = createCard(character)
        grid.appendChild(card)
       
    })
}

/*Function load time game */
const startTimer = () => {
 this.loop = setInterval(() => {
    const currentTimer = +timer.innerHTML
    timer.innerHTML = currentTimer + 1
  }, 1000)
}

/*Load game */
window.onload = () => {
  spanPlayer.innerHTML  = localStorage.getItem('player')
  startTimer()
  loadGame()
}

