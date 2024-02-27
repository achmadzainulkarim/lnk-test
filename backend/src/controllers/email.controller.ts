import { Email } from "../entities/typeorm/email.entity";
import { MongoConnection } from "../entities/typeorm/data-source";
import { EmailInterface } from "../interfaces/email.interface";
import { v4 as uuidv4 } from 'uuid';
import NodeMailer from "../libraries/email.library"

export default class EmailController {

  async list(req: any, res: any) {
    const emailRepo = MongoConnection.getRepository(Email);
    try {
      const emailList = await emailRepo.find();
      return res.json({ data: emailList })
    } catch (error) {
      console.error(error)
      res.status(400).json(error.message)
    }
  }

  async create(req: any, res: any) {
    try {
      const nodeMailer = new NodeMailer;
      const emailRepo = MongoConnection.getRepository(Email);
      const { email, date, description } = req.body;
      if (!email || !date) {
        throw new Error("Item Required");
      }
      const newData: EmailInterface = {
        _id: uuidv4(),
        email: email,
        date: new Date(date),
        description: description,
      }
      try {
        // send email
        await nodeMailer.sendMail(email, 'Test Email', 'Hi Salam kenal')
          .then(() => console.log('Email sent successfully'))
          .catch((error) => console.error('Error sending email:', error));

        const createdData = emailRepo.create(newData);
        await emailRepo.save(createdData);
      } catch (error) {
        // console.log(error);
      }
      res.json(newData);
    } catch (error) {
      console.error(error.stack)
      res.status(400).json(error.message)
    }
  }
}