import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

//Read templates when the app starts running
const verificationEmailTemplate = fs.readFileSync(
    path.join(process.cwd(), "src", "services", "emailServices", "templates", "verification-email.html"),
    'utf-8'
)

//Compile templates using handlebars
const compiledVerificationTemplate = Handlebars.compile(verificationEmailTemplate);

export const emailTemplates = {
    verification: (data) => compiledVerificationTemplate(data),
}