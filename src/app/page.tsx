"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { ethers } from "ethers";
import React from "react";
import { useAccount, useEnsName } from "wagmi";
import { Profile } from "./profile";
import { Bridge } from "./controlPanel";

export default function Home() {
  const [connected, isConnected] = React.useState(false);
  const [account, setAccount] = React.useState("");
  const [allowance, setAllowance] = React.useState(0);
  async function handleConnect() {
    if (window.ethereum) {
      if (connected === false) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        isConnected(true);
      } else {
        isConnected(false);
      }
    } else {
      console.log("no ethereum");
    }
  }
  return (
    <main className={styles.main}>
      <button className={styles.logo} onClick={handleConnect}>
        {" "}
        {connected === false ? <p>Connect Wallet</p> : <p>Disconnect</p>}
      </button>
      <Profile connected={connected} />
      <Bridge connected={connected} />
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
