import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "mingmartu@gmail.com",
    pass: "",
  },
});

export async function sendMail({to,subject,text,html}){
    try {
        const transport = transporter.sendMail({
            from:'test@gmail.com',
            to,
            subject,
            text,
            html
        })
        
    } catch (error) {
        
    }
}

