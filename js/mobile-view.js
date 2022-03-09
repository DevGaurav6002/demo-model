const slider = document.querySelector('.main-image-container')
const slides = Array.from(document.querySelectorAll('.main-image-container .mobile-img'))
//const mobileMenus = document.querySelectorAll('.mobile-menu')
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

//video container

const videoMenu = document.querySelector('.video-menubox')
const videoFooter = document.querySelector('.video-footer')

videoMenu.addEventListener('click', (e) => {
    e.preventDefault()

    videoMenu.classList.toggle('getMenuUp')
    videoFooter.classList.toggle('getFooterDown')

    if (videoMenu.classList.contains('getMenuUp')) {
        let myArrow = document.querySelector('.arrow-div i')
        myArrow.classList.remove('fa-angle-double-up')
        myArrow.classList.add('fa-angle-double-down')
        videoFooter.style.display = 'none';
    } else {
        let myArrow = document.querySelector('.arrow-div i')
        myArrow.classList.add('fa-angle-double-up')
        myArrow.classList.remove('fa-angle-double-down')
        videoFooter.style.display = 'grid';
    }
})


//making nav buttons working

const videoContainer = document.querySelector('.mobile-video-container')
const imageContainer = document.querySelector('.container')
const videoBtn = document.querySelector('.video-btn a')
const imageBtn = document.querySelector('.video-image-btn a')
const myVideo = document.querySelector('.playing-video-container .video-container video')
const mainVideo = document.querySelector('.main-video video')

videoBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("Hello video container")
    videoContainer.style.display = "block";
    imageContainer.style.display = "none";
    loadVideo();
})

imageBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("Hello Image container")
    videoContainer.style.display = "none"
    imageContainer.style.display = "block"
    stopVideo();
})

//plying videos on click
const videos = Array.from(document.querySelectorAll('.video img'))
const playingVideo = document.querySelector('.video-container video')

videos.forEach(video => {
    video.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('hello')
        let videoUri = video.getAttribute('id')
        playingVideo.setAttribute('src', videoUri)
        loadVideo();
    })
})

//stop main page video while switching on mobile view

function stopMainVideoOnSmallWidth() {

    window.addEventListener('resize', (e) => {
        console.log(window.innerWidth)
        if (window.innerHeight <= 768) {
            mainVideo.pause()
        }
    })
}

function stopMobileVideoOnBiggerScreen() {
    window.addEventListener('resize', (e) => {
        console.log(window.innerWidth)
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