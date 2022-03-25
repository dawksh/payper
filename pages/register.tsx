import React, { useContext, useState } from "react";
import {
	Box,
	Button,
	Flex,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalOverlay,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	InputGroup,
	InputRightAddon,
	useClipboard,
	useDisclosure,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Code,
} from "@chakra-ui/react";
import { web3Context } from "../utils/web3";
import { ethers } from "ethers";
import abi from "../utils/Payper.json";
import Head from "next/head";

const Register = () => {
	const [web3Provider] = useContext(web3Context);
	const [name, setName] = useState("");
	const [txn, setInTxn] = useState<boolean>(false);
	const [currency, setCurrency] = useState<null | Number>(null);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { hasCopied, onCopy } = useClipboard(
		`https://localhost:3000/pay/${name}`
	);

	let contract;

	const checkDetails = () => {
		if (currency != null && name.length >= 3 && web3Provider) {
			checkNameAndRegister();
		} else if (name.length < 3) {
			alert("Name length should be greater than 3.");
		} else if (currency == null) {
			alert("No Currency Selected");
		} else if (!web3Provider) {
			alert("Connect Wallet");
		}
	};

	const checkNameAndRegister = async () => {
		setInTxn(true);
		const signer = web3Provider.getSigner();
		contract = new ethers.Contract(
			process.env.NEXT_PUBLIC_APP_CONTRACT as string,
			abi.abi,
			signer
		);
		let bool = await contract.checkNameExists(name);

		if (!bool) {
			try {
				let txn = await contract.registerName(name, currency, {
					value: ethers.utils.parseEther("0.5"),
				});
				await txn.wait();
				onOpen();
			} catch (e) {
				console.log(e);
				setInTxn(false);
			}
		} else {
			alert("Name is already in use");
			setName("");
		}
		setInTxn(false);
	};

	return (
		<Box>
			<Head>
				<title>register | payper</title>
			</Head>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Name Successfully Registered!</ModalHeader>
					<ModalCloseButton />
					<ModalBody mb={4}>
						<Code>{name}</Code> is succesfully registered! Share
						this link with others for receiving payments.
						<InputGroup>
							<Input
								my={4}
								value={`https://localhost:3000/pay/${name}`}
								readOnly={true}
							/>
							<InputRightAddon my={4} p={0}>
								<Button onClick={onCopy} px={8}>
									{hasCopied ? "Copied!" : "Copy"}
								</Button>
							</InputRightAddon>
						</InputGroup>
					</ModalBody>
				</ModalContent>
			</Modal>

			<Flex
				justifyContent={"center"}
				alignContent="center"
				direction={"column"}
				p={8}
				textAlign="center"
			>
				<Heading my="4">Register a new account</Heading>

				<Input
					value={name}
					onChange={(e: any) => {
						setName(e.target.value);
					}}
					mt="2"
					placeholder="Enter your preferred name"
				/>

				<Menu>
					<MenuButton as={Button} placeholder={"hi"} my={4}>
						{currency != null ? "USDC" : "Select a Currency"}
					</MenuButton>
					<MenuList>
						<MenuItem
							onClick={() => {
								setCurrency(0);
							}}
						>
							USDC
						</MenuItem>
					</MenuList>
				</Menu>

				<Button
					colorScheme={"blackAlpha"}
					my={4}
					isLoading={txn}
					onClick={() => {
						checkDetails();
					}}
				>
					Register
				</Button>
			</Flex>
		</Box>
	);
};

export default Register;
