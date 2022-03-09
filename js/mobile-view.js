const slider = document.querySelector('.main-image-container')
const slides = Array.from(document.querySelectorAll('.main-image-container .img'))

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
        }
        else {
            count--
            couracel()
        }
        console.log("start" + startPos + "end" + endPos)
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
        slide.style.transform = `translate(-${count * 100 - 10}%)`
    })
}

function getPositionX(event) {
    return event.touches[0].clientX
}
