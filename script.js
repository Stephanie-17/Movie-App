const apiKey = 'api_key=de3fc5e31340aa8a69240f604f9b61e0'
const baseUrl = 'https://api.themoviedb.org/3';
const apiUrl =  baseUrl+ '/discover/movie?sort_by=popularity.desc&'+apiKey;
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchURL = baseUrl+'/search/movie?'+apiKey;


getApi(apiUrl);

function getApi(url) {
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        const  {results} = data
        displayMovies(results)
    })
}

function displayMovies(movies) {
    let html = ``
    movies.forEach(movie => {

       html+= `<div class="movie flex flex-col w-72 m-6 relative overflow-hidden ">
           <div class= "movie-img" >
              <img class="max-w-full  " src='https://image.tmdb.org/t/p/w500${movie.poster_path}' alt="">
           </div>
            

            <div class="movie-info h-20  text-white font-bold text-xl flex items-center justify-between px-4 py-4">
                <h3 class="movie-name">${movie.title}</h3>
                <span class="${changeColor(movie.vote_average)} text-base px-4">${movie.vote_average}</span>
            </div>

            <div class="overview absolute right-0 left-0 bottom-0 bg-white text-black px-6 py-4 ">
                <h3 class="font-bold text-lg">Overview</h3>
                <p>${movie.overview}</p>
            </div>

         </div>`

    });

    document.querySelector('main').innerHTML = html;
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchItem = search.value;

    if (searchItem) {
      getApi(searchURL +'&query='+searchItem)
        
    }
})

function changeColor(rating){
   if (rating >= 8) {
      return 'green';

   }else if(rating <5){
    return 'red';

   }else {
    return 'orange';
   }
}

