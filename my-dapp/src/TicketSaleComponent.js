import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Web3 from "web3";
import TicketMarketABI from "./contracts/TicketSale.json";
import './TicketSaleComponent.css';
import BigNumber from 'bignumber.js';

const TicketSaleComponent = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [ticketsOwned, setTicketsOwned] = useState(0);
  const [ticketCount, setTicketCount] = useState(1);
  const [web3, setWeb3] = useState(null);


  async function fetchTicketsOwned(address, contract) {
    if (contract) {
      const ticketsOwnedBigInt = await contract.methods.ticketsOwned(address).call();
      return Number(ticketsOwnedBigInt);
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
                setDefaultAccount(address); // Set defaultAccount here

                // Get user balance
                const balance = await web3.eth.getBalance(address);
                setUserBalance(web3.utils.fromWei(balance, 'ether'));

                // Instantiate the contract
                const contractAddress = "0xC8CF16BAf7f4C3CBFec071317a319fca31bD6a83";
                const contract = new web3.eth.Contract(TicketMarketABI, contractAddress);
                setContract(contract);

                // Get ticket info using the fetched defaultAccount
                const ticketInfo = await contract.methods.getTicketInfo(address).call();
                const userTickets = ticketInfo[1]; // Access the second element of the tuple
                setTicketsOwned(Number(userTickets));
            } else {
                throw new Error("MetaMask not installed");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    loadMetaMaskData();
}, []);

  async function buyTicketsFuncation() {
    if (contract) {
      try {
        const valueInWei = web3.utils.toWei(new BigNumber(ticketCount).times(0.0000001).toFixed(), 'ether');
        await contract.methods.buyTickets(ticketCount).send({ from: defaultAccount, value: valueInWei });
        const tickets = await fetchTicketsOwned(defaultAccount, contract);
        setTicketsOwned(tickets);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  }

  async function refundTickets() {
    if (contract) {
      try {
        await contract.methods.withdrawTickets().send({ from: defaultAccount });
        const tickets = await fetchTicketsOwned(defaultAccount, contract);
        setTicketsOwned(tickets);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  }


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
          <p>Tickets Owned: {ticketsOwned}</p>
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
