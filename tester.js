<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="container">
        <header>
            <nav>

            </nav>
        </header>
<div class="main">
    <div class="section1">
        <form class="form" id="channel-form">
            <input type="text" name="channelName" id="channelName" placeholder="search channel by name">
            <input type="submit" value="search" id="submitSearch">
        </form>
    </div>
    <nav>
        <ul>
            <li id="channelInfo"><a href="">Channel Info</a></li>
            <li><a href="">Channel Videos</a></li>
            <li><a href="">Channel playlists</a></li>
        </ul>
    </nav>
    <div class="section2">
         <div id="search_results_container">
            <div id="result_card">
                <div class="result_thumbnail"></div>
            </div>
            <div id="videos-container">
                <h1>videos

                </h1>
            </div>
            <div id="playlists-container">
                <h1>
                    playlist
                </h1>
            </div>
         </div>
   
    </div>
</div>
        
    </div>
   
    <!-- <script src="https://apis.google.com/js/api.js"></script> -->
    <script type="module" src="./scripts/main.js"></script>
    <!-- <script src="./script.js"></script> -->

</body>




</html>