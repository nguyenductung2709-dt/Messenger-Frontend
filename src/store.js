import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./reducers/conversationReducer";
import messageReducer from "./reducers/messageReducer";
import conversationsReducer from "./reducers/conversationsReducer";
import friendReducer from "./reducers/friendReducer";
import lightModeReducer from "./reducers/lightModeReducer";

const store = configureStore({
  reducer: {
    lightMode: lightModeReducer,
    selectedConversation: conversationReducer,
    messages: messageReducer,
    conversations: conversationsReducer,
    friends: friendReducer,
  },
});

export default store;
