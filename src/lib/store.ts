import { configureStore } from '@reduxjs/toolkit'
import leagueSlice from "./features/leagueSlice";
import locationSlice from './features/locationSlice';



export const makeStore = () => {
  return configureStore({
    reducer: {
      leagueSlice : leagueSlice,
      locationSlice: locationSlice
      
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']