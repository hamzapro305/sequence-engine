import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../Redux/Hooks";
import Engine, { Card } from "../utils/SequenceEngine";

const Deck: React.FC = () => {
    const deck = useAppSelector((state) => state.Game.shuffledDeck);
    const currentPlayerName = useAppSelector((state) =>
        state.Game.players["player1"].isTurn ? "player1" : "player2"
    );
    const currPlayer = useAppSelector((s) => s.Game.players[currentPlayerName]);
    const dispatch = useDispatch();

    const handleCardClick = (deckCardId: number) => {
        const selectedCardId = currPlayer.selectedCard;
        if (selectedCardId) {
            // dispatch(
            //     matchCard({
            //         playerId: currentPlayer,
            //         selectedCardId,
            //         deckCardId,
            //     })
            // );
        }
    };

    const isCurrentCardMatches = (card: Card) => {
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
                        onClick={() => handleCardClick(card.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Deck;
