// load news categories function
const loadNews = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    newsCategoris(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};
const newsCategoryContainer = document.getElementById("news-title");
const newsCategoris = (categories) => {
  // console.log(categories)
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.classList.add("m-2");
    li.classList.add("target-category");
    li.innerHTML = `
            <a class="text-decoration-none" onclick= "categoryIdNews('${category.category_id}')">${category.category_name}</a>   
        `;
    newsCategoryContainer.appendChild(li);
  });
};

loadNews();

// loading spinner function
const loadSpinnerSection = document.getElementById("spinner");
const loadSpinner = (isLoading) => {
  if (isLoading) {
    loadSpinnerSection.classList.remove("d-none");
  } else {
    loadSpinnerSection.classList.add("d-none");
  }
};

// category id news function
const categoryIdNews = async (id) => {
  loadSpinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // sorting array
    const arr = data.data;
    arr.sort((a, b) => (a.total_view < b.total_view ? 1 : -1));
    // display sorted array
    displayNews(arr);
  } catch (error) {
    console.log(error);
  }
};

// display news by category id
const newsCountSection = document.getElementById("news-count-section");
const newsContainerSection = document.getElementById("news-container");
const displayNews = (newses) => {
  newsContainerSection.textContent = ``;
  // console.log(newses);
  if (newses.length !== 0) {
    newsCountSection.innerHTML = `You have <span class="fw-bolder">${newses.length}</span> news to read in this category`;
  } else {
    newsCountSection.innerHTML = `<span class="text-danger">You have no news to read in this category</span>`;
    loadSpinner(false);
  }

  // looping through newses array to get news using forEach
  newses.forEach((news) => {
    // console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card");
    newsDiv.classList.add("mb-3");
    newsDiv.innerHTML = `

        <div class="row g-0">
          <div class="col-md-4 col-sm-12">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8 col-sm-12">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p id="news-details" class="card-text">${news.details.length >= 400
        ? news.details.slice(0, 400) + "..."
        : news.details}</p>

          <section class="d-flex justify-content-between flex-wrap">
            <div class="d-flex">
                <div class="pt-1">
                    <img class="rounded-circle" style="height:40px; width:40px" src="${news.author.img}" alt="..">
                </div>
                <div class="ms-2">
                    <p class="fw-bold h5">${news.author.name ? news.author.name : "No Author Found"}</p>
                    <p class="text-muted">${news.author.published_date
        ? news.author.published_date.slice(0, 11)
        : "No publish date"}</p>
                </div>
            </div>
            <div>
                <p class="card-text fw-bold h5"><small class="text-muted"><i class="fa-solid fa-eye px-2"></i>${news.total_view !== null ? news.total_view : "No Views Found"}</small></p>
            </div>
            <div>
                <i class="fa-solid fa-star"></i> 
                <i class="fa-solid fa-star"></i> 
                <i class="fa-solid fa-star"></i> 
                <i class="fa-solid fa-star"></i> 
                <i class="fa-regular fa-star-half-stroke"></i>
            </div>
            <div class="fw-bold">
                <button onclick="getDetailsModal('${news._id}')" class="btn btn-primary fw-bold" data-bs-toggle="modal" data-bs-target="#newsDetails">Details</button>
            </div>
        </section>
            </div>
          </div>
        </div>
        `;
    newsContainerSection.appendChild(newsDiv);
    loadSpinner(false);
  });
};

// show news 01 category by default
categoryIdNews("01");

// get specific news by id
const getDetailsModal = async (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayModal(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};

// display modal function
const displayModal = (bulletin) => {
  // console.log(bulletin);
  document.getElementById("news-title-modal").innerText = `${bulletin.title}`;
  document.getElementById("others-info").innerHTML = `
        <img src="${bulletin.image_url}" class="img-fluid">
        <p class="mt-2">${bulletin.details}</p>
        <section class="d-flex align-items-center">
      <div>
        <p class="fw-bold h5">
          Author Name: ${bulletin.author.name ? bulletin.author.name : "No Author Found"}
        </p>
        <p class="text-muted"> Published date: ${bulletin.author.published_date ? bulletin.author.published_date.slice(0, 11) : "No publish date"}
        </p>
      </div>
      <div class="w-50">
        <img class="w-50 d-block mx-auto rounded" src="${bulletin.author.img}" alt="..." />
      </div>
    </section>
        <p>Trending: ${bulletin.others_info.is_trending === true ? "Yes" : "No"}</p>
        <p>Rating: ${bulletin.rating.number ? bulletin.rating.number : "Not found"}</p>
        <p><i class="fa-solid fa-eye pe-1"></i> ${bulletin.total_view ? bulletin.total_view : "No views found"}</p>
    `;
};
