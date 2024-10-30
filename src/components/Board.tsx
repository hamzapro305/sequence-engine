import { FC } from "react";
import Engine, { EngineT } from "../utils/SequenceEngine";
import { Sequence } from "../utils/Sequence";

type BoardT = {
    engine: Sequence;
};
const Board: FC<BoardT> = ({ engine }) => {
    const BoardCards = engine.game.cards;
    return (
        <div
            className="board"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, calc(72px + 20px))",
            }}
        >
            {BoardCards.map((card) => (
                <CardItem key={card.id} card={card} engine={engine} />
            ))}
        </div>
    );
};

const CardItem: FC<{ card: EngineT.BoardCard; engine: Sequence }> = ({
    card,
    engine,
}) => {
    const [id, currPlayer] = engine.getCurrPlayer();
    const isCurrentCardMatches = () => {
        if (currPlayer.selectedCard) {
            return Sequence.isCurrentCardMatches(
                card,
                currPlayer.selectedCard,
                engine.game.cards
            );
        }
        return false;
    };
    const onSelectCard = () => {
        if (
            currPlayer.selectedCard &&
            Sequence.checkIsValidMove(currPlayer.selectedCard, card)
        ) {
            engine.move(id, card);
        }
    };
    return (
        <div className="card">
            {card.isChipped && <div className={`chip ${card.player}`} />}
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
