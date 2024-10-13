import AllCards from "./AllCards"

const Cards = AllCards
export type Card = {
    id: number;
    img: string;
    matches: number[];
};

const shuffleDeck = (cards: Card[]) => {
    let shuffledCards = cards.slice();
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    return shuffledCards;
}

type PlayerNumber = "player1" | "player2"
type Player = {
    hand: Card[], isTurn: boolean, socketId: string | null, name: string | null
}
type Game = {
    players: {
        player1: Player
        player2: Player
    }
    scores: {
        red: number,
        blue: number,
    },
    shuffledDeck: Card[],
    cards: Card[],
    protectedPatterns: number[],
}
const initializeGame = (cards: Card[]): Game => {
    const initialDeck = shuffleDeck(
        cards.filter((card) => ![1, 10, 91, 100].includes(card.id))
    );
    const player1InitialHand = initialDeck.slice(0, 5);
    const player2InitialHand = initialDeck.slice(5, 10);
    const remainingDeck = initialDeck.slice(10);

    let games = {
        players: {
            player1: { hand: player1InitialHand, isTurn: true, socketId: null, name: null },
            player2: { hand: player2InitialHand, isTurn: false, socketId: null, name: null },
        },
        scores: {
            red: 0,
            blue: 0,
        },
        shuffledDeck: remainingDeck,
        cards: [],
        protectedPatterns: [],
    };
    return games;
}

const handleCardSelection = (
    game: Game,
    cardId: number,
    shuffledDeck: Card[],
    cards: Card[],
    currentTurn: PlayerNumber,
    selectedCard: number
) => {
    let cardIndex = cardId - 1; // cardId starts from 1 and maps directly to the index by subtracting 1
    let currentPlayer: PlayerNumber = currentTurn === 'player1' ? 'player1' : 'player2';
    let nextPlayer: PlayerNumber = currentPlayer === 'player1' ? 'player2' : 'player1';
    let playerHand = game.players[currentPlayer].hand;
    let cardInQuestion = game.cards[cardIndex];

    const isCardProtected = (cardIndex: number, protectedPatterns: number[]) => {
        return protectedPatterns.includes(cardIndex);
    }

    if (selectedCard > 100 && selectedCard <= 104) {
        cardInQuestion.selected = true;
        cardInQuestion.selectedby = currentPlayer == "player1" ? "blue" : "red";
    }
    else if (selectedCard > 104 && selectedCard <= 108 && cardInQuestion.selected === true) {
        if (!isCardProtected(cardInQuestion.id, game.protectedPatterns)) {
            cardInQuestion.selected = false;
            cardInQuestion.selectedby = "";
        }
        else {
            return { success: false, message: "Wrong move: Card is protected." };
        }
    }
    else {
        cardInQuestion.selected = true;
        cardInQuestion.selectedby = currentPlayer == "player1" ? "blue" : "red";
    }

    let indexToRemove = playerHand.findIndex(
        (card) => card.id === cardId || (selectedCard > 100 && selectedCard < 109 && card.id === selectedCard) || (card.matches && card.matches.includes(cardId))
    );
    playerHand.splice(indexToRemove, 1);
    if (shuffledDeck.length > 0) {
        let newCard = shuffledDeck.shift();
        if (newCard) playerHand.push(newCard);
    }

    game.players[currentPlayer].isTurn = false;
    game.players[nextPlayer].isTurn = true;
    game.players[currentPlayer].hand = playerHand;

    return { success: true, game, shuffledDeck, cards, currentPlayer, nextPlayer, playerHand }
}

const onDropCard = (cardId: number, selectCard: number, card: Card) => {
    let card_matches = card.matches;
    let validMove = false;
    if (selectCard > 100 && selectCard <= 104 && ![1, 10, 91, 100].includes(cardId) && !card.selected) {
        validMove = true;
    } else if (selectCard > 104 && selectCard <= 108 && card.selected) {
        validMove = true;
    } else if (card_matches.includes(selectCard) && !card.selected) {
        validMove = true;
    } return validMove
}

const Engine = {
    initializeGame,
    shuffleDeck,
    onDropCard
}

export default Engine
