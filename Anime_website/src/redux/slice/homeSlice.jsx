import { createSlice } from "@reduxjs/toolkit"
import { fetchAnime } from "../action/fetchAnimeAction";

// Define the initial state for the slice
const initialState = {
    data: null,
    isLoading: false,
    error: null,
  };

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        // Handle the pending state of the fetchAnime
        builder.addCase(fetchAnime.pending, (state) => {
          state.isLoading = true;
        });
        // Handle the fulfilled state of the fetchAnime
        builder.addCase(fetchAnime.fulfilled, (state, action) => {
          state.data = action.payload;
          state.isLoading = false;
        });
         // Handle the rejected state of the fetchAnime
        builder.addCase(fetchAnime.rejected, (state, action) => {
          state.data = action.payload;
          state.isLoading = false;
        });
       
      }
})

export default homeSlice.reducer