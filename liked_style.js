/** @format */

const displaySongs = document.querySelector("#artist-songs")
let songs = []

window.onload = () => {
	getSongs();
}

function getSongs() {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062")
        .then((response) => response.json())
        .then((data) => {
            songs = data
            console.log(songs)
			showSongs()            
            
        })
        .catch((err) => console.error(err.message))
    }


	function showSongs(){
        songs.forEach(song => {
            displaySongs.innerHTML += 
            `
			<div class="table-body mt-3">
			<div class="d-flex hash">
				<h6 class="text-light">1</h6>
			</div>
			<div class="d-flex cover title">
				<div class="cover-son">
					<img src="${songs.cover_small}" width="45" />
				</div>
				<div class="co">
					<a id="a1" href="">${songs.track.data.title}</a>
					<br />
					<a id="a2" href="">${songs.artist.name}</a>
					
				</div>
			</div>
			<div class="d-flex album">
				<span class="text-light album">${songs.title}</span>
			</div>
			<div class="d-flex date-added">
				<span class="text-light">${songs.release_date}</span>
			</div>
			<div class="d-flex duration">
				<span class="text-light">${songs.duration}</span>
			</div>
		</div>
			
            `
        }
            
            )
    }


document.querySelector('#btn-b4-follow').addEventListener('click', function () {
	let doc = document.querySelector('.follow');
	doc.classList.toggle('arrow-right');
	doc.classList.toggle('button-paused');
});

let currentMusic = 0;
const music = document.querySelector('#audio');
const songname = document.querySelector('.Song-name');
const artistname = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const seekbar = document.querySelector('.seek-bar');
const currenttime = document.querySelector('.current-time');
const durationtime = document.querySelector('.duration-time');
const backbtn = document.querySelector('#prev-button');
const playbtn = document.querySelector('.play-button');
const nextbtn = document.querySelector('#next-button');
const volbnt = document.querySelector('.volume-hr');
const volnum = document.querySelector('#vol-btn-1');

playbtn.addEventListener('click', () => {
	if (playbtn.className.includes('pause')) {
		music.play();
	} else {
		music.pause();
	}
	playbtn.classList.toggle('pause');
	disk.classList.toggle('play');
});

const setMusic = (i) => {
	seekbar.value = 0;
	let song = songs[i];
	currentMusic = i;
	music.src = song.path;
	songname.innerHTML = song.name;
	artistname.innerHTML = song.artist;
	currenttime.innerHTML = '00:00';
	disk.style.backgroundImage = `url('${song.cover}')`;
	setTimeout(() => {
		seekbar.max = music.duration;
		durationtime.innerHTML = formatTime(music.duration);
	}, 300);
};

const formatTime = (time) => {
	let min = Math.floor(time / 60);
	let sec = Math.floor(time % 60);
	if (min < 10) {
		min = `0${min}`;
	}
	if (sec < 10) {
		sec = `0${sec}`;
	}
	return `${min}:${sec}`;
};

setInterval(() => {
	seekbar.value = music.currenttime;
	currenttime.innerHTML = formatTime(music.currenttime);
	if (Math.floor(music.currenttime) === Math.floor(seekbar.max)) {
		nextbtn.click();
	}
}, 500);

seekbar.addEventListener('change', () => {
	music.currenttime = seekbar.value;
});

backbtn.addEventListener('click', () => {
	if (currentMusic <= 0) {
		currentMusic = songs.length + 1;
	} else {
		currentMusic--;
	}
	setMusic(currentMusic);
	playMusic();
});

nextbtn.addEventListener('click', () => {
	if (currentMusic >= songs.length - 1) {
		currentMusic = 0;
	} else {
		currentMusic++;
	}
	setMusic(currentMusic);
	playMusic();
});

const playMusic = () => {
	music.play();
	playbtn.classList.remove('pause');
	disk.classList.add('play');
};

function volchange() {
	volnum.innerHTML = volbnt.value;
	music.volume = volbnt.value / 50;
}

function mute_sound() {
	music.volume = 0;
	document.querySelector('.volume-hr').value = 0;
	volnum.innerHTML = 0;
}



