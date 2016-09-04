var form = document.getElementById('youtube-form'),
    userInput = document.getElementById('user-input'),
    error = document.getElementById('error'),
    rssLink = document.getElementById('rss-link'),
    rssContainer = document.getElementById('rss-container'),

    showError = function() {
        error.innerHTML = 'Unable to get the channel ID from URL provided';

        // remove hidden class
        error.className = '';
    },

    showRssUrl = function(channelId) {
        var rssUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId;
        rssLink.innerHTML = rssUrl;

        // remove hidden class
        rssContainer.className = '';
        
    },

    getChannelId = function(url) {
        var channelMatch = url.match(/\/channel\/([a-zA-Z0-9_]+)/);

        if (channelMatch) {
            showRssUrl(channelMatch[1]);
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
        
        getChannelId(url);
    };

if (form.addEventListener) {
    form.addEventListener("submit", onYoutubeFormSubmit, false);
} else if (form.attachEvent) {
    form.attachEvent('onsubmit', onYoutubeFormSubmit);
}

