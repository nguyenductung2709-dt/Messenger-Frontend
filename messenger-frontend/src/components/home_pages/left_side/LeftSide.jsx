import SearchBar from './SearchBar';
import Conversations from './Conversations';

const LeftSide = () => {
    return (
        <div className="basis-2/10 flex flex-col h-screen overflow-y-auto relative">
            <div className = "bg-secondary_login_dark px-4 py-2 mb-2">
                <h1 className = "text-white text-2xl mb-4 mt-2"> Conversations </h1>
                <SearchBar />
            </div>
            <Conversations />
        </div>
    );
};

export default LeftSide;

