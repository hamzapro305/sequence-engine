import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Engine, { EngineT } from "../../utils/SequenceEngine";
import AllCards from "../../utils/AllCards";

const initialState: EngineT.Game = Engine.initializeGame();

export const Slice = createSlice({
    name: "Game",
    initialState,
    reducers: {
        selectCard: (
            state,
            action: PayloadAction<{
                playerId: string;
                selectedCardId: number | null;
            }>
        ) => {
            const { playerId, selectedCardId } = action.payload;
            const player = state.players[playerId];
            const selectedCard = player.hand.find(
                (card) => card.id === selectedCardId
            );
            player.selectedCard = selectedCard ?? null;
        },
        doMove: (
            state,
            action: PayloadAction<{
                playerId: string;
                boardCard: EngineT.BoardCard;
            }>
        ) => {
            const { playerId, boardCard } = action.payload;
            const player = state.players[playerId];
            const { selectedCard, hand } = player;

            if (!selectedCard) return;

            // Find indices of the selected card in the hand and board card on the board
            const indexInPlayerHand = hand.findIndex(
                (card) => card.id === selectedCard.id
            );
            const indexInBoard = state.cards.findIndex(
                (card) => card.id === boardCard.id
            );

            if (
                indexInBoard === -1 ||
                indexInPlayerHand === -1 ||
                state.shuffledDeck.length === 0
            )
                return;

            // Replace the selected card in player's hand with the last card from the shuffled deck
            hand[indexInPlayerHand] = state.shuffledDeck.pop()!;

            // Move the selected card to the garbage
            state.garbage.push(selectedCard);

            // Update the board card to mark it as chipped
            state.cards[indexInBoard] = {
                ...AllCards[indexInBoard],
                isChipped: true,
                player: playerId,
            };

            // Clear the player's selected card
            player.selectedCard = null;

            player.isTurn = false;
            state.players[playerId == "player1" ? "player2" : "player1"].isTurn = true

            console.log("Move Done");
        },
    },
});

// Action creators are generated for each case reducer function
export const GameSliceActions = Slice.actions;

export default Slice.reducer;
