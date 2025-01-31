import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const url = "https://v3.football.api-sports.io";

/** Yellow , Red 카드 많이 받은 선수 */
export const getTopYellowRed = createAsyncThunk(
  "leagueSlice/getTopYellowRed",
  async ({ leagueID, season }: { leagueID: number, season: number }, { rejectWithValue }) => {
    let result = null;

    try {

      const [yellow, red] = await Promise.all([
        axios.get(`${url}/players/topyellowcards?season=${season}&league=${leagueID}`, {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }),
        axios.get(`${url}/players/topredcards?season=${season}&league=${leagueID}`, {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        })
      ])

      result = {
        yellow: yellow.data.response,
        red: red.data.response
      }
      
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getTopScore Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);


/** 득점왕 및 어시왕 정보 가져오기*/
export const getTopScoreAssist = createAsyncThunk(
  "leagueSlice/getTopScore",
  async ({ season, leagueID }: { season: number, leagueID: number }, { rejectWithValue }) => {
    let result = null;

    try {

      const [goal, assist] = await Promise.all([
        axios.get(`${url}/players/topscorers?season=${season}&league=${leagueID}`, {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }),
        axios.get(`${url}/players/topassists?season=${season}&league=${leagueID}`, {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        })
      ])

      result = {
        goal: goal.data.response,
        assist: assist.data.response
      }
      
      
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getTopScore Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);


/** 리그의 경기 정보 가져오기 */
export const getMatches = createAsyncThunk(
  "leagueSlice/getMatches",
  async (
    {
      leagueID,
      season,
      timezone,
    }: {
      leagueID: number;
      season: number;
      timezone: string;
    },
    { rejectWithValue }: any
  ) => {
    let result = null;
    try {
      const response = await axios.get(
        `${url}/fixtures?league=${leagueID}&season=${season}&timezone=${timezone}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );

      result = response?.data?.response;
      
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getMatches Error");
      result = rejectWithValue(axiosErr);

      console.groupEnd();
    }

    return result;
  }
);

// 리그 정보 / 시즌 정보 가져오기
export const getLeague = createAsyncThunk(
  "leagueSlice/getLeague",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(`${url}/leagues?id=${id}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      });

      result = response.data.response[0];
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getLeague Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

// 해당되는 리그의 스탠딩 정보 가져오기
export const getStanding = createAsyncThunk(
  "leagueSlice/getStanding",
  async ({ id, year }: { id: number; year: number }, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(
        `${url}/standings?league=${id}&season=${year}`,
        {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );

      result = response.data.response[0].league.standings;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getStanding Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

// 하나의 팀 ID를 통한 모든 리그 정보 가져오기
export const getAllLeaguesByTeam = createAsyncThunk(
  "leagueSlice/getAllLeaguesByTeam",
  async ({ team }: { team:number }, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(
        `${url}/leagues?team=${team}`,
        {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );

      result = response.data.response;
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getStanding Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

export const leagueSlice = createSlice({
  name: "leagueSlice",
  initialState: {
    standing: null,
    match: null,
    seasons: null,
    selectedSeason: null,
    error: null,
    topScoreAssist: null,
    topYellowRed: null,
    leagues:null
  },
  reducers: {
    // 현재 상태값 불러오기
    getCurrentData: (state) => {
      return state;
    },
    setSelectedSeason: (state, {payload}: {payload: any}) => {
      state.selectedSeason = payload;
    }
  },
  extraReducers: (builder) => {

    builder.addCase(
      getStanding.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.standing = payload;
      }
    );

    builder.addCase(
      getLeague.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.seasons = payload;
      }
    );

    builder.addCase(
      getMatches.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.match = payload;
      }
    );

    builder.addCase(
      getTopScoreAssist.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.topScoreAssist = payload;
      }
    );

    builder.addCase(
      getTopYellowRed.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.topYellowRed = payload;
      }
    );

    builder.addCase(
      getAllLeaguesByTeam.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.leagues = payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData, setSelectedSeason } = leagueSlice.actions;

export default leagueSlice.reducer;
