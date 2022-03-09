const slider = document.querySelector('.main-image-container')
const slides = Array.from(document.querySelectorAll('.main-image-container .mobile-img'))
const mobileMenus = document.querySelectorAll('.mobile-menu')
const mainMenuArray = Array.from(mobileMenus)

let isDragging = false;
let startPos = 0;
let currentIndex = 0;
let endPos = 0;
let count = 0;


slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')
    slideImage.addEventListener('dragstart', (e) => {
        e.preventDefault();
    })

    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', (e) => {
        endPos = e.changedTouches[0].clientX;

        if (startPos > endPos) {
            count++
            couracel()
            highlightMenu(count)
        }
        else {
            count--
            couracel()
            highlightMenu(count)
        }
    })
})


function highlightMenu(count) {
    mainMenuArray.forEach(menu => {
        console.log("menu ID " + menu.getAttribute('id'))
        console.log(count)
        menu.style.border = '1px solid #111'
        if (menu.getAttribute('id') === count) {
            menu.style.border = '1px solid var(--nykaa-pink)'
        }
    })
}

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

//video container

const videoMenu = document.querySelector('.video-menubox')
const videoFooter = document.querySelector('.video-footer')

videoMenu.addEventListener('click', (e) => {
    e.preventDefault()

    videoMenu.classList.toggle('getMenuUp')
    videoFooter.classList.toggle('getFooterDown')
})


//making nav buttons working

const videoContainer = document.querySelector('.mobile-video-container')
const imageContainer = document.querySelector('.container')
const videoBtn = document.querySelector('.video-btn a')
const imageBtn = document.querySelector('.video-image-btn a')
const myVideo = document.querySelector('video')
const mainVideo = document.querySelector('.main-video video')

videoBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("Hello video container")
    videoContainer.style.display = "block";
    myVideo.play()
    mainVideo.pause()
    imageContainer.style.display = "none";
})

imageBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("Hello Image container")
    videoContainer.style.display = "none"
    imageContainer.style.display = "block"
    myVideo.pause()
    mainVideo.pause()
})

//plying videos on click
const videos = Array.from(document.querySelector('.video img'))
const playingVideo = document.querySelector('.video-container video')

videos.forEach(video => {
    video.addEventListener('click', (e) => {
        e.preventDefault()
        console.log('hello')
        let videoUri = video.getAttribute('id')
        playingVideo.setAttribute('src', videoUri)

        myVideo.play();
        mainVideo.pause();
    })
})