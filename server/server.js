require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const app = express();

const PORT = 5000;

const CREDENTIALS_PATH = path.join(
  __dirname,
  "client_secret.json"
);

const TOKEN_PATH = path.join(
  __dirname,
  "token.json"
);

if (!fs.existsSync(CREDENTIALS_PATH)) {
  console.error("ERROR: client_secret.json tidak ditemukan.");
  process.exit(1);
}

const credentials = JSON.parse(
  fs.readFileSync(CREDENTIALS_PATH, "utf8")
);

if (!credentials.installed) {
  console.error(
    "ERROR: client_secret.json bukan credential Desktop App."
  );
  process.exit(1);
}

const {
  client_secret,
  client_id,
} = credentials.installed;

const REDIRECT_URI =
  `http://localhost:${PORT}/oauth2callback`;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  REDIRECT_URI
);

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend website pribadi aktif.",
  });
});

app.get("/auth/google", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/gmail.send",
    ],
  });

  res.redirect(authUrl);
});

app.get("/oauth2callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send(
        "Authorization code tidak ditemukan."
      );
    }

    const { tokens } =
      await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    fs.writeFileSync(
      TOKEN_PATH,
      JSON.stringify(tokens, null, 2)
    );

    console.log(
      "Google Gmail berhasil terhubung."
    );

    res.send(`
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>Google Gmail Terhubung</title>
        </head>

        <body>
          <h1>Google Gmail berhasil terhubung!</h1>
          <p>Autorisasi Google berhasil.</p>
          <p>Website pribadi kamu sekarang dapat menggunakan Gmail API.</p>
        </body>
      </html>
    `);

  } catch (error) {
    console.error(
      "Google OAuth Error:",
      error.response?.data || error.message
    );

    res.status(500).send(
      "Gagal menghubungkan Google Gmail."
    );
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi.",
      });
    }

    if (!fs.existsSync(TOKEN_PATH)) {
      return res.status(401).json({
        success: false,
        message:
          "Google Gmail belum terhubung. Buka /auth/google terlebih dahulu.",
      });
    }

    const tokens = JSON.parse(
      fs.readFileSync(TOKEN_PATH, "utf8")
    );

    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    const destinationEmail =
      process.env.EMAIL_TO;

    if (!destinationEmail) {
      return res.status(500).json({
        success: false,
        message:
          "EMAIL_TO belum diatur di file .env.",
      });
    }

    const subject =
      `Pesan dari Website - ${name}`;

    const emailBody = [
      `Nama: ${name}`,
      `Email: ${email}`,
      "",
      "Pesan:",
      message,
    ].join("\n");

    const rawMessage = [
      `To: ${destinationEmail}`,
      `Subject: ${subject}`,
      `Reply-To: ${email}`,
      "Content-Type: text/plain; charset=UTF-8",
      "",
      emailBody,
    ].join("\r\n");

    const encodedMessage =
      Buffer.from(rawMessage)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log(
      `Email dari ${name} berhasil dikirim.`
    );

    res.json({
      success: true,
      message: "Pesan berhasil dikirim.",
    });

  } catch (error) {
    console.error(
      "GMAIL ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Gagal mengirim email.",
    });
  }
});

app.listen(PORT, () => {
  console.log("");
  console.log("========================================");
  console.log(" WEBSITE PRIBADI BACKEND");
  console.log("========================================");
  console.log(
    `Server: http://localhost:${PORT}`
  );
  console.log(
    `Google Auth: http://localhost:${PORT}/auth/google`
  );
  console.log(
    `OAuth Callback: ${REDIRECT_URI}`
  );
  console.log("========================================");
  console.log("");
});