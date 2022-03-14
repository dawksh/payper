import React, { useState, createContext } from "react";

export const web3Context: any = createContext([]);

const Web3 = ({ children }: any) => {
	const [web3, setWeb3] = useState<any>();

	return (
		<web3Context.Provider value={[web3, setWeb3]}>
			{children}
		</web3Context.Provider>
	);
};

export default Web3;
