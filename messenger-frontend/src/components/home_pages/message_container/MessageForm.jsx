import { AiOutlineSend } from "react-icons/ai";


const MessageForm = () => {
    return (
        <form className = 'px-4 my-3'>
            <div className = "w-full relative">
                <input 
                    type = "text"
                    className = "border text-sm rounded-lg block w-full p-2.5 text-white"
                    placeholder = "Send a message"
                />
                <button type = "submit" className = "absolute inset-y-0 end-0 flex flex-col justify-center items center pe-3">
                    <AiOutlineSend size = {25} />
                </button>
            </div>
        </form>
    )
}

export default MessageForm