let mainImage = document.querySelector('.c-main-img img');
let mainImageSrc = mainImage.getAttribute('src')
let mainMenuImages = document.querySelectorAll('.c-img img');
let imageModel = document.querySelector('.p-model-container');
let videoModel = document.querySelector('.p-model-container-video');
let cutIMBtn = document.querySelector('.btn i');
let cutVMBtn = document.querySelector('.btn-video i');
const bodyContainer = document.querySelector('.body-container');
const mainCard = document.querySelector('.c-body');
const imageNIBtn = document.querySelector('.navbar .image-div a');
const imageNVBtn = document.querySelector('.navbar .video-div a');
const videoNIBtn = document.querySelector('.navbar-video .image-div-video a');
const videoNVBtn = document.querySelector('.navbar-video .video-div-video a');
const video = document.querySelector('video');

//image model
let iModelMainImage = document.querySelector('.p-main-image-container .main-image img');
let iModelAllImages = document.querySelectorAll('.menu-images .img img');
let iModelImagesDiv = document.querySelectorAll('.menu-images .img');

//listning if you clicked on images displayed on sidebar
mainMenuImages.forEach(menuImage => {
    menuImage.addEventListener('mouseover', (e) => {
        mainImageSrc = menuImage.getAttribute('src')
        mainImage.setAttribute('src', mainImageSrc)
    })
})

//opening model if you click on main image
mainImage.addEventListener('click', (e) => {
    imageModel.style.display = 'grid';
    mainCard.style.display = 'none';
    iModelMainImage.setAttribute('src', mainImageSrc)
    iModelImagesDiv.forEach(div => {
        div.style.border = '1px solid var(--gray-500)'
        //console.log(div.firstElementChild.getAttribute('src'))
        if (div.firstElementChild.getAttribute('src') === `${mainImageSrc}`)
            div.firstElementChild.parentElement.style.border = '1px solid #111'
    })
    bodyContainer.style.background = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4), rgba(0,0,0,0.4))';
    document.body.style.background = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4), rgba(0,0,0,0.4))';
})

iModelAllImages.forEach(image => {
    image.addEventListener('click', (e) => {
        iModelMainImage.setAttribute('src', image.getAttribute('src'))
        iModelImagesDiv.forEach(div => {
            div.style.border = '1px solid var(--gray-500)'
        })
        image.parentElement.style.border = '1px solid #111';
    })
})


cutIMBtn.addEventListener('click', (e) => {
    imageModel.style.display = 'none';
    mainCard.style.display = 'grid';
    bodyContainer.style.background = 'var(--gray-300)'
    document.body.style.background = 'var(--gray-300)';
})

cutVMBtn.addEventListener('click', (e) => {
    imageModel.style.display = 'none';
    videoModel.style.display = 'none';
    mainCard.style.display = 'grid';
    video.pause()
    bodyContainer.style.background = 'var(--gray-300)'
    document.body.style.background = 'var(--gray-300)';
})

//checking for video model
imageNVBtn.addEventListener('click', (e) => {
    videoModel.style.display = 'grid'
    imageModel.style.display = 'none'
    video.play()
})

videoNIBtn.addEventListener('click', (e) => {
    videoModel.style.display = 'none'
    imageModel.style.display = 'grid'
    video.pause()
})