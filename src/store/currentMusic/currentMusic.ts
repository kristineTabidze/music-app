import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CurrentMusicState = {
  currentMusicIndex: number;
};

const initialState: CurrentMusicState = {
  currentMusicIndex: 0,
};

export const currentMusicSlice = createSlice({
  name: "changeCurrentMusic",
  initialState,
  reducers: {
    changeCurrentMusic: (state, action: PayloadAction<CurrentMusicState>) => {
      state.currentMusicIndex = action.payload.currentMusicIndex;
    },
  },
});
export const { changeCurrentMusic } = currentMusicSlice.actions;

export const selectCurrentMusic = (state: RootState) => state.currentMusic;

export default currentMusicSlice.reducer;
