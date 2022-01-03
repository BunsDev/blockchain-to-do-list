# Block Chain To Do List

### About
---
A to do list application made using solidity, hardhat, next.js, and tailwindcss

### Features
---
This application contains the following features:
- add task
- toggle task completion state
- delete task
- sync task to ethereum blockchain

### Screenshots
---
![img](https://i.imgur.com/1VH8yqK.png)
![img](https://i.imgur.com/LiEtnwP.png)
![img](https://i.imgur.com/vo0qja0.png)

### Installation
---
1. download the repository
2. open 3 terminals
3. in terminal 1, run:
```
npm install
npx hardhat compile
npx hardhat node
```
4. in terminal 2, run:
```
npx hardhat run scripts/sample-script.js --network localhost
```
5. in terminal 3, run:
```
npm run dev
```
6. go to http://localhost:3000 and enjoy!
