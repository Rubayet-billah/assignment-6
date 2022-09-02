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
            <p onclick= "categoryIdNews('${category.category_id}')">${category.category_name}</p>   
        `;
        newsCategoryContainer.appendChild(li);
    }
}



loadNews();


// category id news function
const categoryIdNews = async(id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data)
}


// display news by category id
const newsCountSection = document.getElementById('news-count-section');
const newsContainerSection = document.getElementById('news-container');
const displayNews = async(news) => {
    console.log(news);
    if(news.length !== 0){
        newsCountSection.innerText = `You have ${news.length} news to read in this category`;
    }
    else{
        newsCountSection.innerText = `You have no news to read in this category`;
    }

    // display news in container
    newsContainerSection.innerHTML =`
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4 col-sm-12">
        <img src="..." class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8 col-sm-12">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
    `

}