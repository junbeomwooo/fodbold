
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError} from 'axios';



const url = "https://v3.football.api-sports.io";

export const leagueSlice = createSlice({
  name: "standingSlice",
  initialState: {
    data: null,
  },
  reducers: {
    // 현재 상태값 불러오기
    getCurrentData: (state) => {
      return state
    },
    // 들어갈 리그정보 저장
    setLeague: (state, { payload }) => {
      state.data = payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData, setLeague } =
leagueSlice.actions;

export default leagueSlice.reducer;
