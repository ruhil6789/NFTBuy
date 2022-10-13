//SPDX License-Identifier:MIT
pragma solidity >=0.6.0 <0.9.0;

import "./RewardNFT721.sol";
import "./stakeERC20.sol";
import "./InterfaceREW.sol";
import "hardhat/console.sol";

contract NFTBuy {
    IERC20 public immutable StakeERC20;

    IReward public immutable Reward;
    uint tokenid;

    constructor(address _stakeERC20, address _Ireward) {
        StakeERC20 = IERC20(_stakeERC20);
        Reward = IReward(_Ireward);
        tokenid = 0;
    }

    struct Collection {
        bool status;
        uint time;
    }
    uint public fixedPrice = 25 * 10**18;
    uint public price;
    mapping(address => uint) balances;
    mapping(address => uint) TokenId;
    mapping(address => Collection) public Collect;
    mapping(address => uint) public timelock;


// buy the  nft after getting erc20 asa input
    function buy() public {
        // uint fixedPrice = 25;
        // balances[msg.sender] = amount;
        timelock[msg.sender] = block.timestamp;
        if (StakeERC20.balanceOf(msg.sender) >= fixedPrice) {
            StakeERC20.transferFrom(msg.sender, address(this), fixedPrice);
        } else {
            revert("cannot buy more");
            // RewardNFT.transfer(msg.sender, token);
        }

        // need require  one user cannot be allowed to enter again

        require(
            balances[msg.sender] == 0,
            "one user cannot be allowed to enter again"
        );
        balances[msg.sender] = fixedPrice;
        tokenid += 1;
        //require(RewardNFT.safeMint(msg.sender, 1), "nft minted");
        // Reward.safeMint(msg.sender, tokenid);
        TokenId[msg.sender] = tokenid;
    }

    function reactivate() public {
        require(
            block.timestamp>=timelock[msg.sender]+1000,
            "activate nft"
        );

        timelock[msg.sender] = block.timestamp + 1000;
        // require(fixedPrice == 25, "activate nft");
        // if (Collect[msg.sender].status == true) {
        //     require(
        //         Collect[msg.sender].time + 1000 == block.timestamp,
        //         "nft  activated"
        //     );
        StakeERC20.transferFrom(
            msg.sender,
            address(this),
            balances[msg.sender]
        );
        balances[msg.sender] = fixedPrice;
        // RewardNFT.safeMint(msg.sender, 1);
        // require(
        //     timelock[msg.sender] + 1000 == block.timestamp,
        //     " deactivate nft"
        // );
        timelock[msg.sender] += 1000;
    }

    function claim() public {
        // balances[msg.sender] = token;
        // require(Collect[msg.sender].status == false, "nft  is activated");
        require(balances[msg.sender] > 0, "You've not staked");
        StakeERC20.transfer(msg.sender, balances[msg.sender]);

        Reward.safeMint(msg.sender, TokenId[msg.sender]);
        StakeERC20.transfer(msg.sender, (balances[msg.sender] * 5) / 100);
        balances[msg.sender] = 0;
    }
}
