<template>
  <div class="submit-form">
      <button @click="mintNFT" class="btn btn-success">铸造</button>
  </div>
</template>

<script>
import Web3 from 'web3';

export default {
  name: "mint-NFT",
  data() {
    return {
    };
  },
  methods: {
    async mintNFT() {
        this.isEnableEth();

        const web3 = new Web3(window.ethereum);
        try {
            let accounts = await web3.eth.getAccounts();
            console.log(accounts);
            let account = accounts[0];
            console.log("地址:"+account);
            let balance = await web3.eth.getBalance(account);
            console.log("账户余额:"+balance)

            web3.eth.getChainId().then(console.log);

            const contract = require("../../contract.json");
            const contractAddress = "0x35907b3D73F3bbC391344eF56d7a552f4B2d390c";
            const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

            // await web3.eth.sendTransaction({
            //     from: account,
            //     to: '0x4063cf0060Da8b3e18F848AeAA52334cbcE9F662',
            //     value: web3.utils.toWei("0.0001")
            // })
            const nonce = await web3.eth.getTransactionCount(account, "latest"); //get latest nonce

            //the transaction
            const tx = {
                from: account,
                to: contractAddress,
                nonce: nonce,
                value: web3.utils.toWei('0.001'),
                gas: 500000,
                // data: nftContract.methods.mintNFT(1).encodeABI(),
            }
            console.log(tx);

            nftContract.methods.mintNFT(1).send(tx)
            .on('transactionHash', function(hash){
                console.log('transactionHash:'+hash);
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log("confirmation", confirmationNumber, receipt);
            })
            .on('receipt', function(receipt){
                // receipt 相关例子
                console.log("receipt", receipt);
            })
            .on('error', function(error, receipt) { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
                console.log("error-----------:", error, receipt);
            });
        } catch (error) {
            console.log(error);
        }
    },
    isEnableEth() {
        if (!window.ethereum) {
            alert("请安装MetaMask钱包")
        }
    }
  },
  mounted() {
    this.isEnableEth();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>