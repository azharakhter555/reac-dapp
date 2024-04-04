import logo from './logo.svg';
import './App.css';
import MetaMaskComponent from "./MetaMaskComponent";
import TicketSaleComponent from "./TicketSaleComponent"; // Import the TicketSaleComponent

function App() {
  return (
    <div className="App">
      <MetaMaskComponent />
      <TicketSaleComponent/>
    </div>
  );
}

export default App;
