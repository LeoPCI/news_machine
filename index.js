$(document).ready(function() {

//define dates
	monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var yesterday = new Date();
	yesterday_year = yesterday.getFullYear();
	yesterday.setDate(yesterday.getDate() - 1);
	yesterday_month = monthNames[yesterday.getMonth()]
	yesterday = yesterday.getDate()

	var third_day = new Date();
	third_day.setDate(third_day.getDate() - 2);
	third_day_month = monthNames[third_day.getMonth()]
	third_day = third_day.getDate()

	var fourth_day = new Date();
	fourth_day.setDate(fourth_day.getDate() - 3);
	fourth_day_month = monthNames[fourth_day.getMonth()]
	fourth_day = fourth_day.getDate()

	today = new Date()
	year = today.getFullYear();
	day = today.getDate();
	month = monthNames[today.getMonth()]

	last_month = -1
	if (today.getMonth()>0) { last_month = monthNames[today.getMonth()-1] };

	last_month_year = year
	if (last_month==-1) {
		last_month = monthNames[-1]
		last_month_year = year-1
	};

//add date
	$("h1").append("Some important things that happened today (" + month + " " + day + ", " + year + ")")

//define source urls
	ongoing_protests="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_ongoing_protests&contentmodel=wikitext&prop=wikitext&format=json"
	ongoing_armed_conflicts="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_ongoing_armed_conflicts&contentmodel=wikitext&prop=wikitext&format=json"
	terrorist_attacks="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_terrorist_incidents_in_"+month+"_"+year+"&contentmodel=wikitext&prop=wikitext&format=json"
	terrorist_attacks_2="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_terrorist_incidents_in_"+last_month+"_"+last_month_year+"&contentmodel=wikitext&prop=wikitext&format=json"
	heads_of_state="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_current_state_leaders_by_date_of_assumption_of_office&contentmodel=wikitext&prop=wikitext&format=json"
	notable_deaths="https://en.wikipedia.org/w/api.php?action=parse&page=Deaths_in_"+year+"&contentmodel=wikitext&prop=wikitext&format=json"
	wiki_news="https://en.wikipedia.org/w/api.php?action=parse&page=Portal%3aCurrent_events/"+year+"_"+month+"_"+day+"&contentmodel=wikitext&prop=wikitext&format=json"
	wiki_news_2="https://en.wikipedia.org/w/api.php?action=parse&page=Portal%3aCurrent_events/"+yesterday_year+"_"+yesterday_month+"_"+yesterday+"&contentmodel=wikitext&prop=wikitext&format=json"
	natural_disasters="https://api.sigimera.org/v1/crises?auth_token=zUbyCGBVs3Mra8J8TjtS" //G1g5PTC4P4hstvYf3ZRz
	disasters_url="https://en.wikinews.org/w/api.php?action=parse&page=Portal:Disasters_and_accidents&format=json"
	oil_spills="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_oil_spills&format=json"
	google_news_1="https://www.google.com/search?hl=en&gl=us&tbm=nws&authuser=0&q="
	google_news_2="&safe=off&hl=en&gl=us&authuser=0&tbm=nws&tbs=sbd:1&*"

//get ongoing protests
$.ajax({
    url: ongoing_protests,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {
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

		  $("#ongoing_protests").append("<div class='news_item'> <a target='_blank' href=" + url + ">" + title + "</a> <br> SINCE: " + date + " <br>DEAD: " + died + "<br><a target='_blank' href=" + google_news_1 + title.replace(/ /g, "+") + google_news_2 + "> news &#10138; </a> </div>" );

	  	};
	  };
	  getinfo(listvar)
	  getinfo(listvar2)
    }
});


