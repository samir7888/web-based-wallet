import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PublicKey, Connection } from "@solana/web3.js";

const ShowBalance = () => {
  const { network, key } = useParams(); // expects /eth/:key or /sol/:key
  const [balance, setBalance] = useState("Loading...");

  useEffect(() => {
    if (!network || !key) return;

    const fetchBalance = async () => {
      try {
        if (network === "eth") {
          const res = await fetch("https://eth-mainnet.g.alchemy.com/v2/rD8OkCgKs4QZF0yobCk2zFr9nyHZ1mFl", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "eth_getBalance",
              params: [key, "latest"],
            }),
          });
          const data = await res.json();
          const wei = BigInt(data.result);
          const eth = Number(wei) / 1e18;
          setBalance(`${eth.toFixed(6)} ETH`);
        } else if (network === "sol") {
          const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/rD8OkCgKs4QZF0yobCk2zFr9nyHZ1mFl");
          const pubkey = new PublicKey(key);
          const lamports = await connection.getBalance(pubkey);
          const sol = lamports / 1e9;
          setBalance(`${sol.toFixed(6)} SOL`);
        } else {
          setBalance("Unsupported network");
        }
      } catch (err) {
        console.log(err);
        setBalance("Error fetching balance");
      }
    };

    fetchBalance();
  }, [network, key]);

  return (
    <div className="p-4 text-lg">
      <h1>{network?.toUpperCase()} Wallet Address:</h1>
      <p className="text-gray-700 mb-2 break-all">{key}</p>
      <h2 className="font-bold">Balance: {balance}</h2>
    </div>
  );
};

export default ShowBalance;
