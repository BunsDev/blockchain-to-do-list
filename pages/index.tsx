import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import ToDoList from '../artifacts/contracts/ToDoList.sol/ToDoList.json'

interface ToDo {
	title: string,
	description: string,
	completed: boolean
}

const toDoListAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const Home: NextPage = () => {
	////// VARIABLE DECLARATIONS //////
	const [toDoList, setToDoList] = useState<Array<ToDo>>([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [synced, setSynced] = useState(false);

	////// USE EFFECT //////
	useEffect(() => {
		getAllToDos();
	}, []);

	////// FUNCTION DECLARATIONS //////
	const toggleCompleted = (index: number) => {
		let newToDoList = [...toDoList];
		newToDoList[index].completed = !newToDoList[index].completed;
		setToDoList(newToDoList);
		setSynced(false);
	}

	const deleteToDo = (index: number) => {
		let newToDoList = [...toDoList];
		newToDoList.splice(index, 1);
		setToDoList(newToDoList);
		setSynced(false);
	}

	const addToDo = () => {
		let newToDoList = [...toDoList];
		newToDoList.push({
			title,
			description,
			completed: false
		});
		setToDoList(newToDoList);
		setTitle('');
		setDescription('');
		setSynced(false);
	}

	const sync = async () => {
		if (typeof window.ethereum !== 'undefined') {
			const titles = toDoList.map(toDo => toDo.title);
			const descriptions = toDoList.map(toDo => toDo.description);
			const completeds = toDoList.map(toDo => toDo.completed);

			await window.ethereum.request({ method: 'eth_requestAccounts' });
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(toDoListAddress, ToDoList.abi, provider.getSigner());
			const transaction = await contract.updateToDos(titles, descriptions, completeds);
			await transaction.wait();

			setSynced(true);
		}
	}

	const getAllToDos = async () => {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(toDoListAddress, ToDoList.abi, provider);
			const [titles, descriptions, completeds]: [Array<string>, Array<string>, Array<boolean>] = await contract.getToDos();
			const toDos: Array<ToDo> = titles.map((title, index) => ({
				title: title,
				description: descriptions[index],
				completed: completeds[index]
			}));
			setToDoList(toDos);
			setSynced(true);
		}
	}

	return (
		<div className='h-screen w-full overflow-y-scroll bg-slate-900 flex flex-col justify-between'>
			<header className='w-full shadow-md shadow-yellow-700 p-5 bg-slate-800'>
				<h1 className='text-center text-4xl font-bold text-yellow-400'>To Do List</h1>
			</header>
			<main className='flex flex-col justify-center h-full'>
				<ul className='m-5 max-h-96 overflow-y-scroll bg-slate-800 p-5 rounded-2xl'>
					{toDoList.map((item, index) => <li className='text-yellow-600' key={index}>
						<h1 className='text-2xl font-bold text-yellow-400'>{item.title}</h1>
						<p>{item.description}</p>
						<input type="checkbox" className='m-2' checked={item.completed} onClick={() => toggleCompleted(index)} />
						<button className='bg-slate-700 p-2 rounded-md text-red-500 font-medium' onClick={() => deleteToDo(index)}>Delete</button>
						<hr className='mt-3 mb-3' />
					</li>)}
				</ul>
				<div className='flex flex-col ml-5 mr-5 justify-between'>
					<input type="text" value={title} className='m-2 p-2 border-none outline-none rounded-md bg-slate-700 text-yellow-400' onChange={e => setTitle(e.target.value)} placeholder='title' />
					<input type="text" value={description} className='m-2 p-2 border-none outline-none rounded-md bg-slate-700 text-yellow-400' onChange={e => setDescription(e.target.value)} placeholder='description' />
					<button className='m-2 bg-slate-700 p-2 rounded-md text-sm text-blue-400' onClick={addToDo}>Add New Task</button>
					<button className='m-2 bg-slate-700 p-2 rounded-md text-sm font-medium text-green-400' onClick={sync}>Sync</button>
				</div>
			</main>
		</div>
	)
}

export default Home
