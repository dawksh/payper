import React, { useContext, useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { web3Modal } from "../../utils/web3Modal";
import { providers } from "ethers";
import { web3Context } from "../../utils/web3";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }: any) => {
	const conf = () => {
		const temp = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER");
		console.log(temp);
		if (temp === "injected") {
			return true;
		} else {
			return false;
		}
	};

	const [web3, setWeb3] = useContext(web3Context);
	const [address, setAddress] = useState<null | string>(null);

	const onConnect = async () => {
		const provider = await web3Modal.connect();
		const web3Provider = new providers.Web3Provider(provider);

		const signer = web3Provider.getSigner();
		const address = await signer.getAddress();

		let chainID = await signer.getChainId();

		if (chainID != (process.env.NEXT_PUBLIC_APP_CHAINID as any)) {
		} else {
			setAddress(address);
			setWeb3(web3Provider);
		}
	};

	return (
		<Box p={4}>
			<Navigation onConnect={onConnect} address={address} />
			{children}
		</Box>
	);
};

export default Layout;
