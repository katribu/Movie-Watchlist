
const apiKey = "485d1454"
let watchList = JSON.parse(localStorage.getItem("watchlist")) || []
const watchListDiv = document.getElementById('watchListDiv')
const clearWatchlistBtn = document.getElementById('clearListBtn')
const emptyWatchList = document.getElementById('emptyWatchList')


if(watchList.length > 0){
    emptyWatchList.innerHTML = ''
}

function getSavedMovies(){
    for (let i = 0; i < watchList.length; i++){
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${watchList[i]}`)
        .then(res => res.json())
        .then(data => {
            const {Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID} = data
            data.watchId = watchList.indexOf(imdbID) === -1 ? false : true
            watchListDiv.innerHTML += `
            <div class = "movies">
            <div class = "flexOne">
                <div>
                    <img class = "poster" src = "${Poster}" onerror="this.onerror=null;this.src='image/filler.jpg'">
                </div>
            </div>

            <div class = "flexTwo">
                <div class = "inline">
                    <h3 class = "title addToWatchlist" id = "title">${Title}</h3>
                    <img class = "star" src = "image/ratingStar.jpg"> 
                    <p class = "rating">${imdbRating}</p>
                </div>

                <div class = "inline">
                    <p class = "runtime">${Runtime}</p>
                    <p class = "genre">${Genre}</p>
                    <button class = "watchlistBtn inline" id="${imdbID}" onclick = "removeFromList(${imdbID})"> 
                                <img class = "add" src = "image/minusIcon.jpg">
                                <p class = "watch"> Remove </p>
                                </button>
                </div>
                <p class = "plot">${Plot}</p>
            </div>
        </div>
        <hr>

            `
        })
    }
}
getSavedMovies()

function removeFromList(id){
    // filter out movies that weren't clicked on
    watchList = watchList.filter(movie => movie !== id.id)

    localStorage.setItem("watchlist", JSON.stringify(watchList))
    watchList = JSON.parse(localStorage.getItem("watchlist"))
    // render out getSavedMovies.
    watchListDiv.innerHTML= ''
    getSavedMovies()
    if (watchList.length === 0){
        watchListDiv.innerHTML = ` <p class = "emptyPage" id="emptyWatchList"> You currently have no movies on your Watchlist.<br> Go find a film!</p>`
    }
}



clearWatchlistBtn.addEventListener('click', clearWatchlist)
function clearWatchlist(){
    watchListDiv.innerHTML = ` <p class = "emptyPage" id="emptyWatchList"> You currently have no movies on your Watchlist.<br> Go find a film!</p>`
    return localStorage.clear('watchlist')
}




    