import SearchBar from "./SearchBar";
import Conversations from "./Conversations";
import { useState } from "react";
import { MdOutlineOpenInNew } from "react-icons/md";
import FriendForm from "./FriendForm";
import toast, { Toaster } from "react-hot-toast";

const LeftSide = () => {
  const [friendForm, setFriendForm] = useState(false);
  const [notification, setNotification] = useState(null);

  const openFriendForm = () => {
    setFriendForm(true);
  };

  const closeFriendForm = () => {
    setFriendForm(false);
  };

  const showNotification = (success, message) => {
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="basis-2/10 flex flex-col h-screen overflow-y-auto relative bg-amber-300 dark:bg-secondary_message_dark">
      <Toaster position="top-center" reverseOrder={false} />
      {friendForm ? (
        <FriendForm
          onClose={closeFriendForm}
          showNotification={showNotification}
        />
      ) : (
        <div className="px-4 py-2 mb-2">
          <h1 className="text-black dark:text-white text-2xl mt-2 font-semibold">
            {" "}
            Conversations{" "}
          </h1>
          <button onClick={openFriendForm}>
            <MdOutlineOpenInNew
              className="text-black dark:text-white text-2xl absolute right-4 top-4 cursor-pointer"
              size={"1.3em"}
            />
          </button>
          <SearchBar />
        </div>
      )}
      <Conversations />
    </div>
  );
};

export default LeftSide;
