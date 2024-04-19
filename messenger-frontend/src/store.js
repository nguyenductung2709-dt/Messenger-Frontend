import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./reducers/conversationReducer";
import messageReducer from "./reducers/messageReducer";


const store = configureStore({
  reducer: {
    selectedConversation: conversationReducer,
    messages: messageReducer,
  },
});

export default store;
