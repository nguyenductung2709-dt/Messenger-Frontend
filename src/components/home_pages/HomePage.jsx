import LeftSide from "./left_side/LeftSide";
import MessageContainer from "./message_container/MessageContainer";
import RightSide from "./right_side/RightSide";
import { Toaster } from "react-hot-toast";

const HomePage = () => {
  return (
    <div className="flex flex-row overflow-hidden w-full h-full">
      <Toaster position="top-center" reverseOrder={false} />
      <LeftSide />
      <MessageContainer />
      <RightSide />
    </div>
  );
};

export default HomePage;
