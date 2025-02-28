import {emailService} from "../config/emailService.js";

async function testEmailService() {
    try{
        console.log("Trying to send an email...");

        const testEmail = "96saul96@gmail.com"
        const testToken = "test-token-1234";

        await emailService.sendVerificationEmail(testEmail, testToken);

        console.log("Email sent successfully!");
    }catch(error){
        console.error("Error sending email:", error);
        console.error("Error details: ", error.message);
    }
}

testEmailService();