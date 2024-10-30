import React from "react";
import Engine, { EngineT } from "../utils/SequenceEngine";
import { Sequence } from "../utils/Sequence";

interface PlayerHandProps {
    player: EngineT.Player;
    playerId: string;
    engine: Sequence;
}

const PlayerHand: React.FC<PlayerHandProps> = ({
    player,
    engine,
    playerId,
}) => {
    const handleCardClick = (cardId: number) => {
        if (player.isTurn) {
            engine.selectCard(playerId, cardId);
        }
    };

    return (
        <div>
            <h3>{playerId}'s Hand</h3>
            <div className="hand">
                {player.hand.map((card) => (
                    <img
                        key={card.id}
                        src={`/cards/${card.img}`}
                        alt={`Card ${card.id}`}
                        style={{
                            ...Engine.Utils.getImageRatio(0.3),
                        }}
                        onClick={() => handleCardClick(card.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PlayerHand;
