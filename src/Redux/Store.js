import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "./KanbanSlice";
export default configureStore({
  reducer: {
    kanbanReducer,
  },
});
