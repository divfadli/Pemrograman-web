// API yang digunakan pokeapi
$(function() {
	//----set variables
	var pokemonSearch;
	var listPokemonData;
	var selectSearch;

	// ------set defaults
	var defaultPokemon = '1';
	var defaultPokemonData;

	// DEFAULT
	var initFunc = function() {
		// ----https://pokeapi.co/api/v2/pokemon/?limit=811
		defaultPokemonData = $.ajax({
			url: "https://pokeapi.co/api/v2/pokemon/" + defaultPokemon,
			method: "GET"
		});

		var defaultDescriptionData = $.ajax({
			url: "https://pokeapi.co/api/v2/pokemon-species/" + defaultPokemon,
			method: "GET"
		});

		var defaultMovesData = $.ajax({
			url: "https://pokeapi.co/api/v2/move/" + defaultPokemon,
			method: "GET"
		});

		// ----DEFAULT POKEMON  DONE SET VARIABLES & UPDATE UI
		defaultPokemonData.done(function(data) {
			defaultPokemonData = data;
			var pokeImgFront = data.sprites.front_default;
			var pokeImgBack = data.sprites.back_default;
			var pokeImgShinyFront = data.sprites.front_shiny;
			var pokeImgShinyBack = data.sprites.back_shiny;
			var hpStats = data.stats[0].base_stat;
			var attackStats = data.stats[1].base_stat;
			var defenseStats = data.stats[2].base_stat;
			var specAttack = data.stats[3].base_stat;
			var specDefense = data.stats[4].base_stat;
			var speedStatus = data.stats[5].base_stat;
			var pokeType = data.types[0].type.name;
			var shiny = false;
			var frontImg = true;

            $('.loading-container').removeClass('active');
			$('.pokedex h3').text(data.name.toUpperCase());
			$('.poke-img img').attr('src', pokeImgFront);
			$('.stat-lineA').text(`Hp......................${hpStats}`);
			$('.stat-lineB').text(`Attack................${attackStats}`);
			$('.stat-lineC').text(`Defense..............${defenseStats}`);
			$('.stat-lineD').text(`Special Attack....${specAttack}`);
			$('.stat-lineE').text(`Special Defense..${specDefense}`);
			$('.stat-lineF').text(`Speed..................${speedStatus}`);
			$('.type').toggleClass(pokeType).text(pokeType);

			//console.log(defaultPokemonData);
			
            $('.btn-shiny').on('click', function() {
				if (shiny == false && frontImg == true) {
					shiny = true;
					frontImg = true;
					$(".poke-img img").attr("src", pokeImgShinyFront);
				} else if (shiny == false && frontImg == false) {
					shiny = true;
					frontImg = false;
					$(".poke-img img").attr("src", pokeImgShinyBack);
				} else if (shiny == true && frontImg == true) {
					shiny = false;
					frontImg = true;
					$(".poke-img img").attr("src", pokeImgFront);
				} else if (shiny == true && frontImg == false) {
					shiny = false;
					frontImg = false;
					$(".poke-img img").attr("src", pokeImgBack);
				}
			});

			$('.btn-view').on('click', function() {
				if (shiny == false && frontImg == true) {
					shiny = false;
					frontImg = false;
					$(".poke-img img").attr("src", pokeImgBack);
				} else if (shiny == false && frontImg == false) {
					shiny = false;
					frontImg = true;
					$(".poke-img img").attr("src", pokeImgFront);
				} else if (shiny == true && frontImg == true) {
					shiny = true;
					frontImg = false;
					$(".poke-img img").attr("src", pokeImgShinyBack);
				} else if (shiny == true && frontImg == false) {
					shiny = true;
					frontImg = true;
					$(".poke-img img").attr("src", pokeImgShinyFront);
				}
			});
            
			var counter = 0;
			$('.fas.fa-caret-down').on('click', function() {
				counter++;

				var newElement = data.moves[counter].move.name;
				$('.move-name').text(newElement);
				console.log(newElement);
			});

			$('.fas.fa-caret-up').on('click', function() {
				counter--;

				var newElement = data.moves[counter].move.name;
				$('.move-name').text(newElement);
				console.log(newElement);
			});
		});

		defaultDescriptionData.done(function(data) {
			defaultDescriptionData = data;
			var pokeDescription = data.flavor_text_entries[0].flavor_text;
			$('.pokemon-description').text(pokeDescription);
			console.log(defaultDescriptionData)
			//console.log(pokeDescription);
		});

		defaultMovesData.done(function(data) {
			defaultMovesData = data;
			var pokeMoveName = data.name;
			var pokeAccuracy = data.accuracy;
			var pokePower = data.power;
			var pokeMoveType = data.type.name;
			var pokePp = data.pp;
			//console.log(defaultMovesData);

			$('.move-name').text(pokeMoveName);
			$('.move-acc').text(`Accuracy.....${pokeAccuracy}`);
			$('.move-power').text(`Power........${pokePower}`);
			$('.move-pp').text(`PP............${pokePp}`);
			$('.move-type').text(`TYPE: ${pokeMoveType}`);

		});

		defaultPokemonData.fail(function(jqXHR, textStatus, error) {
			alert("Request failed: " + textStatus + ' ' + error);
			console.log(error)
		});
	}; 
	initFunc()

    // SEARCH INPUT
	$('.btn').on('click', function() {
		pokemonSearch = $('.pokedex input[type="text"]').val()
		var request = $.ajax({
			url: "https://pokeapi.co/api/v2/pokemon/" + pokemonSearch,
			method: "GET",
		});
		var formDescriptionData = $.ajax({
			url: "https://pokeapi.co/api/v2/pokemon-species/" + pokemonSearch,
			method: "GET"
		});
		var movesData = $.ajax({
			url: "https://pokeapi.co/api/v2/move/" + pokemonSearch,
			method: "GET"
		});

		request.done(function(data) {
			request = data;
			var pokeImgFront = data.sprites.front_default;
			var pokeImgBack = data.sprites.back_default;
			var pokeImgShinyFront = data.sprites.front_shiny;
			var pokeImgShinyBack = data.sprites.back_shiny;
			var hpStats = data.stats[0].base_stat;
			var attackStats = data.stats[1].base_stat;
			var defenseStats = data.stats[2].base_stat;
			var specAttack = data.stats[3].base_stat;
			var specDefense = data.stats[4].base_stat;
			var speedStatus = data.stats[5].base_stat;
			var pokeType = data.types[0].type.name;
            var shiny = false;
			var frontImg = true;

            $('.loading-container').removeClass('active');
			$('.pokedex h3').text(data.name.toUpperCase());
			$('.poke-img img').attr('src', pokeImgFront);
			$('.stat-lineA').text(`Hp......................${hpStats}`);
			$('.stat-lineB').text(`Attack................${attackStats}`);
			$('.stat-lineC').text(`Defense..............${defenseStats}`);
			$('.stat-lineD').text(`Special Attack....${specAttack}`);
			$('.stat-lineE').text(`Special Defense..${specDefense}`);
			$('.stat-lineF').text(`Speed..................${speedStatus}`);
            $('.type').toggleClass(pokeType).text(pokeType);

			$('.btn-shiny').on('click', function() {
				if (shiny == false && frontImg == true) {
					shiny = true;
					frontImg = true;
					$(".poke-img img").attr("src", pokeImgShinyFront);
				} else if (shiny == false && frontImg == false) {
					shiny = true;
					frontImg = false;
					$(".poke-img img").attr("src", pokeImgShinyBack);
				} else if (shiny == true && frontImg == true) {
					shiny = false;
					frontImg = true;
					$(".poke-img img").attr("src", pokeImgFront);
				} else if (shiny == true && frontImg == false) {
					shiny = false;
					frontImg = false;
					$(".poke-img img").attr("src", pokeImgBack);
				}
			});

			$('.btn-view').on('click', function() {
				if (shiny == false && frontImg == true) {
					shiny = false;
					frontImg = false;
					$(".poke-img img").attr("src", pokeImgBack);
				} else if (shiny == false && frontImg == false) {
					shiny = false;
					frontImg = true;
					$(".poke-img img").attr("src", pokeImgFront);
				} else if (shiny == true && frontImg == true) {
					shiny = true;
					frontImg = false;
					$(".poke-img img").attr("src", pokeImgShinyBack);
				} else if (shiny == true && frontImg == false) {
					shiny = true;
					frontImg = true;
					$(".poke-img img").attr("src", pokeImgShinyFront);
				}
			});

			var counter = pokemonSearch;
			$('.fas.fa-caret-down').on('click', function() {
				counter++;

				var newElement = data.moves[counter].move.name;
				$('.move-name').text(newElement);
				console.log(newElement);
			});

			$('.fas.fa-caret-up').on('click', function() {
				counter--;

				var newElement = data.moves[counter].move.name;
				$('.move-name').text(newElement);
				console.log(newElement);
			});

		});
		formDescriptionData.done(function(data) {
			formDescriptionData = data;
			var pokeDescription = data.flavor_text_entries[0].flavor_text;
			$('.pokemon-description').text(pokeDescription);
		});

		movesData.done(function(data) {
			movesData = data;
			var pokeMoveName = data.name;
			var pokeAccuracy = data.accuracy;
			var pokePower = data.power;
			var pokeMoveType = data.type.name;
			var pokePp = data.pp;

			$('.move-name').text(pokeMoveName);
			$('.move-acc').text(`Accuracy.....${pokeAccuracy}`);
			$('.move-power').text(`Power........${pokePower}`);
			$('.move-pp').text(`PP............${pokePp}`);
			$('.move-type').text(`TYPE: ${pokeMoveType}`);

		});

		request.fail(function(jqXHR, textStatus, error) {
			alert("Request failed: " + textStatus + ' ' + error);
		});
	});

    // SEARCH SELECT
	var initFuncTwo = function() {
		listPokemonData = $.ajax({
			url: "https://pokeapi.co/api/v2/pokemon/?limit=905",
			method: "GET"
		});
		listPokemonData.done(function(data) {
			listPokemonData = data;

			//------set data as an array
			var namesList = listPokemonData.results;
			// console.log(namesList);

			//------loop thru array with for of loop    
			var i = 0;
			for (i of namesList) {
				//console.log(i.name);
				$('.list').append(`<option value="${i.name}">${i.name}</option>`);
			};
			$('.list').on('change', function() {
				selectSearch = $('.list').val()

				var request = $.ajax({
					url: "https://pokeapi.co/api/v2/pokemon/" + selectSearch,
					method: "GET",
				});

				var formDescriptionData = $.ajax({
					url: "https://pokeapi.co/api/v2/pokemon-species/" + selectSearch,
					method: "GET"
				});

				var movesData = $.ajax({
					url: "https://pokeapi.co/api/v2/move/" + selectSearch,
					method: "GET"
				});

				request.done(function(data) {
					request = data;

					var pokeImgFront = data.sprites.front_default;
					var pokeImgBack = data.sprites.back_default;
					var pokeImgShinyFront = data.sprites.front_shiny;
					var pokeImgShinyBack = data.sprites.back_shiny;
					var hpStats = data.stats[0].base_stat;
					var attackStats = data.stats[1].base_stat;
					var defenseStats = data.stats[2].base_stat;
					var specAttack = data.stats[3].base_stat;
					var specDefense = data.stats[4].base_stat;
					var specDefense = data.stats[5].base_stat;
					var pokeType = data.types[0].type.name;
					var shiny = false;
					var frontImg = true;

                    $('.loading-container').removeClass('active');
					$('.pokedex h3').text(data.name.toUpperCase());
					$('.poke-img img').attr('src', pokeImgFront);
					$('.stat-lineA').text(`Hp......................${hpStats}`);
					$('.stat-lineB').text(`Attack................${attackStats}`);
					$('.stat-lineC').text(`Defense..............${defenseStats}`);
					$('.stat-lineD').text(`Special Attack....${specAttack}`);
					$('.stat-lineE').text(`Special Defense..${specDefense}`);
					$('.stat-lineF').text(`Speed..................${specDefense}`);
                    $('.type').toggleClass(pokeType).text(pokeType);

					$('.btn-shiny').on('click', function() {
						if (shiny == false && frontImg == true) {
							shiny = true;
							frontImg = true;
							$(".poke-img img").attr("src", pokeImgShinyFront);
						} else if (shiny == false && frontImg == false) {
							shiny = true;
							frontImg = false;
							$(".poke-img img").attr("src", pokeImgShinyBack);
						} else if (shiny == true && frontImg == true) {
							shiny = false;
							frontImg = true;
							$(".poke-img img").attr("src", pokeImgFront);
						} else if (shiny == true && frontImg == false) {
							shiny = false;
							frontImg = false;
							$(".poke-img img").attr("src", pokeImgBack);
						}
					});

					$('.btn-view').on('click', function() {
						//console.log(' test trigger-flip');
						if (shiny == false && frontImg == true) {
							shiny = false;
							frontImg = false;
							$(".poke-img img").attr("src", pokeImgBack);
						} else if (shiny == false && frontImg == false) {
							shiny = false;
							frontImg = true;
							$(".poke-img img").attr("src", pokeImgFront);
						} else if (shiny == true && frontImg == true) {
							shiny = true;
							frontImg = false;
							$(".poke-img img").attr("src", pokeImgShinyBack);
						} else if (shiny == true && frontImg == false) {
							shiny = true;
							frontImg = true;
							$(".poke-img img").attr("src", pokeImgShinyFront);
						}
					});
				});

                formDescriptionData.done(function(data) {
                    formDescriptionData = data;
                    var pokeDescription = data.flavor_text_entries[0].flavor_text;
                    $('.pokemon-description').text(pokeDescription);
                });

                movesData.done(function(data) {
                    movesData = data;
                    var pokeMoveName = data.name;
                    var pokeAccuracy = data.accuracy;
                    var pokePower = data.power;
                    var pokeMoveType = data.type.name;
                    var pokePp = data.pp;
        
                    $('.move-name').text(pokeMoveName);
                    $('.move-acc').text(`Accuracy.....${pokeAccuracy}`);
                    $('.move-power').text(`Power........${pokePower}`);
                    $('.move-pp').text(`PP............${pokePp}`);
                    $('.move-type').text(`TYPE: ${pokeMoveType}`);
        
                });

				request.fail(function(jqXHR, textStatus, error) {
					alert("Request failed: " + textStatus + ' ' + error);

				});
			});
		});
	};
	initFuncTwo()
});