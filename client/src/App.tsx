import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import "./App.css";
import axios from "axios";

async function sendSol() {
  const amountInput = document.getElementById(
    "amount",
  ) as HTMLInputElement | null;
  const addressInput = document.getElementById(
    "address",
  ) as HTMLInputElement | null;

  if (amountInput && addressInput) {
    // const amount = amountInput.value;
    // const address = addressInput.value;

    const txInstruction = SystemProgram.transfer({
      fromPubkey: new PublicKey("3MbtUCPf6qFwzU1XRTdQrS4zbtTDuKGrq6eRk88xRCZJ"),
      toPubkey: new PublicKey("HeeMLhDmo2zQ5XCnKou873UHw2AxpPymxNCem14mWmpt"),
      lamports: 1 * LAMPORTS_PER_SOL,
    });

    const connection = new Connection("https://api.devnet.solana.com");
    const { blockhash } = await connection.getLatestBlockhash();

    const tx = new Transaction().add(txInstruction);
    tx.recentBlockhash = blockhash;
    tx.feePayer = new PublicKey("3MbtUCPf6qFwzU1XRTdQrS4zbtTDuKGrq6eRk88xRCZJ");

    const serializeTx = tx.serialize({
      verifySignatures: false,
      requireAllSignatures: false,
    });

    const response = await axios.post("http://localhost:6969/tx/sign", {
      message: serializeTx,
      retry: false,
    });

    console.log(response);
  } else {
    console.error("Input elements not found!");
  }
}

function App() {
  return (
    <>
      <input id="amount" type="text" placeholder="Amount" />
      <input id="address" type="text" placeholder="Address" />
      <button onClick={sendSol}>Submit</button>
    </>
  );
}

export default App;
