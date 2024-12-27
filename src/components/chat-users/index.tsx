import React from "react";
import UserArea from "./UserArea";
import UserList from "./UserList";
import SearchArea from "./SearchArea";
import FooterTwo from "@/layouts/footers/FooterTwo";
import HeaderTwo from "@/layouts/headers/HeaderTwo";

const ChatUsers = () => {
  return (
    <>
      <HeaderTwo />
      <UserList />
      <FooterTwo />
    </>
  );
};

export default ChatUsers;
