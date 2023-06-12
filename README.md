# Uniswap Exchange Contract

This repository contains a Solidity contract for an Uniswap exchange. The contract allows users to swap between ETH and ERC20 tokens seamlessly. It provides functionalities such as liquidity provisioning, real-time pricing, and token swaps.

## Features

- `addLiquidity`: Allows users to provide liquidity to the exchange by depositing ERC20 tokens.
- `getReserve`: Retrieves the current token reserve balance in the contract.
- `getTokenAmount`: Calculates the amount of tokens that can be purchased with a specified amount of ETH.
- `getEthAmount`: Calculates the amount of ETH that can be obtained by selling a specified amount of tokens.
- `ethToTokenSwap`: Enables users to swap ETH for tokens.
- `tokenToEthSwap`: Enables users to swap tokens for ETH.

## Getting Started

### Prerequisites

- Solidity ^0.8.9
- OpenZeppelin library for ERC20 token standard

### Deployment

1. Clone the repository: `git clone [repository URL]`
2. Install dependencies: `npm install`
3. Deploy the contract by specifying the token address in the constructor.

## Usage

1. Add Liquidity:
   - Call the `addLiquidity` function with the desired amount of ERC20 tokens as a parameter.
   - Transfer the ERC20 tokens to the contract using the `transferFrom` function.

2. Swap ETH for Tokens:
   - Call the `ethToTokenSwap` function, passing the minimum desired token amount as a parameter.
   - Send the desired amount of ETH along with the function call.

3. Swap Tokens for ETH:
   - Approve the contract to spend the desired token amount using the `approve` function.
   - Call the `tokenToEthSwap` function, providing the amount of tokens to be sold and the minimum desired ETH amount as parameters.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request with any improvements or additional features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

