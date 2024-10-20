import { FC } from "react";
import { useAppSelector } from "../Redux/Hooks";
import Engine, { BoardCard } from "../utils/SequenceEngine";

const useCurrPlayer = () => {
    const currentPlayerName = useAppSelector((state) =>
        state.Game.players["player1"].isTurn ? "player1" : "player2"
    );
    const currPlayer = useAppSelector((s) => s.Game.players[currentPlayerName]);

    return currPlayer;
};

const Board = () => {
    const BoardCards = useAppSelector((s) => s.Game.cards);
    return (
        <div
            className="board"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, calc(72px + 20px))",
            }}
        >
            {BoardCards.map((card) => (
                <CardItem key={card.id} card={card} />
            ))}
        </div>
    );
};

const CardItem: FC<{ card: BoardCard }> = ({ card }) => {
    const BoardCards = useAppSelector((s) => s.Game.cards);
    const currPlayer = useCurrPlayer();
    const isCurrentCardMatches = () => {
        if (currPlayer.selectedCard) {
            return Engine.Utils.isCurrentCardMatches(
                card,
                currPlayer.selectedCard,
                BoardCards
            );
        }
        return false;
    };
    const onSelectCard = () => {
        if (currPlayer.selectedCard) {
            Engine.Utils.checkIsValidMove(currPlayer.selectedCard, card)
        }
    };
    return (
        <div className="card">
            <img
                src={`/cards/${card.img}`}
                style={{
                    background: isCurrentCardMatches() ? "red" : "transparent",
                    padding: 10,
                    ...Engine.Utils.getImageRatio(0.3),
                }}
                onClick={onSelectCard}
                alt="card"
            />
        </div>
    );
};

export default Board;