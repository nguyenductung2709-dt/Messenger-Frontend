import SearchBar from './SearchBar';
import Conversations from './Conversations';

const LeftSide = () => {
    return (
        <div className="basis-1.5/10 flex flex-col h-screen overflow-y-auto relative bg-secondary_message_dark">
            <div className = "px-4 py-2 mb-2">
                <h1 className = "text-white text-2xl mb-4 mt-2"> Conversations </h1>
                <SearchBar />
            </div>
            <Conversations />
        </div>
    );
};

export default LeftSide;

