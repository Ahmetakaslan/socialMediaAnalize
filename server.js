const express = require('express');
const fetch = require('node-fetch');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const port = 8000;

const API_KEY = 'AIzaSyDgLq67MOOO8B1gDZtilE86cNKTbEcMLFk'; // Replace with your YouTube API key
app.use(express.json());

app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('socialMediaAnalize/youtube.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'youtube.html'));
});

app.post('/getChannelData', async (req, res) => {
    const channelUsername = req.body.channelUsername;

    try {
        // Function to get channel ID from username
        const channelId = await getChannelId(channelUsername);

        if (channelId) {
            // Google API setup
            const youtube = google.youtube({ version: 'v3', auth: API_KEY });

            try {
                // Fetch channel details using YouTube API
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
                        // Fetch video details using YouTube API
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
                             if(status.madeForKids==false){
                                   
                             }
                        // Prepare response data
                        const responseData = {
                            id,
                            description: snippet.description,
                            madeForKids: status.madeForKids ? "Çocuklara uygun":"Yetişkinlere uygun",
                            country: snippet.country,
                            subscriberCount: channelStatistics.subscriberCount,
                            viewCount: channelStatistics.viewCount,
                            videoCount: channelStatistics.videoCount,
                            totalCommentCount,
                        };
                        

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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
