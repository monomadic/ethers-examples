import { BigNumber } from "ethers";

const chainId = 1;
const bridgeAdmin = getWalletByPK(BRIDGE_ADMIN_PK as string, network.provider);


network.tokenContract.on('Transfer', async (_from: string, _to: string, _value: BigNumber) => {
	if (_to !== network.bridgeContract.address) return;
	console.log("----BEGIN LOGGING LOCKING----");
	const tx = await network.bridgeContract.connect(bridgeAdmin).lock(_from, _value);
	const receipt = await tx.wait();
	console.log(`${_from} locked ${convertBnToDecimal(_value)} tokens on ${network.name} network`)
	console.log(`Tokens locking tx: ${receipt.transactionHash}`);
	console.log("----END LOGGING LOCKING----");
})

network.bridgeContract.on('Burn', async (_from: string, _value: BigNumber, chainId: BigNumber) => {
	console.log("----BEGIN LOGGING BURNING----");
	const chosenNetwork = networks[chainId.toNumber()];
	const chosenNetworkBridgeAdmin = getWalletByPK(BRIDGE_ADMIN_PK as string, chosenNetwork.provider);
	const tx = await chosenNetwork.bridgeContract.connect(chosenNetworkBridgeAdmin).mint(_from, _value);
	const receipt = await tx.wait();
	console.log(`${_from} transfered ${convertBnToDecimal(_value)} from ${network.name} to ${chosenNetwork.name}`)
	console.log(`Token minting tx ${receipt.transactionHash}`);
	console.log("----END LOGGING BURNING----");
})
