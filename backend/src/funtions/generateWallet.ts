import web3 from "@solana/web3.js";

const generateWallet = () => {
  return web3.Keypair.generate();
};

export { generateWallet };
