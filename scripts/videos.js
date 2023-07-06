// Function to display videos
function displayVideos(videos) {
    console.log(videos)
    // Display the videos in the DOM
    // Replace 'videos-container' with the ID or class of the element where you want to display the videos
    const videosContainer = document.getElementById('section_2_content_container');
    videosContainer.innerHTML = '';
    const vidHeader = document.createElement('h3');
    vidHeader.textContent = "VIDEOS"
    videos.forEach((video) => {
        // Extract relevant information from the video object
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoThumbnailUrl = video.snippet.thumbnails.default.url;

        // Create a video element and append it to the videos container
        const videoElement = document.createElement('div');
        videoElement.className = "videoElement"
        const videoCard = document.createElement('div');
        const buttonDiv = document.createElement('div');
        buttonDiv.className = "btn"
        const vidImage = document.createElement('img');
        const vidTitle = document.createElement('p');
        const vidLink = document.createElement('a');
        const addToPlaylistBtn = document.createElement('button');
        addToPlaylistBtn.addEventListener('click', (e) => {
            addToPlaylist(videoId, videoTitle, videoThumbnailUrl)
        })
        addToPlaylistBtn.textContent = "+ add to Playlist"
        addToPlaylistBtn.className = "addToPlaylistBtn"


        // assign values and attributes

        vidImage.src = videoThumbnailUrl
        vidImage.alt = videoTitle
        vidTitle.textContent = videoTitle
        vidLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        vidLink.className = 'video-link'
        vidLink.textContent = "Watch Video"

        // Add click event listener to open video modal
        vidLink.addEventListener('click', function (event) {
            event.preventDefault();
            playVideo(videoId);
        });
        // append child elements
        
        videoCard.appendChild(vidImage)
        videoCard.appendChild(vidTitle)
        videoCard.appendChild(vidLink)
        buttonDiv.appendChild(addToPlaylistBtn)
        videoCard.appendChild(buttonDiv)
        videoElement.appendChild(videoCard)


        // videoElement.innerHTML = `

        // <div> <img src="${videoThumbnailUrl}" alt="${videoTitle}"><div>
        // <div><p>${videoTitle}</p></div>
        // <div><a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">Watch Video</a></div>


        // `;
        videosContainer.appendChild(vidHeader);
        videosContainer.appendChild(videoElement);
    });
}
//initializing youtube video player API



// Load the YouTube API asynchronously
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Callback function called when YouTube API is ready
function onYouTubeIframeAPIReady() {
    // API is ready, create the YouTube player and play the video
    playVideo('VIDEO_ID');
}

// Load the YouTube API
loadYouTubeAPI();

let player;

function playVideo(videoId) {
    // KILL PLAYER
    if (player) {
        player.destroy();
    }

    // Create a new instance of the YouTube player
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
            autoplay: 1, // Auto-play the video
            controls: 1, // Show video controls
            disablekb: 1, // Disable keyboard controls
            enablejsapi: 1, // Enable JavaScript API
            modestbranding: 1, // Hide YouTube logo
            rel: 0, // Disable related videos
            showinfo: 0, // Hide video title and uploader info
        },
        events: {
            onReady: onPlayerReady, // Callback function when the player is ready
        },
    });

    // Show the video modal
    const videoModal = document.getElementById('video-player-modal');
    videoModal.style.display = 'block';
}

// Callback function called when the player is ready
function onPlayerReady(event) {
    // Play the video when the player is ready
    event.target.playVideo();
}

// Close button event listener
const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', function () {
    const videoModal = document.getElementById('video-player-modal');
    videoModal.style.display = 'none';
    player.stopVideo();
});

