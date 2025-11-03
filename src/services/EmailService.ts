import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


interface EmailOptions {
  to: string;
  subject: string;
  body: string; 
}


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, 
  port: Number(process.env.EMAIL_PORT), 
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});



export async function sendEmail({ to, subject, body }: EmailOptions) {
  try {
    
    const info = await transporter.sendMail({
      from: `"Seu App" <${process.env.EMAIL_USER}>`, 
      to: to, 
      subject: subject, 
      html: body, 
    });


    console.log('E-mail real enviado com sucesso para:', to, info.messageId);

  } catch (error) {

    console.error('Erro ao preparar ou enviar e-mail real:', error);

  }
}