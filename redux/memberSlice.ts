import { createSlice } from "@reduxjs/toolkit";
import { members } from "@/data/members";

const memberSlice = createSlice({
  name: "members",
  initialState: members,

  reducers: {
    addMember: (state, action) => {
      state.push(action.payload);
    },

    deleteMember: (state, action) => {
      return state.filter(
        (member) => member.id !== action.payload
      );
    },
  },
});

export const {
  addMember,
  deleteMember,
} = memberSlice.actions;

export default memberSlice.reducer;