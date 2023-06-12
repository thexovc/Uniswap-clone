const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("ExchangeV1", function () {
  let exchange;
  let token;
  const initialTokenSupply = ethers.utils.parseEther("1000000");

  async function deployExchangeFixture() {
    const Token = await ethers.getContractFactory("ERC20");
    token = await Token.deploy("Test Token", "TEST");
    await token.mint(await ethers.getSigners()[0].address, initialTokenSupply);

    const Exchange = await ethers.getContractFactory("ExchangeV1");
    exchange = await Exchange.deploy(token.address);
    await token.approve(exchange.address, initialTokenSupply);

    return { exchange, token };
  }

  describe("Deployment", function () {
    it("should set the correct token address", async function () {
      const { exchange, token } = await loadFixture(deployExchangeFixture);

      expect(await exchange.tokenAddress()).to.equal(token.address);
    });
  });

  describe("Liquidity", function () {
    it("should add liquidity correctly", async function () {
      const { exchange, token } = await loadFixture(deployExchangeFixture);

      const tokenAmount = ethers.utils.parseEther("100");
      const ethAmount = ethers.utils.parseEther("1");

      await exchange.addLiquidity(tokenAmount, { value: ethAmount });

      const reserve = await exchange.getReserve();
      expect(reserve).to.equal(tokenAmount);
    });
  });

  describe("Swaps", function () {
    it("should swap ETH to tokens correctly", async function () {
      const { exchange, token } = await loadFixture(deployExchangeFixture);

      const tokenAmount = ethers.utils.parseEther("100");
      const ethAmount = ethers.utils.parseEther("1");

      await exchange.addLiquidity(tokenAmount, { value: ethAmount });

      const initialTokenBalance = await token.balanceOf(
        await ethers.getSigners()[0].address
      );
      const minTokens = ethers.utils.parseEther("0");

      await exchange.ethToTokenSwap(minTokens, { value: ethAmount });

      const finalTokenBalance = await token.balanceOf(
        await ethers.getSigners()[0].address
      );
      const expectedTokenBalance = initialTokenBalance.add(tokenAmount);

      expect(finalTokenBalance).to.equal(expectedTokenBalance);
    });

    it("should swap tokens to ETH correctly", async function () {
      const { exchange, token } = await loadFixture(deployExchangeFixture);

      const tokenAmount = ethers.utils.parseEther("100");
      const ethAmount = ethers.utils.parseEther("1");

      await exchange.addLiquidity(tokenAmount, { value: ethAmount });

      const initialEthBalance = await ethers.provider.getBalance(
        exchange.address
      );
      const minEth = ethers.utils.parseEther("0");

      await exchange.tokenToEthSwap(tokenAmount, minEth);

      const finalEthBalance = await ethers.provider.getBalance(
        exchange.address
      );
      const expectedEthBalance = initialEthBalance.add(ethAmount);

      expect(finalEthBalance).to.equal(expectedEthBalance);
    });
  });
});
