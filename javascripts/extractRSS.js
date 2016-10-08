var form = document.getElementById('youtube-form'),
    userInput = document.getElementById('user-input'),
    error = document.getElementById('error'),
    rssLink = document.getElementById('rss-link'),
    rssContainer = document.getElementById('rss-container'),

    showError = function() {
        error.innerHTML = 'Unable to get the correct RSS ID from URL provided';

        // remove hidden class
        error.className = '';
    },

    getChannelUrl = function(channelId) {
        var rssUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId;
        showUrl(rssUrl);
    },

    getPlaylistUrl = function(playlistId) {
        var rssUrl = 'https://www.youtube.com/feeds/videos.xml?playlist_id=' + playlistId;
        showUrl(rssUrl);
    },

    showUrl = function(url) {
        rssLink.innerHTML = url;
        // remove hidden class
        rssContainer.className = '';
    },

    getRssId = function(url) {

        var channelMatch = url.match(/\/channel\/([a-zA-Z0-9_-]+)/),
            playlistMatch = url.match(/\/playlist\?list=([a-zA-Z0-9_-]+)/);

        if (channelMatch) {
            getChannelUrl(channelMatch[1]);
        } else if (playlistMatch) {
            getPlaylistUrl(playlistMatch[1]);
        } else {
            showError();
        }
    },
    
    onYoutubeFormSubmit = function(e) {
        e.preventDefault();

        var url = userInput.value;

        if (!url) {
            return;
        }

        // add hidden class
        error.className = 'hidden';
        rssContainer.className = 'hidden';
        
        getRssId(url);
    };

if (form.addEventListener) {
    form.addEventListener("submit", onYoutubeFormSubmit, false);
} else if (form.attachEvent) {
    form.attachEvent('onsubmit', onYoutubeFormSubmit);
}

