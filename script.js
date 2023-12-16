import { fetchImages, fetchVideos, fetchShorts } from './firebase.js';

var videoList = [
    "https://www.youtube.com/embed/XVHrqGHkhnI",
    "https://www.youtube.com/embed/CHW7eWzbuCo",
    "https://www.youtube.com/embed/wl5YCR-zoRI",
    "https://www.youtube.com/embed/bOpmOch5JrI",
    "https://www.youtube.com/embed/FCypgZsdQ9U"
]
var imageList = [
    "image/image01.jpeg",
    "image/image03.jpeg",
    "image/image04.jpeg",
    "image/image05.jpeg",
    "image/image06.jpeg",
    "image/image07.jpeg",
    "image/image08.jpeg",
    "image/image02.jpeg",
    "image/image09.jpeg",
    "image/image10.jpeg",
]
var shortsList = [
    "https://www.youtube.com/embed/P85upm09Egc",
    "https://www.youtube.com/embed/8VW96fk6R2k",
    "https://www.youtube.com/embed/eca_Pl3hx0Y"
]
var videoPosition = 0
var imagePosition = 0

document.addEventListener("DOMContentLoaded", function() {
    setImages();
    setVideoTabs();
    setShorts();

    document.getElementById("next").addEventListener("click", nextVideoClick);
    document.getElementById("prev").addEventListener("click", prevVideoClick);

    document.getElementById("bigImageNext").addEventListener("click", nextImageClick);
    document.getElementById("bigImagePrev").addEventListener("click", prevImageClick);

    const container = document.getElementById("bigImageContainer");
    container.addEventListener("click", function(){
        container.style.display = 'none';
    });

    const galleryItems = document.querySelectorAll(".gallery");
    galleryItems.forEach(item => {
        item.addEventListener("click", galleryItemClick);
    });

    let navigation = document.getElementById('navigation');
    document.querySelector('.menuToggle').addEventListener("click", function(){
        this.classList.toggle('active');
        navigation.classList.toggle('active');
    });

});

function changeVideo(item) {
    var iframe = document.getElementById("video");
    iframe.src = item;
}

function nextVideoClick() {
    var item = '';
    if(videoPosition < videoList.length - 1) {
        item = videoList[++videoPosition];
    } else {
        videoPosition = 0
        item = videoList[videoPosition];
    }
    changeVideo(item);
}

function prevVideoClick() {
    var item = '';
    if(videoPosition > 0) {
        item = videoList[--videoPosition];
    } else {
        videoPosition = videoList.length - 1;
        item = videoList[videoPosition];
    }
    changeVideo(item);
}

function changeImage(item) {
    var image = document.getElementById("bigImage");
    image.src = item;
}

function prevImageClick(event) {
    event.stopPropagation();
    var item = '';
    if(imagePosition > 0) {
        item = imageList[--imagePosition];
    } else {
        imagePosition = imageList.length - 1;
        item = imageList[imagePosition];
    }
    changeImage(item);
}

function nextImageClick(event) {
    event.stopPropagation();
    var item = '';
    if(imagePosition < imageList.length - 1) {
        item = imageList[++imagePosition];
    } else {
        imagePosition = 0
        item = imageList[imagePosition];
    }
    changeImage(item);
}

function galleryItemClick() {
    const container = document.getElementById("bigImageContainer");
    const indexValue = this.getAttribute('data-index');
    imagePosition = parseInt(indexValue);
    changeImage(imageList[imagePosition]);
    container.style.display = 'flex';
}

async function setImages() {
    const images = await fetchImages();
    if(images && images.length !== 0) {
        imageList = images.map(item => item.address);
    }

    const galleryItems = document.querySelectorAll(".gallery");
    galleryItems.forEach((gallery, index) => {
        gallery.src = imageList[index];
    });

    const container = document.getElementById("mobileImage");
    imageList.forEach(item => {
        const image = document.createElement("img");
        image.src = item;
        container.appendChild(image);
    });
}

async function setVideoTabs() {
    const videos = await fetchVideos();
    console.log(videos);
    if(videos && videos.length !== 0) {
        videoList = videos.map(item => item.address);
    }

    const videoTab = document.getElementById("video_tab");
    videoList.forEach((_, index) => {
        const tab = document.createElement('div');
        tab.classList.add('tab');
    
        if (index === 0) {
            tab.classList.add('active');
        }
    
        videoTab.appendChild(tab);
    });

    const tabs = document.querySelectorAll('.tab');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => {
                t.classList.remove('active');
            });

            this.classList.add('active');
            videoPosition = index;
            changeVideo(videoList[videoPosition]);
        });
    });
    changeVideo(videoList[0]);
}

async function setShorts() {
    const shorts = await fetchShorts();
    if(shorts && shorts.length !== 0) {
        shortsList = shorts.map(item => item.address);
    }
    shortsList.forEach(item => {
        const shortsDiv = document.getElementById('shorts');
        const iframe = document.createElement('iframe');
        iframe.src = item;
        iframe.width = 315;
        iframe.height = 560;
        iframe.frameBorder = 0;
        iframe.allowFullscreen = true;

        shortsDiv.appendChild(iframe);
    });
}