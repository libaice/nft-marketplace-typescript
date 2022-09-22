// new file for nft market deploy
const NftMarket = artifacts.require("NftMarket");

module.exports = function (deployer) {
   deployer.deploy(NftMarket);
};