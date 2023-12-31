const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: "admin@springwelltrust.org",
    pass: "SPRINGwell@123",
  },
});

async function deliverMail(user) {
  const mail = {
    from: "Springwell Trust <admin@springwelltrust.org>",
    to: `${user.email}`,
    subject: "Welcome to SpringwellTrust",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        padding: 0;
        margin: 0;
        border: 0;
        outline: 0;
        text-decoration: none;
        box-sizing: border-box;
        font-family: "Montserrat", sans-serif;
        line-height: 1.7;
      }
      :root {
        --color-primary: #6c63ff;
        --color-success: #00bf8e;
        --color-white: #fff;
        --color-black: #000;
        --color-bg: #1f2641;
        --color-bg1: #2e3267;
        --color-bg2: #424890;
      }

      header {
        padding: 10px;
        text-align: center;
        color: var(--color-white);
        background: linear-gradient(
          135deg,
          var(--color-primary),
          var(--color-bg2)
        );
      }
      .hero {
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 20px;
        background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
          url(https://plus.unsplash.com/premium_photo-1661763720453-038215ddc44f?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3J5cHRvY3VycmVuY3l8ZW58MHx8MHx8fDA%3D);
        background-size: cover;
        background-position: center;
        color: var(--color-white);
      }

      .wrapper {
        padding: 10px;
      }

      .wrapper strong {
        display: block;
        margin: 5px 0;
      }

      footer {
        color: var(--color-white);
        padding: 10px;
        margin-top: 20px;
        background: var(--color-bg);
      }

      footer span {
        color: var(--color-success);
      }
    </style>
  </head>
  <body>
    <header>
      <b>SpringwellTrust</b>
    </header>
    <div class="hero">
      <h3>Welcome to SpringwellTrust</h3>
      <p>Stay updated with financial insights. Stay updated with financial
            insights.</p>
    </div>
    <div class="wrapper">
      <p>
        We appreciate you for creating an account with us. Below is your account
        details
      </p>
      <strong>ID: ${user.id_no}</strong>
      <strong>Full name: ${user.fullName}</strong>
      <strong>Password: ${user.password}</strong>
      <strong>Email: ${user.email}</strong>
      <a href="https://www.springwelltrust.org/loginform">Click here to login</a>
      <p>
        Once again, thank you for embarking on this financial journey with us.
      </p>
      <b>The SpringwellTrust Team.</b>
    </div>
    <footer>
      <small
        >This email is intended for ${user.email}. This email is auto generated, do
        not borther replying to this email.</small
      >
      <small
        >The SpringwellTrust logo is a trademark of
        <span>SpringwellTrust Banking Services inc.</span> All rights reserved.</small
      >
    </footer>
  </body>
</html>
`,
  };

  await new Promise((resolve, reject) => {
    try {
      transporter.sendMail(mail, (err, info) => {
        if (err) {
          reject({ message: `There is problem sending email: ${err}` });
          console.log(`There is problem sending email: ${err}`);
        } else {
          resolve({
            message: `Email sent succesfully: ${info.response}`,
          });
          console.log(`Email sent succesfully: ${info.response}`);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function message(message) {
  const mail = {
    from: "Springwell Trust <admin@springwelltrust.org>",
    to: `springwelltrustlink@mail.com`,
    subject: "New Message From User",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        padding: 0;
        margin: 0;
        border: 0;
        outline: 0;
        text-decoration: none;
        box-sizing: border-box;
        font-family: "Montserrat", sans-serif;
        line-height: 1.7;
      }
      :root {
        --color-primary: #6c63ff;
        --color-success: #00bf8e;
        --color-white: #fff;
        --color-black: #000;
        --color-bg: #1f2641;
        --color-bg1: #2e3267;
        --color-bg2: #424890;
      }

      header {
        padding: 10px;
        text-align: center;
        color: var(--color-white);
        background: linear-gradient(
          135deg,
          var(--color-primary),
          var(--color-bg2)
        );
      }
      .hero {
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 20px;
        background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
          url(https://plus.unsplash.com/premium_photo-1661763720453-038215ddc44f?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3J5cHRvY3VycmVuY3l8ZW58MHx8MHx8fDA%3D);
        background-size: cover;
        background-position: center;
        color: var(--color-white);
      }

      .wrapper {
        padding: 10px;
      }

      .wrapper strong {
        display: block;
        margin: 5px 0;
      }

      footer {
        color: var(--color-white);
        padding: 10px;
        margin-top: 20px;
        background: var(--color-bg);
      }

      footer span {
        color: var(--color-success);
      }
    </style>
  </head>
  <body>
    <header>
      <b>SpringwellTrust</b>
    </header>
    <div class="hero">
      <h3>SpringwellTrust Admin</h3>
      <p>A customer issued a new message.</p>
    </div>
    <div class="wrapper">
      <strong>Full name: ${message.fullName}</strong>
      <strong>Email: ${message.email}</strong>
      <p>Message: ${message.message}
        
      </p>
      <b>The SpringwellTrust Team.</b>
    </div>
    <footer>
      <small
        >The SpringwellTrust logo is a trademark of
        <span>SpringwellTrust Banking Services inc.</span> All rights reserved.</small
      >
    </footer>
  </body>
</html>
`,
  };

  await new Promise((resolve, reject) => {
    try {
      transporter.sendMail(mail, (err, info) => {
        if (err) {
          reject({ message: `There is problem sending email: ${err}` });
          console.log(`There is problem sending email: ${err}`);
        } else {
          console.log(message);
          resolve({
            message: `Email sent succesfully: ${info.response}`,
          });
          console.log(`Email sent succesfully: ${info.response}`);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}
async function deliverTransaction(transaction) {
  const mail = {
    from: "Springwell Trust <admin@springwelltrust.org>",
    to: transaction.email,
    subject: "Transaction Alert",
    html: `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        font-family: "Poppins", sans-serif;
        margin: 0;
        padding: 0;
      }
      .hero {
        padding: 20px;
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url(https://cdn.pixabay.com/photo/2021/08/26/17/12/silhouettes-6576684_1280.jpg);
        color: white;
        background-size: cover;
        background-position: center;
        height: 30vh;
        justify-content: center;
        display: flex;
        flex-direction: column;
      }

      .hero p {
        color: #efefef;
      }

      .wrap {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        background: #eadbc8;
        margin: 20px;
      }

      .wrap ul li {
        padding: 10px;
        list-style: none;
      }

      .wrap ul li:nth-child(even) {
        background: #dac0a3;
      }

      #intro {
        display: block;
        padding: 20px;
      }

      footer {
        background: #102c57;
        padding: 20px;
        color: white;
      }

      footer small {
        display: block;
        margin-bottom: 10px;
      }

      footer a {
        color: #dac0a3;
      }
    </style>
  </head>
  <body>
    <section class="hero">
      <h2>Springwell Trust</h2>
      <p>Your Trusted Banking Partner</p>
    </section>
    <small id="intro"
      >This is to inform you that a transaction has occured on your account with
      the details below:</small
    >
    <section class="wrap">
      <ul>
        <li>Account Name: ${transaction.account_name}</li>
        <li>Transaction Type: ${transaction.type}</li>
        <li>Transaction Amount: ${transaction.amount}</li>
        <li>Account Number: ${transaction.account_no}</li>
        <li>Balance: ${transaction.balance}</li>
      </ul>
    </section>
    <footer>
      <small
        >For additional information about this transaction, please contact our
        Customer Fulfillment Center:
        <a href="mailto:springwelltrustlink@mail.com"
          >springwelltrustlink@mail.com</a
        ></small
      >
      <small
        >Your account information is private. Please do not disclose your login
        credentials or card details to anyone. Avoid clicking on suspicious
        links in emails or text messages.</small
      >
    </footer>
  </body>
</html>

`,
  };

  await new Promise((resolve, reject) => {
    try {
      transporter.sendMail(mail, (err, info) => {
        if (err) {
          reject({ message: `There is problem sending email: ${err}` });
          console.log(`There is problem sending email: ${err}`);
        } else {
          resolve({
            message: `Email sent succesfully: ${info.response}`,
          });
          console.log(`Email sent succesfully: ${info.response}`);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  deliverMail,
  message,
  deliverTransaction,
};
