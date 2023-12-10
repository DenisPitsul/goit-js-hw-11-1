import { getPosts } from "./api";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getPostsMarkup } from "./createMarkup";


const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const reachEndText = document.querySelector('.reach-end-text');
const perPage = 40;
let page = 0;
let searchQuery = '';

searchForm.addEventListener('submit', e => {
    e.preventDefault();

    page = 1;
    searchQuery = e.currentTarget.elements.searchQuery.value;
    e.currentTarget.reset();

    getPosts(searchQuery, page)
        .then(({hits, totalHits}) => {
            const totalPages = Math.ceil(totalHits / perPage);
            hideShowLoadMoreBtnAndReachEndText(page >= totalPages);
            renderPosts(hits, false);
        });
});

loadMoreBtn.addEventListener('click', () => {
    page += 1;
    getPosts(searchQuery, page)
        .then(({hits, totalHits}) => {
            const totalPages = Math.ceil(totalHits / perPage);
            hideShowLoadMoreBtnAndReachEndText(page >= totalPages);
            renderPosts(hits, true);
        })
});

function hideShowLoadMoreBtnAndReachEndText(isEnd) {
    if (isEnd) {
        loadMoreBtn.style.display = 'none';
        reachEndText.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'block';
        reachEndText.style.display = 'none';
    }
}

function renderPosts(posts, isLoadMore) {
    const postsMarkup = getPostsMarkup(posts);

    if (isLoadMore)
        gallery.insertAdjacentHTML('beforeend', postsMarkup);
    else 
        gallery.innerHTML = postsMarkup;

    new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionsDelay: 250
    });
}