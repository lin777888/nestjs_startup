import { PrismaClient } from "@prisma/client";
import _ from 'lodash';
import { users } from './seed-datas/user-data'; 

const prisma = new PrismaClient();

const main = async () => {
    await seedUsers();
    console.log('Seeding database...');
  


};

const seedUsers = async () => {

    console.log(users);

    for (const user of users){
        await prisma.user.create({
            data: user,
        })
    }
}

main()
.then(async ()=>{
    await prisma.$disconnect();
}) 
.catch(async (e)=> {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})