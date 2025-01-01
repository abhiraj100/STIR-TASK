const dotenv = require("dotenv")
dotenv.config()
const express = require('express');
const getTrends = require('./utils/index.js'); // Import the scraping logic
const connection = require('./utils/connection.js');
const trendModel= require('./model/trend.model.js')


const app = express();

const PORT = 3000;

connection();

// Serve the static HTML file
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Scraping endpoint
app.get("/trends", async (req, res) => {
   
    try {
        const start = Date.now();
        const data = await getTrends();
        if(data.trends.length ==0) {
            return res.status(500).json({
                success: false,
                message:"Failed to get trend"
            })
        }
        data.start = start;
        data.end = Date.now();
        console.log("App Data",data);
        
        await trendModel.create({
            nameoftrend1:data.trends[0],
            nameoftrend2:data.trends[1],
            nameoftrend3:data.trends[2],
            nameoftrend4:data.trends[3],
            ipAddress:data.ipAddress,
            start:data.start,
            end:data.end
        })
        res.json({
            success: true,
            message:"Trends created successfully",
            data,
        }); 
    } catch (err) {
        console.error("Error during scraping:", err.message);
        res.status(500).json({ message:err.message,data:[] });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
