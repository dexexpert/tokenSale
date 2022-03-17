import React from "react";
import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";
import ccf from "./token";
import presaleAbi from "./presale";

function App() {
  const tokenAAddress = "0xA90761C369320567DB7d9C2667187c24de41735a";
  const tokenBAddress = "0x1b170c7F2B2a32c430259679709623acA80F5C0B";
  const presaleAddress = "0x99A0ebA11a3294C0e5609B7ed9f33827bd694504";

  const [buyAmount, setBuyAmount] = useState(0);
  const [resultOfBalance, setResultOfBalance] = useState("");

  const [showPanel, togglePanel] = useState(false);

  const approve1 = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const evotInstance = new ethers.Contract(
      presaleAddress,
      presaleAbi,
      signer
    );

    const tokenInstance = new ethers.Contract(tokenBAddress, ccf, signer);

    const exchangeRatio1 = await evotInstance.exchangeRatio();

    await tokenInstance.approve(
      presaleAddress,
      (buyAmount * exchangeRatio1 * 10 ** 14).toString()
    );
  };

  const buy = async () => {
    togglePanel(true);
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const evotInstance = new ethers.Contract(
      presaleAddress,
      presaleAbi,
      signer
    );

    await evotInstance.Buy((buyAmount * 10 ** 18).toString());

    togglePanel(false);
  };

  const onChange = async (e) => {
    await setBuyAmount(e.target.value);
  };

  return (
    <div className="App">
      <div className="heading">
        <p>Your tokenB amount : {resultOfBalance}</p>
      </div>
      <div className="heading">
        Buy Amount : <input value={buyAmount} onChange={onChange}></input>
        <button
          onClick={approve1}
          style={{
            width: "200px",
            marginTop: "10px",
            marginBottom: "20px",
            backgroundColor: "tomato",
            color: "white",
            border: "none",
          }}
          className="heading"
        >
          Approve token B
        </button>
        <button
          onClick={buy}
          style={{
            width: "200px",
            marginBottom: "20px",
            backgroundColor: "tomato",
            color: "white",
            border: "none",
          }}
          className="heading"
        >
          Buy Token A
        </button>
      </div>
      {showPanel && (
        <div className="middle-container">
          <img
            src="https://media.giphy.com/media/2A6xoqXc9qML9gzBUE/giphy.gif"
            alt="LOADING..."
          />
        </div>
      )}
    </div>
  );
}

export default App;
