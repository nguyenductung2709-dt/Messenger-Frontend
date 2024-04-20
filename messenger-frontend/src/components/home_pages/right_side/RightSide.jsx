import NavBar from './NavBar';
import { useSelector } from 'react-redux';
import { useAuthContext } from '../../../context/AuthContext';
import { useState, useEffect } from 'react';

const RightSide = () => {
    const { authUser } = useAuthContext();
    const selectedConversation = useSelector(state => state.selectedConversation);
    const isInbox = selectedConversation?.participant_list.length === 2;
    const groupTitle = selectedConversation?.title
    const groupImage = selectedConversation?.imageName
    const [userUsed, setUserUsed] = useState(null);

    useEffect(() => {
        if (isInbox) {
            const userUsed = selectedConversation?.participant_list.find(participant => participant.id !== authUser.id);
            setUserUsed(userUsed);
        } else {
            setUserUsed(null);
        }
    }, [selectedConversation, authUser]);

    return(
    <div className = "basis-2/10 flex flex-col bg-secondary_message_dark">
        <NavBar/>
        <div className = "flex flex-col flex-g  items-center justify-center">
        {userUsed? 
            <>
                <img className="w-28 h-28 rounded-full" alt="Tailwind CSS chat bubble component" src={userUsed.avatarName} />
                <p> {userUsed.middleName} {userUsed.firstName} {userUsed.lastName} </p>
            </>
        :
            <>
            </>
        }

        {groupTitle && (
            <>
                <img className="w-28 h-28 rounded-full" src={groupImage} alt={`${groupTitle} image`} />
                <p>{groupTitle}</p>
            </>
        )}
        </div>
    </div>
    )
}

export default RightSide