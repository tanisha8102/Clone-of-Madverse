const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

app.get("/profile.jpg", (req, res) => {
    res.sendFile(path.join(__dirname, 'app.madverse', 'profile.jpg'));
});

// Serve script.js from its directory
app.get("/script.js", (req, res) => {
    res.setHeader("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, 'app.madverse', 'script.js'));
});

// Serve styles.css from its directory
app.get("/styles.css", (req, res) => {
    res.sendFile(path.join(__dirname, 'app.madverse', 'styles.css'));
});

// Route to serve the dashboard.html file
app.get("/dashboard.html", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'app.madverse', 'dashboard.html'));
});


// Route to render home.html for the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route to render signup.html for the "/signup" route
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Route to render login.html for the "/login" route
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route to handle user registration
app.post("/signup", async(req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await collection.findOne({ email: email });

        if (existingUser) {
            return res.send('User already exists. Please choose a different email.');
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await collection.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        console.log('User registered successfully.');

        // Redirect the user to login.html after successful registration
        res.redirect('/login');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('An error occurred while registering the user.');
    }
});

// Route to handle user login
// Route to handle user login
app.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user in the database by email
        const user = await collection.findOne({ email: email });

        if (!user) {
            return res.send("User not found.");
        }

        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.send("Wrong password.");
        }

        // Redirect to dashboard.html upon successful login and pass user's name as a query parameter
        res.redirect(`/dashboard.html?name=${user.name}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while logging in.');
    }
});


// Route to handle GET request for "/home.html"
app.get("/home.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Define Port for Application
const port = 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});