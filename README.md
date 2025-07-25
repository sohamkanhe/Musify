# 🎵 Musify

Musify is a web-based music player built with HTML, CSS, and JavaScript. This project dynamically loads and plays music, features a functional search, and has a responsive design.

![Musify Demo](assets/musify_video.gif)
---

## Features

- **Dynamic Playlist & Cards:** Loads songs and cover art dynamically from a local project structure.
- **Full Playback Controls:** Includes play, pause, next, and back track functionality.
- **Interactive Playbar:** Features a clickable seekbar, volume controls, and live time-stamps.
- **Live Search:** Instantly search for songs by title or artist with a dropdown results menu.
- **Responsive Design:** The layout adjusts for smaller screens.

---

## Technologies Used

- **HTML5**
- **CSS3** (Flexbox, Grid, Media Queries)
- **JavaScript** (DOM Manipulation, Audio API, Event Listeners)

---

## How to Run Locally

1.  **Clone the Repository**
    Clone this project to your local machine using `git clone`.

2.  **Add Your Music and Covers**
    -   Place your `.mp3` audio files inside the `/songs` folder.
    -   Place your `.jpg` cover images inside the `/covers` folder.
    -   **Important:** The names of the audio and image files must exactly match the `name` property for each song in the `script.js` file.

3.  **Verify Asset Paths**
    The paths for SVGs and other images are set to be relative (e.g., `/Users/musify/img/home.svg`). If any are not loading, you may need to modify the `src` paths in the `index.html` file to match your file locations.

4.  **Launch the Application**
    Open the `index.html` file in your web browser to start using Musify.
