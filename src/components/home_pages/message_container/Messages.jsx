import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import Message from './Message';
import messageService from '../../../services/messages';
import { changeMessages } from '../../../reducers/messageReducer';
import useListenMessages from '../../../hooks/useListenMessages';

function Messages() {
  const [loading, setLoading] = useState(false);
  const messages = useSelector((state) => state.messages);
  const selectedConversation = useSelector((state) => state.selectedConversation);
  const dispatch = useDispatch();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const messageConversation = await messageService
          .getMessagesFromConversation(selectedConversation && selectedConversation.id);
        const sortedMessages = messageConversation.sort((a, b) => a.id - b.id);
        if (messageConversation.error) throw new Error(messageConversation.error);
        dispatch(changeMessages(sortedMessages));
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation && selectedConversation.id) getMessages();
  }, [selectedConversation, dispatch]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        if (lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading
        && messages.length > 0
        && messages.map((message) => (
          <div key={message.id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {!loading && messages.length === 0 && <p className="text-center">Send a message to start the conversation</p>}
    </div>
  );
}

export default Messages;
