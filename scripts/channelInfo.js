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

export{displayChannelData}