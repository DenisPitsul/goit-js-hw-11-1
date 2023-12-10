import axios from "axios";

export async function getPosts(searchText, page) {
    const parms = new URLSearchParams({
        key: '40473065-d94a4da65e151d585b80ae75d',
        q: searchText,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: '40'
    });
    const {data} = await axios.get(`https://pixabay.com/api/?${parms}`);
    return data;
}