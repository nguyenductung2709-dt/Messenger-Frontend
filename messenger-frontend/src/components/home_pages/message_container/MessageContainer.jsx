import Messages from './Messages';
import MessageForm from './MessageForm';

const MessageContainer = () => {
    return(
    <div className = "basis-6/10 flex flex-col h-screen overflow-y-auto">
        <div className = "bg-secondary_login_dark px-4 py-2 mb-2">
            <span className = "label-text"> To: </span>{" "}
            <span className = "text-white font-bold"> John Doe</span>
        </div>
        <Messages/>
        <MessageForm/>
    </div>
    )
}

export default MessageContainer;