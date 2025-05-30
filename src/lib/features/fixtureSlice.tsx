import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const url = "https://v3.football.api-sports.io";

// 같은 라운드 정보 가져오기
export const getFixtruesByRound = createAsyncThunk(
  "fixtureSlice/getFixtruesByRound",
  async (
    {
      leagueID,
      season,
      round,
    }: { leagueID: number; season: number; round: string },
    { rejectWithValue }
  ) => {
    let result = null;

    try {
      const response = await axios.get(
        `${url}/fixtures?league=${leagueID}&season=${season}&round=${round}`,
        {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );

      console.log(response);

      if (
        response?.data?.errors &&
        Object.keys(response.data.errors).length > 0
      ) {
        return rejectWithValue(response.data.errors);
      }

      result = response.data.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getFixtruesByRound Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

// Head to Head 정보 가져오기
export const getH2H = createAsyncThunk(
  "fixtureSlice/getH2H",
  async (
    {
      homeID,
      awayID,
      timezone,
    }: { homeID: number; awayID: number; timezone: string },
    { rejectWithValue }
  ) => {
    let result = null;

    console.log(homeID);
    console.log(awayID);

    try {
      const response = await axios.get(
        `${url}/fixtures/headtohead?h2h=${homeID}-${awayID}&timezone=${timezone}`,
        {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );

      console.log(response);

      if (
        response?.data?.errors &&
        Object.keys(response.data.errors).length > 0
      ) {
        return rejectWithValue(response.data.errors);
      }

      result = response.data.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getH2H Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

// 해당되는 경기의 부상 정보 가져오기
export const getInjuries = createAsyncThunk(
  "fixtureSlice/getInjuries",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(`${url}/injuries?fixture=${id}`, {
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

      result = response.data.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getInjuries Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

// 해당되는 경기 정보 가져오기
export const getFixtures = createAsyncThunk(
  "fixtureSlice/getFixtures",
  async (
    { id, timezone }: { id: number; timezone: string },
    { rejectWithValue }
  ) => {
    let result = null;

    try {
      const response = await axios.get(
        `${url}/fixtures?id=${id}&timezone=${timezone}`,
        {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );
      console.log(response);

      if (
        response?.data?.errors &&
        Object.keys(response.data.errors).length > 0
      ) {
        return rejectWithValue(response.data.errors);
      }

      result = response.data.response[0];
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getFixtures Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

// 해당 팀의 경기 정보 가져오기
export const getFixturesByTeam = createAsyncThunk(
  "fixtureSlice/getFixturesByTeam",
  async (
    {
      team,
      season,
      timezone,
    }: { team: number; season: number; timezone: string },
    { rejectWithValue }
  ) => {
    let result = null;

    try {
      const response = await axios.get(
        `${url}/fixtures?team=${team}&season=${season}&timezone=${timezone}`,
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

      result = response.data.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getFixtures Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

export const fixtureSlice = createSlice({
  name: "fixtureSlice",
  initialState: {
    fixture: null,
    injurie: null,
    h2h: null,
    fixtureByRound: null,
    fixtureByTeam: null,
  },
  reducers: {
    // 현재 상태값 불러오기
    getCurrentData: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getFixtures.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.fixture = payload;
      }
    );

    builder.addCase(
      getInjuries.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.injurie = payload;
      }
    );

    builder.addCase(
      getH2H.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.h2h = payload;
      }
    );

    builder.addCase(
      getFixtruesByRound.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.fixtureByRound = payload;
      }
    );

    builder.addCase(
      getFixturesByTeam.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.fixtureByTeam = payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData } = fixtureSlice.actions;

export default fixtureSlice.reducer;