//get ongoing armed conflicts
$.ajax({
    url: ongoing_armed_conflicts,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

	  var listvar = data["parse"]["wikitext"]["*"]
	  listvar = listvar.split('==10,000+ deaths in current or past year==');
	  listvar = listvar[1].split('align=center');

	  var getinfo = function(line){

	  	for (var i = 1; i < line.length; i++) {
	  	  var thing=line[i].split("|");

	  	  if (thing[2]==" ") { thing[2]=thing[3] };

	  	  if (thing[2]=="") {
		  	  thing[2]=thing[2].replace('[[','').replace(']]','').split("*")
		  	  thing[2]=thing[2][0]
	  	  };

	  	  death_toll=line[i].split("ntsh")
	  	  death_toll=death_toll[1].split("}}")
	  	  death_toll=death_toll[1].split("{{")
	  	  death_toll=death_toll[0].split("ref")
	  	  death_toll=death_toll[0].slice(1).replace('[[','').replace(']]','').replace('|','').replace(/[^0-9, \-, +, \u2013|\u2014]+/g, '')

	  	  var title = thing[2].replace(/[0-9]/g, '').replace(/\(([^()]+)\)/g, "").replace(/[^a-zA-Z\s\-\u2013|\u2014]/g, '').split("--")[0]
	  	  var name = thing[2].replace("]]", "").replace("[[", "")
	  	  var since = thing[1]
	  	  var died = death_toll.split("--")[0]
	  	  var url = "https://en.wikipedia.org/wiki/" + name.slice(1).replace(/ /g, "_").split("_<!")[0]


		  $("#ongoing_wars").append( "<div class='news_item'> <a target='_blank' href=" + url + ">" + title + "</a> <br>" + "SINCE:" + since + "<br>" + "DEAD: " + died + "<br><a target='_blank' href=" + google_news_1 + title.replace(/ /g, "+").slice(0, -1) + google_news_2 + "> news &#10138; </a> </div>" );

	  	};
	  };
	  getinfo(listvar)
    }
});

