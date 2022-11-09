import { Wallet } from "ethers";

const master = Wallet.createRandom()
console.log(`new mnemonic: \n\taddress:\t${master.address}\n\tprivate key:\t${master.privateKey}\n\tmnemonic:\t${master.mnemonic.phrase}`)

// to instantiate Wallet from mnemonic: Wallet.fromMnemonic(phrase)
