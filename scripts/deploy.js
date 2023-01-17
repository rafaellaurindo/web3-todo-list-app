async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying the contracts with the account: ${deployer.address}`);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const TodoList = await ethers.getContractFactory("TodoList");

  const todoList = await TodoList.deploy();

  console.log("TodoList address:", todoList.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
