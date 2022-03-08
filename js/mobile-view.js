const slider = document.querySelector('.main-image-container')
const slides = Array.from(document.querySelectorAll('.main-image-container .img'))

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationId = 0;
let currentIndex = 0;

slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')
    slideImage.addEventListener('dragstart', (e) => {
        e.preventDefault();
    })

    //touch Events

    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)
})

//disable context menu
// window.oncontextmenu = function (e) {
//     e.preventDefault()
//     e.stopPropagation()
//     return false
// }

function touchStart(index) {
    return function (event) {
        currentIndex = index
        startPos = getPositionX(event)
        console.log(startPos)
        isDragging = true;

        animationId = requestAnimationFrame(animation)

        console.log("start")
    }
}

function getPositionX(event) {
    return event.touches[0].clientX
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationId)

    const movedBy = currentTranslate - prevTranslate

    if (movedBy < -20 && currentIndex < slides.length - 1) {
        currentIndex += 1
    }

    if (movedBy > 20 && currentIndex > 0) {
        currentIndex -= 1
    }

}

function touchMove() {
    if (isDragging) {
        let currentPosistion = getPositionX(event)
        currentTranslate = prevTranslate + currentPosistion - startPos
    }
}

function animation() {
    setSliderPosition()
    if (isDragging) {
        requestAnimationFrame(animation)
    }
}

function setSliderPosition() {
    return slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
}