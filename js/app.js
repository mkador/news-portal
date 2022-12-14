function loadCategories(){
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCategories(data.data.news_category))
}

const displayCategories = categories =>{
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category=>{
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('serial');
        categoryDiv.innerHTML = `
        <div class="">
        <button onclick="loadingDetails('${category.category_id}')" type="button" class="btn btn-secondary">
        ${category.category_name}
        </button>
        
        </div>`;
        categoriesContainer.appendChild(categoryDiv);
        
    })
    
}

const toggleSpiner = isLoading=>{
  const loaderSection = document.getElementById('spiner');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
}

function loadingDetails(id){
  console.log('clicked');
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res=>res.json())
    .then(data=>displayDetails(data.data))
    toggleSpiner(true);

}


function displayDetails(details){
    const countingItems = document.getElementById('counting-items');
    countingItems.innerText=`
    ${details.length} Related Items Found
    `;
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML='';
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
                <p>Author: ${detail.author.name ? detail.author.name:'No Author Found'} </br>
                <small class="text-muted"> Published Date : ${detail.author.published_date}</small> </p>
                
                <p class="card-text">
                <p> <i class="fa-regular fa-eye"> </i> ${detail.total_view ? detail.total_view: 'No view yet'} M</p>
                <small class="text-muted"> <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i> ${detail.rating.badge}</small>
                <small class="text-muted">${detail.rating.number}</small>
                </div>
                <div class="text-end"><button onclick="loadModal('${detail._id}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#newsModal"><i class="fa-sharp fa-solid fa-arrow-right"></i></button></div>
                </p>
              </div>
            </div>
          </div>
        `;
        detailsContainer.appendChild(detailDiv);
    }
    toggleSpiner(false);
}
const loadModal=(newsid)=>{
  fetch(`https://openapi.programming-hero.com/api/news/${newsid}`)
  .then(res=>res.json())
  .then(data=>displaModal(data.data[0]))
}
const displaModal =(news)=>{
  console.log(news);
    const newsModalLabel = document.getElementById('newsModalLabel');
    newsModalLabel.innerText =news.title;
    const newsDetails = document.getElementById('news-information');
    newsDetails.innerHTML=`
    <img style="height:300px;width:100%" src="${news.image_url}" alt="">
    <p>${news.details}</p>`;
   
}

loadCategories();