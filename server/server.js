import express, { json } from 'express';
import { config } from 'dotenv';
import mg from 'mailgun-js';
import cors from 'cors';
const app = express();

config();
const allowedDomains = ["https://ghaithsaidani.me","http://localhost:5173"]
const corsOptions = {
    origin: allowedDomains,
    credentials: true
};

app.use(cors(corsOptions))
const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

app.use(json());

app.get('/',(req,res)=>res.json('My API running 😊'))

app.post('/api/email', (req, res) => {
  const { name , email, subject, message } = req.body;
  mailgun()
    .messages()
    .send(
      {
        from: `${name} <${email}>`,
        to: `ghaithsaidani18@gmail.com`,
        subject: `${subject}`,
        html: `<p>${message}</p>`,
      },
      (error, body) => {
        if (error) {
          res.status(500).json({ success:false,message: 'Error in sending email'});
        } else {
          res.status(200).json({ success:true,message: 'Email sent successfully',body});
        }
      }
    );
});

const port = process.env.PORT || 4000;
console.log(port);
app.listen(port);
