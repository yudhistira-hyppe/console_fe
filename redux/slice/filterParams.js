import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: {} };

const filterParamsSlice = createSlice({
  name: 'filterParams',
  initialState,
  reducers: {
    saveParams: (state, action) => {
      state.value = action.payload;
    },
    clearParams: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { saveParams, clearParams } = filterParamsSlice.actions;
export default filterParamsSlice.reducer;
