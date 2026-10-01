const express = require("express");

const app = express();
const PORT = 3002;

app.use(express.json());

const orders = require("./orders");

// Get all orders
app.get("/orders", (req, res) => {
    res.json(orders);
});

// Get orders for a particular user
app.get("/orders/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);

    const userOrders = orders.filter(
        order => order.userId === userId
    );

    res.json(userOrders);
});

// Aggregated endpoint
app.get("/orders/:userId/summary", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        // Request user information from User Service
        const userResponse = await fetch(
            `http://localhost:3001/users/${userId}`
        );

        if (!userResponse.ok) {
            return res.status(userResponse.status).json({
                message: "Unable to fetch user information"
            });
        }

        const user = await userResponse.json();

        // Get orders belonging to the user
        const userOrders = orders.filter(
            order => order.userId === userId
        );

        // Aggregate user and order information
        const response = {
            user: user,
            orders: userOrders
        };

        res.json(response);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Order Service running on http://localhost:${PORT}`);
});