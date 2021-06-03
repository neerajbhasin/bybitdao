import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { onError } from "../../hooks/errorLib";
import { useFormFields } from "../../hooks/hooksLib";

import "./Home.css";

function Home({ provider, contracts }) {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxhash] = useState("");
  const [accounts, setAccounts] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [fields, handleFieldChange] = useFormFields({
    delegateAddress: "",
  });

  useEffect(() => {
    const balance = async () => {
      const accounts = await provider.eth.getAccounts();
      const balance = await contracts.methods.balanceOf(accounts[0]);
      setAccounts(accounts[0]);
      setBalance(balance);
    };
    // balance();
  }, []);
  const delegateUser = async (address) => {
    const accounts = await provider.eth.getAccounts();
    console.log(accounts);
    const result = await contracts.methods
      .delegate(address)
      .send({ from: accounts[0], gas: 300000 });
    return result;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(fields.delegateAddress);
    setLoading(true);
    const receipt = await delegateUser(fields.delegateAddress);
    if (receipt.transactionHash) {
      setLoading(false);
      setTxhash(receipt.transactionHash);
    }
  }
  return (
    <div className="delegateForm">
      <Container>
        <Row>
          <Col md={9} className="delegateFormContainer">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="delegateAddress">
                {/* <Form.Label>Delegate Address</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Enter delegate address"
                  onChange={handleFieldChange}
                />
              </Form.Group>

              {/* <Form.Group className="mb-3">
                /* <Form.Label>Amount of Tokens</Form.Label> 
                // <Form.Control
                //   type="text"
                //   placeholder="Amount of tokens to delegate"
                // />
              </Form.Group> */}
              {/* <Form.Group className="mb-3">
                <select class="form-control" id="votingandproposal">
                  <option>Voting and Proposal Creation Stake</option>
                  <option>Voting Stake</option>
                  <option>Proposal Creation Stak</option>
                </select>
              </Form.Group> */}

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            {loading ? "In progress...." : txHash}
          </Col>
          <Col md={3}>
            <Col className="totalTokenAmountContainer" bg="light">
              <Row>
                <Col>
                  <span className="stakedSymbol"></span>
                  <span className="">{balance}</span>
                  <p className="stakedValue">985,125</p>
                </Col>
                <Col>
                  <span className="stakedSymbol"></span>
                  <span className="">xTBD</span>
                  <p className="stakedValue">985,125</p>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;
