import type { NextPage } from "next";
import Head from "next/head";
import { Heading, Flex, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

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
			<Heading fontSize="6xl" fontWeight="extrabold">
				Payper
			</Heading>
			<Text my={8}>
				Hi, I apologise if you&apos;re seeing this, I started to build
				this but I couldn&apos;t find any teammates and I have exams so
				I couldn&apos;t complete it alone. But I will take my time to
				explain to you my thinking and future of this project.
			</Text>
			<Text my={4}>
				<Text fontWeight={"bold"} fontSize={"4xl"}>
					Payper
				</Text>
				is a paperless payments solution which helps you pay to
				registered merchants in stables.
			</Text>
			<Text></Text>
			<Text my={4}>
				If you&apos;re an Indian, you know what is UPI. I wanted to
				build a system similar to that on top of Ethereum, more
				specifically on polygon because, you know, low gas. If you
				don&apos;t know what UPI is, Unified Payments Interface is an
				instant real-time payment system developed by National Payments
				Corporation of India facilitating inter-bank peer-to-peer and
				person-to-merchant transactions.
			</Text>
			<Text my={4}>
				Being a crypto bro I would like to use it to pay at places. I
				had this idea when my UPI wasn&apos;t working and I was
				embarassing myself in front of a shopkeeper. I thought what if
				he accepted USDC, I could&apos;ve easily paid him 10 folds.
			</Text>
			<Text my={6}>
				The next question was how can he accept crypto? 2 problems that
				came to my mind were:
				<li>Volatility</li>
				<li>Ease of conversion to fiat</li>I can easily think of
				converting to stables as a way to tackle volatility of prices. I
				thought of using Uniswap V3 to swap from native ETH and MATIC to
				USDx or DAI. I have been struggling for a month now to use
				Uniswap&apos;s contracts. Maybe I&apos;m too dumb or
				there&apos;s a typo in my contract but it doesn&apos;t seem to
				work. If you feel like you can help, I&apos;d love your help,
				please reach out to me on{" "}
				<Link href={"https://twitter.com/0xDak"}>twitter</Link>. Any
				feedback or suggestion is also appreciated :)
			</Text>
			<Text>
				For the Ease of conversion, I still have no leads, so again, if
				you have any pointers, my dms are open. I have been looking at
				CoinDCX&apos;s APIs and I&apos;ll look at WazirX&apos;s api to
				somehow verify users and initiate a swap.
			</Text>
			For now you can register a name on chain on polygon testnet and
			I&apos;ll try to make sure you have a reserved username when this
			rolls out on mainnet! If you think this is a good idea and want to
			buidl it beside me, feel free to reach out. Cheers!
			<Button colorScheme={"blackAlpha"}>
				<Link href={"/register"}> Register Name Here </Link>
			</Button>
		</Flex>
	);
};

export default Home;
