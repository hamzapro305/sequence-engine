import AllCards from "./AllCards";

export type Card = {
    id: number;
    img: string;
    matches: number[];
};

const Utils = {
    playerSelectCardMatches: (selectedCard: Card, deck: Card[]): Card[] => {
        return deck.filter((card) => selectedCard.matches.includes(card.id));
    },
    getImageRatio: (mul: number) => {
        return { width: 240 * mul, height: 360 * mul }
    },
    isCurrentCardMatches: (card: BoardCard, selectedCard: Card, BoardCards: BoardCard[]) => {
        if (selectedCard) {
            const Matches = Utils.playerSelectCardMatches(
                selectedCard,
                BoardCards
            );
            return Matches.some((c) => c.id == card.id);
        }
        return false;
    },
    checkIsValidMove: (selectedCard: Card, boardSelectedCard: BoardCard) => {
        if (boardSelectedCard.isChipped) {
            console.log("Alredy Chipped")
            return
        }
        else if (!selectedCard.matches.includes(boardSelectedCard.id)) {
            console.log("Not valid Move")
            return
        } else {
            console.log("Valid Move")
            return true
        }

    }
}

const shuffleDeck = (cards: Card[]) => {
    let shuffledCards = cards.slice();
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    return shuffledCards;
}


type Player = {
    hand: Card[]
    isTurn: boolean
    name: string | null
    selectedCard: Card | null
}
export type BoardCard = Card & (
    {
        isChipped: false
    } | {
        isChipped: true
        player: string
    }
)

export type Game = {
    players: {
        [s: string]: Player
    }
    scores: {
        red: number,
        blue: number,
    },
    shuffledDeck: Card[],
    cards: BoardCard[],
    protectedPatterns: number[],
}
const initializeGame = (): Game => {
    let cards = AllCards.slice()
    const initialDeck = shuffleDeck(
        cards.filter((card) => ![1, 10, 91, 100].includes(card.id))
    );
    const player1InitialHand = initialDeck.slice(0, 5);
    const player2InitialHand = initialDeck.slice(5, 10);
    const remainingDeck = initialDeck.slice(10);

    let games = {
        players: {
            player1: { hand: player1InitialHand, isTurn: true, name: null, selectedCard: null },
            player2: { hand: player2InitialHand, isTurn: false, name: null, selectedCard: null },
        },
        scores: {
            red: 0,
            blue: 0,
        },
        shuffledDeck: remainingDeck,
        cards: AllCards.slice(0, 100).map(card => ({ ...card, isChipped: false })) as BoardCard[],
        protectedPatterns: [],
    };
    return games;
}


const Engine = {
    initializeGame,
    shuffleDeck,
    Utils
}

export default Engine
