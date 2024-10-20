import React from "react";
import { useAppSelector } from "../Redux/Hooks";
import Engine, { EngineT } from "../utils/SequenceEngine";

const Deck: React.FC = () => {
    const deck = useAppSelector((state) => state.Game.shuffledDeck);
    const currentPlayerName = useAppSelector((state) =>
        state.Game.players["player1"].isTurn ? "player1" : "player2"
    );
    const currPlayer = useAppSelector((s) => s.Game.players[currentPlayerName]);

    const isCurrentCardMatches = (card: EngineT.Card) => {
        const sc = currPlayer.selectedCard;
        if (sc) {
            const Matches = Engine.Utils.playerSelectCardMatches(sc, deck);
            return Matches.some((c) => c.id == card.id);
        }
        return false;
    };

    return (
        <div>
            <h3>Deck</h3>
            <div className="deck">
                {deck.map((card) => (
                    <img
                        style={{
                            background: isCurrentCardMatches(card)
                                ? "red"
                                : "transparent",
                            padding: "10px",
                            ...Engine.Utils.getImageRatio(.2)
                        }}
                        key={card.id}
                        src={`/cards/${card.img}`}
                        alt={`Card ${card.id}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Deck;
