import { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import COMPABI from "../abi/Comp.json";
// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = "3f2d7215aec24e57ae58f4656a59fe7d";

const NETWORK_NAME = "rinkeby";

function useWeb3Modal(config = {}) {
  const [provider, setProvider] = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const [contracts, setContracts] = useState(undefined);
  const {
    autoLoad = true,
    infuraId = INFURA_ID,
    NETWORK = NETWORK_NAME,
  } = config;

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = new Web3Modal({
    network: NETWORK,
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId,
        },
      },
    },
  });

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    console.log(newProvider);
    const web3 = new Web3(newProvider);
    const contracts = await getContracts(web3);

    setProvider(web3);
    setContracts(contracts);
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal]
  );
  const getContracts = async (provider) => {
    const networkId = await provider.eth.net.getId();

    const deployedNetwork = COMPABI.networks[networkId];
    const comp = new provider.eth.Contract(
      COMPABI.abi,
      "0x0E51Ac179A2f148a7F1a8Ac62882258aE40B85d8"
    );
    console.log(comp);
    return comp;
  };
  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [
    autoLoad,
    autoLoaded,
    loadWeb3Modal,
    setAutoLoaded,
    web3Modal.cachedProvider,
  ]);

  return [provider, loadWeb3Modal, logoutOfWeb3Modal, contracts];
}

export default useWeb3Modal;
