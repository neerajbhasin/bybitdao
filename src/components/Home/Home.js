import React from "react";
import { Container, Row, Col, Form, Button, Accordion } from "react-bootstrap";
import { onError } from "../../hooks/errorLib";
import { useFormFields } from "../../hooks/hooksLib";

import "./Home.css";

function Home({ web3, contracts, accounts }) {
  const gas = web3.utils.toHex(300000);

  const [fields, handleFieldChange] = useFormFields({
    delegateAddress: "",
  });

  const delegateUser = async (address) => {
    const result = await contracts.methods
      .delegate(address)
      .send({ from: accounts[0], gas: gas });

    return result;
  };
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(fields.delegateAddress);

    const receipt = await delegateUser(fields.delegateAddress);
    console.log(receipt);
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
          </Col>
          <Col md={3}>
            <Col className="totalTokenAmountContainer" bg="light">
              <Row>
                <Col>
                  <span className="stakedSymbol"></span>
                  <span className="">TBD</span>
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
