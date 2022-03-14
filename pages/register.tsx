import React from "react";
import { Box, Flex, Heading, Input } from "@chakra-ui/react";

const Register = () => {
	return (
		<Box>
			<Flex
				justifyContent={"center"}
				alignContent="center"
				direction={"column"}
				p={8}
				textAlign="center"
			>
				<Heading my="4">Register a new account</Heading>

				<Input mt="2" placeholder="Enter your preferred name" />
			</Flex>
		</Box>
	);
};

export default Register;
