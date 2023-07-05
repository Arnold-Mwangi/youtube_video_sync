// Function to display videos
function displayVideos(videos) {
    // Display the videos in the DOM
    // Replace 'videos-container' with the ID or class of the element where you want to display the videos
    const videosContainer = document.getElementById('section_2_content_container');
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

export{displayVideos}