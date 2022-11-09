import { ethers } from "ethers";

const ERC20_ABI = [
	// Read-Only Functions
	"function balanceOf(address owner) view returns (uint256)",
	"function decimals() view returns (uint8)",
	"function symbol() view returns (string)",

	// Authenticated Functions
	"function transfer(address to, uint amount) returns (bool)",

	// Events
	"event Transfer(address indexed from, address indexed to, uint amount)",
];

async function main() {
	const usdtAddress = "0x55d398326f99059ff775485246999027b3197955"; // busd
	const provider = new ethers.providers.StaticJsonRpcProvider(
		"https://data-seed-prebsc-1-s1.binance.org:8545",
	);
	const contract = new ethers.Contract(usdtAddress, ERC20_ABI, provider);
	contract.on("Transfer", (from, to, value, event) => {
		let info = {
			from: from,
			to: to,
			value: ethers.utils.formatUnits(value, 6),
			data: event,
		};
		console.log(JSON.stringify(info, null, 4));
	});
}
main();
