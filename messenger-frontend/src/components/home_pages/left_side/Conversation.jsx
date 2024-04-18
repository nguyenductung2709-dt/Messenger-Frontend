import { useDispatch, useSelector } from "react-redux";
import { changeSelectedConversation } from "../../../reducers/conversationReducer";

const Conversation = ({ conversation, currentUser }) => {
    let userUsed;

    if (conversation.participant_list.length === 2) {
        userUsed = conversation.participant_list.find(participant => participant.id !== currentUser.id);
    }

    const selectedConversation = useSelector(state => state.selectedConversation);
    const isSelected = selectedConversation?.id === conversation.id;
    const dispatch = useDispatch();

    return (
        <>
            {conversation.participant_list.length === 2 ?
                <div className={`flex gap-2 items-center hover:bg-gray-600 rounded p-2 py-1 cursor-pointer
                    ${isSelected ? "bg-gray-600" : ""}
                `} onClick={() => dispatch(changeSelectedConversation(conversation))}
                >
                    <div className='avatar online'>
                        <div className='w-12 rounded-full'>
                            <img
                                src={userUsed.avatarName}
                                alt='user avatar'
                            />
                        </div>
                    </div>

                    <div className='flex flex-col flex-1'>
                        <div className='flex gap-3 justify-between'>
                            <p className='font-bold text-gray-400'><span>{userUsed.middleName} </span><span>{userUsed.firstName} </span><span>{userUsed.lastName}</span></p>
                        </div>
                    </div>
                </div>

                : null
            }
            <div className='divider my-0 py-0 h-1' />
        </>
    );
};

export default Conversation;
