import { playVideo } from "./videos.js";
import { addToPlaylist } from "./videos.js";

const apiKey = 'AIzaSyC6TJw5Te4b-xFvVfWzKtCl5-yQnSgC3b8';
// Function to display playlists
function displayPlaylists(playlists) {
  // Display the playlists in the DOM
  // Replace 'playlists-container' with the ID or class of the element where you want to display the playlists
  const playlistsContainer = document.getElementById('section_2_content_container');
  playlistsContainer.innerHTML = '';

  playlists.forEach((playlist) => {
    // Extract relevant information from the playlist object
    const playlistId = playlist.id;
    const playlistTitle = playlist.snippet.title;
    const playlistThumbnailUrl = playlist.snippet.thumbnails.default.url;

    // Create a playlist element and append it to the playlists container
    const playlistElement = document.createElement('div');
    playlistElement.className = "videoElement"
    playlistElement.innerHTML = `<div class ="playlistItem">
    <div class="items"><img src="${playlistThumbnailUrl}" alt="${playlistTitle}"></div>
    <div class="items"> <h3>${playlistTitle}</h3></div>
    <div class="items">  <a id = "playlistLink"  href="#">View Playlist</a></div>
    
   
  
 </div>
    `;
    playlistElement.addEventListener('click', () => {
      populatePlaylistItems(playlistId);
    });

    playlistsContainer.appendChild(playlistElement);
  });

}

function populatePlaylistItems(playlistId, playlistTitle) {
  // Replace this with your own code to fetch and display the items in the playlist
  fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      // Access the playlist items from the response
      const playlistItems = data.items;

      // Display the playlist items in the DOM
      const playlistItemsContainer = document.getElementById('section_2_content_container');
      playlistItemsContainer.innerHTML = '';
      const title = document.createElement('h4');
      title.textContent = playlistTitle

      playlistItems.forEach((item) => {
        const videoId = item.snippet.resourceId.videoId;
        const videoTitle = item.snippet.title;
        const videoThumbnailUrl = item.snippet.thumbnails.default.url;
        const playlists = document.getElementById('channelPlaylist')
        playlists.addEventListener('click', (e) => {
          addToPlaylist(videoId, videoTitle, videoThumbnailUrl)
        })


        const itemElement = document.createElement('div');
        itemElement.innerHTML = ''
        itemElement.className = "videoElement"
        const videoCard = document.createElement('div');
        const vidImage = document.createElement('img');
        const vidTitle = document.createElement('p');
        const vidLink = document.createElement('a');
        const addToPlaylistBtn = document.createElement('button');
        addToPlaylistBtn.addEventListener('click', (e) => {
          addToPlaylist(videoId, videoTitle, videoThumbnailUrl)
        })
        vidImage.src = videoThumbnailUrl
        vidTitle.textContent = videoTitle
        vidLink.href = `https://www.youtube.com/watch?v=${videoId}`
        vidLink.textContent = "watch Video"
        addToPlaylistBtn.textContent = "+";
        vidLink.addEventListener('click', function (event) {
          event.preventDefault();
          playVideo(videoId);
        });

        videoCard.appendChild(vidImage)
        videoCard.appendChild(vidTitle)
        videoCard.appendChild(vidLink)
        videoCard.appendChild(addToPlaylistBtn)


        // `

        // <div><img src="${videoThumbnailUrl}" alt="${videoTitle}"></div>
        // <div> <h4>${videoTitle}</h4></div>
        // <div class= "playlistItem" > <a href="#" >          
        //    play
        // </a></div>

        // `;
        itemElement.appendChild(videoCard)
        playlistItemsContainer.appendChild(itemElement);
      });

    })
    .catch((error) => {
      console.error('Error fetching playlist items:', error);
    });
}

export { displayPlaylists };
