const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("TodoList Contract", function () {
  async function deployFixture() {
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    return { todoList };
  }

  it("Check first task is the default set on contract", async function () {
    const { todoList } = await loadFixture(deployFixture);

    const genesisTask = await todoList.getTask(1);

    expect(genesisTask.content).to.equal("Follow @rafaellaurindo on Github!");
  });

  it("Should increments the task id after adding a new task", async function () {
    const { todoList } = await loadFixture(deployFixture);

    await todoList.createTask("Follow @_rafaellaurindo on Twitter!");
    const newTask = await todoList.getTask(2);

    expect(newTask.id).to.equal(2);
  });

  it("Should create a new task", async function () {
    const { todoList } = await loadFixture(deployFixture);

    await todoList.createTask("My second task");

    const task = await todoList.getTask(2);

    expect(task.content).to.equal("My second task");
    expect(task.id).to.equal(2);
    expect(task.completed).to.be.false;
  });

  it("Should toggle a task", async function () {
    const { todoList } = await loadFixture(deployFixture);

    await todoList.createTask("My second task");

    let task = await todoList.getTask(2);

    expect(task.completed).to.be.false;

    await todoList.toggleCompleted(2);

    task = await todoList.getTask(2);

    expect(task.completed).to.be.true;
  });
});
