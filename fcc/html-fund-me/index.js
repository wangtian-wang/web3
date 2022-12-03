console.log("index.js exec!!");
const connectBtn = document.getElementById("connect");
const fundBtn = document.getElementById("fund");
connectBtn.onclick = connect;
fundBtn.onclick = fund;
function connect() {
  console.log("connect");
}
function fund() {
  console.log("connect");
}

// provider.getSigner()返回连接的MetaMask账户
