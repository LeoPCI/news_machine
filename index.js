$(document).ready(function() {

	today = new Date()
	year = today.getFullYear();
	day = today.getDate();
	monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	month = monthNames[today.getMonth()]

	last_month = -1
	if (today.getMonth()>0) { last_month = monthNames[today.getMonth()-1] };

	last_month_year = year
	if (last_month==-1) {
		last_month = monthNames[-1]
		last_month_year = year-1
	};

	$("h1").append(month + " " + day + ", " + year)


	ongoing_protests="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_ongoing_protests&contentmodel=wikitext&prop=wikitext&format=json"
	ongoing_armed_conflicts="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_ongoing_armed_conflicts&contentmodel=wikitext&prop=wikitext&format=json"
	terrorist_attacks="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_terrorist_incidents_in_"+month+"_"+year+"&contentmodel=wikitext&prop=wikitext&format=json"
	terrorist_attacks_2="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_terrorist_incidents_in_"+last_month+"_"+last_month_year+"&contentmodel=wikitext&prop=wikitext&format=json"
	heads_of_state="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_current_state_leaders_by_date_of_assumption_of_office&contentmodel=wikitext&prop=wikitext&section=1&format=json"

//get ongoing protests
	$.get( ongoing_protests, function( data ) {
	  var listvar = data["parse"]["wikitext"]["*"]
	  listvar = listvar.split('==List of ongoing civil unrests and protests==');
	  listvar = listvar[1].split('align=center');

	  var listvar2 = data["parse"]["wikitext"]["*"]
	  listvar2 = listvar2.split('==List of ongoing civil unrests and protests==');
	  listvar2 = listvar2[0].split('align=center');

	  var getinfo = function(line){
	  	for (var i = 1; i < line.length; i++) {
	  	  var thing=line[i].split("|");
	  	  var title = thing[2].slice(3, -3).replace(/[^a-zA-Z\s]/g, '')
	  	  var name = thing[2].slice(3, -3)
	  	  var date = thing[1]
	  	  var country = thing[4].slice(0,-3)
	  	  var died = thing[5]
	  	  	if (isNaN(parseInt(died))) {died=thing[4].split('{{')[0]};
		  var url = "https://en.wikipedia.org/wiki/" + name.replace(/ /g, "_")

	      $("#ongoing_protests").append()


		  $("#ongoing_protests").append("<a target='_blank' href=" + url + ">" + title + "</a><br>SINCE: " + date + " <br>DEAD: " + died + "<br><br>" );
	  	};
	  };
	  getinfo(listvar)
	  getinfo(listvar2)
	});


//get ongoing armed conflicts
	$.get( ongoing_armed_conflicts, function( data ) {
	  var listvar = data["parse"]["wikitext"]["*"]
	  listvar = listvar.split('==10,000+ deaths in current or past year==');
	  listvar = listvar[1].split('align=center');

	  var getinfo = function(line){
	  	for (var i = 1; i < line.length; i++) {
	  	  var thing=line[i].split("|");

	  	  if (thing[2]==" ") { thing[2]=thing[3] };

	  	  thing[2]=thing[2].replace('[[','').replace(']]','').split("*")
	  	  thing[2]=thing[2][0]

	  	  death_toll=line[i].split("ntsh")
	  	  death_toll=death_toll[1].split("}}")
	  	  death_toll=death_toll[1].split("{{")
	  	  death_toll=death_toll[0].split("ref")
	  	  death_toll=death_toll[0].slice(1).replace('[[','').replace(']]','').replace('|','').replace(/[^0-9, \-, +, \u2013|\u2014]+/g, '')

	  	  var title = thing[2].replace(/[0-9]/g, '').replace(/\(([^()]+)\)/g, "").replace(/[^a-zA-Z\s\-\u2013|\u2014]/g, '')
	  	  var name = thing[2]
	  	  var since = thing[1]
	  	  var died = death_toll
	  	  var url = "https://en.wikipedia.org/wiki/" + name.slice(1).replace(/ /g, "_")


		  $("#ongoing_wars").append( "<a target='_blank' href=" + url + ">" + title + "</a> <br>" + "SINCE:" + since + "<br>" + "DEAD: " + died + "<br><br>" );

	  	};
	  };
	  getinfo(listvar)
	});


//add last month's attacks if within past week
if (day < 7) {
	$.get( terrorist_attacks_2, function( data ) {

		attacks = data["parse"]["wikitext"]["*"].split('== '+window.last_month+' ==')[1].split("|-")

		for (var i = 2; i < attacks.length; i++) {
			
			var context = attacks[i].split("[[")
			var perpetrator = context[context.length-2].split("]]")[0].split("|")
			    perpetrator = perpetrator[perpetrator.length-1]
			    if (perpetrator=="01") {perpetrator = "unknown"};
			var conflict = context[context.length-1].split("|")
			    conflict = conflict[conflict.length-1].slice(0,-3)

			var attack = attacks[i].split("|")
			var date = attack[1]
			var type = attack[2]
			var dead = attack[3]
			var where = attack[6].split("}}")[0]
			var description = attack[7].split('{{')[0].replace(/\[/g, "").replace(/\]/g, "")

			var now = new Date().toLocaleString().split("/")[1]
			var month = new Date().getMonth();

			if (date > 29-now) {
		    	$("#terrorist_attacks").prepend("WHEN: " + window.last_month + " " + date + "<br>WHAT: " + type + "<br> WHERE: " + where + "<br>DEAD: " + dead + "<br>PERPETRATOR: " + perpetrator + "<br><br>" );
		    };
		};


	});
};

//get recent terrorist attacks
	$.get( terrorist_attacks, function( data ) {

		attacks = data["parse"]["wikitext"]["*"].split('== '+window.month+' ==')[1].split("|-")

		for (var i = 2; i < attacks.length; i++) {
			
			var source=attacks[i].split("http")[1]
			if (source!=null) { 
				source = source.split("|")[0]
				source = source.replace("</ref", "").replace("<ref", "").replace(" ", "").replace(">", "").replace(/\{\{citeweb/, "").replace(/\>/, "")
				source = 'http' + source
				//source = '<a target="_blank" href=' + source + '>story</a><br>'
			};
							//alert(source)


			var context = attacks[i].split("[[")
			var perpetrator = context[context.length-2].split("]]")[0].split("|")
			    perpetrator = perpetrator[perpetrator.length-1]
			    if (perpetrator=="01") {perpetrator = "unknown"};
			var conflict = context[context.length-1].split("|")
			    conflict = conflict[conflict.length-1].slice(0,-3)

			var attack = attacks[i].split("|")
			var date = attack[1]
			var type = attack[2]
			var dead = attack[3]
			var where = attack[6].split("}}")[0]
			var description = attack[7].split('{{')[0].replace(/\[/g, "").replace(/\]/g, "")

			var now = new Date().toLocaleString().split("/")[1]
			var month = new Date().getMonth();

			if (now-date < 8) {
		    	$("#terrorist_attacks").prepend("<a target='_blank' href=" + source + ">" + type + "</a><br>WHEN: " + window.month + " " + date + "<br> WHERE: " + where + "<br>DEAD: " + dead + "<br>PERPETRATOR: " + perpetrator + "<br><br>" );
		    };
		};


	});

	$.get( heads_of_state, function( data ) {

		var heads = data["parse"]["wikitext"]["*"].split("=== "+window.year+" ===")
		heads = heads[heads.length-1].split('|-')
		
		for (var i = 2; i < heads.length; i++) {

			var section = heads[i].replace(/\{\{small\|/g, "").split("|")
			var date = section[1].replace(/[^0-9 ]/g, "")
			var month = section[1].replace(/[0-9 ]/g, "").slice(0,-1)
			var who = section[2].replace(/\[/g, "").replace(/\]/g, "").replace(/\}/g, "")
			var what = section[5].replace(/[^a-zA-Z \-]/g, "")
			var url = "https://en.wikipedia.org/wiki/" + who.replace(/ /g, "_")


			if ((month==window.month)||(month==window.last_month&&date>=day)) {
		    	$("#new_heads").prepend( "<a target=_blank href=" + url + ">" + who + "</a><br>" + what + "<br>SINCE: " + month + " " + date + "<br><br>" );
		    };
		};


	});



});