const loadNews = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    newsCategoris(data.data.news_category)
}
const newsCategoryContainer = document.getElementById('news-title');
const newsCategoris = (categories) => {
    // console.log(categories)
    for(const category of categories){
        // console.log(category.category_id);

        const li = document.createElement('li');
        li.classList.add('m-2');
        li.classList.add('target-category');
        li.innerHTML = `
            <p onclick= "getCategoryId('${category.category_id}')">${category.category_name}</p>   
        `;
        newsCategoryContainer.appendChild(li);
    }
}



loadNews();

