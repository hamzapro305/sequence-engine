import { FC } from "react";
import PlayerHand from "./components/PlayerHand";
import Board from "./components/Board";
import { useAppSelector } from "./Redux/Hooks";
import "./sass/global.scss";

const App: FC = () => {
    const Deck = useAppSelector((s) => s.Game.shuffledDeck);
    return (
        <div>
            <h1>Card Game : Cards Left in Deck: {Deck.length}</h1>
            <div className="game-board">
                <PlayerHand playerId="player1" />
                <Board />
                <PlayerHand playerId="player2" />
            </div>
        </div>
    );
};

export default App;
