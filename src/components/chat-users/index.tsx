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

			<div className="page-content-wrapper py-3">
				{/* <!-- Add New Contact --> */}
				<div className="add-new-contact-wrap">
					<a
						className="shadow"
						href="#"
						data-bs-toggle="modal"
						data-bs-target="#addnewcontact"
					>
						<i className="bi bi-plus-lg"></i>
					</a>
				</div>

				<div className="container">
					{/* <SearchArea /> */}
					{/* <UserArea /> */}
					<UserList />
				</div>
			</div>

			<FooterTwo />
		</>
	);
};

export default ChatUsers;
