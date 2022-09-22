import {
  createContext,
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from "react";
import { createDefaultState, loadContract, Web3State } from "./utils";
import { ethers } from "ethers";

const Web3Content = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    // function initWeb3() {
    async function initWeb3() {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const contract = await loadContract("NftMarket", provider);
      setWeb3Api({
        ethereum: window.ethereum,
        provider,
        contract,
        isLoading: false,
      });
    }

    initWeb3();
  }, []);

  return (
    <Web3Content.Provider value={web3Api}>{children}</Web3Content.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Content);
}

export default Web3Provider;
