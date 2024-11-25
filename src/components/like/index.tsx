import React from "react";
import SearchResultArea from "./SearchResultArea";
import FooterTwo from "@/layouts/footers/FooterTwo";
import HeaderFour from "@/layouts/headers/HeaderFour";

const Like = () => {
	return (
		<>
			<HeaderFour links="pages" title="Likes" />
			<SearchResultArea />
			<FooterTwo />
		</>
	);
};

export default Like;
