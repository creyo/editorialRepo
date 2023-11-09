import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../src/Reducers/SettingReducer';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});

export default store;
