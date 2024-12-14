import { Connection, Keypair, Transaction } from "@solana/web3.js";
import bs58 from "bs58";
import cors from "cors";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createNewUser, getUser } from "./funtions/database";
import { generateWallet } from "./funtions/generateWallet";

const app = express();

app.use(express.json());
app.use(cors());

const JWTSECRET: string = "THISISMYSECRET";
const connection = new Connection("https://api.devnet.solana.com");

app.get("/health", async (_req: Request, res: Response) => {
  res.status(200).json({
    message: "GOOD",
  });
});

app.post("/signup", async (req: Request, res: Response) => {
  //do body validation first
  const { username, password } = req.body;

  const wallet = generateWallet();
  const publicKey = wallet.publicKey.toBase58();
  const secretKey = bs58.encode(wallet.secretKey);

  const existingUser = await getUser(username);

  if (existingUser != null) {
    res.status(200).json({
      message: "user already exitst",
    });
    return;
  }

  const newUser = await createNewUser(username, password, publicKey, secretKey);

  if (newUser === null) {
    res.status(503).json({
      message: "Can't creat the user",
    });
    return;
  }

  res.status(200).json({
    message: "User Created Successfully",
    user: newUser,
  });
});

app.post("/signin", async (req: Request, res: Response) => {
  //do schema validation first
  const { username, password } = req.body;

  const existingUser = await getUser(username);

  if (existingUser === null) {
    res.status(400).json({
      message: "No user exits with this userName",
    });
    return;
  }

  if (existingUser.password != password) {
    res.status(400).json({
      message: "Incorrect Password",
    });
    return;
  }

  const jwtToken = jwt.sign(
    { username: existingUser.username, publicKey: existingUser.publicKey },
    JWTSECRET,
  );

  res.status(200).json({
    message: {
      userID: existingUser.id,
      token: jwtToken,
    },
  });

  return;
});

app.post("/tx/sign", async (req: Request, res: Response) => {
  //do validation here

  const { message, retry } = req.body;

  const tx = Transaction.from(Buffer.from(message));

  const user = await getUser("kesar");

  if (user === null) {
    res.status(403).json({
      message: "Transaction Failed",
    });
    return;
  }

  const signer = Keypair.fromSecretKey(bs58.decode(user.privateKey));

  tx.sign(signer);

  const serlizeTx = tx.serialize();

  const TxSignature = await connection.sendRawTransaction(serlizeTx);

  res.status(200).json({
    message: "Tx Completed",
    signature: TxSignature,
  });
});

app.get("/tx", async (req: Request, res: Response) => {
  const { signature } = req.body;

  const status = await connection.getTransaction(signature);

  res.status(200).json({
    message: "Status",
    status: status,
  });
});

const PORT: number = 6969;

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
