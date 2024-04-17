import LeftSide from './left_side/LeftSide';
import MessageContainer from './message_container/MessageContainer';
import RightSide from './right_side/RightSide';

const HomePage = () => {
    return (
        <div className = "flex flex-row overflow-hidden w-full h-full bg-primary_login_dark">
            <LeftSide />
            <MessageContainer />
            <RightSide />
        </div>
    )
}

export default HomePage;