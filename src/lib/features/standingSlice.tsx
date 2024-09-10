import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const url = "https://v3.football.api-sports.io";

export const getList = createAsyncThunk(
  "standlingSlice/getList",
  async ({ id, year }: { id: number; year: number }, { rejectWithValue }) => {
    let result = null;
    try {
      const response = await axios.get(
        `${url}/standings?league=${id}&season=${year}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }
      );
      
      result = response.data.response[0].league.standings;
      console.log(result);
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.group("getList Error");
      result = rejectWithValue(axiosErr.response);

      console.groupEnd();
    }
    return result;
  }
);

export const standingSlice = createSlice({
  name: "standingSlice",
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
    setStanding: (state, { payload }) => {
      state.data = payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.fulfilled, (state, {payload}) => {
        state.data = payload[0];
      })
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData, setStanding } = standingSlice.actions;

export default standingSlice.reducer;
