import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const url = "https://v3.football.api-sports.io";


// Head to Head 정보 가져오기
export const getH2H = createAsyncThunk(
  "fixtureSlice/getInjuries",
  async ({ homeID,awayID }: { homeID: number, awayID: number}, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(
        `${url}/fixtures/headtohead?h2h=${homeID}-${awayID}`,
        {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );

      console.log(response);

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


// 해당되는 경기의 부상 정보 가져오기
export const getInjuries = createAsyncThunk(
  "fixtureSlice/getInjuries",
  async ({ id }: { id: number}, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(
        `${url}/injuries?fixture=${id}`,
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
      console.group("getFixtures Error");
      result = rejectWithValue(axiosErr.response);
      console.groupEnd();
    }

    return result;
  }
);

// 해당되는 경기 정보 가져오기
export const getFixtures = createAsyncThunk(
  "fixtureSlice/getFixtures",
  async ({ id }: { id: number}, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(
        `${url}/fixtures?id=${id}`,
        {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );

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

export const fixtureSlice = createSlice({
  name: "fixtureSlice",
  initialState: {
    fixture: null,
    injurie: null,
    h2h: null,
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
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData } = fixtureSlice.actions;

export default fixtureSlice.reducer;
