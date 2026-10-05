const cards = [
    {
        id: 1,
        img: 'images/Eye.svg',
        color: 'violet',
        state: 'unmatched'
    },

    {
        id: 2,
        img: 'images/Eye.svg',
        color: 'violet',
        state: 'unmatched'
        
    },

    {
        id: 3,
        img: 'images/Star.svg',
        color: 'violet',
        state: 'unmatched'
    },

    {
        id: 4,
        img: 'images/Star.svg',
        color: 'violet',
        state: 'unmatched'
    },

    {
        id: 5,
        img: 'images/Smile.svg',
        color: 'violet',
        state: 'unmatched'
    },
    {
        id: 6,
        img: 'images/Smile.svg',
        color: 'violet',
        state: 'unmatched'
    },
    {
        id: 7,
        img: 'images/Image.svg',
        color: 'violet',
        state: 'unmatched'
    },
    {
        id: 8,
        img: 'images/Image.svg',
        color: 'violet',
        state: 'unmatched'
    },
    {
        id: 9,
        img: 'images/Mail.svg',
        color: 'violet',
        state: 'unmatched'
    },
    {
        id: 10,
        img: 'images/Mail.svg',
        color: 'violet',
        state: 'unmatched'
    },
    {
        id: 11,
        img: 'images/Phone.svg',
        color: 'violet',
        state: 'unmatched'
    },
    {
        id: 12,
        img: 'images/Phone.svg',
        color: 'violet',
        state: 'unmatched'
    },
    {
        id: 13,
        img: 'images/Clock.svg',
        color: 'violet',
        state: 'unmatched'
    },
    {
        id: 14,
        img: 'images/Clock.svg',
        color: 'violet',
        state: 'unmatched'
    },
    {
        id: 15,
        img: 'images/Smartphone.svg',
        color: 'violet',
        state: 'unmatched'
    },
    {
        id: 16,
        img: 'images/Smartphone.svg',
        color: 'violet',
        state: 'unmatched'
    },
]

const stats = [];

const statsSorted = stats.sort((a, b) => a.steps - b.steps);





let finalWins = 0;
let finalSteps = 0;

let wins = 0;
let steps = 0;

//Game starts
renderHeader();
generateScores();
init();


//Initialize
function init() {

    shuffle(cards);
    generateCards();
    

}

//Header generation
function renderHeader() {
    const headerUI = document.createElement('header');
    headerUI.style.height = '100px';
    document.body.appendChild(headerUI);
    const newGameBtn = document.createElement('button');
    newGameBtn.classList.add('new-game-btn');
    newGameBtn.addEventListener('click', newGame);   
    newGameBtn.textContent = 'New Game';
    headerUI.appendChild(newGameBtn);


};

//Cards generation
function generateCards() {

    const board = document.createElement('main');
    board.classList.add('board');
    document.body.appendChild(board);

    for (const cardData of cards) {

    const card = document.createElement('article');
    card.dataset.img = cardData.img;
    card.dataset.id = cardData.id;
    card.dataset.state = cardData.state;
    card.classList.add('card');
    card.style.backgroundColor = cardData.color;
    card.style.borderRadius = '50px';
    card.style.border = '2px solid lightgreen';
    card.style.height = '140px';
    card.style.width = '140px';
    card.style.display = 'flex';
    card.style.justifyContent = 'center';
    board.appendChild(card);

    const image = document.createElement('img');
    image.src = `${cardData.img}`;
    image.style.width = '50px';
    card.appendChild(image);
    card.addEventListener('click', showCard);

};}

let firstCard = null;
let secondCard = null;

let isLocked = false;

    function showCard(event) {
        
        const card = event.currentTarget;
        if (isLocked) return;
        if (card.dataset.state == 'matched') return;
        
        if (firstCard == null && secondCard == null) {
            card.classList.add('visible');
            firstCard = card;

        } else if (firstCard && secondCard == null) {
            secondCard = card;
            card.classList.add('visible');
            
            //Cards matched
            if (firstCard.dataset.img == secondCard.dataset.img
                && firstCard.dataset.id != secondCard.dataset.id) {
                firstCard.dataset.state = 'matched';
                secondCard.dataset.state = 'matched';
                firstCard = null;
                secondCard = null;
                steps += 1;
                wins += 1;
                updateScores();

            //Cards didn't match
            } else if (firstCard.dataset.img != secondCard.dataset.img
                && firstCard.dataset.id != secondCard.dataset.id) {
                steps += 1;
                isLocked = true;
                updateScores();
                setTimeout(()=> {
                    isLocked = false;
                    firstCard.classList.remove('visible');
                    secondCard.classList.remove('visible');
                    firstCard = null;
                    secondCard = null;
                }, 700);
                
            //Clicked the same card
            } else if (firstCard != null
                && secondCard.dataset.id == firstCard.dataset.id) {
                    secondCard = null;
                

            }

        } 


    }   

    //Initial scores generatiion
    function generateScores() {
        const winsNum = document.createElement('h2');
        const stepsNum = document.createElement('h2');
        winsNum.id = 'wins-num';
        stepsNum.id = 'steps-num';
        winsNum.textContent = 'Matches: ' + wins;
        stepsNum.textContent = 'Steps: ' + steps;
        document.body.appendChild(winsNum);
        document.body.appendChild(stepsNum);
    }

    //Update scores
    function updateScores() {
        const winsNum = document.getElementById('wins-num');
        const stepsNum = document.getElementById('steps-num');
        winsNum.textContent = 'Matches: ' + wins;
        stepsNum.textContent = 'Steps: ' + steps;
        if (wins == 8) {
            victory();
        }
    }



    function victory() {
    
        const modalDark = document.createElement('div');
        modalDark.classList.add('modal-overlay');
        document.body.appendChild(modalDark);
        const newGameModal = document.createElement('button');
        newGameModal.textContent = 'New Game';

        newGameModal.addEventListener('click', () => {
            newGame();
            modalDark.remove();
        });

        modalDark.appendChild(newGameModal);

        const escButton = document.createElement('button');
        escButton.textContent = 'Close';
        escButton.addEventListener('click', ()=>{
            modalDark.remove();
        })
        escButton.classList.add('esc-button');
        modalDark.appendChild(escButton);

        const victoryText = document.createElement('h1');
        victoryText.textContent = 'YOU WIN!';
        modalDark.appendChild(victoryText);

        let date = new Date;
        date = (date.getDate().toString().padStart(2, '0')) + '.'
        + ((date.getMonth() + 1).toString().padStart(2, '0')) + '.'
        + (date.getFullYear().toString());
        stats.push({steps: steps, date: date});



        /*finalWinsText = document.createElement('h2');
        finalWinsText.textContent = wins;
        finalStepsText = document.createElement('h2');
        finalStepsText.textContent = steps;
        modalDark.appendChild(finalWinsText);
        modalDark.appendChild(finalStepsText);*/



    }

    function newGame() {
        const board = document.querySelector('.board');
        console.log(board);
       board.remove();
       shuffle(cards);
        generateCards();
        wins = 0;
        steps = 0;
        firstCard = null;
        secondCard = null;
        isLocked = false;
        updateScores();
    }





//Shuffle cards

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}