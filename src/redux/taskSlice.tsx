import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  project: string;
  task: string;
  time: string;
  date: string;
  status: string;
  remarks: string;
}

export interface CounterState {
  data: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: CounterState = {
  data: [],
  loading: false,
  error: "",
};

export const getTasks = createAsyncThunk("tasks", async () => {
  const response = await fetch(
    "https://api.jsonbin.io/v3/b/66aa5d6de41b4d34e419c69b"
  );
  const data = await response.json();
  return data.record;
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
        state.data = [];
      });
  },
});

export default taskSlice.reducer;
