const apiKey = 'api_key=0284347479778309f6a7ae5d50f6e356';
const Url = 'https://api.themoviedb.org/3'
const frontPage = Url + '/discover/movie?sort_by=popularity.desc&' + apiKey;
const imgUrl = 'https://image.tmdb.org/t/p/w500/';
const searchUrl = Url + '/search/movie?' + apiKey;
const reviewUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=";
const ReviewAPI = "&api-key=WDilG1tpWW3qKKxUPTbTdQFastfp54SN";
const main = document.getElementById('main');
const form = document.getElementById("form");
const search = document.getElementById("search");

//gathers information for movie displays//
getMovie(frontPage);
function getMovie(url){
fetch(url)
.then(function(response) {
    response.json()
    .then(function(data){
        console.log(data)
        showMovie(data.results);
    });
});
}

//displays movies on front page//
var showMovie = function(data){
    main.innerHTML = '';
    data.forEach(function(movie){
        const singleMovie = document.createElement('a');
        singleMovie.classList.add('single');
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        const imgEl = document.createElement('img');
        imgEl.classList.add("movie-img");
        imgEl.src = imgUrl+movie.poster_path;
        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');
        const movietitle = document.createElement('h3');
        movietitle.classList.add('movie-title');
        movietitle.innerText = movie.title;
        const rating = document.createElement('span');
        rating.classList.add(getRating(movie.vote_average))
        rating.innerText = movie.vote_average;
        movieInfo.appendChild(movietitle);
        movieInfo.appendChild(rating);
        movieEl.appendChild(imgEl);
        movieEl.appendChild(movieInfo);
        singleMovie.appendChild(movieEl);
        main.appendChild(singleMovie);
        modal(singleMovie, movie);
    })
    }

    //adds functionality to cards//
    var modal = function(singleM,movie){
        const model = document.querySelector('.modals');
        const modalBackground = document.querySelector('.modal-background');
        const modalBody = document.querySelector('.modal-card-body');
        const modalTitle = document.querySelector('.modal-card-title');
        const closeBtn = document.querySelector('.delete');
         singleM.addEventListener('click', function(){
             model.classList.add('is-active');
             modalTitle.textContent =  movie.title;
             const details = document.createElement('div');
             details.classList.add('overall');

             //adds card header//
             const overviewHeader = document.createElement('h2');
             overviewHeader.classList.add('over-header');
             overviewHeader.innerText = 'Overview:';
             
             //adds synopsis to card//
             const overview = document.createElement('p');
             overview.classList.add('overviewP');
             overview.innerText = movie.overview;
             
             //adds release date to card//
             const DateHeader = document.createElement('h2');
             DateHeader.classList.add('over-header');
             DateHeader.innerText = "Release Date:";
             const releaseDate = document.createElement('h4');
             releaseDate.classList.add('date');
             releaseDate.innerText = movie.release_date;
             details.appendChild(overviewHeader);
             details.appendChild(overview);
             details.appendChild(DateHeader);
             details.appendChild(releaseDate);
             modalBody.appendChild(details);
         })

         //opens card//
            modalBackground.addEventListener('click', function(){
             model.classList.remove('is-active');
             const details = document.querySelector('.overall');
             details.remove();
         })

         //closes card//
            closeBtn.addEventListener('click', function(){
             model.classList.remove('is-active');
             const details = document.querySelector('.overall');
             details.remove();
         })
        }

        //gets ratings//
        var getRating= function(){}

            //adds submit event and functionality to search bar//
            form.addEventListener("submit", function(event){
                event.preventDefault();
                const searchTerm = search.value;
                //saves to locan storage//
                let searchHistory = JSON.parse(localStorage.getItem('movie')) || []
                searchHistory.push(searchTerm);
                localStorage.setItem('movie', JSON.stringify(searchHistory))
                console.log(searchTerm);
                if(searchTerm){
                    getMovie(searchUrl + '&query=' + searchTerm);
                }
                else{
                    getMovie(frontPage);
                }
                search.value = '';
                })