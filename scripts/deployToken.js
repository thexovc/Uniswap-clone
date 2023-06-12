// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const name = "Diamund Uniswap";
  const symbol = "DUNI";
  const initialSupply = 100000000000;

  const Lock = await hre.ethers.getContractFactory("Token");
  const lock = await Lock.deploy(name, symbol, initialSupply);

  await lock.deployed();

  console.log(
    `Token contract with name ${name} symbol ${symbol} initialSupply ${initialSupply}  deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
