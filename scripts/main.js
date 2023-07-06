import { fetchChannelData } from "./fetch.js";

import { displayChannelData } from "./channelInfo.js";
import { displayPlaylists } from "./playlist.js";
import { displayVideos } from "./videos.js";

// calculate header height
const header = document.querySelector('header');
const headerHeight = getComputedStyle(header).height;
document.documentElement.style.setProperty('--header-height', headerHeight);




