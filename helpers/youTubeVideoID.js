function getYouTubeVideoID(url) {
    if (!url) {
        return null; // Return null if the URL is invalid or missing
    }
    const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v|shorts)\/))([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null; // Returns the video ID or null if invalid
}

module.exports = getYouTubeVideoID;
