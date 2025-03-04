import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import dotenv from "dotenv";
dotenv.config();

class EmailService {
    constructor() {
        this.ses = new SESClient({
            region: process.env.AWS_REGION || "eu-west-3",
            credentials: {
                accessKeyId: process.env.EMAIL_USER,
                secretAccessKey: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendVerificationEmail(userEmail, verificationToken) {
        const verificationUrl = `${process.env.APP_URL}/verify-email/${verificationToken}`;

        const params = {
            Source: process.env.AWS_SES_FROM_EMAIL,
            Destination: {
                ToAddresses: [userEmail],
            },
            Message: {
                Subject: {
                    Data: "Please verify your account!",
                    Charset: "UTF-8",
                },
                Body: {
                    Html: {
                        Data: `
                        <h1> Welcome to HiveMind<h1>
                        <p> Please, click the following link to verify your account: <a href="${verificationUrl}">Verify</a></p>
                        <p> This link will expire in 12 hours.</p>
                        `,
                        Charset: "UTF-8"
                    },
                    Text: {
                        Data: `Please, click the following link to verify your account: ${verificationUrl}`,
                        Charset: "UTF-8"

                    }
                }
            }
        }
        try{
            const command = new SendEmailCommand(params);
            const response = await this.ses.send(command);
            console.log("Email sent successfully:", response.MessageId);
            return true;
        } catch (error) {
            console.error("Error sending email:", error);
            return false;
        }
    }
}

export const emailService = new EmailService();
export default emailService;