import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAnime = createAsyncThunk(
  "anime/fetchById",
  async (value, { rejectWithValue }) => {
    const { page, search } = value;
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/characters?page=${page}&limit=${15}&q=${search}&order_by=favorites&sort=desc`
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
