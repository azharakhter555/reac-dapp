import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Web3 from "web3";
import TicketMarketABI from "./contracts/TicketSale.json"; // Import your contract ABI
import './TicketSaleComponent.css';
import BigNumber from 'bignumber.js'; // Import BigNumber library

const TicketSaleComponent = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [ticketsOwned, setTicketsOwned] = useState(0);
  const [ticketCount, setTicketCount] = useState(1);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  // Function to fetch tickets owned from the smart contract
  async function fetchTicketsOwned(address, contract) {
    if (contract) {
      return await contract.methods.ticketsOwned(address).call();
    }
    return 0;
  }

  useEffect(() => {
    async function loadMetaMaskData() {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);

          // Request MetaMask account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          const address = accounts[0];
          setDefaultAccount(address);

          // Get user balance
          const balance = await web3.eth.getBalance(address);
          setUserBalance(web3.utils.fromWei(balance, 'ether'));

          // Instantiate the contract
          const contractAddress = "0xC8CF16BAf7f4C3CBFec071317a319fca31bD6a83"; // Replace with your contract address
          const contract = new web3.eth.Contract(TicketMarketABI, contractAddress);
          setContract(contract);

          // Fetch tickets owned from the smart contract
          const tickets = await fetchTicketsOwned(address, contract);
          setTicketsOwned(tickets);
        } else {
          throw new Error("MetaMask not installed");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    loadMetaMaskData();
  }, []);

  const buyTicketsFuncation = async () => {
    if (contract) {
      try {
        // Calculate the total value in Wei using JavaScript's Number type
        const valueInWei = web3.utils.toWei(new BigNumber(ticketCount).times(0.0000001).toString(), 'ether');
        // Call the buyTickets function of the contract and send the value
        await contract.methods.buyTickets(Number(ticketCount)).send({ value: valueInWei });
        // Refresh tickets owned after transaction
        const tickets = await fetchTicketsOwned(defaultAccount, contract);
        setTicketsOwned(tickets);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };
  

  const refundTickets = async () => {
    if (contract) {
      try {
        await contract.methods.withdrawTickets().send();
        // Refresh tickets owned after transaction
        const tickets = await fetchTicketsOwned(defaultAccount, contract);
        setTicketsOwned(tickets);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="metamask-component">
      <div className="content">
        {errorMessage && <p className="error">{errorMessage}</p>}
        {defaultAccount && (
          <div className="account-info">
            <h2>Account Information</h2>
            <p><strong>Address:</strong> {defaultAccount}</p>
            <p><strong>Balance:</strong> {userBalance} ETH</p>
          </div>
        )}
        <div className="ticket-section">
          <h2>Buy Tickets</h2>
          <div className="ticket-card">
            <p>Tickets Owned: {ticketsOwned}</p>
            <input type="number" value={ticketCount} onChange={(e) => setTicketCount(e.target.value)} />
            <Button variant="contained" color="primary" onClick={buyTicketsFuncation}>Buy Tickets</Button>
          </div>
        </div>
        <div className="refund-section">
          <h2>Refund Tickets</h2>
          <div className="refund-card">
            <p>Refund Tickets</p>
            <Button variant="contained" color="secondary" onClick={refundTickets}>Refund Tickets</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSaleComponent;
