import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./reducers/conversationReducer";


const store = configureStore({
  reducer: {
    selectedConversation: conversationReducer,
  },
});

export default store;