// lets add a video to a playlist
function addToPlaylist(videoId, videoTitle, videoThumbnailUrl) {
    // Look for existing playlists from db.json
    fetch('./sources/db.json')
      .then(response => response.json())
      .then(data => {
        const playlists = data.playlists;
  
        // Check if there are existing playlists
        if (playlists.length > 0) {
          const playlistNames = createPlaylistDropDown(playlists);
          const playlistName = prompt(
            `Choose a playlist or enter a new playlist name:\n${playlistNames.join('\n')}`
          );
  
          // Check if the user selected an existing playlist or entered a new one
          if (playlistName) {
            if (playlistName.toLowerCase() === 'new') {
              // Give the user a prompt to enter a new playlist name
              const newPlaylistName = prompt("Enter the new playlist name:");
              if (newPlaylistName) {
                createNewPlaylist(newPlaylistName, videoId, videoTitle, videoThumbnailUrl);
              } else {
                alert("Invalid playlist name. Please try again.");
              }
            } else {
              // User selected an existing playlist
              addToExistingPlaylist(playlistName, videoId, videoTitle, videoThumbnailUrl, playlists);
            }
          }
        } else {
          // No existing playlists, prompt the user to create a new one
          const newPlaylistName = prompt("There are no existing playlists. Enter the new playlist name:");
          if (newPlaylistName) {
            createNewPlaylist(newPlaylistName, videoId, videoTitle, videoThumbnailUrl);
          } else {
            alert("Invalid playlist name. Please try again.");
          }
        }
      })
      .catch(error => {
        console.error('Error retrieving playlists:', error);
        alert("Error retrieving playlists. Please try again later.");
      });
  }
  
  
  

  function createPlaylistDropDown(playlists) {
    const playlistNames = playlists.map(playlist => playlist.name);
    return playlistNames;
  }
  
  

  
function addToExistingPlaylist(playlistName, videoId, videoTitle, videoThumbnailUrl, playlists) {
    // Find the playlist with the matching name
    const playlist = playlists.find(playlist => playlist.name === playlistName);
    
    if (playlist) {
      // Add the video to the existing playlist
      playlist.videos.push({
        videoId: videoId,
        videoTitle: videoTitle,
        videoThumbnailUrl: videoThumbnailUrl
      });
  
      // Update the playlist in db.json
      fetch('db.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playlists })
      })
        .then(response => {
          if (response.ok) {
            alert(`Video added to "${playlistName}" playlist successfully!`);
          } else {
            throw new Error('Failed to update playlist');
          }
        })
        .catch(error => {
          console.error('Error updating playlist:', error);
          alert('Failed to update playlist. Please try again.');
        });
    } else {
      // Playlist not found, create a new playlist with the given name
      createNewPlaylist(playlistName, videoId, videoTitle, videoThumbnailUrl, playlists);
    }
  }
  
  
  function generateUniqueId() {
    return Date.now().toString();
  }
  
  function createNewPlaylist(playlistName, videoId, videoTitle, videoThumbnailUrl) {
    // Generate a unique ID for the new playlist
    const newPlaylistId = generateUniqueId();
  
    // Create a new playlist object
    const newPlaylist = {
      id: newPlaylistId,
      name: playlistName,
      videos: [
        {
          videoId: videoId,
          videoTitle: videoTitle,
          videoThumbnailUrl: videoThumbnailUrl
        }
      ]
    };
  
    // Fetch the existing playlists from db.json
    fetch('./sources/db.json')
      .then(response => response.json())
      .then(data => {
        const playlists = data.playlists || [];
  
        // Add the new playlist to the existing playlists array
        playlists.push(newPlaylist);
  
        // Update the playlists in db.json
        return fetch('./sources/db.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ playlists })
        });
      })
      .then(response => {
        if (response.ok) {
          alert(`New playlist "${playlistName}" created successfully! Video added to the playlist.`);
        } else {
          throw new Error('Failed to update playlists in db.json.');
        }
      })
      .catch(error => {
        console.error('Error creating new playlist:', error);
        alert("Error creating new playlist. Please try again later.");
      });
  }
  
export{addToPlaylist}
export{playVideo}
export { displayVideos }