//get last month's terrorist attacks if within past week
if (day < 7) {
$.ajax({
    url: terrorist_attacks_2,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

		attacks = data["parse"]["wikitext"]["*"].split('== '+window.last_month+' ==')[1].split("|-")

		var last_date = attacks[attacks.length-1].split("|")[1]

		for (var i = 2; i < attacks.length; i++) {
			
			var source=attacks[i].split("http")[1]
			if (source!=null) { 
				source = source.split("|")[0]
				source = source.replace("</ref", "").replace("<ref", "").replace(" ", "").replace(">", "").replace(/\{\{citeweb/, "").replace(/\>/, "")
				if (source.slice(-1)=="/") {source = source.slice(0, -1)};
				source = 'http' + source
			};


			var context = attacks[i].split("[[")
			var perpetrator = context[context.length-2].split("]]")[0].split("|")
			    perpetrator = perpetrator[perpetrator.length-1]
			    if (perpetrator=="01") {perpetrator = "unknown perpetrator"};
			var conflict = context[context.length-1].split("|")
			    conflict = conflict[conflict.length-1].slice(0,-3)

			var attack = attacks[i].split("|")
			var date = attack[1]
			var type = attack[2]
			var dead = attack[4]
			var where = attacks[i].split("{{")[1].split("}}")[0].split("|")[1]

			// var description = attack[9].split('{{')[0].replace(/\[/g, "").replace(/\]/g, "").split("http")[0]

			var now = new Date().toLocaleString().split("/")[1]
			var month = new Date().getMonth();

			if (date > Number(last_date)-7+window.day) {
		    	$("#terrorist_attacks_2").prepend("<div class='news_item'> <a target='_blank' href=" + source + ">" + type + "</a><br>WHEN: " + window.last_month + " " + date + "<br> WHERE: " + where + "<br>DEAD: " + dead + "<br>PERPETRATOR: " + perpetrator + "</div>" );
		    };
		};
    }
});
};

//get recent terrorist attacks
$.ajax({
    url: terrorist_attacks,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

		attacks = data["parse"]["wikitext"]["*"].split('== '+window.month+' ==')[1].split("|-")

		for (var i = 2; i < attacks.length; i++) {
			
			var source=attacks[i].split("http")[1]
			if (source!=null) { 
				source = source.split("|")[0]
				source = source.replace("</ref", "").replace("<ref", "").replace(" ", "").replace(">", "").replace(/\{\{citeweb/, "").replace(/\>/, "")
				if (source.slice(-1)=="/") {source = source.slice(0, -1)};
				source = 'http' + source
			};


			var context = attacks[i].split("[[")
			var perpetrator = context[context.length-2].split("]]")[0].split("|")
			    perpetrator = perpetrator[perpetrator.length-1]
			    if (perpetrator=="01") {perpetrator = "unknown perpetrator"};
			var conflict = context[context.length-1].split("|")
			    conflict = conflict[conflict.length-1].slice(0,-3)

			var attack = attacks[i].split("|")
			var date = attack[1]
			var type = attack[2]
			var dead = attack[4]
			var where = attacks[i].split("{{")[1].split("}}")[0].split("|")[1]

			// var description = attack[9].split('{{')[0].replace(/\[/g, "").replace(/\]/g, "").split("http")[0]

			var now = new Date().toLocaleString().split("/")[1]
			var month = new Date().getMonth();

			if (now-date < 8) {
		    	$("#terrorist_attacks").prepend("<div class='news_item'> <a target='_blank' href=" + source + ">" + type + "</a><br>WHEN: " + window.month + " " + date + "<br> WHERE: " + where + "<br>DEAD: " + dead + "<br>PERPETRATOR: " + perpetrator + "</div>" );

		    	//add today to daily snapshot
				if (date==window.day) {$("#daily_snapshot").append("<strong>Terrorist Attack: </strong>" + perpetrator + " behind <a target='_blank' href=" + source + ">" + type + "&#10138;</a> in " + where + ", " + dead + "confirmed dead <br><br>")};
		    };
		};
    }
});

//get recent heads of state
$.ajax({
    url: heads_of_state,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

		var heads = data["parse"]["wikitext"]["*"].split("=== "+window.year+" ===")
		heads = heads[heads.length-1].split('|-')

		for (var i = 2; i < heads.length; i++) {

			var section = heads[i].replace(/\{\{small\|/g, "").split("|")
			var date = section[1].replace(/[^0-9 ]/g, "")
			var month = section[1].replace(/[0-9 ]/g, "").slice(0,-1)
			var who = section[2].replace(/\[/g, "").replace(/\]/g, "").replace(/\}/g, "")
			var what = section[5].replace(/[^a-zA-Z \-]/g, "")
			var country = section[4].slice(0,-3).replace("}}", "")
			if (section.length>6) {var title = section[6].split("]]")[0]};
			var url = "https://en.wikipedia.org/wiki/" + who.replace(/ /g, "_")

			if ((month==window.month)||(month==window.last_month&&date>=day)) {

		    	$("#new_heads").prepend( "<div class='news_item'> <a target=_blank href=" + url + ">" + who + "</a><br>" + title + " of " + country + "<br>SINCE: " + month + " " + date + "</div>" );

		    	//add today to daily snapshot
				if (date==window.day) {$("#daily_snapshot").prepend("<a target=_blank href=" + url + ">" + who + "</a> has assumed the office of " + title + " of " + country + "<br><br>")};
		    };
		};
    }
});

//get notable deaths
$.ajax({
    url: notable_deaths,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

		var days = data["parse"]["wikitext"]["*"]

//define today's deaths
		var deaths_today = days.split("==="+String(day)+"===")[1].split("==="+String(yesterday)+"===")[0].split("*")
//define yesterday's deaths
		var deaths_yesterday = days.split("=="+String(yesterday_month)+"==")[1].split("==="+String(yesterday)+"===")[1].split("==="+String(third_day)+"===")[0].split("*")
//define third day's deaths
		var deaths_third = days.split("=="+String(third_day_month)+"==")[1].split("==="+String(third_day)+"===")[1].split("==="+String(fourth_day)+"===")[0].split("*")

		// $("#daily_snapshot").append("<em>Today's Notable Deaths</em><br>")

		var list_deaths = function(day, location, today=false) {
			for (var i = 1; i < day.length; i++) {

				var notability = day[i].split(",")[2].split("[")[0].replace("(", "").replace(".", "")
				var death = day[i].split(">[")[1].split("]</ref>")[0]
				var person = day[i].split(",")[0].replace("{{ill|","").split("]]")[0].split("|")[0].replace(/\(([^)]+)\)/, "").replace(/\[/g, "")
				var url = death.split(" ")[0]
					if (url.slice(-1)=="/") {url = url.slice(0, -1)};
				var explanation = death.replace(url, "").replace("/ ", "").split("]")[0]

				$(location).append("<div class='news_item'> <a target=_blank href=" + url + ">" + person + "</a> <br>" + notability + '<br>~' + explanation + '</div>')

			    //add today to daily snapshot
			    if (today) {
					$("#daily_snapshot").append("<strong>Notable Death: </strong>" + notability + " <a target=_blank href=" + url + ">" + person + " &#10138</a><br><br>");
				};
			};

		};

		$("#notable_deaths").append("<strong>TODAY</strong><br>")
		list_deaths(deaths_today, "#notable_deaths", true)
		$("#notable_deaths").append("<strong>YESTERDAY</strong><br>")
		list_deaths(deaths_yesterday, "#notable_deaths")
		$("#notable_deaths").append("<strong>"+ third_day_month +" "+ third_day +"</strong><br>")
		list_deaths(deaths_third, "#notable_deaths")

    }
});

//get recent elections and politics news
$.ajax({
    url: wiki_news,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

		var content = data["parse"]["wikitext"]["*"]

			elections = content.split("Politics and elections\n")[1].split("\n\n")[0].split("All news items above this line")[0]
			items = elections.split(")]")

			for (var i = 0; i < items.length-1; i++) {
				url="http" + items[i].split("[http")[1].split(" ")[0]
					if (url.slice(-1)=="/") {url = url.slice(0, -1)};

				var description = items[i].split("**")[0].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "

				if(items[i].split("**")[1]!=null){
					description = items[i].split("**")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "
				};

				if(items[i].split("***")[1]!=null){
					description = items[i].split("***")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "
				};

				if (description != " " && description != "") {
					$("#daily_snapshot").append("<strong>Politics: </strong>" + description+"<a target='_blank' href="+url+">Story &#10138;</a><br><br>")
				};
			};
    }
});

