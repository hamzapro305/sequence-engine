import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Engine, { Game } from "../../utils/SequenceEngine";

const initialState: Game = Engine.initializeGame()

export const Slice = createSlice({
    name: "Game",
    initialState,
    reducers: {
        selectCard(state, action: PayloadAction<{ playerId: string; selectedCardId: number | null }>) {
            const { playerId, selectedCardId } = action.payload;
            const player = state.players[playerId];
            const selectedCard = player.hand.find((card) => card.id === selectedCardId);
            player.selectedCard = selectedCard ?? null
        },
    }

});

// Action creators are generated for each case reducer function
export const GameSliceActions = Slice.actions;

export default Slice.reducer;
