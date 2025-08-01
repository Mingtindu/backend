export const welcomeAndVerifyEmailTemplate = (userName, verificationLink) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Nnine Solution</title>
        <style>
            body { 
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #4CAF50;
                color: #fff;
                text-align: center;
                padding: 20px;
            }
            .content {
                padding: 20px;
                font-size: 14px;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 20px;
                background-color: #4CAF50;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
            }
            .footer {
                background-color: #333;
                color: #fff;
                text-align: center;
                padding: 10px;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Welcome to Nnine Solution!</h1>
            </div>
            <div class="content">
                <p><b>Dear ${userName},</b></p>
                <p>We're excited to have you on board! To get started, please verify your email address by clicking the button below:</p>
                <p style="text-align: center;">
                    <a href="${verificationLink}" class="button">Verify Email</a>
                </p>
                <p>If the button doesn't work, you can also copy and paste the link into your browser:</p>
                <p><a href="${verificationLink}">${verificationLink}</a></p>
                <p>Welcome once again, and we look forward to having a great experience together!</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Nnine Solution. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};