"use client";
import { useAccount, useEnsName } from "wagmi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { ethers } from "ethers";
import { useWriteContract, useReadContract } from "wagmi";
import { config, abi } from "@/utils";
import { get } from "http";
import { switchChain } from "@wagmi/core";

// import { switchChain } from "viem/actions";

const contractAddress = "0x676407aae883dA2D2a53Bd4C318758B315F8f5ad";

export function Profile({ connected }) {
  const { address, chainId } = useAccount();
  const {
    data: ensData,
    error: ensError,
    isLoading: ensLoading,
  } = useEnsName({ address, chainId: 1 });
  const [supply, setSupply] = useState(0);
  const { data: hash, writeContract, isSuccess } = useWriteContract();

  const {
    data: supplyData,
    isSuccess: suc,
    error,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "totalSupply",
    chainId: 11155420,
  });
  // import { readContract } from "wagmi/core";
  const getTotalSupply = async () => {
    if (suc || isSuccess) {
      setSupply(Number(supplyData));
    } else {
      console.log({ error });
    }
  };

  // Use Effect to get Total Minted Amount
  useEffect(() => {
    getTotalSupply();
  }, [getTotalSupply, supply, isSuccess, hash]);

  // Use Effect to switch provider chain to be OP Sepolia
  useEffect(() => {
    if (chainId !== 11155420) {
      switchChain(config, { chainId: 11155420 });
    }
  }, [chainId]);

  // Mint function which is triggered on click
  async function handleMint() {
    try {
      writeContract({
        address: contractAddress,
        abi,
        functionName: "safeMint",
        args: [address],
        chainId: 11155420,
      });
      getTotalSupply();
    } catch (error) {
      console.error("Minting error:", error);
    }
  }
  // Ternary operator to display the correct profile state.
  return (
    <div>
      {connected ? (
        ensLoading ? (
          <div>Loading ENS name</div>
        ) : ensError ? (
          <div>Error fetching ENS name: {ensError.message}</div>
        ) : (
          <div>
            <p>ENS name: {ensData}</p>
            <p>Address: {address}</p>
            <div>{hash && <p>Transaction Hash: {hash}</p>}</div>
            <div>Total Supply: {Number(supplyData)}</div>
            <div>
              <p>Click the button to mint a token</p>
              <button onClick={handleMint}>
                <p className="fs-3">Mint Me!</p>
              </button>
            </div>
          </div>
        )
      ) : (
        <div>Connect your wallet to see your profile</div>
      )}
    </div>
  );
}
