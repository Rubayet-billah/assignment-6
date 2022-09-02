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

// loading spinner function
const loadSpinnerSection = document.getElementById('spinner');
const loadSpinner = isLoading => {
    if(isLoading){
        loadSpinnerSection.classList.remove('d-none');
    }
    else{
        loadSpinnerSection.classList.add('d-none');
    }
}

// category id news function
const categoryIdNews = async(id) => {
    loadSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data)
}


// display news by category id
const newsCountSection = document.getElementById('news-count-section');
const newsContainerSection = document.getElementById('news-container');
const displayNews = async(newses) => {
    newsContainerSection.textContent = ``;
    // console.log(newses);
    if(newses.length !== 0){
        newsCountSection.innerText = `You have ${newses.length} news to read in this category`;
    }
    else{
        newsCountSection.innerText = `You have no news to read in this category`;
    }

    // looping through newses array to get news
    for (const news of newses){
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');
        newsDiv.innerHTML = `

        <div class="row g-0" data-bs-toggle="modal" data-bs-target="#newsDetails">
          <div class="col-md-4 col-sm-12">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8 col-sm-12">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p id="news-details" class="card-text">${news.details}</p>

              <section class="d-flex justify-content-between">
            <div class="d-flex">
                <div class="pt-1">
                    <img class="rounded-circle" style="height:40px; width:40px" src="${news.author.img}" alt="..">
                </div>
                <div class="ms-2">
                    <p class="fw-bold h5">${news.author.name !== null ? news.author.name : 'No Author Found'}</p>
                    <p class="text-muted">${news.author.published_date ? news.author.published_date.slice(0,11) : 'No publish date'}</p>
                </div>
            </div>
            <div>
                <p class="card-text fw-bold h5"><small class="text-muted"><i class="fa-solid fa-eye px-2"></i>${news.total_view !== null ? news.total_view : 'No Views Found'}</small></p>
            </div>
            <div>
                <i class="fa-solid fa-star"></i> 
                <i class="fa-solid fa-star"></i> 
                <i class="fa-solid fa-star"></i> 
                <i class="fa-solid fa-star"></i> 
                <i class="fa-regular fa-star-half-stroke"></i>
            </div>
            <div class="fw-bold h3">
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        </section>
            </div>
          </div>
        </div>
        `;
        newsContainerSection.appendChild(newsDiv);
        loadSpinner(false);

        // modal section
        document.getElementById('newsDetailsLabel').innerText = `${news.title}`;
        document.getElementById('author-name').innerText = `Author Name: ${news.author.name !== null ? news.author.name : 'No Author Found'}`;
        document.getElementById('others-info').innerHTML = `
            <p>Todays pick: ${news.others_info.is_todays_pick}</p>
        `;
    }
}