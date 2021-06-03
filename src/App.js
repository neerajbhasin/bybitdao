import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import useWeb3Modal from "./hooks/useWeb3Modal";
import { getContracts } from "./getWeb3";
//all components
import Home from "./components/Home/Home";
import WalletButton from "./components/WalletButton/WalletButton";
function App() {
  // const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal, contracts] =
    useWeb3Modal();

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
              <WalletButton
                provider={provider}
                loadWeb3Modal={loadWeb3Modal}
                logoutOfWeb3Modal={logoutOfWeb3Modal}
              />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* {isReady() && accounts.length > 0 ? (
        
      ) : (
        <p>Connecting with metamask...!</p>
      )} */}
      <Home provider={provider} contracts={contracts} />
    </div>
  );
}

export default App;
