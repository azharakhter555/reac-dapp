import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Web3 from "web3";
import './TicketSaleComponent.css';

const TicketSaleComponent = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [ticketsOwned, setTicketsOwned] = useState(0);
  const [ticketCount, setTicketCount] = useState(1);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    async function loadMetaMaskData() {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);
  
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          const address = accounts[0];
          setDefaultAccount(address);
  
          const balance = await web3.eth.getBalance(address);
          setUserBalance(web3.utils.fromWei(balance, 'ether'));

          // Fetch tickets owned from the smart contract
          const ticketsOwned = await fetchTicketsOwned(address);
          setTicketsOwned(ticketsOwned);
        } else {
          throw new Error("MetaMask not installed");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    // Function to fetch tickets owned from the smart contract
    async function fetchTicketsOwned(address) {
      // Placeholder function, replace with actual implementation
      return 0;
    }
  
    loadMetaMaskData();
  }, []);

  const buyTickets = async () => {
    // Placeholder function, replace with actual implementation
  };

  const refundTickets = async () => {
    // Placeholder function, replace with actual implementation
  };

  const handleRefresh = () => {
    window.location.reload();
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
            <Button variant="contained" color="primary" onClick={buyTickets}>Buy Tickets</Button>
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
