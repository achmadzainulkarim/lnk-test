import { MongoConnection } from "../typeorm/data-source";
import { User } from "../typeorm/user.entity";
import { Email } from "../typeorm/email.entity";
import { UserInterface } from "../../interfaces/user.interface";
import { EmailInterface } from "../../interfaces/email.interface";
import { v4 as uuidv4} from 'uuid';
import bcrypt from 'bcryptjs';

const seedDatabase = async() => {
  await MongoConnection.initialize()
  .then(async() => {
    console.log("MongoDB Connected!");
    const userRepo = MongoConnection.getRepository(User);
    const emailRepo = MongoConnection.getRepository(Email);

    const pass : any = await new Promise((resolve, reject) => {
      bcrypt.hash("admin", 10, function(err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    const userToSeed : UserInterface[] = [{
      _id: uuidv4(),
      username : "admin",
      lastLogin : null,
      name : "admin",
      password : pass,
    }];

    const emailToSeed : EmailInterface[] = [{
        _id : uuidv4(),
        email : "admin@admin.com",
        date : new Date(),
        description : "Dummy data",
    }];

    const userExist = await userRepo.findOneBy({
      username : "admin"
    });

    const emailExist = await emailRepo.findOneBy({
        email : "admin@admin.com"
      });

    if(userExist || emailExist){
      throw new Error("db:seed has been run");
    }

    await Promise.all(userToSeed.map(async (userData) => {
      try {
        const user = userRepo.create(userData);
        await userRepo.save(user);
      } catch (error) {
        // console.error('Error during MongoDB operation:', error);
      }
    }));

    await Promise.all(emailToSeed.map(async (emailData) => {
        try {
          const email = emailRepo.create(emailData);
          await emailRepo.save(email);
        } catch (error) {
          // console.error('Error during MongoDB operation:', error);
        }
      }));
  })
  .catch((err) => {
      throw new Error(err.message);  
  })
}

seedDatabase().then(() => {
  console.log('Database seeded successfully.');
  process.exit(0);
}).catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});