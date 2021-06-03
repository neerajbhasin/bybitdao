import Web3 from "web3";
import COMPABI from "./abi/Comp.json";

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      // Fallback to localhost; use dev console port by default...
      else {
        alert("Please connect to metamask");
      }
    });
  });
};

const getContracts = async (web3) => {
  const networkId = await web3.eth.net.getId();

  const deployedNetwork = COMPABI.networks[networkId];
  const comp = new web3.eth.Contract(
    COMPABI.abi,
    "0x0E51Ac179A2f148a7F1a8Ac62882258aE40B85d8"
  );

  return comp;
};

export { getWeb3, getContracts };
