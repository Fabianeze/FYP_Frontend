import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  password: boolean;
}

const initialState: IInitialState = {
  password: true,
};
const passwordSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setPasswordToggle: (state) => {
      state.password = !state.password;
    },
  },
});

export const { setPasswordToggle } = passwordSlice.actions;
export default passwordSlice.reducer;
