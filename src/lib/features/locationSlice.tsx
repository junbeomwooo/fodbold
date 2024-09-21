import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const GEOLOCATION_URL = "https://api.ipgeolocation.io/ipgeo";

// /** 접속한 ip를 통한 국가 가져오기 (타임존 시간대 적용하기 위해) */
// export const getLocation = createAsyncThunk(
//   "locationSlice/getLocation",
//   async () => {
//     let result = null;

//     try {
//       const response = await axios.get(
//         `${GEOLOCATION_URL}?apiKey=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}`
//       );
//       result = response.data.time_zone.name;
//     } catch (err) {
//       const axiosErr = err as AxiosError;
//       console.group("getLocation Error");
//       console.log(axiosErr);
//       console.groupEnd();
//     }

//     return result;
//   }
// );

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState: {
    data: null,
    location: null,
  },
  reducers: {
    // 현재 상태값 불러오기
    getCurrentData: (state) => {
      return state;
    },
    // 현재 값을 상태값에 저장하기
    setLocation: (state, { payload }) => {
      state.location = payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(
    //     getLocation.fulfilled,
    //   (state, { payload }: { payload: any }) => {
    //     state.location = payload;
    //   }
    // );
  },
});

// Action creators are generated for each case reducer function
export const { getCurrentData, setLocation } = locationSlice.actions;

export default locationSlice.reducer;
