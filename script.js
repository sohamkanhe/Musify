document.addEventListener("DOMContentLoaded", function() {

const songs = [
    { name: "Ocean-Waves", artist: "Pixabay" },
    { name: "Levitating", artist: "Dua Lipa" },
    { name: "All At Once", artist: "Madison Beer" },
    { name: "Qayamat", artist: "Neeraj Shridhar" },
    { name: "Dil E Nadaan", artist: "Madhubanti Bagchi" },
    { name: "Across The Stars", artist: "John Williams" },
    { name: "Cornfield Chase", artist: "Hans Zimmer" },
    { name: "Doraemon Song", artist: "Doraemon" },
    { name: "Shinchan", artist: "Shinchan" },
    { name: "Harry Potter Theme Song", artist: "John Williams" },
    { name: "The Mandalorian Theme", artist: "Ludwig Göransson" },
    { name: "Embrace", artist: "Pixabay" },
];
    let currentPlayingIndex = null;
    const audioPlayer = new Audio();

    const songListUL = document.querySelector(".songlist ul");
    const cardContainer = document.querySelector(".card-container");
    const playlistBtn = document.querySelector(".my-playlist");
    const playbarSongCover = document.querySelector(".playbar .song-cover");
    const playbarSongName = document.querySelector(".playbar .song-name");
    const playbarSongArtist = document.querySelector(".playbar .song-artist");
    const mainPlayBtn = document.querySelector(".play-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const currentTimeDisplay = document.querySelector(".time-info .time-display:first-child");
    const totalTimeDisplay = document.querySelector(".time-info .time-display:last-child");
    const seekbar = document.querySelector(".seekbar");
    const seekbarProgress = document.querySelector(".seekbar-progress");
    const volumeIcon = document.querySelector(".volume-control .control-btn");
    const volumeBar = document.querySelector(".volume-bar");
    const volumeProgress = document.querySelector(".volume-progress");
    const searchInput = document.querySelector(".search-bar input");
    const searchResultsContainer = document.getElementById("search-results");

    function playSong(index) {
        if (index < 0 || index >= songs.length) return;
        
        const selectedSong = songs[index];
        audioPlayer.src = `songs/${selectedSong.name}.mp3`;
        audioPlayer.play();

        currentPlayingIndex = index;
        updatePlaybarInfo(selectedSong);
        updateAllPlayPauseIcons(true);
    }
    
    function loadSong(index) {
        if (index < 0 || index >= songs.length) return;

        const selectedSong = songs[index];
        audioPlayer.src = `songs/${selectedSong.name}.mp3`;
        
        audioPlayer.addEventListener('loadedmetadata', () => {
            totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
            currentTimeDisplay.textContent = formatTime(0);
            if (seekbarProgress) seekbarProgress.style.width = '0%';
        }, { once: true });

        currentPlayingIndex = index;
        updatePlaybarInfo(selectedSong);
        updateAllPlayPauseIcons(false);
    }

    function togglePlayPause() {
        if (!audioPlayer.src) {
            playSong(0);
            return;
        }
        if (audioPlayer.paused) {
            audioPlayer.play();
            updateAllPlayPauseIcons(true);
        } else {
            audioPlayer.pause();
            updateAllPlayPauseIcons(false);
        }
    }

    function nextTrack() {
        let nextIndex = (currentPlayingIndex === null) ? 0 : (currentPlayingIndex + 1) % songs.length;
        loadSong(nextIndex);
    }

    function previousTrack() {
        let prevIndex = (currentPlayingIndex === null) ? songs.length - 1 : (currentPlayingIndex - 1 + songs.length) % songs.length;
        loadSong(prevIndex);
    }
    
    function togglePlaylist() {
        const songListElement = document.querySelector(".songlist");
        if (songListElement) {
            songListElement.classList.toggle("show");
        }
    }
    
    function setVolume(e) {
        const barRect = volumeBar.getBoundingClientRect();
        const clickX = e.clientX - barRect.left;
        let newVolume = Math.max(0, Math.min(1, clickX / barRect.width));
        audioPlayer.volume = newVolume;
        audioPlayer.muted = false;
    }
    
    function toggleMute() {
        audioPlayer.muted = !audioPlayer.muted;
    }
    
    function handleSearch() {
        const query = searchInput.value.toLowerCase();

        if (query.length === 0) {
            searchResultsContainer.style.display = 'none';
            return;
        }

        const filteredSongs = songs.filter(song =>
            song.name.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query)
        );

        searchResultsContainer.innerHTML = ''; 

        if (filteredSongs.length > 0) {
            filteredSongs.forEach(song => {
                const originalIndex = songs.findIndex(s => s.name === song.name);
                searchResultsContainer.innerHTML += `
                    <div class="search-result-item" data-index="${originalIndex}">
                        <img src="covers/${song.name}.jpg" alt="${song.name}">
                        <div class="info">
                            <div class="name">${song.name}</div>
                            <div class="artist">${song.artist}</div>
                        </div>
                    </div>
                `;
            });
            searchResultsContainer.style.display = 'block';
        } else {
            searchResultsContainer.style.display = 'none';
        }
    }

    function updatePlaybarInfo(song) {
        playbarSongName.textContent = song.name;
        playbarSongArtist.textContent = song.artist;
        playbarSongCover.innerHTML = `<img src="covers/${song.name}.jpg" alt="${song.name}">`;
    }

    function updateAllPlayPauseIcons(isPlaying) {
        const playIconPath = "M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.287V1.713z";
        const pauseIconPath = "M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z";
        if (mainPlayBtn) mainPlayBtn.querySelector("svg path").setAttribute("d", isPlaying ? pauseIconPath : playIconPath);

        document.querySelectorAll(".songlist ul li").forEach((li, index) => {
            const icon = li.querySelector(".playnow img");
            if (icon) {
                icon.src = (index === currentPlayingIndex && isPlaying) ? "img/pause.svg" : "img/play.svg";
            }
        });
    }
    
    function updateVolumeUI() {
        if (audioPlayer.muted) {
            volumeProgress.style.width = '0%';
        } else {
            volumeProgress.style.width = `${audioPlayer.volume * 100}%`;
        }
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function populateSongCards() {
        if (!cardContainer) return;
        cardContainer.innerHTML = "";
        songs.forEach((song, index) => {
            cardContainer.innerHTML += `
                <div class="card" data-index="${index}">
                    <div class="play">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" stroke="#000000" stroke-width="1.5" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <img src="covers/${song.name}.jpg" alt="${song.name}">
                    <h3>${song.name}</h3>
                    <p>${song.artist}</p>
                </div>
            `;
        });
    }
    
    songListUL.innerHTML = "";
    songs.forEach((song, index) => {
        songListUL.innerHTML += `
            <li data-index="${index}">
                <img src="covers/${song.name}.jpg" alt="${song.name}">
                <div class="info">
                    <div>${song.name}</div>
                    <div>${song.artist}</div>
                </div>
                <div class="playnow">
                    <img class="invert" src="img/play.svg" alt="Play">
                </div>
            </li>
        `;
    });
    
    populateSongCards();

    if (songs.length > 0) {
        loadSong(0);
    }
    
    audioPlayer.volume = 0.7;
    updateVolumeUI();

    playlistBtn.addEventListener("click", togglePlaylist);
    mainPlayBtn.addEventListener("click", togglePlayPause);
    nextBtn.addEventListener("click", nextTrack);
    prevBtn.addEventListener("click", previousTrack);
    volumeBar.addEventListener("click", setVolume);
    volumeIcon.addEventListener("click", toggleMute);
    searchInput.addEventListener("input", handleSearch);

    cardContainer.addEventListener("click", e => {
        const card = e.target.closest(".card");
        if (card) {
            const index = parseInt(card.dataset.index);
            playSong(index);
        }
    });

    document.querySelectorAll(".songlist ul li").forEach(li => {
        li.addEventListener("click", () => {
            const clickedIndex = parseInt(li.getAttribute("data-index"));
            if (currentPlayingIndex === clickedIndex) {
                togglePlayPause();
            } else {
                playSong(clickedIndex);
            }
        });
    });
    
searchResultsContainer.addEventListener("click", e => {
    const resultItem = e.target.closest(".search-result-item");
    if (resultItem) {
        const index = parseInt(resultItem.dataset.index);
        loadSong(index); 
        searchResultsContainer.style.display = 'none';
        searchInput.value = '';
    }
});

    document.addEventListener("click", e => {
        if (!e.target.closest(".search-bar") && !e.target.closest("#search-results")) {
            searchResultsContainer.style.display = 'none';
        }
    });

    audioPlayer.addEventListener("timeupdate", () => {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            if(seekbarProgress) seekbarProgress.style.width = `${progress}%`;
            currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        }
    });

    audioPlayer.addEventListener("loadedmetadata", () => {
        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
    });

    audioPlayer.addEventListener("ended", nextTrack);
    
    audioPlayer.addEventListener("volumechange", updateVolumeUI);

    seekbar.addEventListener("click", (e) => {
        if (isNaN(audioPlayer.duration)) return;
        const seekbarRect = seekbar.getBoundingClientRect();
        const clickPosition = e.clientX - seekbarRect.left;
        const seekTime = (clickPosition / seekbarRect.width) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

});