//SPDX License-Identifier;MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakeERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100000000000000000000);
    }

    function mint(address to, uint amount) public {
        _mint(to, amount);
    }
}
