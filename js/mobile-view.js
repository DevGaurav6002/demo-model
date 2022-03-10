const slider = document.querySelector('.main-image-container')
const slides = Array.from(document.querySelectorAll('.main-image-container .mobile-img'))
let menuImages = Array.from(document.querySelectorAll('.mobile-menu-container .mobile-menu img'))

let isDragging = false;
let startPos = 0;
let currentIndex = 0;
let endPos = 0;
let count = 0;


slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')

    slideImage.style.cursor = "grab";

    slideImage.addEventListener('dragstart', (e) => {
        e.preventDefault();
    })

    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', (e) => {
        endPos = e.changedTouches[0].clientX;

        if (startPos > endPos) {
            count++
            couracel()
        }
        else {
            count--
            couracel()
        }
    })
})


function touchStart(index) {
    return function (event) {
        startPos = getPositionX(event)
        console.log(startPos)
    }
}


function couracel() {

    if (count === slides.length) {
        count = 0;
    }

    if (count < 0) {
        count = slides.length - 1
    }

    slides.forEach(slide => {
        slide.style.transform = `translate(-${count * 100}%)`
    })
}

function getPositionX(event) {
    return event.touches[0].clientX
}

//setting up main image on menu image click event

function getClickedImage() {
    menuImages.forEach(menuImage => {

        menuImage.style.cursor = 'pointer'

        menuImage.addEventListener('click', (e) => {
            e.preventDefault()

            let menuId = menuImage.getAttribute('id')

            count = menuId

            couracel()

            highlightBox(menuImage)
        })
    })
}

function highlightBox(menuImage) {

    const menuDivs = Array.from(document.querySelectorAll('.mobile-menu'))

    menuDivs.forEach(div => {
        div.style.border = '1px solid #111'
        div.style.transition = 'all 0.2s ease-in-out'
    })

    menuImage.parentElement.style.border = '1px solid var(--nykaa-pink)'
    menuImage.parentElement.style.transition = 'all 0.2s ease-in-out'
}

getClickedImage()



//making nav buttons working

const videoContainer = document.querySelector('.mobile-video-container')
const imageContainer = document.querySelector('.container')
const videoBtn = document.querySelector('.video-btn a')
const imageBtn = document.querySelector('.video-image-btn a')
const myVideo = document.querySelector('.playing-video-container .video-container video')
const mainVideo = document.querySelector('.main-video video')

videoBtn.addEventListener('click', (e) => {
    e.preventDefault()
    videoContainer.style.display = "block";
    imageContainer.style.display = "none";
    loadVideo();
})

imageBtn.addEventListener('click', (e) => {
    e.preventDefault()
    videoContainer.style.display = "none"
    imageContainer.style.display = "block"
    stopVideo();
})



//plying videos on click


const videos = Array.from(document.querySelectorAll('.mobile-video img'))
const playingVideo = document.querySelector('.video-container video')
const mobileVideoThumbnailParent = Array.from(document.querySelectorAll('.mobile-video'))

videos.forEach(video => {
    video.addEventListener('click', (e) => {

        e.preventDefault()

        let videoUri = video.getAttribute('id')
        playingVideo.setAttribute('src', videoUri)
        loadVideo();

        mobileVideoThumbnailParent.forEach(videoParent => {

            if (videoParent.children.length > 1 && videoParent.querySelector(".playingVideo") != null) {
                const removeElement = videoParent.querySelector('.playingVideo')
                videoParent.style.border = '2px solid #e481a7'
                videoParent.removeChild(removeElement)
            }
            else {
                console.log("It does not had playing tag")
            }


        })

        video.parentElement.appendChild(getH3Element())
        video.parentElement.style.border = '2px solid var(--gray-300)'
    })
})

//stop main page video while switching on mobile view

function stopMainVideoOnSmallWidth() {

    window.addEventListener('resize', (e) => {
        if (window.innerHeight <= 768) {
            mainVideo.pause()
        }
    })
}

function stopMobileVideoOnBiggerScreen() {
    window.addEventListener('resize', (e) => {
        if (window.innerHeight <= 768) {
            myVideo.pause()
        }
    })
}

function loadVideo() {
    myVideo.play();
    mainVideo.pause();
}

function stopVideo() {
    myVideo.pause();
    mainVideo.pause();
}

stopMainVideoOnSmallWidth()
stopMobileVideoOnBiggerScreen()



//playing video on onclick event

// const mobileVideos = Array.from(document.querySelectorAll('.mobile-video img'))
// const mobilePlayingVideo = document.querySelector('.video-container video')
//const mobileVideoThumbnailParent = Array.from(document.querySelectorAll('.mobile-video'))



// mobileVideos.forEach(video => {
//     video.addEventListener('click', (e) => {
//         e.preventDefault()

//         mainVideoUri = video.getAttribute('id')

//         mobilePlayingVideo.setAttribute('src', mainVideoUri)

//         mobilePlayingVideo.setAttribute('autoplay', 'autoplay')


//         mobileVideoThumbnailParent.forEach(videoParent => {


//             if (videoParent.children.length > 1 && videoParent.querySelector(".playingVideo") != null) {
//                 const removeElement = document.querySelector('.playingVideo')
//                 videoParent.style.border = '2px solid #e481a7'
//                 videoParent.removeChild(removeElement)
//             }
//             else {
//                 console.log("It does not had playing tag")
//             }


//         })

//         //console.log(video.parentElement)

//         video.parentElement.appendChild(getH3Element())
//         video.parentElement.style.border = '2px solid var(--gray-300)'

//     })
// })

function getH3Element() {
    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Now Playing')
    h3.appendChild(h3Text)
    h3.classList.add('playingVideo')

    return h3;
}

function getInitialVideo() {

    videos.forEach(video => {

        console.log("Menu-video" + video.getAttribute('id'))
        console.log("playing" + playingVideo.getAttribute('src'))

        if (video.getAttribute('id') === playingVideo.getAttribute('src')) {

            video.parentElement.appendChild(getH3Element())
            video.parentElement.style.border = '2px solid var(--gray-300)'
        }

    })


    console.log('Initial Video')
}

getInitialVideo()