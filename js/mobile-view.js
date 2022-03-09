const slider = document.querySelector('.main-image-container')
const slides = Array.from(document.querySelectorAll('.main-image-container .img'))
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


