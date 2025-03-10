import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { emailTemplates } from "./emailTemplates.js";
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
        const verificationUrl = `http://localhost:3001/api/auth/verify-email/${verificationToken}`;
        const htmlContent = emailTemplates.verification({
            verificationUrl,
            appName: "HiveMind",
            appUrl: process.env.APP_URL,
            expiryHours: 12
        })

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
                        Data: htmlContent,
                        Charset: "UTF-8"
                    },
                    Text: {
                        Data: `Please, click the following link to verify your account: ${verificationUrl}`,
                        Charset: "UTF-8"
                    }
                }
            }
        }
        try {
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