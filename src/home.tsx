import { useState } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./components/create-solana-wallets";
import { EthWallet } from "./components/create-eth-wallets";
function Home() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div>
      <div className=" min-h-screen space-y-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Web Wallet</h1>
        {mnemonic.length === 0 && (
          <div>
            <button
              onClick={async function () {
                const mn = await generateMnemonic();
                setMnemonic(mn);
              }}
            >
              Create Seed Phrase
            </button>
          </div>
        )}

        {mnemonic.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {mnemonic.split(" ").map((word, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-100 rounded-md shadow-sm hover:ring-2 hover:ring-blue-500 duration-300"
              >
                <div className="w-6 text-right text-sm font-semibold text-gray-500">
                  {index + 1}.
                </div>
                <div className="text-base font-medium text-gray-800">
                  {word}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Generate solana wallets */}

        {mnemonic.length > 0 && (
          <>
            <SolanaWallet mnemonic={mnemonic} />
            <EthWallet mnemonic={mnemonic} />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
