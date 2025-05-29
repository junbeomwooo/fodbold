import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const url = "https://v3.football.api-sports.io";

export const getTrophiesByPlayer = createAsyncThunk(
  "playerSlice/getTrophiesByPlayer",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(`${url}/trophies?player=${id}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      });

      if (
        response?.data?.errors &&
        Object.keys(response.data.errors).length > 0
      ) {
        return rejectWithValue(response.data.errors);
      }

      result = response?.data?.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getTrophiesByPlayer Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

export const getTeamsByPlayer = createAsyncThunk(
  "playerSlice/getTeamsByPlayer",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(`${url}/players/teams?player=${id}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      });

      if (
        response?.data?.errors &&
        Object.keys(response.data.errors).length > 0
      ) {
        return rejectWithValue(response.data.errors);
      }

      result = response?.data?.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getTeamsByPlayer Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

export const getPlayerStatistics = createAsyncThunk(
  "playerSlice/getPlayerStatistics",
  async (
    { season, id }: { season: number; id: number },
    { rejectWithValue }
  ) => {
    let result = null;

    try {
      const response = await axios.get(
        `${url}/players?id=${id}&season=${season}`,
        {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );

      if (
        response?.data?.errors &&
        Object.keys(response.data.errors).length > 0
      ) {
        return rejectWithValue(response.data.errors);
      }

      result = response?.data?.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getPlayerStatistics Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

export const getSeasonByPlayer = createAsyncThunk(
  "playerSlice/getSeasonByPlayer",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(`${url}/players/seasons?player=${id}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      });

      if (
        response?.data?.errors &&
        Object.keys(response.data.errors).length > 0
      ) {
        return rejectWithValue(response.data.errors);
      }

      result = response?.data?.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getSeasonByPlayer Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

export const playerSlice = createSlice({
  name: "playerSlice",
  initialState: {
    season: null,
    statics: null,
    teams: null,
    trophies: null,
  },
  reducers: {
    // 현재 상태값 불러오기
    getCurrentData: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getSeasonByPlayer.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.season = payload;
      }
    );

    builder.addCase(
      getPlayerStatistics.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.statics = payload;
      }
    );

    builder.addCase(
      getTeamsByPlayer.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.teams = payload;
      }
    );

    builder.addCase(
      getTrophiesByPlayer.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.trophies = payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData } = playerSlice.actions;

export default playerSlice.reducer;
