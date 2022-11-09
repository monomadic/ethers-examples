// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract EventCreator {
	event EventFired(uint number, string message);

	constructor() {}

	function fire() external {
		emit EventFired(0, "event fired");
	}
}
