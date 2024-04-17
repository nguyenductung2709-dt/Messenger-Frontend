import Messages from './Messages';
import MessageForm from './MessageForm';

const MessageContainer = () => {
    return(
    <div className = "basis-6.5/10 flex flex-col h-screen overflow-y-auto bg-primary_message_dark">
        <div className = "bg-gray-600 px-4 py-2 mb-2">
            <span className = "label-text"> To: </span>{" "}
            <span className = "text-white font-bold"> Duc Tung Nguyen</span>
        </div>
        <Messages/>
        <MessageForm/>
    </div>
    )
}

export default MessageContainer;