<template>
  <div>
    <span>账号：{{ account }}</span>
  </div>
  <div>
    <span>网络：{{ network }}</span>
  </div>
  <div>
    <span>合约地址：
        <a :href="'https://rinkeby.etherscan.io/address/'+contractAddress" target="_blank">
        {{ contractAddress }}
        </a>
    </span>
  </div>
  <div v-if="isTransaction">
    <span>交易hash值：
        <a :href="'https://rinkeby.etherscan.io/tx/'+transactionHash" target="_blank">
        {{ transactionHash }}
        </a>
    </span>
  </div>
  <div class="submit-form">
      <button @click="mintNFT" class="btn btn-success">铸造</button>
  </div>
</template>

<script>
import Web3 from 'web3';
import Network from '../common/Network'

export default {
  name: "mint-NFT",
  data() {
    return {
        account: "",
        network: "",
        contractAddress: "",
        transactionHash: "",
        isTransaction: 0,
    };
  },
  methods: {
    async mintNFT() {
        this.isEnableEth();

        try {
            const web3 = new Web3(window.ethereum);

            const contract = require("../../contract.json");
            const nftContract = new web3.eth.Contract(contract.abi, this.contractAddress);

            // await web3.eth.sendTransaction({
            //     from: this.account,
            //     to: '0x4063cf0060Da8b3e18F848AeAA52334cbcE9F662',
            //     value: web3.utils.toWei("0.0001")
            // })
            const nonce = await web3.eth.getTransactionCount(this.account, "latest"); //get latest nonce
            // this.isTransaction = 1;

            //the transaction
            const tx = {
                from: this.account,
                to: this.contractAddress,
                nonce: nonce,
                value: web3.utils.toWei('0.001'),
                gas: 500000,
                // data: nftContract.methods.mintNFT(1).encodeABI(),
            }

            nftContract.methods.mintNFT(1).send(tx)
            .on('transactionHash', hash => {
                console.log('transactionHash:'+hash);
                this.isTransaction = 1;
                this.transactionHash = hash;
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                console.log("confirmation", confirmationNumber);
                console.log("confirmation receipt", receipt);
            })
            .on('receipt', function(receipt){
                // receipt 相关例子
                console.log("receipt", receipt);
                alert('交易成功');
            })
            .on('error', (error, receipt) => { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
                console.log("error-----------:", error, receipt);
                if (error.code && 4001 == error.code) {
                    alert('取消交易');
                } else {
                    alert('交易失败，详情请点击交易hash值查看');
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    isEnableEth() {
        if (!window.ethereum) {
            alert("请安装MetaMask钱包")
        }

        return true;
    },
    setNetwork(web3) {
        web3.eth.getChainId().then(id => {
            this.network = Network.NETWORK_MAP[id];
        });
    }
  },
  async mounted() {
    this.contractAddress = process.env.VUE_APP_CONTRACT;
    if (this.isEnableEth()) {
        const web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();
        console.log(accounts);
        this.account = accounts[0];

        let balance = await web3.eth.getBalance(this.account);
        console.log("账户余额:"+balance)

        this.setNetwork(web3);

        // 监听网络切换
        window.ethereum.on('chainChanged', (id) => {
            id = Number(id).toString(10)
            this.network = Network.NETWORK_MAP[id];
        });

        // 监听账号切换
        window.ethereum.on('accountsChanged', (newAccounts) => {
            this.account = newAccounts[0];
        });
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>