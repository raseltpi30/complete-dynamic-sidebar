jQuery(document).ready(function () {
  // Array of image data
  const images = [
    { src: 'assets/slider-image-1.jpg', title: 'DESIGN SLIDER', topic: 'ANIMAL', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?' },
    { src: 'assets/slider-image-2.jpg', title: 'DESIGN SLIDER', topic: 'ANIMAL', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?' },
    { src: 'assets/slider-image-3.jpg', title: 'DESIGN SLIDER', topic: 'ANIMAL', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?' },
    { src: 'assets/slider-image-4.jpg', title: 'DESIGN SLIDER', topic: 'ANIMAL', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?' },
    { src: 'assets/slider-image-4.jpg', title: 'DESIGN SLIDER', topic: 'ANIMAL', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?' },
    { src: 'assets/slider-image-4.jpg', title: 'DESIGN SLIDER', topic: 'ANIMAL', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?' },
  ];

  // Function to create carousel items
  function createCarouselItems() {
    let listDom = jQuery('.list');
    let thumbnailDom = jQuery('.thumbnail');

    images.forEach((image, index) => {
      let item = jQuery(`<div class="item">
        <div class="overlay"></div>
        <img src="${image.src}" alt="Image ${index + 1}">
        <div class="content">
          <div class="author">LUNDEV</div>
          <div class="title">${image.title}</div>
          <div class="topic">${image.topic}</div>
          <div class="des">${image.description}</div>
          <div class="buttons">
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>`);

      let thumbnailItem = jQuery(`<div class="item">
        <img src="${image.src}" alt="Thumbnail ${index + 1}">
        <div class="content">
          <div class="title">${image.title}</div>
          <div class="description">${image.topic}</div>
        </div>
      </div>`);

      listDom.append(item);
      thumbnailDom.append(thumbnailItem);
    });

    // Update the total number of slides
    totalSlides = images.length;
    updateProgressBar(1); // Start progress bar at 0% for the first slide
  }

  // Initialize carousel items
  let totalSlides = images.length;
  createCarouselItems();

  // Carousel logic
  let nextDom = jQuery('#next');
  let prevDom = jQuery('#prev');
  let carouselDom = jQuery('.carousel');
  let sliderDom = carouselDom.find('.list');
  let thumbnailBorderDom = carouselDom.find('.thumbnail');
  let slideNumber = jQuery('#slideNumber');
  let timeRunning = 3000;
  let timeAutoNext = 7000;

  // Initialize thumbnails
  thumbnailBorderDom.append(thumbnailBorderDom.find('.item').first());

  function showSlider(type) {
    let sliderItemsDom = sliderDom.find('.item');
    let thumbnailItemsDom = thumbnailBorderDom.find('.item');

    if (type === 'next') {
      sliderDom.append(sliderItemsDom.first());
      thumbnailBorderDom.append(thumbnailItemsDom.first());
    } else {
      sliderDom.prepend(sliderItemsDom.last());
      thumbnailBorderDom.prepend(thumbnailItemsDom.last());
      carouselDom.addClass('next');
    }

    // Update the slide number and progress bar
    let currentIndex = parseInt(slideNumber.text(), 10);
    if (type === 'next') {
      currentIndex = (currentIndex % totalSlides) + 1;
    } else {
      currentIndex = (currentIndex - 2 + totalSlides) % totalSlides + 1;
    }
    slideNumber.text(currentIndex.toString().padStart(2, '0'));
    updateProgressBar(currentIndex);
    carouselDom.addClass(type);

    setTimeout(function () {
      carouselDom.removeClass('next prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(function () {
      nextDom.click();
    }, timeAutoNext);
  }

  function updateProgressBar(currentIndex) {
    let progress = ((currentIndex - 1) / (totalSlides - 1)) * 100; // 0% for the first slide
    jQuery('.progress-bar').css({
      'width': `${progress}%`,
      'background-color': 'yellow' // Set the background color to yellow
    });
  }

  nextDom.click(function () {
    showSlider('next');
  });

  prevDom.click(function () {
    showSlider('prev');
  });

  let runNextAuto = setTimeout(function () {
    nextDom.click();
  }, timeAutoNext);
});
