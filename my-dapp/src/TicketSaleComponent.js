import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Web3 from "web3";
import TicketMarketABI from "./contracts/TicketSale.json";
import './TicketSaleComponent.css';
import BigNumber from 'bignumber.js';

const TicketSaleComponent = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [transferTo, setTransferTo] = useState(""); // State to hold the recipient address
  const [transferCount, setTransferCount] = useState(0); // State to hold the number of tickets to transfer
  const [contract, setContract] = useState(null);
  const [contractBalance, setContractBalance] = useState(0);
  const [contractAddress, setContractAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [ticketsOwned, setTicketsOwned] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
  const [web3, setWeb3] = useState(null);


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

              
                const ticketInfo = await contract.methods.getTicketInfo(address).call();
                const userTickets = ticketInfo[1]; // Access the second element of the tuple
              setTicketsOwned(Number(userTickets));
              
              const contractbalance = await contract.methods.getContractBalance().call();
              setContractBalance(contractbalance);

              // Get contract address
              const constractaddress = await contract.methods.getContractAddress().call();
              setContractAddress(constractaddress);
            } else {
                throw new Error("MetaMask not installed");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    loadMetaMaskData();
}, []);

  
  
async function fetchTicketsOwned(address, contract) {
  if (web3 && contract) {
    const ticketsOwnedBigInt = await contract.methods.ticketsOwned(address).call();
    return Number(ticketsOwnedBigInt);
  }
  return 0;
}

async function buyTicketsFuncation() {
  if (web3 && contract) { // Check if web3 is not null
    try {
      const valueInWei = web3.utils.toWei(new BigNumber(ticketCount).times(0.0000001).toFixed(), 'ether');
      await contract.methods.buyTickets(ticketCount).send({ from: defaultAccount, value: valueInWei });
      const tickets = await fetchTicketsOwned(defaultAccount, contract);
      setTicketsOwned(tickets);
    } catch (error) {
      setErrorMessage(error.message);
    }
  } else {
    setErrorMessage("web3 is not initialized");
  }
}

async function refundTickets() {
  if (web3 && contract) { // Check if web3 is not null
    try {
      await contract.methods.withdrawTickets().send({ from: defaultAccount });
      const tickets = await fetchTicketsOwned(defaultAccount, contract);
      setTicketsOwned(tickets);
    } catch (error) {
      setErrorMessage(error.message);
    }
  } else {
    setErrorMessage("web3 is not initialized");
  }
  }
  
async function transferTicketsFunction() {
    if (web3 && contract) { 
      try {
        // Call the smart contract function to transfer tickets
        await contract.methods.transferTickets(transferTo, transferCount).send({ from: defaultAccount });
        // Update the user's ticket count after transfer
        const tickets = await fetchTicketsOwned(defaultAccount, contract);
        setTicketsOwned(tickets);
        // Clear input fields after successful transfer
        setTransferTo("");
        setTransferCount(0);
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("web3 is not initialized");
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
      {web3 && contract && ( // Conditional rendering
        <>
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
          <div className="contract-info">
            <h2>Contract Information</h2>
            <p><strong>Contract Address:</strong> {contractAddress}</p>
            <p><strong>Contract Balance:</strong> {web3.utils.fromWei(contractBalance, 'ether')} ETH</p>
          </div>

          <div className="transfer-section">
          <p>Tickets Owned: {ticketsOwned}</p>
  <h2>Transfer Tickets</h2>
  <div className="transfer-card">
    <input 
      type="text" 
      placeholder="Recipient Address"
      value={transferTo} 
      onChange={(e) => setTransferTo(e.target.value)} 
    />
    <input 
      type="number" 
      placeholder="Number of Tickets" 
      value={transferCount} 
      onChange={(e) => setTransferCount(e.target.value)} 
    />
    <Button 
      variant="contained" 
      color="primary" 
      onClick={transferTicketsFunction}
    >
      Transfer Tickets
    </Button>
  </div>
</div>
          
        </>
      )}
    </div>
  </div>
);
};

export default TicketSaleComponent;
