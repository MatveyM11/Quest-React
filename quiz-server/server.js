const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Create an instance of Express
const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Define the paths to the JSON files
const answersFilePath = path.join(__dirname, 'answers.json');
const usersFilePath = path.join(__dirname, 'users.json');

// Initialize the users array
let users = [];

// Check if the users file exists
if (fs.existsSync(usersFilePath)) {
    // If the file exists, read its content and parse it into the users array
    const data = fs.readFileSync(usersFilePath);
    users = JSON.parse(data);
} else {
    // If the file doesn't exist, create it with an empty array
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Endpoint to save answers and ending
app.post('/save-answers', (req, res) => {
    const { email, answers, ending } = req.body; // Destructure email, answers, and ending from the request body

    console.log('Received data:', { email, answers, ending });

    // Write the received answers to the answers.json file
    fs.writeFile(answersFilePath, JSON.stringify({ email, answers, ending }, null, 2), (err) => {
        if (err) {
            console.error('Error writing temporary answers file:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Read the newly written answers file
        const answersData = JSON.parse(fs.readFileSync(answersFilePath));

        let usersData = [];
        // Check if the users file exists and read its content
        if (fs.existsSync(usersFilePath)) {
            usersData = JSON.parse(fs.readFileSync(usersFilePath));
        }

        // Find the user with the provided email
        let user = usersData.find(user => user.email === answersData.email);

        // If the user doesn't exist, create a new user object
        if (!user) {
            user = {
                email: answersData.email,
                 sessions: []
            };
            usersData.push(user); // Add the new user to the users array
        }

        // Check if the user has reached the maximum number of sessions
        if (user.sessions.length >= 5) {
            return res.status(400).send('User has reached the maximum number of sessions.');
        }

        // Add the new session to the user's sessions array
        user.sessions.push({
            sessionNumber: user.sessions.length + 1,
            answers: answersData.answers,
            ending: answersData.ending
        });

        // Write the updated users data back to the users.json file
        fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), (err) => {
            if (err) {
                console.error('Error writing permanent users file:', err);
                return res.status(500).send('Internal Server Error');
            }
            console.log(`User ${email}'s answers and ending saved successfully.`);
            res.send('Answers and ending saved successfully');
        });
    });
});

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://Айпи и Порт npm start:${PORT}`);
});
