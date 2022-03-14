import type { NextPage } from "next";
import Head from "next/head";
import { Heading, Flex } from "@chakra-ui/react";

const Home: NextPage = () => {
	return (
		<Flex
			justifyContent={"center"}
			p={8}
			alignItems="center"
			direction="column"
		>
			<Head>
				<title>home | payper</title>
			</Head>

			<Heading
				bgGradient="linear(to-r, green.200, pink.500)"
				bgClip="text"
				fontSize="6xl"
				fontWeight="extrabold"
			>
				Welcome to payper
			</Heading>
		</Flex>
	);
};

export default Home;
