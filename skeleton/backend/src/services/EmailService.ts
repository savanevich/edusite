import { config as emailConfig } from '../configs/email';
import { EmailData as EmailDataInterface } from '../interfaces/EmailData';

const SendGridMail = require('@sendgrid/mail');

class EmailService {
    private static instance: EmailService;

    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
            SendGridMail.setApiKey(emailConfig.sendGridApiKey);
        }

        return EmailService.instance;
    }

    public sendEmail(data: EmailDataInterface): Promise<any> {
        let emailData = {
            to: [{
                email: data.to
            }],
            from: {
                email: data.from || emailConfig.noreplyEmail
            },
            content: [{ // TODO: Get email template from Mongo
                type: 'text/html',
                value: `<div>${data.message}</div>`
            }],
            subject: `${data.subject}`
        };
        return SendGridMail.send(emailData);
    }
}

export default EmailService.getInstance();
