import { ethers } from "ethers";

export async function erc20_listener(endpoint: string, address: string): Promise<void> {
	const abi = [
		"event Transfer(address indexed from, address indexed to, uint amount)",
	];
	const provider = new ethers.providers.StaticJsonRpcProvider(endpoint);
	const contract = new ethers.Contract(address, abi, provider);

	contract.on("Transfer", (from: string, to: string, amount: number) => {
		console.log("Transfer Event", { from, to, amount });
	});

	console.log(`listening to ERC20 ${address}...`);
}


async function main() {
	erc20_listener("https://bsc-dataseed.binance.org/", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");
}
main();
