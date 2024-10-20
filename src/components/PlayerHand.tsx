import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../Redux/Hooks";
import { GameSliceActions } from "../Redux/slices/GameSlice";
import Engine from "../utils/SequenceEngine";

interface PlayerHandProps {
    playerId: string;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ playerId }) => {
    const player = useAppSelector((state) => state.Game.players[playerId]);
    const dispatch = useDispatch();

    const handleCardClick = (cardId: number) => {
        if (player.isTurn) {
            dispatch(
                GameSliceActions.selectCard({
                    playerId,
                    selectedCardId: cardId,
                })
            );
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
