import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./reducers/conversationReducer";
import messageReducer from "./reducers/messageReducer";
import conversationsReducer from "./reducers/conversationsReducer";


const store = configureStore({
  reducer: {
    selectedConversation: conversationReducer,
    messages: messageReducer,
    conversations: conversationsReducer
  },
});

export default store;
