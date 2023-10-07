"use client";

import { nodejs, python } from "../helpers/doc-code";
import { FC, useState } from "react";
import SimpleBar from "simplebar-react";
import Code from "@/ui/code.cmp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs.cmp";
// import Button from "./ui/btn.cmp";
import "simplebar-react/dist/simplebar.min.css";

const DocTabs: FC = () => {
	// const [animated, setAnimated] = useState(true);

	// const toggleAnimate = () => {
	// 	setAnimated(!animated);
	// };

	return (
		<Tabs defaultValue='nodejs' className='max-w-2xl w-full text-'>
			<TabsList>
				<TabsTrigger value='nodejs'>NodeJS</TabsTrigger>
				<TabsTrigger value='python'>Python</TabsTrigger>
			</TabsList>
			{/* <div className='flex justify-start py-2'>
				<Button onClick={toggleAnimate}>Animate</Button>
			</div> */}
			<TabsContent value='nodejs'>
				<SimpleBar forceVisible='y'>
					<Code animated code={nodejs} language='jsx' show />
				</SimpleBar>
				{/* <Code animated={true} code={nodejs} language='jsx' show /> */}
			</TabsContent>
			<TabsContent value='python'>
				<SimpleBar forceVisible='y'>
					<Code animated code={python} language='tsx' show />
					{/* NOTE: language='python' doesn't work, prism-react-renderer docs show python as option but no syntax highlighting rendered */}
				</SimpleBar>
				{/* <Code animated={true} code={python} language='python' show /> */}
			</TabsContent>
		</Tabs>
	);
};

export default DocTabs;

/*
    - IDEA:
        - could add local state tied to button which toggles the <... animated> prop for UX
*/
