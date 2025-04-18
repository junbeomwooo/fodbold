import { configureStore } from "@reduxjs/toolkit";
import leagueSlice from "./features/leagueSlice";
import locationSlice from "./features/locationSlice";
import fixtureSlice  from "./features/fixtureSlice";
import teamsSlice from "./features/teamsSlice";
import playerSlice from "./features/playerSlice";

/** redux persist */
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "location",
  storage, // 세션 스토리지
};

const persistedLocationReducer = persistReducer(persistConfig, locationSlice);

export const makeStore = () => {
  return configureStore({
    reducer: {
      leagueSlice: leagueSlice,
      fixtureSlice: fixtureSlice,
      locationSlice: persistedLocationReducer,
      teamsSlice: teamsSlice,
      playerSlice: playerSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
