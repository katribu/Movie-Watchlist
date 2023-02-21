const apiKey = "485d1454"
const search = document.getElementById("search-btn")
const main = document.getElementById("main")
const watchList = JSON.parse(localStorage.getItem("watchlist")) || []
let inputEl = document.getElementById("searchFilm")
let html = ''


search.addEventListener("click", getFilms)

function getFilms(e){
    e.preventDefault()
    let searchFilm = inputEl.value
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchFilm}`)
    .then(res => res.json())
    .then(data => getMovieList(data))
    .catch(err => {
        main.innerHTML= `
        <p class = "emptyPage"> Sorry, this film can't be found. </p>
        <p class = "emptyPage"> Please try again. </p>
        `
        err.message = main.innerHTML
    })
}

function getMovieList(data){
    for(i =0; i<data.Search.length; i++){
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${data.Search[i].imdbID}`)
            .then(res => res.json())
            .then(data => getMovieLayout(data))
                if (inputEl.value){
                html = ""
                }
    } 
}

function getMovieLayout(data){
    const {Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID} = data
    data.watchId = watchList.indexOf(imdbID) === -1 ? false : true
    let addFunc = data.watchId ? null : `addMovie(${imdbID})`

                    document.getElementById("main").innerHTML = html
                     html += `
                        <div class = "movies">
                        <div class = "flexOne">
                            <div>
                                <img class = "poster" src = "${Poster}" onerror="this.onerror=null;this.src='image/filler.jpg'">
                            </div>
                        </div>
        
                        <div class = "flexTwo">
                            <div class = "inline">
                                <h3 class = "title addToWatchlist" id = "title">${Title || 'N/A'}</h3>
                                <img class = "star" src = "image/ratingStar.jpg"> 
                                <p class = "rating">${imdbRating || 'N/A'}</p>
                            </div>
        
                            <div class = "inline">
                                <p class = "runtime">${Runtime || 'N/A'}</p>
                                <p class = "genre">${Genre || 'N/A'}</p>

                                <button class = "watchlistBtn inline" id="${imdbID}" onclick = '${addFunc}'> 
                                <img class = "add" src = "image/plusIcon.jpg">
                                <p class = "watch"> Watchlist </p>
                                </button>
                            </div>
                            <p class = "plot">${Plot || 'N/A'}</p>
                        </div>
                    </div>
                    <hr>
                `
}

function addMovie(elem){
    watchList.push(elem.id)
      let addedEl = document.getElementById(elem.id)
      addedEl.style.cursor = 'auto'
      addedEl.children[0].remove()
      // now the second child becomes 0 index because I just removed the first child. 
      addedEl.children[0].textContent = "Added"
      addedEl.children[0].style.color = 'purple'
      addedEl.children[0].style.textDecoration = 'none'

  
  localStorage.setItem("watchlist", JSON.stringify(watchList))
  

}


















    



