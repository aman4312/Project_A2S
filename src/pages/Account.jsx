import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Account = () => {
  const { user } = UserAuth();

  return (
    <div className="w-[300px] m-auto">
      <h1 className="text-center text-2xl font-bold pt-12">
        Welcome, {user?.displayName}
      </h1>
      <button className="border py-2 px-5 mt-10">
        <Link to="/uploadFiles">Upload Files</Link>
      </button>
      <br />
      <button className="border py-2 px-5 mt-10">
        <Link to="/myFiles">My Files</Link>
      </button>
    </div>
  );
};

export default Account;
