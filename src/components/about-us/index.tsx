
"use client"
import React from "react";
// import AboutArea from "./AboutArea";
import FooterTwo from "@/layouts/footers/FooterTwo";
import HeaderTwo from "@/layouts/headers/HeaderTwo";

import dynamic from 'next/dynamic';
const AboutArea = dynamic(() => import('./AboutArea'), { ssr: false });



const Aboutus = () => {
	return (
		<>
			<HeaderTwo />
			<AboutArea />
			<FooterTwo />
		</>
	);
};

export default Aboutus;
