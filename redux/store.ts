import {configureStore} from '@reduxjs/toolkit';
import taskSlice from './slices/TaskSlice';

export const store = configureStore({
  reducer: {
    tasksSlice: taskSlice,
  },
});
export type AppDispatch = typeof store.dispatch
export type StateType = ReturnType<typeof store.getState>
