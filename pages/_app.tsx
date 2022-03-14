import type { AppProps } from "next/app";
import Layout from "../components/Layout/Base.Layout";
import Web3 from "../utils/web3";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";

const theme = extendTheme({
	fonts: {
		body: "Inter",
		heading: "Inter",
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Web3>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Web3>
		</ChakraProvider>
	);
}

export default MyApp;
