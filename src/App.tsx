import { FC } from "react";
import PlayerHand from "./components/PlayerHand";
import Board from "./components/Board";

const App: FC = () => {
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