//get recent accidents and disasters
$.ajax({
    url: wiki_news,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

		var content = data["parse"]["wikitext"]["*"]

			disasters = content.split("Disasters and accidents\n")[1].split("\n\n")[0].split("All news items above this line")[0]
			items = disasters.split(")]")

			for (var i = 0; i < items.length-1; i++) {
				url="http" + items[i].split("[http")[1].split(" ")[0]
					if (url.slice(-1)=="/") {url = url.slice(0, -1)};

				var description = items[i].split("**")[0].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "

				if(items[i].split("**")[1]!=null){
					description = items[i].split("**")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "
				};

				if(items[i].split("***")[1]!=null){
					description = items[i].split("***")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "
				};

				if (description != " " && description != "") {
					$("#daily_snapshot").append("<strong>Disaster: </strong>" + description+"<a target='_blank' href="+url+">Story &#10138;</a><br><br>")
				};
			};
    }
});

//get recent Armed conflicts and attacks
$.ajax({
    url: wiki_news,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

		var content = data["parse"]["wikitext"]["*"]

			disasters = content.split("Armed conflicts and attacks\n")[1].split("\n\n")[0].split("All news items above this line")[0]
			items = disasters.replace(/\]\]/g, "").split(")]")

			for (var i = 0; i < items.length-1; i++) {

				url="http" + items[i].split("[http")[1].split(" ")[0]
					if (url.slice(-1)=="/") {url = url.slice(0, -1)};

				var description = items[i].split("**")[0].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "

				if(items[i].split("**")[1]!=null){
					description = items[i].split("**")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "
				};

				if(items[i].split("***")[1]!=null){
					description = items[i].split("***")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "
				};


				if (description != " " && description != "" && description != "  ") {
					$("#daily_snapshot").append("<strong>Conflict: </strong>" + description+"<a target='_blank' href="+url+">Story &#10138;</a><br><br>")
				};
			};
    }
});

