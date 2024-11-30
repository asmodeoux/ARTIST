# ARTIST

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`

### Development Steps

1. Add a new FunC contract in `contracts` folder
2. Build it using `npx blueprint build` or `yarn blueprint build` to generate the JSON bytecode file
3. Add a new wrapper in `wrappers` folder
4. Add a new test in `tests` folder if needed
5. Update script in `scripts` folder if needed
6. Update `README.md` if needed
7. Deploy the contract using `npx blueprint run` or `yarn blueprint run`, choose mainnet or testnet