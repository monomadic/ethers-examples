import { ethers } from "ethers";

const ERC20_ABI = [
	"event Withdrawn(bytes32 indexed id, address indexed token, address indexed recipient, uint256 amount)",
];

async function main() {
	const bridgeAddress = process.env.BRIDGE_ADDRESS;
	const provider = new ethers.providers.StaticJsonRpcProvider(process.env.RPC_ENDPOINT);
	const contract = new ethers.Contract(bridgeAddress, ERC20_ABI, provider);

	contract.on("Withdrawn", (id, token, recipient, amount) => {
		console.log("Withdrawn event");
		let info = {
			id: id,
			token: token,
			recipient: recipient,
			amount: amount,
		};
		console.log(JSON.stringify(info, null, 4));
	});
	console.log("listening...");
}
main();
