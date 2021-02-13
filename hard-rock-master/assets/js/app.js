const searchSongs = async () => {
    const inputField = document.getElementById('input-field').value;
    const url = `https://api.lyrics.ovh/suggest/${inputField}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displaySong(data.data)
    }
    catch (error) {
        displayError('Something went wrong. Please try again later!');
    }

}

const displaySong = songs => {
    const songsContainer = document.getElementById('song-container');
    songsContainer.innerHTML = '';
    songs.forEach(song => {
        console.log(song)
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songsContainer.appendChild(songDiv);
    });
}


const getLyric = async (artist, song) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayLyric(data)
    }
    catch (error) {
        displayError('Something went wrong. Please try again later!');
    }

}

const displayLyric = data => {
    const lyricContainer = document.getElementById('lyric-container');
    lyricContainer.innerText = '';
    const lyric = data.lyrics;
    lyricContainer.innerText = lyric;
}

const displayError = error => {
    const errorTag = document.getElementById('error');
    errorTag.innerText = error;
}


// const searchSongs = async () => {
//     const searchText = document.getElementById('input-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     const response = await fetch(url)
//     const data = await response.json()
//     displaySong(data.data);
// }

// const displaySong = songs => {
//     const songsContainer = document.getElementById('song-container');
//     songsContainer.innerHTML = '';
//     songs.forEach(song => {
//         const songDiv = document.createElement('div');
//         songDiv.className = 'single-result row align-items-center my-3 p-3';
//         songDiv.innerHTML = `
//         <div class="col-md-9">
//             <h3 class="lyrics-name">${song.title}</h3>
//             <p class="author lead">Album by <span>${song.artist.name}</span></p>
//             <audio controls>
//                 <source src="${song.preview}" type="audio/mpeg">
//             </audio>
//         </div>
//         <div class="col-md-3 text-md-right text-center">
//             <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
//         </div>
//         `;
//         songsContainer.appendChild(songDiv);
//     })
// }

// const getLyric = async (artist, songName) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${songName}`
//     const response = await fetch(url)
//     const data = await response.json()
//     displayLyric(data)
// }

// const displayLyric = data => {
//     const lyricContainer = document.getElementById('lyric');
//     lyricContainer.innerText = '';
//     const lyric = data.lyrics;
//     lyricContainer.innerText = lyric;
// }