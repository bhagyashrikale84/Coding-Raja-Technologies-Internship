//lets select all required tags or element

const wrapper=document.querySelector(".wrapper"),
musicImg=wrapper.querySelector(".img-area img"),
musicName=wrapper.querySelector(".song-details .name"),
musicArtist=wrapper.querySelector(".song-details .artist"),
mainAudio=wrapper.querySelector("#main-audio"),
playPauseBtn=wrapper.querySelector(".play-pause"),

prevBtn=wrapper.querySelector("#prev"),
nextBtn=wrapper.querySelector("#next"),
progressArea=wrapper.querySelector(".progress-area"),
progressBar=wrapper.querySelector(".progress-bar"),
musicList= wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = musicList.querySelector("#close"),
repeatBtn = wrapper.querySelector("#repeat-plist"),
shuffle = wrapper.querySelector("#shuffle");


let musicIndex=2;

window.addEventListener("load", () =>{
    loadMusic(musicIndex);//calling load music function once loaded
    playingNow();
})
//load music function

function loadMusic(indexNumb)
{
musicName.innerText=allMusic[indexNumb - 1].name;
musicArtist.innerText=allMusic[indexNumb - 1].artist;
musicImg.src=`images/${allMusic[indexNumb -1].img}.jpg`;
mainAudio.src=`songs/${allMusic[indexNumb -1].src}.mp3`;
}


//play music function

function playMusic()
{
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText="pause";
   
    mainAudio.play();
}

//pause music function

function pauseMusic()
{
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText="play";
    
    mainAudio.pause();
}

//play or music button event

//next music function
function nextMusic()
{
    //just increament of index by 1
    musicIndex++;
    //if musicindex length is greater than array them musicindex will be 1 so the first song will play
    musicIndex > allMusic.length ? musicIndex = 1 :  musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

//prev music function
function prevMusic()
{
    //just decreament of index by 1
    musicIndex--;
    //if musicindex length is less than array them musicindex will be 1 so the first song will play
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}


//play or music button event

playPauseBtn.addEventListener("click", () =>{

    const isMusicPaused = wrapper.classList.contains("paused");

    //if isMusicPaused is true then call pauseMusic else call playMusic

    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();

});

//next music button event

nextBtn.addEventListener("click", () =>{

    nextMusic(); //calling next music function

});

//prev music button event

prevBtn.addEventListener("click", () =>{

    prevMusic(); //calling next music function

});



//update progress bar width according to music current time

mainAudio.addEventListener("timeupdate", (e)=>{

    const currentTime= e.target.currentTime;
    const duration= e.target.duration;
    let progressWidth= (currentTime / duration) * 100;
    progressBar.style.width= `${progressWidth}%`;


let musicCurrentTime=wrapper.querySelector(".current"),
    musicDuration=wrapper.querySelector(".duration");


mainAudio.addEventListener("loadeddata", ()=>{
    

    //update song total duration

    let audioDuration=mainAudio.duration;
    let totalMin= Math.floor(audioDuration / 60);
    let totalSec= Math.floor(audioDuration % 60);
    if(totalSec < 10)
    {
        totalSec= `0${totalSec}`;
    }

    musicDuration.innerText=`${totalMin}: ${totalSec}`;

}); 

    //update  playing song current time

    
    let currentMin= Math.floor(currentTime / 60);
    let currentSec= Math.floor(currentTime % 60);
    if(currentSec < 10)
    {
        currentSec= `0${currentSec}`;
    }

    musicCurrentTime.innerText=`${currentMin}: ${currentSec}`;

    //lets work on repeat  song acording to the icon
repeatBtn.addEventListener("click", () =>{

    mainAudio.currentTime = 0;

});


});

//work on shuffle icon

shuffle.addEventListener("click", () =>{

    var randIndex = Math.floor(Math.random() * allMusic.length) + 1;
    
    loadMusic(randIndex);
    playMusic();
    
    });

    // song ended

    mainAudio.addEventListener("ended", () =>{
        musicIndex++;

        if(musicIndex > allMusic.length)
        {
            musicIndex = 1;
        }
        loadMusic(musicIndex);
        playMusic();
    });


    

//lets update playing song current time according to the progress bar width

progressArea.addEventListener("click",(e) => {

    let progressWidthval= progressArea.clientWidth;
    let clickedOffSetX= e.offsetX;
    let songDuration= mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});





showMoreBtn.addEventListener("click", () =>{

    musicList.classList.toggle("show");

});

hideMusicBtn.addEventListener("click", () =>{

    showMoreBtn.click();
});


const ulTag = wrapper.querySelector("ul");

for(let i = 0; i < allMusic.length; i++)
{
    let liTag = `<li li-index="${i + 1}">
    <div class="row">
    <span>${allMusic[i].name}</span>
    <p>${allMusic[i].artist}</p>
    </div>
    <audio class="${allMusic[i].src}" id="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
    <span id="${allMusic[i].src}" class="audio-duration">1.58</span>
    </li>`;

    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

liAudioTag.addEventListener("loadeddata", () =>{

    let audioDuration = liAudioTag.duration;
    let totalMin= Math.floor(audioDuration / 60);
    let totalSec= Math.floor(audioDuration % 60);
    if(totalSec < 10)
    {
        totalSec= `0${totalSec}`;
    }

    liAudioDuration.innerText=`${totalMin} : ${totalSec}`;

    liAudioDuration.setAttribute("t-duration", `${totalMin} : ${totalSec}`);

});

}

//lets work on play perticular song click

const allLiTags = ulTag.querySelectorAll("li");

function playingNow()
{



    for(let j = 0; j < allLiTags.length; j++)
        {

            let audioTag = allLiTags[j].querySelector(".audio-duration");

if(allLiTags[j].classList.contains("playing"))
{
    allLiTags[j].classList.remove("playing");
    let adDuration = audioTag.getAttribute("t-duration");

    audioTag.innerText = adDuration;
}

            if(allLiTags[j].getAttribute("li-index") == musicIndex)
            {
                allLiTags[j].classList.add("playing");
                audioTag.innerText = "playing";
            }
        
            //adding onclick attribute in all li tags
        allLiTags[j].setAttribute("onclick", "clicked(this)");
        
        }
}

//lets play song on li click

function clicked(element)
{
    let getLiIndex = element.getAttribute("li-index");

    musicIndex = getLiIndex;

    loadMusic(musicIndex);
    playMusic();
    playingNow();
}
