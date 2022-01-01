//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ToDoList {
	struct ToDo {
		string title;
		string description;
		bool completed;
	}
	ToDo[] todos;

	function getToDos() public view returns (string[] memory, string[] memory, bool[] memory) {
		string[] memory titles = new string[](todos.length);
		string[] memory descriptions = new string[](todos.length);
		bool[] memory completed = new bool[](todos.length);
		for (uint i = 0; i < todos.length; i++) {
			titles[i] = todos[i].title;
			descriptions[i] = todos[i].description;
			completed[i] = todos[i].completed;
		}
		return (titles, descriptions, completed);
	}

	function updateToDos(string[] memory titles, string[] memory descriptions, bool[] memory completeds) public {
		delete todos;
		for (uint i = 0; i < titles.length; i++) {
			ToDo memory todo = ToDo({
				title: titles[i],
				description: descriptions[i],
				completed: completeds[i]
			});
			todos.push(todo);
		}
	}
}
