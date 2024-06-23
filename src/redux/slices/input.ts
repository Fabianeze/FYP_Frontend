import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  input: string;
}
const initialState: IInitialState = {
  input: "",
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    handleInput: (state, action) => {
      state.input = action.payload;
    },
    clearInput: (state) => {
      state.input = "";
    },
  },
});

export const { handleInput, clearInput } = inputSlice.actions;
export default inputSlice.reducer;
