import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useNavigate } from "react-router-dom";

export function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<
    import("@solana/web3.js").PublicKey[]
  >([]);

  if (!mnemonic) {
    return <div>Create seed pharse to generate wallets</div>;
  }
  return (
    <div>
      <button
        onClick={function () {
          const seed = mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString()).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setPublicKeys([...publicKeys, keypair.publicKey]);
        }}
      >
        Add SOl wallet
      </button>
      <div className=" mt-4">
        {publicKeys.map((p) => (
          <div key={p.toBase58()}
            className="flex items-center mt-2.5
           gap-7 p-3 bg-gray-100 rounded-md shadow-sm hover:ring-2 hover:ring-blue-500 duration-300"
          >
            <div className="w-6 text-right text-sm font-semibold text-gray-500">
              {publicKeys.indexOf(p) + 1}.
            </div>
            <div  onClick={() => navigate(`/sol/${p.toBase58()}`)} className="text-base font-medium text-gray-800">
              {p.toBase58()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
