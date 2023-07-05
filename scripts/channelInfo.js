// Function to display channel data
function displayChannelData(channel) {
    console.log(channel.snippet)
    // Extract relevant information from the channel object
    const channelTitle = channel.snippet.channelTitle;
    const channelDescription = channel.snippet.description;
    const channelThumbnailUrl = channel.snippet.thumbnails.default.url;

    // Display the channel data in the DOM
    // Replace 'channel-data' with the ID or class of the element where you want to display the channel data
    document.getElementById('section_2_content_container').innerHTML = `
    <div class = "channelInfo">
    <div><h2>${channelTitle}</h2></div>
    <div><img src="${channelThumbnailUrl}" alt="${channelTitle} Thumbnail"></div>
    <div> <p>${channelDescription}</p></div>
    <div> <p id="channelId">${channelDescription}</p></div>

    </div>
  `;
  document.querySelector(".channelInfo").addEventListener('click', (e)=>{
    e.preventDefault()
    window.alert("you clicked")
  })
}
function addANODE(channel){
    document.querySelector('#channelId').textContent = `ChannelId ${channel.snippet.channelId}`

    console.log("Added a node")
}
export{displayChannelData}
export{addANODE}