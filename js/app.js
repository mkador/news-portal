function loadCategories(){
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCategories(data.data.news_category))
}

const displayCategories = categories =>{
    console.log(categories);
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category=>{
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('serial');
        categoryDiv.innerHTML = `
        <div class="d-flex justify-content-center text-info"><h6 onclick="loadingDetails()">${category.category_name}</h6></div>`;
        categoriesContainer.appendChild(categoryDiv);
        loadingDetails();
    })
}

function loadingDetails(){
    fetch('https://openapi.programming-hero.com/api/news/category/01')
    .then(res=>res.json())
    .then(data=>displayDetails(data.data))
}
function displayDetails(details){
    const detailsContainer = document.getElementById('details-container');
    for(const detail of details){
        const detailDiv = document.createElement('div');
        detailDiv.innerHTML = `
        <div class="row gy-2 shadow-lg">
            <div class="col-md-4">
              <img src="${detail.image_url}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body p-3">
                <h5 class="card-title">${detail.title}</h5>
                <p class="card-text">${detail.details.slice(0,200)}...</p>
                <div class="d-flex justify-content-between">
                <p>Author: ${detail.author.name}</p>
                <p class="card-text">
                <small class="text-muted"> Published Date : ${detail.author.published_date}</small> 
                <p>Total View: ${detail.total_view} M</p>
                <small class="text-muted">${detail.rating.badge}</small>
                <small class="text-muted">${detail.rating.number}</small>
                
                </div>
                <button class="btn btn-info">See More</button>
                </p>
              </div>
            </div>
          </div>
        `;
        detailsContainer.appendChild(detailDiv);
    }
}


loadCategories();