import Messages from './Messages';
import MessageForm from './MessageForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedConversation } from '../../../reducers/conversationReducer';
import { useAuthContext } from '../../../context/AuthContext';

const MessageContainer = () => {
    const dispatch = useDispatch();
    const selectedConversation = useSelector(state => state.selectedConversation);
    const { authUser } = useAuthContext();

    let userUsed 
    
    const isInbox = selectedConversation?.participant_list.length === 2

    if (isInbox) {
        userUsed = selectedConversation?.participant_list.find(participant => participant.id !== authUser.id);
    }

    useEffect(() => {
        return () => {
            dispatch(changeSelectedConversation(null));
        };
    }, [dispatch]);

    return (
        !selectedConversation ? (<NoChatSelected/>) : (
            <div className="basis-6/10 flex flex-col h-screen overflow-y-auto bg-primary_message_dark">
                <div className="bg-gray-600 px-4 py-2 mb-2">
                    <span className="label-text"> To: </span>{" "}
                    { isInbox ? <span className="text-white font-bold"> <span>{userUsed.middleName} </span><span>{userUsed.firstName} </span><span>{userUsed.lastName}</span></span>
                    : <span className="text-white font-bold">{selectedConversation.title}</span>
                    }
                </div>
                <Messages/>
                <MessageForm/>
            </div>
        )
    );
};

export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
        <div className="basis-6/10 flex flex-col h-screen overflow-y-auto bg-primary_message_dark items-center justify-center text-3xl">
            <p>Welcome 👋 {authUser.fullName}</p>
			<p>Select a chat to start messaging</p>
		</div>
	);
};