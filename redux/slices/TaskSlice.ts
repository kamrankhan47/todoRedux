import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Todo} from '../../models/ToDo';

interface TodoState {
  tasks: Array<Todo>;
  loading: 'reject' | 'pending' | 'fullfilled' | null;
  error: any;
}

const initialState: TodoState = {
  tasks: [],
  error: '',
  loading: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(
    'https://646e61a79c677e23218b9937.mockapi.io/tasks',
  );
  return response.data;
});

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (payload: any) => {
    const response = await axios.post(
      'https://646e61a79c677e23218b9937.mockapi.io/tasks',
      payload,
    );
    return response.data;
  },
);

export const addtoCompleted = createAsyncThunk(
  'tasks/addtoCompleted',
  async (payload: any) => {
    const response = await axios.put(
      'https://646e61a79c677e23218b9937.mockapi.io/tasks/' + payload.id,
      payload,
    );

    return response.data;
  },
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addtoCompleted: (state, action) => {
      let completed = [];
      let completedtask = state.tasks.find(
        task => task.id === action.payload.id,
      );
      completed.push(completedtask);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = 'fullfilled';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = 'reject';
        state.error = 'Error fetching tasks';
      })
      .addCase(addTask.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = 'fullfilled';
        state.tasks.push(action.payload);
      })
      .addCase(addtoCompleted.fulfilled, (state, action) => {
        state.loading = 'fullfilled';
        // let newitem= state.tasks.indexOf(action.payload)
        let newitem = state.tasks.findIndex(
          task => task.id === action.payload.id,
        );
        console.log(newitem);
        state.tasks[newitem].completed = action.payload.completed;

        // state.tasks[newitem].completed=action.payload.completed
      });
  },
});

// const addedTask = createSlice({
//   name: 'Addedtasks',
//   initialState: initialState,
//   reducers: {
//   },
//   extraReducers: (builder) => {
//     builder.addCase(addtoCompleted.pending, (state, action) => {
//         state.loading = "pending";

//     }).addCase(addtoCompleted.fulfilled, (state, action) => {
//         state.loading = "fullfilled";
//         state.tasks = action.payload;

//     }).addCase(addtoCompleted.rejected, (state, action) => {
//         state.loading = "reject";
//         state.error = "Error fetching tasks";

//     })

//   },
// });
// export const add=addedTask.reducer;
export default taskSlice.reducer;