//get recent International relations events
$.ajax({
    url: wiki_news,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

		var content = data["parse"]["wikitext"]["*"]

			disasters = content.split("International relations\n")[1].split("\n\n")[0].split("All news items above this line")[0]
			items = disasters.replace(/\]\]/g, "").split(")]")

			for (var i = 0; i < items.length-1; i++) {

				url="http" + items[i].split("[http")[1].split(" ")[0]
					if (url.slice(-1)=="/") {url = url.slice(0, -1)};

				var description = items[i].split("**")[0].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "

				if(items[i].split("**")[1]!=null){
					description = items[i].split("**")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "
				};

				if(items[i].split("***")[1]!=null){
					description = items[i].split("***")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "
				};

				if (description != " " && description != "") {
					$("#daily_snapshot").append("<strong>Geopolitics: </strong>" + description+"<a target='_blank' href="+url+">Story &#10138;</a><br><br>")
				};
			};
    }
});

//get recent Law and Crime events
// $.ajax({
//     url: wiki_news,
//     jsonp: "callback",
//     dataType: "jsonp",
//     success: function( data ) {

// 		var content = data["parse"]["wikitext"]["*"]

// 			disasters = content.split("Law and crime\n")[1].split("\n\n")[0].split("All news items above this line")[0]
// 			items = disasters.replace(/\]\]/g, "").split(")]")

// 			for (var i = 0; i < items.length-1; i++) {

// 				url="http" + items[i].split("[http")[1].split(" ")[0]
// 					if (url.slice(-1)=="/") {url = url.slice(0, -1)};

// 				var description = items[i].split("**")[0].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "")

// 				if(items[i].split("**")[1]!=null){
// 					var description = items[i].split("**")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "")
// 				};

// 				if (description != " ") {
// 					$("#daily_snapshot").append("<strong>???: </strong>" + description+"<a target='_blank' href="+url+">Story &#10138;</a><br><br>")
// 				};

// 			};
//     }
// });

//get recent disasters news
// $.ajax({
//     url: disasters_url,
//     jsonp: "callback",
//     dataType: "jsonp",
//     success: function( data ) {

// 		var content = data["parse"]["text"]["*"]

// 		var news = content.split("Latest news")[1].split('<span class="mw-headline" id="Africa">')[0].split("<ul>")[1].split("</ul>")[0].split("<li>")

// 		for (var i = 1; i < news.length; i++) {
// 			var date = news[i].split(" ")[0]
// 			var full_date = news[i].split(":")[0]
// 			var month_word = news[i].split(" ")[1]
// 			var headline = news[i].split("</a>")[0].split(">")
// 				headline = headline[headline.length-1]
// 			var url = "https://en.wikinews.org" + news[i].split('href="')[1].split('"')[0]

// 			$('#disasters').append("<div class='news_item'><strong>" + month_word + " " + date +"</strong><br>"+ headline + "<a target=_blank href="+ url + "> <br> Story &#10138 </a> </div>")

// 			if (date==day&&month_word==month) { $('#daily_snapshot').append(headline + " <a target=_blank href="+ url + "> Story &#10138 </a> <br>") };
// 		};
//     }
// });

//get recent oil spills
// $.ajax({
//     url: oil_spills,
//     jsonp: "callback",
//     dataType: "jsonp",
//     success: function( data ) {
// 		var content = data["parse"]["text"]["*"].split('<tr>\n<td align="left">')

