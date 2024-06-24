"use client";
import { useAccount, useEnsName } from "wagmi";
import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { ethers } from "ethers";
import { useWriteContract } from "wagmi";
import { config, abi } from "@/utils";
import axios from "axios";

export function Bridge({ connected }) {
  const { address } = useAccount();
  const [brdigeFee, setFee] = React.useState(0);
  const [allowance, setAllowance] = React.useState(0);

  async function handleBridge() {
    console.log("Bridge button clicked");
    const response = await axios.get(
      "https://api.dln.trade/v1.0/dln/order/quote?srcChainId=56&srcChainTokenIn=0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d&srcChainTokenInAmount=100000000000000000000&dstChainId=43114&dstChainTokenOut=0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7&prependOperatingExpenses=true&affiliateFeePercent=0.1"
    );
    const fees =
      Number(response.data.fixFee) +
      Number(response.data.prependedOperatingExpenseCost);
    console.log(fees);

    const allowanceRes = response.data.tx.allowanceValue;
    console.log({ allowanceRes });
    setAllowance(allowanceRes);
  }
  //

  return (
    <div>
      {connected ? (
        <div>
          <button onClick={handleBridge}>
            {"  "}
            <p className="fs-3"> Bridge Me!</p>
          </button>
        </div>
      ) : (
        <div>Connect your wallet to see your buttons</div>
      )}
    </div>
  );
}
