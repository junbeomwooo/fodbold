import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const url = "https://v3.football.api-sports.io";

// 해당되는 리그의 스탠딩 정보 가져오기
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
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData } = fixtureSlice.actions;

export default fixtureSlice.reducer;