// 		for (var i = 1; i < content.length; i++) {

// 			item = content[i].split('<td align="left">')[0].replace("</td>", "")//.replace('<span class="nowrap">', "")

// 			$('#disasters').append("<br>" + item + "<br>")

			// var date = news[i].split(" ")[0]
			// var full_date = news[i].split(":")[0]
			// var month_word = news[i].split(" ")[1]
			// var headline = news[i].split("</a>")[0].split(">")
			// 	headline = headline[headline.length-1]
			// var url = "https://en.wikinews.org" + news[i].split('href="')[1].split('"')[0]

			// $('#disasters').append("<div class='news_item'><strong>" + month_word + " " + date +"</strong><br>"+ headline + "<a target=_blank href="+ url + "> <br> Story &#10138 </a> </div>")

			// if (date==day&&month_word==month) { $('#daily_snapshot').append(headline + " <a target=_blank href="+ url + "> Story &#10138 </a> <br>") };
// 		};
//     }
// });


//get recent REAL disasters news
$.ajax({
    url: natural_disasters,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

    	for (var i = 0; i < data.length; i++) {
    		var content = data[i]
    	
	    	var severity = content["crisis_severity"]
	    	var description = content["dc_description"]
	    	var date = description.split(",")[0]
	    	var nowdate = ""
	    	if (date.split(" ")[0]=="From") {
	    		nowdate = date.split(" ")[3].split("/")[0]
	    		if (nowdate[0]==0) {nowdate=nowdate[1]};
	    	}
	    	else {
	    		nowdate = date.split(" ")[1].split("/")[1]
	    		if (date.split(" ")[3]==null) {nowdate = date.split(" ")[1].split("/")[0]};
	    		if (nowdate[0]==0) {nowdate=nowdate[1]};
	    	};
	    	var title = content["dc_title"]
	    	var what = content["dc_subject"][0]
	    		what = what[0].toUpperCase() + what.slice(1)
	    	var url = content["rdfs_seeAlso"]
	    	var effected = content["crisis_population"]

	    	var country = content["gn_parentCountry"][0]
	    	if (country=="" || country==null) {country="unspecified country"};

	    		if (country[0]==" ") {alert("hi")};

	    		country = country.split(" ")

	    		for (var j = 0; j < country.length; j++) {
	    			country[j] = country[j][0].toUpperCase() + country[j].slice(1)
	    		};
	    		country = country.join(" ")

	    	$('#disasters').append("<div class='news_item'> <strong>" + what + "</strong><br>" + date + "<br>" + title + "<br>" + " <a target=_blank href="+ url + "> Info &#10138 </a> </div>")

	    	if (nowdate==window.day) {$('#daily_snapshot').append("<strong>" + what + " in " + country + "</strong>: " + effected + "</strong> <a target=_blank href="+ url + ">Info &#10138 </a> <br><br>")};

    	};
    }
});


//get conversion rates
$.ajax({
    url: "http://api.fixer.io/2000-01-03",
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

    	// var content = data["rates"]["AUD"]
    	// alert(content)
 
    }
});

//show and hide info

var showandhide = function(div, other="#"){
if($(div).css('display') == 'none') {
		$(".info .inner").css({"display":"none"})
		$(div).css({"display":"inline-block"})
		$(other).css({"display":"inline-block"})
	}
else {
		$(".info .inner").css({"display":"none"})
	};
};

$('#button_zero').click(function(){
	showandhide("#daily_snapshot")
});

$('#button_one').click(function(){
	showandhide("#ongoing_protests")
});

$('#button_two').click(function(){
	showandhide("#ongoing_wars")
});

$('#button_three').click(function(){
	showandhide("#terrorist_attacks", "#terrorist_attacks_2")
});

$('#button_four').click(function(){
	showandhide("#new_heads")
});

$('#button_five').click(function(){
	showandhide("#notable_deaths")
});

$('#button_six').click(function(){
	showandhide("#disasters")
});


});