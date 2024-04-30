# Rock Paper Reptiles
CS 4610 - Final Project

Emma Lynn

Note: In my original project proposal I said that I would be rendering the models from PLY files. After diving into the options a bit more,
I decided to switch to GLTF files instead since they are more supported and are the recommended format for using three.js.

## Image Attribution

### Icons

* <a href="https://www.flaticon.com/free-icons/coin" title="coin icons">Coin icons created by kliwir art - Flaticon</a>
* <a href="https://www.flaticon.com/free-icons/stone" title="stone icons">Stone icons created by bastian 5 - Flaticon</a>
* <a href="https://www.flaticon.com/free-icons/paper" title="paper icons">Paper icons created by Freepik - Flaticon</a>
* <a href="https://www.flaticon.com/free-icons/scissors" title="scissors icons">Scissors icons created by Gulraiz - Flaticon</a>

### Models
* Cactus: Turbosquid
* Rubber Duck: Turbosquid
* Strawberry: Turbosquid
* Duck: https://codesandbox.io/p/sandbox/view-tracking-bp6tmc?file=/src/styles.css:8,6
* Penguin: Turbosquid
* Lightning: https://codesandbox.io/p/sandbox/view-tracking-bp6tmc?file=/src/styles.css:8,6
* Apple: https://codesandbox.io/p/sandbox/view-tracking-bp6tmc?file=/src/styles.css:8,6
* Candy: https://codesandbox.io/p/sandbox/view-tracking-bp6tmc?file=/src/styles.css:8,6
* Target: https://codesandbox.io/p/sandbox/view-tracking-bp6tmc?file=/src/styles.css:8,6

## References
* Three.js: https://codesandbox.io/p/sandbox/view-tracking-bp6tmc?file=/src/styles.css:8,6

## Setup
### Prerequisites
- node
- docker

### Install dependencies
In the root of the project run

```bash
npm install
```

In the `client` folder run
```bash
npm install
```

### Create .env file
Create a new file called `.env` in the root of the project and copy the contents of `.env.example` into it.
Change the values of the variables to fit your application.

### Setup the database
In the root of the project run
```bash
docker compose up -d
```

Then run
```bash
npm run migrate-reset
```

## Running the application
In the root of the project run
```bash
npm run dev
```

Open and new terminal tab and navigate to the `client` folder and run
```bash
npm run dev
```

Visit your application at `http://localhost:3000` (or whatever port you specified in your `.env` file)

NOTE: YOU MUST BE RUNNING BOTH THE CLIENT AND SERVER

## Other Useful Commands
### Generate and run migrations
```bash
npm run migrate-dev
```

### Run prisma console
```bash
npm run console
```

### Reset the database
This command deletes all data from the database and recreates all of the tables from the existing migrations.
```bash
npm run migrate-reset
```

```bash
npm run migrate-reset
```

### Seed the Database
Seed script is found in `prisma/seeds.ts`. Update that script to add default data to your database - Note: seeds should be idempotent... this means that you should be able to run the seeds multiple times and the database should be in the same state regardless of whether its the first or 100th time you run it.

```bash
npm run seed
```