import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Web3 from "web3";
import logo from './logo.svg';
import './MetaMaskComponent.css';

const MetaMaskComponent = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
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
  
          // Fetch all transactions using Sepolia Etherscan API
          const apiUrl = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=5UST6K91HPMXPUPHG2USKJJ2QDWD9UJQSS`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          console.log("here", data)
          // Set only the newest 10 transactions
          setTransactions(data.result.slice(0, 10));
        } else {
          throw new Error("MetaMask not installed");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  
    loadMetaMaskData();
  }, []);

  const handleRefresh = async () => {
    try {
      const balance = await web3.eth.getBalance(defaultAccount);
      setUserBalance(web3.utils.fromWei(balance, 'ether'));
      const apiUrl = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${defaultAccount}&startblock=0&endblock=99999999&sort=desc&apikey=5UST6K91HPMXPUPHG2USKJJ2QDWD9UJQSS`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTransactions(data.result.slice(0, 10));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="metamask-component">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title">Welcome to React DApp with MetaMask</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </header>
      <div className="content">
        {errorMessage && <p className="error">{errorMessage}</p>}
        {defaultAccount && (
          <div className="account-info">
            <h2>Account Information</h2>
            <p><strong>Address:</strong> {defaultAccount}</p>
            <p><strong>Balance:</strong> {userBalance} ETH</p>
          </div>
        )}
        {transactions?.length > 0 && (
          <div className="transaction-info">
            <h2>Newest Transactions</h2>
            <ul>
              {transactions.map((tx, index) => (
                <li key={index}>
                  <strong>Hash:</strong> {tx.hash}, <strong>Value:</strong> {web3.utils.fromWei(tx.value, 'ether')} ETH
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetaMaskComponent;
