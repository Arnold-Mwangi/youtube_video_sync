// // Load the API client
// gapi.load('client', initClient);

// // Initialize the API client
// function initClient() {
//   console.log('Initializing API client...');
//   gapi.client.init({
//     apiKey: 'AIzaSyDgGevuITEBOolhNBvG4wINp9sAAZ8DHw4',
//     discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
//   }).then(function() {
//     console.log('API client initialized.');
//     getChannelVideos('UCwxmeEUqNZ6ZSkxtLEJ-Ujw'); // Call the function here
//   }).catch(function(error) {
//     console.log('Error loading YouTube API:', error);
//   });
// }

// // Make an API request
// function getChannelVideos(channelId) {
//   gapi.client.youtube.search.list({
//     part: 'snippet',
//     channelId: channelId,
//     maxResults: 10
//   }).then(function(response) {
//     var videos = response.result.items;
//     displayVideos(videos);
//   }).catch(function(error) {
//     console.log('Error loading channel videos:', error);
//   });
// }

// // Display the videos on the web page
// function displayVideos(videos) {
//   var videosContainer = document.getElementById('videos-container');

//   if (!Array.isArray(videos)) {
//     console.log('Invalid videos data');
//     return;
//   }

//   videos.forEach(function(video) {
//     var videoItem = document.createElement('div');
//     videoItem.innerHTML = `
//       <h2>${video.snippet.title}</h2>
//       <p>${video.snippet.description}</p>
//       <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
//     `;
//     videosContainer.appendChild(videoItem);
//   });
// }

// // // Load the API client
// // gapi.load('client', initClient);

// // // Initialize the API client
// // function initClient() {
// //   console.log('Initializing API client...');
// //   gapi.client.init({
// //     apiKey: 'AIzaSyDgGevuITEBOolhNBvG4wINp9sAAZ8DHw4',
// //     discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
// //   }).then(function() {
// //     console.log('API client initialized.');
// //     getChannelVideos('UCwxmeEUqNZ6ZSkxtLEJ-Ujw'); // Call the function here
// //   }).catch(function(error) {
// //     console.log('Error loading YouTube API:', error);
// //   });
// // }

// // // Make an API request
// // function getChannelVideos(channelId) {
// //   gapi.client.youtube.search.list({
// //     part: 'snippet',
// //     channelId: channelId,
// //     maxResults: 10
// //   }).then(function(response) {
// //     var videos = response.result.items;
// //     // Process the list of videos
// //     console.log(videos);
// //   }).catch(function(error) {
// //     console.log('Error loading channel videos:', error);
// //   });
// // }

// // // Display the videos on the web page
// // function displayVideos(videos) {
// //     var videosContainer = document.getElementById('videos-container');
  
// //     videos.forEach(function(video) {
// //       var videoItem = document.createElement('div');
// //       videoItem.innerHTML = `
// //         <h2>${video.snippet.title}</h2>
// //         <p>${video.snippet.description}</p>
// //         <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
// //       `;
// //       videosContainer.appendChild(videoItem);
// //     });
// //   }
// //   displayVideos()