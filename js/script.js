const cardsContainer = document.querySelector('.cards-container');
const cardBackImage = './img/back.png'; // Замініть шлях до зображення рубашки картки

const cardImages = [
    './img/ace.png', 
    './img/2.png', 
    './img/3.png', 
    './img/4.png', 
    './img/5.png', 
    './img/6.png', 
    './img/7.png', 
    './img/8.png', 
    './img/9.png', 
    './img/10.png', 
    './img/jack.png', 
    './img/queen.png', 
    './img/king.png' ,
    './img/joker.png'

];

const imagesLinkArray = cardImages.concat(cardImages).map((image, index) => ({
    id: index + 1,
    image: image,
    newAlt: `Card ${index % 13 + 1}`
}));

const generateCards = () => {
    imagesLinkArray.sort(() => Math.random() - 0.5);
    imagesLinkArray.forEach(({ id, image, newAlt }) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="card-inner">
                <img src="${cardBackImage}" class="outline-image">
                <img id="${id}" src="${image}" alt="${newAlt}" class="card-image">
            </div>
        `;
        cardsContainer.appendChild(cardElement);
    });
};

const initializeGame = () => {
    cardsContainer.innerHTML = '';
    generateCards();

    const cards = document.querySelectorAll('.card');
    const movesDisplay = document.querySelector('.move-counter');
    let toggledCardsArray = [];
    let move = 0;
    let winCount = 0;

    cards.forEach(card => {
        card.addEventListener('click', function () {
            if (!this.classList.contains("toggled") && toggledCardsArray.length < 2) {
                this.classList.add("toggled");
                toggledCardsArray.push(this);

                if (toggledCardsArray.length === 2) {
                    move++;
                    movesDisplay.innerText = `Moves: ${move}`;
                    setTimeout(() => {
                        const [firstCard, secondCard] = toggledCardsArray;
                        const firstImage = firstCard.querySelector('.card-image').src;
                        const secondImage = secondCard.querySelector('.card-image').src;

                        if (firstImage === secondImage) {
                            firstCard.classList.add("matched");
                            secondCard.classList.add("matched");
                            winCount++;
                        } else {
                            firstCard.classList.remove("toggled");
                            secondCard.classList.remove("toggled");
                        }

                        toggledCardsArray = [];

                        if (winCount === cardImages.length) {
                            document.getElementById('dynamic-cards').style.display = 'none';
                            document.getElementById('win-message').style.display = 'block';
                            document.getElementById('win-moves').innerText = `You won the game in ${move} moves.`;
                        }
                    }, 500); // Зменшено час затримки до 500 мс
                }
            }
        });
    });
};

const resetGame = () => {
    document.getElementById('dynamic-cards').style.display = 'block';
    document.getElementById('win-message').style.display = 'none';
    initializeGame();
};

document.getElementById('restart').addEventListener('click', resetGame);
document.getElementById('play-again').addEventListener('click', resetGame);

initializeGame();