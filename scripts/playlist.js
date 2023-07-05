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

export{displayPlaylists}