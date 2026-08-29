const db = require('./db')
const { usersTable } = require('./drizzle/schema.js')
const dotenv = require('dotenv/config')

dotenv.config(); // loads all the env variables in dotenv (not required anymore ig?)

async function getAllUsers() {
    const users = await db.select().from(usersTable);
    console.log(`Users in DB `,users);
    return users;
}

async function createUser({id, name, email}) {
    await db.insert(usersTable).values({
        id,
        name,
        email,
    })
}

getAllUsers();
// createUser({id: 4, name: "Sarthak", email:"13sarthaksethi@gmail.com"})
// createUser({id: 5, name: "Sarthak Sethi", email:"13sarthaksethi@gmail.com"})
getAllUsers();