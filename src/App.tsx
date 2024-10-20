import React from "react";
import PlayerHand from "./components/PlayerHand";
import Deck from "./components/Deck";
import Board from "./components/Board";

const App: React.FC = () => {
    return (
        <div>
            <h1>Card Game</h1>
            <div className="game-board">
                <PlayerHand playerId="player1" />
                <Board />
                <PlayerHand playerId="player2" />
            </div>
        </div>
    );
};

export default App;
