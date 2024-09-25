import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const url = "https://v3.football.api-sports.io";

/** 경기 정보 가져오기 */
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

      // /** 날짜별로 경기 데이터 묶기 */
      // const groupedByDate = response?.data?.response?.reduce((acc: any, match: any) => {
      //   // acc : 반환할 총 데이터 값 , match : 한가지 경기
      //   const matchDate = match.fixture.date.substring(0,10);
      //   if (!acc[matchDate]) {
      //     acc[matchDate] = {
      //       matches: [],
      //     };
      //   }
      //   acc[matchDate]?.matches?.push(match);

      //   return acc;
      // }, []);

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

export const leagueSlice = createSlice({
  name: "leagueSlice",
  initialState: {
    standing: null,
    match: null,
    seasons: null,
    error: null,
  },
  reducers: {
    // 현재 상태값 불러오기
    getCurrentData: (state) => {
      return state;
    },
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
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData } = leagueSlice.actions;

export default leagueSlice.reducer;
