import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const url = "https://v3.football.api-sports.io";

export const getList = createAsyncThunk(
  "standlingSlice/getList",
  async ({ id, year }: { id: number; year: number }, { rejectWithValue }) => {
    let result = null;
    try {
      // 두 개 병렬 통신
      const [response, season] = await Promise.all([
        axios.get(`${url}/standings?league=${id}&season=${year}`, {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }),
        axios.get(`${url}/leagues?id=${id}`, {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
          },
        }),
      ]);

      result = {
        stands: response.data.response[0].league.standings[0],
        season: season.data.response[0],
      };
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
    season: null,
    error: null,
  },
  reducers: {
    // 현재 상태값 불러오기
    getCurrentData: (state) => {
      return state;
    },
    // 현재 값을 상태값에 저장하기
    setStanding: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getList.fulfilled,
      (state, { payload }: { payload: any }) => {
        console.log(payload);
        state.data = payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData, setStanding } = standingSlice.actions;

export default standingSlice.reducer;
