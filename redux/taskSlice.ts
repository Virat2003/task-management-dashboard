import { createSlice } from "@reduxjs/toolkit";
import { tasks } from "@/data/tasks";

const taskSlice = createSlice({
    name: "tasks",
    initialState: tasks,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },

        deleteTask: (state, action) => {
            return state.filter(
                (task) => task.id !== action.payload
            );
        },

        updateTask: (state, action) => {
            const index = state.findIndex(
                (task) => task.id === action.payload.id
            );

            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const {
    addTask,
    deleteTask,
    updateTask,
} = taskSlice.actions;

export default taskSlice.reducer;