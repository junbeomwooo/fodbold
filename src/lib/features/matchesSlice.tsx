import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const url = "https://v3.football.api-sports.io";

export const getList = createAsyncThunk(
  "matchesSlice/getList",
  async (
    {
      leagueID,
      season,
      fromDate,
      toDate,
      timezone,
    }: {
      leagueID: number;
      season: number;
      fromDate: string;
      toDate: string;
      timezone: string;
    },
    { rejectWithValue }:any
  ) => {
    let result = null;
    try {
      const response = await axios.get(
        `${url}/fixtures?league=${leagueID}&season=${season}&from=${fromDate}&to=${toDate}&timezone=${timezone}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );

      result = response.data
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getList Error");
      result = rejectWithValue(axiosErr);

      console.groupEnd();
    }
    return result;
  }
);

export const matchesSlice = createSlice({
  name: "matchesSlice",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    // 현재 상태값 불러오기
    getCurrentData: (state) => {
      return state;
    },
    // 현재 값을 상태값에 저장하기
    setMatches: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getList.fulfilled, (state, { payload }) => {
      state.data = payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData, setMatches } = matchesSlice.actions;

export default matchesSlice.reducer;
