const carousel = document.querySelector('.carousel');
const firstImg = carousel.querySelectorAll('img')[0];
const arrowIcons = document.querySelectorAll('.wrapper i');

let isDragStart = false, prevPageX, prevScroolLeft;
let firstImgWidth = firstImg.clientWidth + 14;

function ajustarTamanhos(){
    firstImgWidth = firstImg.clientWidth + 14;

    let numero = (carousel.scrollLeft / firstImgWidth);
    carousel.scrollLeft = (firstImgWidth * numero.toFixed(0));
}

arrowIcons.forEach(icon => {
    icon.addEventListener('click',() =>{
        carousel.scrollLeft += (icon.id == "left" ? -firstImgWidth : firstImgWidth);
        
    })
});

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScroolLeft = carousel.scrollLeft;
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove('dragging');

    ajustarTamanhos();
}

const dragging = (e) => {
    if(!isDragStart) return;

    e.preventDefault();
    let positionDiff = e.pageX - prevPageX;
    carousel.classList.add('dragging');

    carousel.scrollLeft = prevScroolLeft - positionDiff;
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('touchend', dragStop);

window.addEventListener('resize', ajustarTamanhos);