import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import useWeb3Modal from "./hooks/useWeb3Modal";

import { getWeb3, getContracts } from "./getWeb3";
//all components
import Home from "./components/Home/Home";
import WalletButton from "./components/WalletButton/WalletButton";
function App() {
  // const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  const [web3, setWeb3] = useState("undefined");
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState("undefined");

  useEffect(() => {
    //listening to metamask and retieving the accounts and contracts
    const init = async () => {
      const web3 = await getWeb3();
      const contracts = await getContracts(web3);
      const accounts = await web3.eth.getAccounts();
      setWeb3(web3);
      setContracts(contracts);
      setAccounts(accounts);
      console.log(web3, contracts, accounts);
    };
    init();
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccounts(accounts);
    });
  }, []);

  const isReady = () => {
    return (
      typeof web3 != "undefined" &&
      typeof contracts != "undefined" &&
      accounts.length >= 0
    );
  };
  return (
    <div>
      <Navbar
        bg="light"
        variant="light"
        style={{ borderBottom: "3px solid #e6e6e6" }}
      >
        <Container>
          <Navbar.Brand href="#home">
            {/* <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "} */}
            ByBit
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {/* <WalletButton
                provider={provider}
                loadWeb3Modal={loadWeb3Modal}
                logoutOfWeb3Modal={logoutOfWeb3Modal}
              /> */}
              {accounts.length > 0
                ? accounts[0].slice(0, 6) + "...." + accounts[0].slice(-6)
                : ""}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {isReady() && accounts.length > 0 ? (
        <Home web3={web3} contracts={contracts} accounts={accounts} />
      ) : (
        <p>Connecting with metamask...!</p>
      )}
    </div>
  );
}

export default App;
