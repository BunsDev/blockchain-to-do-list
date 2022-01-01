const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ToDoList", () => {
  it("should test to do list", async () => {
    const ToDoList = await ethers.getContractFactory("ToDoList");
    const toDoList = await ToDoList.deploy();
    await toDoList.deployed();
  
    // default state
    expect(await toDoList.getToDos()).to.deep.equal([[], [], []]);
  
    // add to do
    const addNewToDo = await toDoList.updateToDos(["First ToDo"], ["First ToDo Description"], [false]);
    await addNewToDo.wait();
    expect(await toDoList.getToDos()).to.deep.equal([["First ToDo"], ["First ToDo Description"], [false]]);
  
    // update to do
    const updateToDo = await toDoList.updateToDos(
      ["First ToDo", "Second ToDo"],
      ["First ToDo Description", "Second ToDo Description"],
      [true, false]
      );
    await updateToDo.wait();
    expect(await toDoList.getToDos()).to.deep.equal([
      ["First ToDo", "Second ToDo"],
      ["First ToDo Description", "Second ToDo Description"],
      [true, false]
    ]);
  
    // delete to do
    const deleteToDo = await toDoList.updateToDos(
      [],[],[]
    )
    await deleteToDo.wait()
    expect(await toDoList.getToDos()).to.deep.equal([
      [],[],[]
    ]);
  })
})