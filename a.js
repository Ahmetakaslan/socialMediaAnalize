const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
const port = 5555;
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/aa', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'));
});
app.get('/bb', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/data', async (req, res) => {
    try { 
        const data = await ChannelModel.find({});
        res.json(data);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const ChannelSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    madeForKids: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    subscriberCount: {
        type: Number,
        required: true
    },
    viewCount: {
        type: Number,
        required: true
    },
    videoCount: {
        type: Number,
        required: true
    },
    totalCommentCount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const ChannelModel = mongoose.model('Channel', ChannelSchema, 'youtube');

async function connectToMongoDB() {
    try {
        await mongoose.connect(`mongodb://127.0.0.1/SosyalMediaAnaliz`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB\'ye bağlandı!');
    } catch (error) {
        console.error('MongoDB\'ye bağlanırken hata:', error);
        throw error;
    }
}

connectToMongoDB();
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
