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

        const vidImage = document.createElement('img');
        const vidTitle = document.createElement('p');
        const vidLink = document.createElement('a');

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
export { displayVideos }
