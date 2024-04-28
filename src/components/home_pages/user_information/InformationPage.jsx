import { useState } from "react";
import UserInformation from "./UserInformation";
import UserForm from "./UserForm";
import { useAuthContext } from "../../../context/AuthContext";

const InformationPage = () => {
  const { authUser } = useAuthContext();

  const [form, setForm] = useState(false);

  const toggleForm = () => {
    setForm(!form);
  };

  return (
    <>
      {form ? (
        <UserForm authUser={authUser} toggleForm={toggleForm} />
      ) : (
        <UserInformation authUser={authUser} toggleForm={toggleForm} />
      )}
    </>
  );
};

export default InformationPage;
