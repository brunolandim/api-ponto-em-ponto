import nodemailer from 'nodemailer';
import SMTP_CONFIG from '../config/smtp'

class MailService {

  private transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.auth.user,
      pass: SMTP_CONFIG.auth.pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  public async sendMailConfirmationShortCode(email: string, shortCode: string) {
    try {
      const mailOptions = {
        from: '"Escola Futuro" <escola.futuro1506@gmail.com>',
        to: email,
        subject: 'Código de confirmação',
        text: `Seu código de confirmação é: ${shortCode}`,
        html: this.createHTMLTemplate(shortCode),
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado: %s', info.response);

    } catch (error) {
      console.error('Erro ao enviar o email: ', error);
      throw new Error('Não foi possível enviar o email de confirmação');
    }
  }

  private createHTMLTemplate(shortCode: string): string {
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Código de Confirmação</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: ##6395ec;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #fff;
            padding: 20px;
            text-align: center;
            color: white;
          }
          .header img {
            max-width: 50px;
            margin-bottom: 10px;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
            text-align: center;
          }
          .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
          }
          .code {
            font-size: 36px;
            font-weight: bold;
            margin: 20px 0;
            color: #fff;
          }
          .footer {
            padding: 20px;
            background-color: #f4f4f4;
            text-align: center;
            font-size: 12px;
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Cabeçalho -->
          <div class="header">
            <img src="${process.env.BASE_URL}/images/logo.png" alt="Logo Escola Futuro" /> <!-- Adicione aqui o link do logo -->
            <h2>Código de confirmação - Escola Futuro</h2>
          </div>
          <!-- Conteúdo -->
          <div class="content">
            <p>Código de confirmação</p>
            <p>Para confirmar sua identidade, informe o código gerado abaixo:</p>
            <div class="code">${shortCode}</div>
            <p>Copie o código acima para prosseguir.</p>
            <p><strong>Meu abraço, Equipe Sara</strong></p>
          </div>
          <!-- Rodapé -->
          <div class="footer">
            <p>Você recebeu este email porque cadastrou-se no Escola Futuro.</p>
            <p>Caso não queira receber mais emails como esse, acesse o app e ajuste suas preferências de conta.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export default new MailService();
