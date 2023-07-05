const apiKey = 'AIzaSyB3f7nAbozOe2gJZetQc5GIuJGwqanKyOo';

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

// Function to display channel data
function displayChannelData(channel) {
    // Extract relevant information from the channel object
    const channelTitle = channel.snippet.channelTitle;
    const channelDescription = channel.snippet.description;
    const channelThumbnailUrl = channel.snippet.thumbnails.default.url;

    // Display the channel data in the DOM
    // Replace 'channel-data' with the ID or class of the element where you want to display the channel data
    document.getElementById('result_card').innerHTML = `
    <h2>${channelTitle}</h2>
    <img src="${channelThumbnailUrl}" alt="${channelTitle} Thumbnail">
    <p>${channelDescription}</p>
  `;
}

// Function to display videos
function displayVideos(videos) {
    // Display the videos in the DOM
    // Replace 'videos-container' with the ID or class of the element where you want to display the videos
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = '';

    videos.forEach((video) => {
        // Extract relevant information from the video object
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoThumbnailUrl = video.snippet.thumbnails.default.url;

        // Create a video element and append it to the videos container
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
      <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
        <img src="${videoThumbnailUrl}" alt="${videoTitle}">
        <h3>${videoTitle}</h3>
      </a>
    `;
        videosContainer.appendChild(videoElement);
    });
}

// Function to display playlists
function displayPlaylists(playlists) {
    // Display the playlists in the DOM
    // Replace 'playlists-container' with the ID or class of the element where you want to display the playlists
    const playlistsContainer = document.getElementById('playlists-container');
    playlistsContainer.innerHTML = '';

    playlists.forEach((playlist) => {
        // Extract relevant information from the playlist object
        const playlistId = playlist.id;
        const playlistTitle = playlist.snippet.title;
        const playlistThumbnailUrl = playlist.snippet.thumbnails.default.url;

        // Create a playlist element and append it to the playlists container
        const playlistElement = document.createElement('div');
        playlistElement.innerHTML = `
      <a href="https://www.youtube.com/playlist?list=${playlistId}" target="_blank">
        <img src="${playlistThumbnailUrl}" alt="${playlistTitle}">
        <h3>${playlistTitle}</h3>
      </a>
    `;
        playlistsContainer.appendChild(playlistElement);
    });
}

// Call the fetchChannelData function to initiate the API request and display the channel data, videos, and playlists
// fetchChannelData();
