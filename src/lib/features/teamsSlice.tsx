import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const url = "https://v3.football.api-sports.io";


export const getPlayerStatsByTeam = createAsyncThunk(
  "teamsSlice/getPlayerStatsByTeam",
  async ({ team, season}: {  team: number ,season:number}, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(`${url}/players?season=${season}&team=${team}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      });

      console.log(response);
      result = response?.data?.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getPlayerStatsByTeam Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

export const getTeamsStatistics = createAsyncThunk(
  "teamsSlice/getTeamsStatistics",
  async ({ league, season ,team}: { league: number, season:number, team: number }, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(`${url}/teams/statistics?season=${season}&team=${team}&league=${league}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      });
      result = response?.data?.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getTeamsStatistics Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

export const teamsSlice = createSlice({
  name: "teamsSlice",
  initialState: {
    statics: null,
    playerStats : null
  },
  reducers: {
    // 현재 상태값 불러오기
    getCurrentData: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTeamsStatistics.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.statics = payload;
      }
    );

    builder.addCase(
      getPlayerStatsByTeam.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.playerStats = payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData } = teamsSlice.actions;

export default teamsSlice.reducer;
