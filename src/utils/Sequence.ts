import AllCards from "./AllCards";


export namespace EngineT {
    export type Card = {
        id: number;
        img: string;
        matches: number[];
    };
    export type Player = {
        hand: Card[];
        isTurn: boolean;
        name: string | null;
        selectedCard: Card | null;
    };
    export type BoardCard = Card &
        (
            | {
                isChipped: false;
            }
            | {
                isChipped: true;
                player: string;
            }
        );
    export type Game = {
        players: {
            [s: string]: Player;
        };
        scores: {
            red: number;
            blue: number;
        };
        shuffledDeck: Card[];
        garbage: Card[];
        cards: BoardCard[];
        protectedPatterns: number[];
    };
}

export class Sequence {

    public game: EngineT.Game;

    constructor() {
        this.game = this.initializeGame()
    }

    public static isGameEnd = () => {

    }

    public getCurrPlayer = (): [string, EngineT.Player] => {
        const currentPlayerName = this.game.players["player1"].isTurn ? "player1" : "player2"
        const currPlayer = this.game.players[currentPlayerName]
        return [currentPlayerName, currPlayer];
    }

    public selectCard = (playerId: string, selectedCardId: number | null) => {
        const player = this.game.players[playerId];
        const selectedCard = player.hand.find(
            (card) => card.id === selectedCardId
        );
        this.game.players[playerId].selectedCard = selectedCard ?? null;
    }

    public move = (playerId: string, boardCard: EngineT.BoardCard) => {
        const player = this.game.players[playerId];
        const { selectedCard, hand } = player;

        if (!selectedCard) return;

        // Find indices of the selected card in the hand and board card on the board
        const indexInPlayerHand = hand.findIndex(
            (card) => card.id === selectedCard.id
        );
        const indexInBoard = this.game.cards.findIndex(
            (card) => card.id === boardCard.id
        );

        if (
            indexInBoard === -1 ||
            indexInPlayerHand === -1 ||
            this.game.shuffledDeck.length === 0
        )
            return;

        // Replace the selected card in player's hand with the last card from the shuffled deck
        hand[indexInPlayerHand] = this.game.shuffledDeck.pop()!;

        // Move the selected card to the garbage
        this.game.garbage.push(selectedCard);

        // Update the board card to mark it as chipped
        this.game.cards[indexInBoard] = {
            ...AllCards[indexInBoard],
            isChipped: true,
            player: playerId,
        };

        // Clear the player's selected card
        player.selectedCard = null;

        player.isTurn = false;
        this.game.players[playerId == "player1" ? "player2" : "player1"].isTurn = true

        console.log("Move Done");
    }

    private static shuffleDeck = (cards: EngineT.Card[]) => {
        let shuffledCards = cards.slice();
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [
                shuffledCards[j],
                shuffledCards[i],
            ];
        }
        return shuffledCards;
    };

    public static checkIsValidMove = (
        selectedCard: EngineT.Card,
        boardSelectedCard: EngineT.BoardCard
    ) => {
        if (!selectedCard.matches.includes(boardSelectedCard.id)) {
            console.log("Not valid Move");
            return false;
        } else if (boardSelectedCard.isChipped) {
            console.log("Alredy Chipped");
            return false;
        } else {
            console.log("Valid Move");
            return true;
        }
    }

    public static playerSelectCardMatches = (
        selectedCard: EngineT.Card,
        deck: EngineT.Card[]
    ): EngineT.Card[] => {
        return deck.filter((card) => selectedCard.matches.includes(card.id));
    }

    public static isCurrentCardMatches = (
        card: EngineT.BoardCard,
        selectedCard: EngineT.Card,
        BoardCards: EngineT.BoardCard[]
    ) => {
        if (selectedCard) {
            const Matches = Sequence.playerSelectCardMatches(
                selectedCard,
                BoardCards
            );
            return Matches.some((c) => c.id == card.id);
        }
        return false;
    }


    private initializeGame = (): EngineT.Game => {
        let cards = AllCards.slice();
        const initialDeck = Sequence.shuffleDeck(
            cards.filter((card) => ![1, 10, 91, 100].includes(card.id))
        );
        const player1InitialHand = initialDeck.slice(0, 5);
        const player2InitialHand = initialDeck.slice(5, 10);
        const remainingDeck = initialDeck.slice(10);

        let games = {
            players: {
                player1: {
                    hand: player1InitialHand,
                    isTurn: true,
                    name: null,
                    selectedCard: null,
                },
                player2: {
                    hand: player2InitialHand,
                    isTurn: false,
                    name: null,
                    selectedCard: null,
                },
            },
            scores: {
                red: 0,
                blue: 0,
            },
            shuffledDeck: remainingDeck,
            garbage: [],
            cards: AllCards.slice(0, 100).map((card) => ({
                ...card,
                isChipped: false,
            })) as EngineT.BoardCard[],
            protectedPatterns: [],
        };
        return games;
    };
}