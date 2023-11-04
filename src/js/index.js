import { getPosts } from "./api";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const reachEndText = document.querySelector('.reach-end-text');
let page = 0;
let searchQuery = '';

searchForm.addEventListener('submit', e => {
    e.preventDefault();

    page = 1;
    searchQuery = e.currentTarget.elements.searchQuery.value;
    e.currentTarget.reset();

    getPosts(searchQuery, page)
        .then(({hits}) => {
            if (hits.length < 40) {
                loadMoreBtn.style.display = 'none';
                reachEndText.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'block';
                reachEndText.style.display = 'none';
            }
            renderPosts(hits, false);
            page += 1;
        });
});

loadMoreBtn.addEventListener('click', () => {
    getPosts(searchQuery, page)
        .then(({hits}) => {
            if (hits.length < 40) {
                loadMoreBtn.style.display = 'none';
                reachEndText.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'block';
                reachEndText.style.display = 'none';
            }
            renderPosts(hits, true);
            page += 1;
        })
});

function renderPosts(posts, isLoadMore) {
    const postsMarkup = posts.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class="photo-card">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        <span>${likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <span>${views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <span>${comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <span>${downloads}</span>
                    </p>
                </div>
            </a>
        </div>
        `;
    }).join('');

    if (isLoadMore)
        gallery.insertAdjacentHTML('beforeend', postsMarkup)
    else 
        gallery.innerHTML = postsMarkup;

    new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionsDelay: 250
    });
}