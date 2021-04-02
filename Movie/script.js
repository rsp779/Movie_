$(document).ready(()=>{
    $('#searchForm').on('submit',(e)=>{
        let searchText=$('#searchText').val();
        getMovies(searchText);
        e.preventDefault(); //prevent the form from getting submitted to a file
    });
});
function getMovies(searchText)
{
 console.log(searchText); // this is used to state that our function is being called
 // Now we hit Api using axios
 axios.get("https://www.omdbapi.com?s=" +searchText +'&apikey=thewdb')
 .then((response)=>{
    console.log(response);
    let movies=response.data.Search;
    let output='';
    $.each(movies, (index,movie) => {
        output +=`
        <div class= "col-md-3">
            <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
             </div>
        </div>
        `;
    });
    $('#movies').html(output);
 })
 .catch((err)=>{
     console.log(err);
 });
}
function movieSelected(id){
sessionStorage.setItem('movieId',id); // this storage is used because when we backtrack the data gets cleared /when browser is closed
window.location='movie.html';
return false;
}
function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    // Make a request for a user with a given ID
    axios.get("https://www.omdbapi.com?i=" +movieId +'&apikey=thewdb')
      .then((response) => {
     
      console.log(response);
      
      let movie = response.data;
      let output = `
          <div class="row">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                
                <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                
                <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
                <li class="list-group-item"><strong>Country:</strong> ${movie.Country}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                <li class="list-group-item"><strong>Runtime:</strong> ${movie.Runtime}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-default">Go Back To Search</a>
            </div>
          </div>
      `;
      $('#movie').html(output);
      
      })
      .catch(function (error) {
        console.log(error);
      });
  }
