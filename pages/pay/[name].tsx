import { useRouter } from "next/router";
import { Box, Flex, Heading, Input, Button } from "@chakra-ui/react";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { web3Context } from "../../utils/web3";
import { ethers } from "ethers";
import abi from "../../utils/Payper.json";
import { quote } from "../../utils/QuoterHelper";
import { getUSDCQuote } from "../../utils/fetchData";

const Name = () => {
	const [web3Provider] = useContext(web3Context);
	const [address, setAddress] = useState<any>(null);
	const [amount, setAmount] = useState<any>("");
	const [price, setPrice] = useState<any>("");
	let router = useRouter();
	let { name } = router.query;

	let contract: any;

	const getName = async () => {
		if (name) {
			contract = new ethers.Contract(
				process.env.NEXT_PUBLIC_APP_CONTRACT as string,
				abi.abi,
				new ethers.providers.JsonRpcProvider(
					process.env.NEXT_PUBLIC_APP_URI
				)
			);

			getUSDCQuote().then((res) => {
				setPrice(res.data.prices[0].price);
			});
			try {
				let txn = await contract.resolveName(name);
				setAddress(txn);
				return txn;
			} catch (e) {
				console.log(e);
			}
		}
	};

	const parsePrice = () => {
		const amount = ethers.utils.formatUnits(price, 8);
		return parseFloat(amount);
	};

	const convertTokens = async () => {
		let cost = parsePrice();
		let MATIC: any = parseFloat(amount) / cost;
		console.log(MATIC);
		quote(12);
	};

	useEffect(() => {
		getName();
	}, [name]);

	return (
		<Box p={4}>
			<Head>
				<title>pay {name} | payper</title>
			</Head>
			{address ? (
				<Flex
					justifyContent={"center"}
					alignItems="center"
					direction={"column"}
				>
					<Heading my={4}>Pay {name}</Heading>

					<Input
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Amount in USD"
						type={"number"}
					/>
					<Button
						onClick={convertTokens}
						my={4}
						colorScheme="blackAlpha"
					>
						Pay now
					</Button>
				</Flex>
			) : (
				<Flex alignItems={"center"} justifyContent="center">
					<Button alignSelf={"center"} isLoading={true}>
						loading
					</Button>
				</Flex>
			)}
		</Box>
	);
};

export default Name;
