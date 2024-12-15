"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface DataType {
  id: number;
  status: string;
  img: string;
  name: string;
  last_chat: string;
}

const user_data: DataType[] = [
  {
    id: 1,
    status: "chat-unread",
    img: "/assets/img/bg-img/user1.png",
    name: "Designing World",
    last_chat: "Hello, Are you there?",
  },
  {
    id: 2,
    status: "",
    img: "/assets/img/bg-img/user2.png",
    name: "Mustafa Rabbi",
    last_chat: "How can I help you?",
  },
  {
    id: 3,
    status: "offline",
    img: "/assets/img/bg-img/user3.png",
    name: "Affan Islam",
    last_chat: "I want to buy your Affan template.",
  },
  {
    id: 4,
    status: "",
    img: "/assets/img/bg-img/user4.png",
    name: "Jannatun Lima",
    last_chat: "Affan ",
  },
  {
    id: 5,
    status: "",
    img: "/assets/img/bg-img/user2.png",
    name: "Waves Motion",
    last_chat: "affan-pwa-mobile.zip",
  },
  {
    id: 6,
    status: "offline",
    img: "/assets/img/bg-img/user1.png",
    name: "Samantha Sarah",
    last_chat: "Would you please provide a purchase link?",
  },
  {
    id: 7,
    status: "",
    img: "/assets/img/bg-img/user2.png",
    name: "Hasnain Ahmed",
    last_chat:
      "Sure, Here are the purchase link. Please click the purchase now button,then fill up your all payment info.",
  },
  {
    id: 8,
    status: "offline",
    img: "/assets/img/bg-img/user3.png",
    name: "Shaila Afrin",
    last_chat: "You are welcome 😍😍",
  },
  {
    id: 6,
    status: "offline",
    img: "/assets/img/bg-img/user1.png",
    name: "Samantha Sarah",
    last_chat: "Would you please provide a purchase link?",
  },
  {
    id: 7,
    status: "",
    img: "/assets/img/bg-img/user2.png",
    name: "Hasnain Ahmed",
    last_chat:
      "Sure, Here are the purchase link. Please click the purchase now button,then fill up your all payment info.",
  },
  {
    id: 8,
    status: "offline",
    img: "/assets/img/bg-img/user3.png",
    name: "Shaila Afrin",
    last_chat: "You are welcome 😍😍",
  },
];
interface UserInfo {
  fullName: string;
  role: string;
  id: string;
  profilePhoto: string;
  email: string;
}

const UserList = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [chatUserList, setChatUserList] = useState<any[]>([]);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    //{"fullName":"Sarah Johnson","role":"user","id":"675642fbf9873c01577f0c8e","profilePhoto":"https://randomuser.me/api/portraits/women/31.jpg","email":"sarah@gmail.com"}
    let userInfo: UserInfo = {} as UserInfo;
    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
      setUserInfo(userInfo);
    }

    const fetchChatUserList = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chat/getList`,
          {
            user_id: userInfo.id,
          }
        );
        if (response.data.success) {
          setChatUserList(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (err: any) {
        console.log(err.response?.data?.message);
      }
    };
    fetchChatUserList();
  }, []);

  const handleBlockUser = async (userId: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/blockUser`,
        {
          user_id: userInfo.id,
          opponent_id: userId,
        }
      );
      if (response.data.success) {
        // window.location.reload();
      } else {
        console.log(response.data.message);
      }
    } catch (err: any) {
      console.log(err.response?.data?.message);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/remove`,
      {
        user_id: userInfo.id,
        opponent_id: userId,
      }
    );
    if (response.data.success) {
      window.location.reload();
    } else {
      console.log(response.data.message);
    }
  };

  return (
    <>
      {/* <!-- Element Heading --> */}
      <div className="element-heading">
        <h6 className="ps-1">Recent contacts</h6>
      </div>

      {/* <!-- Chat User List --> */}
      <ul className="ps-0 chat-user-list">
        {chatUserList.map((item, i) => (
          <li key={i} className={`p-3 ${item.status}`}>
            <Link
              className="d-flex"
              href={`/chat?opponent_id=${item.user?.id}`}
            >
              {/* <!-- Thumbnail --> */}
              <div className="chat-user-thumbnail me-3 shadow">
                <img
                  className="img-circle"
                  src={item.user?.profilePhoto}
                  alt={item.user?.fullName}
                />
                {/* <span className="active-status"></span> */}
              </div>
              {/* <!-- Info --> */}
              <div className="chat-user-info">
                <h6 className="text-truncate mb-0">{item.user?.fullName}</h6>
                <div className="last-chat">
                  <p className="mb-0 text-truncate">
                    {item.lastMessage}
                    {/* {item.unreadCount > 0 && (
                      <span className="badge rounded-pill bg-primary">
                        {item.unreadCount}
                      </span>
                    )} */}
                  </p>
                </div>
              </div>
            </Link>

            {/* <!-- Options --> */}
            <div className="dropstart chat-options-btn">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
              <ul className="dropdown-menu">
                {/* <li>
                  <a href="#">
                    <i className="bi bi-mic-mute"></i>Mute
                  </a>
                </li> */}
                <li>
                  <a href="#" onClick={() => handleBlockUser(item.user?.id)}>
                    <i className="bi bi-slash-circle"></i>Block
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => handleRemoveUser(item.user?.id)}>
                    <i className="bi bi-trash"></i>Remove
                  </a>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserList;
