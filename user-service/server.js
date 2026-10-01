const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());

const users = require("./users");

// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);

    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

app.listen(PORT, () => {
    console.log(`User Service running on http://localhost:${PORT}`);
});