const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(cors());
 
const port = 8005;
const API_KEY = process.env.API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/socialMediaAnalize/assets/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/socialMediaAnalize/assets/img', express.static(path.join(__dirname, 'assets/img')));
app.use('/socialMediaAnalize/assets/js', express.static(path.join(__dirname, 'assets/js')));
app.use('/socialMediaAnalize/search.html/img', express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, '')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/giris.html'));
});
app.get('/aa', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/chart.html'));
});
app.get('/data', async (req, res) => {
    try { 
        const data = await ChannelModelYoutube.find({});

        res.json(data);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/dataTwitter', async (req, res) => {
    try { 
        const data = await ChannelModelTwitter.find({});

        res.json(data);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const ChannelSchemaTwitter = new mongoose.Schema({
    followerCount: {
        type: Number,
        required: true
    },
    followingCount: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});
const ChannelSchemaYoutube = new mongoose.Schema({
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
         description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
    ,
    channelName: {
        type: String,
        required: true
    },
});

const ChannelModelYoutube = mongoose.model('ChannelYoutube', ChannelSchemaYoutube, 'youtube');
const ChannelModelTwitter = mongoose.model('ChannelTwitter', ChannelSchemaTwitter, 'twitter');
async function connectToMongoDBYoutube() {
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
async function connectToMongoDBTwitter() {
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
connectToMongoDBTwitter();
connectToMongoDBYoutube();
app.get('/getChannelDataFromDb', async (req, res) => {
    try {
        const data = await ChannelModelYoutube.find({});
        console.log(data)
        res.json(data);
    } catch (error) {
        console.log("Hata" + error);
        res.status(500).json({ error: 'İç Sunucu Hatası' });
    } finally {
        // mongoose.disconnect(); // Bağlantıyı burada kesmeyin, gelecekteki istekler için bağlantıyı açık tutmak için
    }
});

app.get('/getChartData', async (req, res) => {
    try {
        const channelData = await ChannelModelYoutube.findOne();

        if (channelData && channelData.data) {
            res.json(channelData.data);
        } else {
            res.status(404).json({ error: 'Kanal verisi bulunamadı' });
        }
    } catch (error) {
        console.error('MongoDB\'den kanal verisi çekerken hata:', error.message);
        res.status(500).json({ error: 'İç Sunucu Hatası' });
    }
});




















app.get('/socialMediaAnalize/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/homepage.html'));
});
app.get('/socialMediaAnalize/chart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/chart.html'));
});
app.get('/socialMediaAnalize/chartTwitter.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/chartTwitter.html'));
});
app.get('/socialMediaAnalize/twitter.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/twitter.html'));
});
app.get('/socialMediaAnalize/instagram.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/instagram.html'));
});
app.get('/socialMediaAnalize/instaIstatistik.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/instaIstatistik.html'));
});
app.get('/socialMediaAnalize/search.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/search.html'));
});

app.get('/changePage', (req, res) => {
    res.redirect('/socialMediaAnalize/youtube.html');
});

app.use((req, res) => {
    res.status(404).sendFile('pages/404.html', { root: __dirname });
});
//Api
app.post('/getChannelData', async (req, res) => {
    const channelUsername = req.body.channelUsername;
    try {
        const channelId = await getChannelId(channelUsername);

        if (channelId) {
            const youtube = google.youtube({ version: 'v3', auth: API_KEY });

            try {
                const response = await youtube.channels.list({
                    part: 'contentDetails,statistics,snippet,status',
                    id: channelId,
                });

                const channelDetails = response.data.items?.[0];

                if (channelDetails) {
                    const uploadsPlaylistId = channelDetails.contentDetails.relatedPlaylists.uploads;
                    const status = channelDetails.status;
                    const id = channelDetails.id;
                    const snippet = channelDetails.snippet;
                    const channelStatistics = channelDetails.statistics;

                    if (uploadsPlaylistId) {
                        const videoResponse = await youtube.playlistItems.list({
                            part: 'contentDetails',
                            playlistId: uploadsPlaylistId,
                            maxResults: 50,
                        });

                        const videoIds = videoResponse.data.items.map(item => item.contentDetails.videoId);

                        const videoDetails = await Promise.all(
                            videoIds.map(videoId => {
                                return youtube.videos.list({
                                    part: 'statistics',
                                    id: videoId,
                                });
                            })
                        );

                        const totalCommentCount = videoDetails.reduce((total, details) => {
                            return total + parseInt(details.data.items[0].statistics.commentCount);
                        }, 0);

                        const responseData = {
                            id,
                            description: snippet.description,
                            madeForKids: status.madeForKids ? "Çocuklara uygun" : "Yetişkinlere uygun",
                            country: snippet.country,
                            subscriberCount: channelStatistics.subscriberCount,
                            viewCount: channelStatistics.viewCount,
                            videoCount: channelStatistics.videoCount,
                            totalCommentCount,
                        };

                        // Save data to MongoDB
                        await saveDataToMongoDB(channelUsername, responseData);

                        res.json(responseData);
                    } else {
                        res.status(400).send('Uploaded videos playlist ID not found.');
                    }
                } else {
                    console.error('Channel details not found for channel ID:', channelId);
                    res.status(400).json({ error: 'Channel details not found' });
                }
            } catch (error) {
                console.error('Error fetching channel information:', error.message);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            console.error('Channel ID not retrieved.');
            res.status(400).json({ error: 'Channel ID not retrieved' });
        }
    } catch (error) {
        console.error('Error getting channel ID:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to get channel ID from username
async function getChannelId(username) {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=id&type=channel&q=${username}&key=${API_KEY}`;

    try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        const channelId = data.items?.[0]?.id?.channelId;
        if (channelId) {
            return channelId;
        } else {
            throw new Error('Channel ID not retrieved.');
        }
    } catch (error) {
        console.error('Error in getChannelId:', error);
        throw error;
    }
}

async function saveDataToMongoDB(channelName, data) {
    const { client, collection } = await connectToMongoDBYoutube();

    try {
        const query = { channelName: channelName };
        const update = { $set: { data: data } };
        const options = { upsert: true };

        await collection.updateOne(query, update, options);
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        throw error;
    } finally {
        await client.close();
    }
}


app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});


