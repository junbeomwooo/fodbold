import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const url = "https://v3.football.api-sports.io";

export const getTransferInfoByTeam = createAsyncThunk(
  "teamsSlice/getTransferInfoByTeam",
  async ({ team }: { team: number }, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(`${url}/transfers?team=${team}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      });

      if (response?.data?.errors) {
        return rejectWithValue(response?.data?.errors);
      }

      result = response?.data?.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getTransferInfoByTeam Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

export const getTeamSquad = createAsyncThunk(
  "teamsSlice/getTeamSquad",
  async ({ team }: { team: number }, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(`${url}/players/squads?team=${team}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      });

      if (response?.data?.errors) {
        return rejectWithValue(response?.data?.errors);
      }

      result = response?.data?.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getTeamSquad Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

export const getTeamsStatistics = createAsyncThunk(
  "teamsSlice/getTeamsStatistics",
  async (
    { league, season, team }: { league: number; season: number; team: number },
    { rejectWithValue }
  ) => {
    let result = null;

    try {
      const response = await axios.get(
        `${url}/teams/statistics?season=${season}&team=${team}&league=${league}`,
        {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );

      if (response?.data?.errors) {
        return rejectWithValue(response?.data?.errors);
      }

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

export const getTeamInfo = createAsyncThunk(
  "teamsSlice/getTeamInfo",
  async ({ team }: { team: number }, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(`${url}/teams?id=${team}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      });

      if (response?.data?.errors) {
        return rejectWithValue(response?.data?.errors);
      }

      result = response?.data?.response[0];
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getTeamInfo Error");
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
    squads: null,
    transfer: null,
    teamInfo: null,
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
      getTeamSquad.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.squads = payload;
      }
    );

    builder.addCase(
      getTransferInfoByTeam.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.transfer = payload;
      }
    );

    builder.addCase(
      getTeamInfo.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.teamInfo = payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData } = teamsSlice.actions;

export default teamsSlice.reducer;
