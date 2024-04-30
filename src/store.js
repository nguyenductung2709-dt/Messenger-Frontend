import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./reducers/conversationReducer";
import messageReducer from "./reducers/messageReducer";
import conversationsReducer from "./reducers/conversationsReducer";
import friendReducer from "./reducers/friendReducer";
import participantsReducer from "./reducers/participantsReducer";

const store = configureStore({
  reducer: {
    selectedConversation: conversationReducer,
    messages: messageReducer,
    conversations: conversationsReducer,
    friends: friendReducer,
    participants: participantsReducer,
  },
});

export default store;
