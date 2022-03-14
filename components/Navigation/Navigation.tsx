import { Flex, Box, Text, Button, Image } from "@chakra-ui/react";

const Navigation = ({ onConnect, address }: any) => {
	return (
		<Box>
			<Flex
				justifyContent="space-between"
				mx={8}
				direction="row"
				alignItems="center"
			>
				<Image src="payper.png" h={16} mt={2}></Image>

				{address ? (
					<Button colorScheme={"blackAlpha"}>
						{address.substring(0, 3) +
							"..." +
							address.substring(
								address.length - 3,
								address.length
							)}
					</Button>
				) : (
					<Button colorScheme={"blackAlpha"} onClick={onConnect}>
						Connect Wallet
					</Button>
				)}
			</Flex>
		</Box>
	);
};

export default Navigation;
