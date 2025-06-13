import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { useNavigate } from "react-router-dom";

export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  console.log(addresses);
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet.address]);
        }}
      >
        Add ETH wallet
      </button>

      <div className=" mt-4">
        {addresses.map((e) => (
          <div
            key={e}
            className="flex items-center mt-2.5
           gap-7 p-3 bg-gray-100 rounded-md shadow-sm hover:ring-2 hover:ring-blue-500 duration-300"
          >
            <div className="w-6 text-right text-sm font-semibold text-gray-500">
              {addresses.indexOf(e) + 1}.
            </div>
            <div
              onClick={() => navigate(`/eth/${e.toString()}`)} // 👈 FIXED
              className="text-base font-medium text-gray-800 cursor-pointer"
            >
              {e.toString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
