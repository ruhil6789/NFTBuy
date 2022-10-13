 import {ethers} from "hardhat";
import { contracts, NFTBuy, NFTBuy__factory, RewardNFT, RewardNFT__factory, StakeERC20, StakeERC20__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import {expect,assert} from "chai";
import { BigNumber } from "ethers";
import { mineBlocks } from "./Utilities/utilities";



 describe("contracts", async()=>{
let nftBuy:NFTBuy;
let stakeerc20:StakeERC20;
let  rewardnft :RewardNFT;

let owner: SignerWithAddress;
let signers :SignerWithAddress[];

beforeEach("contracts",async()=>{

signers = await ethers.getSigners();
owner = signers[0];

stakeerc20 = await new StakeERC20__factory(owner).deploy("name", "symbol");
rewardnft = await new RewardNFT__factory(owner).deploy("name", "symbol");

nftBuy = await new NFTBuy__factory(owner).deploy(stakeerc20.address,rewardnft.address);

})


it("should call the buy function ",async()=>{
 //await stakeerc20.connect(owner).mint(owner.address,100);

 await stakeerc20.connect(owner).approve(nftBuy.address, ethers.utils.parseEther("100"));
 console.log(await stakeerc20.connect(owner).balanceOf(owner.address));
 
 
  //await stakeerc20.connect(owner).approve(rewardnft.address,3);
 

  await nftBuy.connect(owner).buy();
  expect(await stakeerc20.connect(owner).balanceOf(owner.address)).be.equal(ethers.utils.parseEther("75"));
  expect(await  rewardnft.connect(owner).ownerOf(1)).be.equal(owner.address);
 // console.log("1");
  //console.log("1");
 //await rewardnft.connect(owner).safeMint(nftBuy.address,3);
})


// it.only("should fixed price will be 25", async()=>{
  
//    await stakeerc20.connect(owner).approve(nftBuy.address,2);
   
//    await stakeerc20.connect(owner).approve(rewardnft.address,2);
  
  
//   await expect( nftBuy..to.equal(25);
//   console.log("1");
//   await rewardnft.connect(owner).safeMint(nftBuy.address,2);
//     console.log("price fixed  need to transfer the amount");
 
// })

it("should user be not to allowed  enter again" ,async()=>{
 await  stakeerc20.connect(owner).approve(nftBuy.address,ethers.utils.parseEther("100"));
 
 console.log(await stakeerc20.connect(owner).balanceOf(owner.address));
 await nftBuy.connect(owner).buy();

 await expect( nftBuy.connect(owner).buy()).to.be.revertedWith("one user cannot be allowed to enter again");
//  await stakeerc20.connect(owner).approve(nftBuy.address,4);
 //await rewardnft.connect(owner).safeMint(nftBuy.address,4);
console.log("transfer the amount");

})


// it.only("should  revert when fixed price is not  25",async()=>{
// await stakeerc20.connect(owner).approve(nftBuy.address,2);
// console.lo


// console.log("cannot transfer the amount");


// })


it("should   reactivate the  nft",async()=>{
await stakeerc20.connect(owner).mint(owner.address,100);
await stakeerc20.connect(owner).approve(nftBuy.address,4);
await nftBuy.connect(owner).reactivate();
expect(await rewardnft.connect(owner).ownerOf(1)).not.to.be.equal(1);
//await rewardnft.connect(owner).safeMint(nftBuy.address,4);

})

it.only("should reactivate before the 1000sec",async()=>{
//await stakeerc20.connect(owner).mint(nftBuy.address,ethers.utils.parseEther("100"))

await stakeerc20.connect(owner).approve(nftBuy.address,ethers.utils.parseEther("100"));

await stakeerc20.connect(owner).approve(rewardnft.address,ethers.utils.parseEther("100"));
 await nftBuy.connect(owner).buy();
await mineBlocks(ethers.provider,1000);
console.log("1");

await nftBuy.connect(owner).reactivate();
await nftBuy.connect(owner).claim();

})
it("should not reactivate after the 1000sec",async()=>{
//await stakeerc20.connect(owner).mint(nftBuy.address,ethers.utils.parseEther("100"))

await stakeerc20.connect(owner).approve(nftBuy.address,ethers.utils.parseEther("100"));
await stakeerc20.connect(owner).approve(rewardnft.address,ethers.utils.parseEther("100"));
 await nftBuy.connect(owner).buy();
// await mineBlocks(ethers.provider,1000);
console.log("1");

expect(await nftBuy.connect(owner).reactivate()).to.be.equal("activate nft");
expect(await nftBuy.connect(owner).claim()).not.to.be.equal("You've not staked");
})
 //expect (await rewardnft.connect(owner).ownerOf(1)).be.equal(1);
// it.only("should claim when  status is fail",async()=>{
// await stakeerc20.connect(owner).approve(nftBuy.address,2);
// const status = await nftBuy.Collect;
// expect(status).to.equal(false);
// console.log("  nft is activated");


// })



it("should claim the reward" ,async()=>{
 // await  stakeerc20.connect(owner).mint(owner.address,10);
 await stakeerc20.connect(owner).mint(nftBuy.address,ethers.utils.parseEther("100"))
 await stakeerc20.connect(owner).approve(nftBuy.address,ethers.utils.parseEther("100"));
  console.log(await rewardnft.connect(owner).balanceOf(owner.address));
 console.log(await stakeerc20.connect(owner).balanceOf(owner.address))
 await nftBuy.connect(owner).buy();
 await nftBuy.connect(owner).claim();
//  expect(await rewardnft.connect(owner).ownerOf(1)).to.be.equal(owner.address);
//  expect(await stakeerc20.connect(owner).balanceOf(owner.address));
 console.log(await rewardnft.connect(owner).balanceOf(owner.address));
 console.log(await stakeerc20.connect(owner).balanceOf(owner.address))

})

 })