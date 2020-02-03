let baseURL = "https://api.themoviedb.org/3/";
let APIKEY = "4cf099d43a5d088d424afab26eba63c7";
let baseImgURL = "https://image.tmdb.org/t/p/";
//size: w500, w600_and_h900_bestv2,...
let imgSize = "w500/";

async function getTrending() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=4cf099d43a5d088d424afab26eba63c7`
  );
  const movieSearch = await response.json();
  console.log(movieSearch);
  $(spinner).hide();
  $("#cardMovie").empty();
  $("#MovieDetail").empty();
  $("#PersonDetail").empty();
  $("#ulMovie").empty();
  for (const movie of movieSearch.results) {
    $("#cardMovie").append(`
        <div class="card" style="width:24%; display: inline-flex;" onclick="onclickCard(${movie.id});">
                <img class="card-img-top" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}" alt="${movie.title}" style="width:100%">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p>Release : ${movie.release_date}</p>
                    <p>Rate : ${movie.vote_average}</p>
                </div>
            </div>
        `);
  }
}
async function getSearch(page) {
  $("#MovieDetail").empty();
  $("#PersonDetail").empty();
  $("#cardMovie").empty();
  $("#ulMovie").empty();
  $(spinner).show();
  let keyword = document.getElementById("inputSearch").value;
  if ($("#search-mode :selected").text() === "Movie") {
    response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=4cf099d43a5d088d424afab26eba63c7&query=${keyword}&page=${page}`
    );
    movieSearch = await response.json();
    console.log(movieSearch);
    $(spinner).hide();
    $("#ulMovie").empty();
    for (i = 1; i <= parseInt(movieSearch.total_pages); i++) {
      $("#ulMovie").append(`
         <li class="page-item"><a class="page-link" href="#" onclick="getSearch(${i});">${i}</a></li>
        `);
    }
    for (const movie of movieSearch.results) {
      const getRuntime = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=4cf099d43a5d088d424afab26eba63c7`);
      const runtime = await getRuntime.json();
      $("#cardMovie").append(`
             <div class="card h-100" style="width:24%; display: inline-flex;" onclick="onclickCard(${movie.id});">
                <img class="card-img-top" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}" alt="${movie.title}" style="width:100%">
                <div class="card-body h-100">
                    <h5 class="card-title">${movie.title}</h5>
                    <p>Release: ${movie.release_date}</p>
                    <p>Rate: ${movie.vote_average}</p>
                    <p>Length: ${runtime.runtime} minutes</p>
                </div>
            </div>
        `);
    }
  }
  if ($("#search-mode :selected").text() === "Actor") {
    const getPersonID = await fetch(
      `https://api.themoviedb.org/3/search/person?api_key=4cf099d43a5d088d424afab26eba63c7&query=${keyword}`
    );
    personIDJson = await getPersonID.json();
    response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=4cf099d43a5d088d424afab26eba63c7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_cast=${personIDJson.results[0].id}`
    );
    personSearch = await response.json();
    console.log(personSearch);
    $(spinner).hide();
    $("#ulMovie").empty();
    for (i = 1; i <= parseInt(personSearch.total_pages); i++) {
      $("#ulMovie").append(`
         <li class="page-item"><a class="page-link" href="#" onclick="getSearch(${i});">${i}</a></li>
        `);
    }
    for (const movie of personSearch.results) {
      const getRuntime = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=4cf099d43a5d088d424afab26eba63c7`);
      const runtime = await getRuntime.json();
      $("#cardMovie").append(`
             <div class="card h-100" style="width:24%; display: inline-flex;" onclick="onclickCard(${movie.id});">
                <img class="card-img-top" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}" alt="${movie.title}" style="width:100%">
                <div class="card-body h-100">
                    <h5 class="card-title">${movie.title}</h5>
                    <p>Release: ${movie.release_date}</p>
                    <p>Rate: ${movie.vote_average}</p>
                    <p>Length: ${runtime.runtime} minutes</p>
                </div>
            </div>
        `);
    }
  }
}
let credits = "";
let review = "";
async function onclickCard(movieID) {
  $(spinner).show();
  $("#cardMovie").empty();
  $("#MovieDetail").empty();
  $("#PersonDetail").empty();
  $("#actorCredit").empty();
  $("#ulMovie").empty();
  $("#GenresMovie").empty();
  response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=4cf099d43a5d088d424afab26eba63c7`
  );
  response1 = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=4cf099d43a5d088d424afab26eba63c7`
  );
  const response2 = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=4cf099d43a5d088d424afab26eba63c7`
  );
  review = await response2.json();
  credits = await response1.json();
  const movieDetail = await response.json();
  console.log(movieDetail);
  console.log(credits);
  console.log(review);
  $(spinner).hide();
  let genCode = "";
  for (const genres of movieDetail.genres) {
    genCode =
      genCode +
      '<div style="display: inline-flex; margin-right: 10px">' +
      genres.name +
      "</div>";
  }
  console.log(genCode);
  $("#MovieDetail").append(`
    <div class="row">
        <div class="col col-md-12">
            <img class="card-img-top" src="https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}"
            alt="${movieDetail.title}" style="width:100%">
        </div>
    </div>
    <div class="row" style="padding-top: 10px;">
        <div class="col col-md-4">
                <img class="card-img-top"
                src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movieDetail.poster_path}">
        </div>

         <div class="col col-md-8" id="detail">
            <h3>${movieDetail.title}</h3>
            <h5>(${movieDetail.original_title})</h5>
            <p>Release Date: ${movieDetail.release_date}.</p>
            <p>Rate: ${movieDetail.vote_average}.</p>
            <p>Length: ${movieDetail.runtime} minutes.</p>
            <div style=\"display: inline-flex; margin-right: 5px\">Genres: ${genCode}</div>
            <p></p>
            <p>Overview: ${movieDetail.overview}</p>

        </div>
    </div>

    <div class="row" id="actor">
    <h1>Actor</h1>
    <div class="col col-md-12" id="actorCredit">
    </div>
    <nav aria-label="Page navigation example" >
        <ul class="pagination justify-content-center" id="ulActor">
        </ul>
    </nav>
    </div>

    <div class="row">
    <h1>Director</h1>
    <div class="col col-md-12">
        <div class="scrollmenu" id="directorCredit">
          <!--this is for director-->
        </div>
    </div>
    </div>

    <div class="row">
    <h1>Review</h1>
    <div class="col col-md-12">
    <div class="scrollmenu1"  id="reviewCredit">
    </div>
    </div>
    </div>
    `);
  genCode = "";
  getActorCredit(1);

  for (const crew of credits.crew) {
    if (crew.department === "Directing") {
      $("#directorCredit").append(`
            <div class="card text-center" style="width: 20%; display: inline-block;">
                <img class="card-img-top" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${crew.profile_path}" alt="${crew.name}" style="width:100%">
                    <div class="card-body">
                        <h5 class="card-title">${crew.name}</h5>
                    </div>
             </div>
            `);
    }
  }

  for (const reviews of review.results) {
    let tempContent = reviews.content.slice(0, 120);
    console.log(tempContent);
    $("#reviewCredit").append(`
    <div class="container border border-dark" style="margin-bottom:5px;">
        <div class="row">
            <h4>${reviews.author}</h4>
        </div>
        <div class="row">
            <div class="col-12">
            <p>${tempContent}<a href="${reviews.url}" target="_blank">...</a></p>
            </div>
        </div>
    </div>
        `);
  }
}

function getActorCredit(page) {
  //alert(parseInt(credits.cast.length/6));
  $("#ulActor").empty();
  $("#ulReview");
  $("#actorCredit").empty();
  for (i = 1; i <= Math.round(credits.cast.length / 6); i++) {
    $("#ulActor").append(`
        <li class="page-item"><a class="page-link" href="#actor" onclick="getActorCredit(${i})">${i}</a></li>
        `);
  }
  if (page == Math.round(credits.cast.length / 6)) {
    for (i = (page - 1) * 6; i < credits.cast.length; i++) {
      $("#actorCredit").append(`
            <div class="card" style="width: 16%; display: inline-flex;" onclick="onclickPerson(${credits.cast[i].id});">
                <img class="card-img-top" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${credits.cast[i].profile_path}" alt="${credits.cast[i].name}" style="width:100%">
                    <div class="card-body">
                        <p class="card-title">${credits.cast[i].name}</p>
                        <p>As: ${credits.cast[i].character}</p>
                    </div>
             </div>
        `);
    }
  } else
    for (i = 0; i < 6; i++) {
      $("#actorCredit").append(`
            <div class="card" style="width: 16%; display: inline-flex;" onclick="onclickPerson(${credits.cast[(page - 1) * 6 + i].id});">
                <img class="card-img-top" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${credits.cast[(page - 1) * 6 + i].profile_path}" alt="${credits.cast[(page - 1) * 6 + i].name}" style="width:100%">
                    <div class="card-body">
                        <p class="card-title">${credits.cast[(page - 1) * 6 + i].name}</p>
                        <p>As: ${credits.cast[(page - 1) * 6 + i].character}</p>
                    </div>
             </div>
        `);
    }
}
personData="";
async function onclickPerson(personID) {
  $("#cardMovie").empty();
  $("#MovieDetail").empty();
  $("#PersonDetail").empty();
  $(spinner).show();
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${personID}?api_key=4cf099d43a5d088d424afab26eba63c7`
  );
  personData = await response.json();

  $(spinner).hide();
  $("#PersonDetail").append(`
    <div class="row" style="padding-top: 10px;">
        <div class="col col-md-4">
                <img class="card-img-top"
                src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${personData.profile_path}">
        </div>

         <div class="col col-md-8" id="detail">
            <h3>${personData.name}</h3>
            <p>Birthday: ${personData.birthday}.</p>
            <p>Known as: ${personData.known_for_department} .</p>
            <p>${personData.biography} </p>
        </div>
    </div>
    <div class="row">
    <h1>Career</h1>
    <div class="container" id="career">
    
    </div>
    <nav aria-label="Page navigation example" >
        <ul class="pagination justify-content-center" id="ulCareer">
        </ul>
    </nav>
    </div>
    `);
    getCareer(1);
}
async function getCareer(page) {

  const getPersonMovie = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4cf099d43a5d088d424afab26eba63c7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_cast=${personData.id}
  `);
  const dataMovie = await getPersonMovie.json();
  console.log(dataMovie);
  $("#ulCareer").empty();
  for (i = 1; i <= parseInt(dataMovie.total_pages); i++) {
    $("#ulCareer").append(`
       <li class="page-item"><a class="page-link" href="#career" onclick="getCareer(${i});">${i}</a></li>
      `);
  }
  $('#career').empty();
  for (const careers of  dataMovie.results){
    $('#career').append(`
              <div class="card" style="width: 13%; display: inline-flex;" onclick="onclickCard(${careers.id})">
                <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${careers.poster_path}" alt="${careers.title}" style="width:100%">
                    <div class="card-body h-100">
                        <p class="card-title">${careers.title}</p>
                    </div>
             </div>
    `)
  }
}
