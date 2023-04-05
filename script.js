input_nazwa = document.querySelector("#input_nazwa");
button_szukaj = document.querySelector("#button_szukaj");
div_wyniki = document.querySelector("#div_wyniki");
tbody_wyniki = document.querySelector("#tbody_wyniki");
var key = "680cf0798e17299f84996ca9db95f388"
var zmienna_lokalna1;
button_szukaj.addEventListener("click",szukaj);

function szukaj(){
	div_wyniki.classList.remove("ukryty")
fetch("https://api.themoviedb.org/3/search/movie?api_key="+key+"&query="+input_nazwa.value)
.then( res => res.json())
.then(res => res.results)
.then(res =>{
var zmienna_lokalna1;
	console.log(res);
	for(let nazwa of res){
		var nazwa3 = nazwa.original_title
		var numer = nazwa.id
		var popularity = nazwa.popularity.toFixed(2)
		zmienna_lokalna1 +=
		`
		<tr>
			<th>
				<img src="https://image.tmdb.org/t/p/w500/${nazwa.poster_path}">
			</th>
			<th>
				${nazwa3}
			</th>
			<th>
				${popularity}
			</th>
			<th>
				${nazwa.release_date}
			</th>
			<th>
				<button class='btn btn-warning' onclick="showModal(${numer},'${nazwa3}','${nazwa.popularity}','https://image.tmdb.org/t/p/w500/${nazwa.poster_path}')">Sprawdź</button>
			</th>
		</tr>
		`;


}
zmienna_lokalna1 = zmienna_lokalna1.replace("undefined","");
tbody_wyniki.innerHTML = zmienna_lokalna1;

})}
var modalWrap = null;
const showModal = (numer, nazwa, popularnosc, okladka) =>{
	var opis;
	var kategoria;
	var srednia;
		fetch("https://api.themoviedb.org/3/movie/"+numer+"+?api_key="+key+"&language=pl")
.then( wynik => wynik.json())
.then(wynik => {
	console.log(wynik);
	opis = wynik.overview;
	srednia = wynik.vote_average;
	srednia = srednia.toFixed(2);
	for(let zmienna of wynik.genres){
		kategoria += zmienna.name+" ";
	}


  if (modalWrap !== null) {
    modalWrap.remove();
  }


  if (kategoria == null) {
  	kategoria = "Inna";
  }
  else{
  if (kategoria.includes("undefined")) {
  	kategoria = kategoria.replace("undefined","");
  }}

  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title">${nazwa}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img src="${okladka}">
            <div id='div_info'>
          <h6 class="mt-2">Popularność</h6>
            <p>${popularnosc}</p>
          <h6 class="mt-2">Kategoria</h6>
            <p>${kategoria}</p>
            <h6 class="mt-2">Średnia Ocen</h6>
            <p>${srednia}/10</p>
          </div>
          <h5 class="mt-2">Opis</h5>
            <p>${opis}</p>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
            <button type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal" onclick="window.open('https://www.themoviedb.org/movie/${numer}','_blank').focus()">Więcej Informacji</button>
          </div>
        </div>
      </div>
    </div>
  `;


  document.body.append(modalWrap);
  var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();
  });
}