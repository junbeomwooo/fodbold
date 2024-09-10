import { configureStore } from '@reduxjs/toolkit'
import standingSlice from "./features/standingSlice";
import leagueSlice from "./features/leagueSlice";



export const makeStore = () => {
  return configureStore({
    reducer: {
      standingSlice : standingSlice,
      leagueSlice: leagueSlice
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']