import { FC, useState } from "react";
import PlayerHand from "./components/PlayerHand";
import Board from "./components/Board";
import "./sass/global.scss";
import { Sequence } from "./utils/Sequence";
import { EngineT } from "./utils/SequenceEngine";

const _gameEngine = new Sequence();
const calculate2DScoreAndWinner = (game: EngineT.Game) => {
    // Convert the cards into a 2D array for easy traversal
    const board = Array.from({ length: 10 }, (_, rowIndex) =>
        game.cards.slice(rowIndex * 10, rowIndex * 10 + 10)
    );

    const playerScores: { [S in string]: number } = { player1: 0, player2: 0 };

    // Function to calculate sequences in a 1D array (like a row or column)
    const calculateSequenceScore = (sequence: EngineT.BoardCard[]) => {
        let currentPlayer: string = "";
        let currentStreak = 0;

        for (const card of sequence) {
            if (card.isChipped && card.player === currentPlayer) {
                currentStreak++;
            } else if (card.isChipped) {
                // End current streak, add points if 3+ sequence
                if (currentStreak >= 3) {
                    playerScores[currentPlayer] += currentStreak;
                }
                // Start a new streak
                currentPlayer = card.player;
                currentStreak = 1;
            } else {
                // End current streak if unchipped card is encountered
                if (currentStreak >= 3) {
                    playerScores[currentPlayer!] += currentStreak;
                }
                currentPlayer = "";
                currentStreak = 0;
            }
        }
        // Add points for any remaining streak
        if (currentStreak >= 3) {
            playerScores[currentPlayer!] += currentStreak;
        }
    };

    // Check rows and columns
    for (let i = 0; i < 10; i++) {
        // Check row i
        calculateSequenceScore(board[i]);
        // Check column i
        calculateSequenceScore(board.map((row) => row[i]));
    }

    // Check diagonals
    const getDiagonal = (
        startRow: number,
        startCol: number,
        direction: 1 | -1
    ) => {
        const diagonal = [];
        for (let i = 0; i < 10; i++) {
            const row = startRow + i;
            const col = startCol + i * direction;
            if (row >= 0 && row < 10 && col >= 0 && col < 10) {
                diagonal.push(board[row][col]);
            }
        }
        return diagonal;
    };

    // Main diagonals (top-left to bottom-right and top-right to bottom-left)
    calculateSequenceScore(getDiagonal(0, 0, 1)); // Main diagonal from top-left
    calculateSequenceScore(getDiagonal(0, 9, -1)); // Main diagonal from top-right

    // Secondary diagonals (excluding the main diagonals)
    for (let i = 1; i < 10 - 3; i++) {
        calculateSequenceScore(getDiagonal(i, 0, 1)); // From left side
        calculateSequenceScore(getDiagonal(0, i, 1)); // From top side
        calculateSequenceScore(getDiagonal(i, 9, -1)); // From right side
        calculateSequenceScore(getDiagonal(0, 9 - i, -1)); // From top side to bottom-left
    }

    // Determine the winner
    const winner =
        playerScores.player1 > playerScores.player2
            ? "player1"
            : playerScores.player2 > playerScores.player1
            ? "player2"
            : "tie";

    return `
        Scores: Player 1 = ${playerScores.player1}, Player 2 = ${playerScores.player2}
        Winner: ${winner}
    `
};

const App: FC = () => {
    const [_, setCount] = useState(0);
    
    return (
        <div onClick={() => setCount((p) => p + 1)}>
            <h1>
                Card Game : Cards Left in Deck:{" "}
                {_gameEngine.game.shuffledDeck.length}
            </h1>
            <h2>
                {calculate2DScoreAndWinner(_gameEngine.game)}
            </h2>
            <div className="game-board">
                <PlayerHand
                    playerId="player1"
                    engine={_gameEngine}
                    player={_gameEngine.game.players["player1"]}
                />
                <Board engine={_gameEngine} />
                <PlayerHand
                    playerId="player2"
                    engine={_gameEngine}
                    player={_gameEngine.game.players["player2"]}
                />
            </div>
        </div>
    );
};

export default App;
