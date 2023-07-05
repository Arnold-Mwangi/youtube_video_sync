import { displayChannelData } from "./channelInfo.js";
import { displayPlaylists } from "./playlist.js";
import { displayVideos } from "./videos.js";



// Add an event listener to the form submit event
const channelForm = document.getElementById('channel-form');
channelForm.addEventListener('submit', handleFormSubmit);

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Get the channel name from the input field
    const channelName = document.getElementById('channelName').value;

    // Call the fetchChannelData function with the retrieved channel name
    fetchChannelData(channelName);
}





// Function to fetch channel data
async function fetchChannelData(channelName) {
    console.log(channelName)
    try {
        // Fetch channel data
        const searchResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelName}&type=channel&key=${apiKey}`
        );
        const searchResult = await searchResponse.json();

        // Check if the API response contains any items
        if (!searchResult || !searchResult.items || searchResult.items.length === 0) {
            console.log('No channel found with the given name.');
            return; // Exit the function if no channel is found
        }

        // Extract channel ID
        const channelId = searchResult.items[0].id.channelId;
        const channelTitle = searchResult.items[0].snippet.channelTitle;
        const channelDescription = searchResult.items[0].snippet.description;
        const channelThumbnailUrl = searchResult.items[0].snippet.thumbnails.default.url;

        // Fetch channel videos
        const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&key=${apiKey}`
        );
        const videosResult = await videosResponse.json();

        // Fetch channel playlists
        const playlistsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&key=${apiKey}`
        );
        const playlistsResult = await playlistsResponse.json();

        // Process and display channel data, videos, and playlists
        displayChannelData(searchResult.items[0]);
        displayVideos(videosResult.items);
        displayPlaylists(playlistsResult.items);
    } catch (error) {
        console.error('Error fetching channel data:', error);
    }
}

export{fetchChannelData}