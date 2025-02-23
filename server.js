import express from "express";
import sqlite3Module from "sqlite3";
import nodemailer from "nodemailer";
import cors from "cors";

const sqlite3 = sqlite3Module.verbose();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database("waitlist.db", (err) => {
    if (err) console.error("Database connection error:", err);
    else console.log("Connected to SQLite database.");
});

db.run(`CREATE TABLE IF NOT EXISTS waitlist (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL)`);

// Email setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-email-password"  // Replace with your email password or use an app password
    }
});

app.post("/join-waitlist", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required." });
    }

    db.run("INSERT INTO waitlist (email) VALUES (?)", [email], (err) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Email already exists or database error." });
        }

        // Send notification email
        const mailOptions = {
            from: "your-email@gmail.com",
            to: "taylor@latimere.com",
            subject: "New Waitlist Signup",
            text: `A new user has joined the waitlist: ${email}`
        };

        transporter.sendMail(mailOptions, (mailErr) => {
            if (mailErr) {
                console.error("Email error:", mailErr);
                return res.status(500).json({ success: false, message: "Error sending email notification." });
            }

            res.json({ success: true, message: "Email added to waitlist." });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});