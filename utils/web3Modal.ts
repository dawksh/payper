import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";


const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
       rpc: {
        137: "https://rpc-mainnet.maticvigil.com/",
      },
      network: "matic",
    }
  }
};

let web3Modal: any;

if(typeof window !== "undefined") {
    web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions
    });
}

export { web3Modal }