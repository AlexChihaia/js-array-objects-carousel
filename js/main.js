'use strict';


const galleryItems = [
    {
        id: 1,
        title: 'Uomo solitario',
        description: 'Questo uomo sta ancora aspettando che un ciclo for si fermi da solo',
        image: '01.jpg',
    },
    {
        id: 2,
        title: 'Case sul lago',
        description: 'Questa piccola oasi è il logo di ritrovo degli sviluppatori web',
        image: '02.jpg',
    },
    {
        id: 3,
        title: 'Ponte illuminato',
        description: 'Qui gli sviluppatori vengono per trovare ispirazione',
        image: '03.jpg',
    },
    {
        id: 4,
        title: 'Serate indimenticabili',
        description: 'Qui gli sviluppatori fanno i loro party',
        image: '04.jpg',
    },
    {
        id: 5,
        title: 'Spiaggia deserta',
        description: 'Il luogo prescelto dagli sviluppatori per le loro vacanze',
        image: '05.jpg',
    },
];

const items = document.querySelector('.items');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const thumbnails = document.querySelector('.thumbnails');

let currentItem = 0;

galleryItems.forEach(function (item) {
    const img = document.createElement('img');
    img.src = `img/${item.image}`;
    img.alt = `Background${item.id}`;

    const titleHeading = document.createElement('h3')
    titleHeading.textContent = item.title;

    const itemDescription = document.createElement('p');
    itemDescription.textContent = item.description;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    if (currentItem === 0) {
        itemDiv.classList.add('active');
    }

    itemDiv.append(img);
    itemDiv.append(titleHeading);
    itemDiv.append(itemDescription);
    items.append(itemDiv);

    const thumbnail = document.createElement('div');
    thumbnail.classList.add('thumbnail');
    thumbnail.style.backgroundImage = `url(img/${item.image})`;

    if (currentItem === 0) {
        thumbnail.classList.add('active');
    }

    thumbnail.addEventListener('click', function () {
        clearInterval(autoplayInterval);
        items.querySelector('.active').classList.remove('active');
        thumbnails.querySelector('.active').classList.remove('active');
        itemDiv.classList.add('active');
        thumbnail.classList.add('active');
    });

    thumbnails.append(thumbnail);
});

prev.addEventListener('click', function () {
    clearInterval(autoplayInterval);
    items.querySelector('.active').classList.remove('active');
    thumbnails.querySelector('.active').classList.remove('active');
    if (currentItem > 0) {
        currentItem--;
    }
    else if (currentItem === 0) {
        currentItem = galleryItems.length - 1;
    }
    items.children[currentItem].classList.add('active');
    thumbnails.children[currentItem].classList.add('active');
});

next.addEventListener('click', function () {
    items.querySelector('.active').classList.remove('active');
    thumbnails.querySelector('.active').classList.remove('active');
    if (currentItem < galleryItems.length - 1) {
        currentItem++;
    }
    else if (currentItem === galleryItems.length - 1) {
        currentItem = 0;
    }
    items.children[currentItem].classList.add('active');
    thumbnails.children[currentItem].classList.add('active');
});

let autoplay = true;
let autoplayInterval = setInterval;

function startAutoplay() {
    if (autoplay) {
        autoplayInterval = setInterval(function () {
            next.click();
        }, 3000);
    }
    else {
        clearInterval(autoplayInterval);
    }
}

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

startButton.addEventListener('click', function () {
    autoplay = true;
    startAutoplay();
});

stopButton.addEventListener('click', function () {
    autoplay = false;
    clearInterval(autoplayInterval);
});

startAutoplay();