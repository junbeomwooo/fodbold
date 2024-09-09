
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError} from 'axios';



const url = "https://v3.football.api-sports.io";

export const getList = createAsyncThunk(
  "standlingSlice/getList",
  async (payload, { rejectWithValue }) => {

    let result = null;
    try {
        const response = await axios.get(url);
        result = response.data
    } catch (err) {
        const axiosErr = err as AxiosError
        console.group('getList Error');
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
  },
  reducers: {
    // 현재 상태값 불러오기
    getCurrentData: (state) => {
      return state
    },
    // 현재 값을 상태값에 저장하기
    setData: (state, { payload }) => {
      state.data = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getList.fulfilled, (state, { payload }) => {
        state.data = payload
    });

  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData, setData } =
  standingSlice.actions;

export default standingSlice.reducer;
