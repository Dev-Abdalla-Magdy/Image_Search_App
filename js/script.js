const accessKey = 'Wq8m1XcFLI7fueU3TzoJDVVgS2kEnbKeG9CPvC5rj_o';

const formEl = document.querySelector('form');
const searchInput = document.getElementById('js-search-input');
const pageContent = document.querySelector('.body');
const moreBtn = document.getElementById('js-more-btn');

let searchData = '';
let pageNumber = 1;

async function searchImages() {
  searchData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (pageNumber === 1) {
    pageContent.innerHTML = '';
  }

  results.map((result) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('card');
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    pageContent.appendChild(imageWrapper);
  });

  pageNumber++;

  if (pageNumber > 1) {
    moreBtn.classList.add('active');
  }
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  pageNumber = 1;
  searchImages();
});

moreBtn.addEventListener('click', () => {
  searchImages();
});