$(document).ready(function() {

// nice little unless function
var unless = function( condition, callback ) {
    if (typeof callback === 'function') {
        if (!condition) callback();
    }else{
        return !condition;    
    }
};

// list of countries and demonymic forms
var demonymic = {"Zimbabwean" : "Zimbabwe", "Zambian" : "Zambia", "Yemeni" : "Yemen", "Sahraouian" : "Western Sahara", "Sahrawian" : "Western Sahara", "Sahrawi" : "Western Sahara", "Futunan" : "Wallis And Futuna", "Wallisian" : "Wallis And Futuna", "Wallis and Futuna" : "Wallis And Futuna", "Welsh" : "Wales", "U.S. Virgin Island" : "Virgin Islands- United States", "British Virgin Island" : "Virgin Islands- British", "Vietnamese" : "Vietnam", "Venezuelan" : "Venezuela", "Vatican" : "Vatican City State", "Vanuatuan" : "Vanuatu ", "Ni-Vanuatu" : "Vanuatu", "Uzbek" : "Uzbekistan ", "Uzbekistani" : "Uzbekistan", "Uruguayan" : "Uruguay", "American" : "United States", "Emiri" : "United Arab Emirates", "Emirian" : "United Arab Emirates", "Emirati" : "United Arab Emirates", "Ukrainian" : "Ukraine", "Ugandan" : "Uganda", "Tuvaluan" : "Tuvalu", "Turks and Caicos Island" : "Turks And Caicos Islands", "Turkmen" : "Turkmenistan", "Turkish" : "Turkey", "Tunisian" : "Tunisia", "Tobagonian" : "Trinidad And Tobago", "Trinidadian" : "Trinidad And Tobago", "Tongan" : "Tonga", "Tokelauan" : "Tokelau", "Togolese" : "Togo", "Timorese" : "Timor-Leste", "Thai" : "Thailand", "Tanzanian" : "Tanzania", "Tajikistani" : "Tajikistan", "Syrian" : "Syria", "Swiss" : "Switzerland", "Swedish" : "Sweden", "Swazi" : "Swaziland", "Svalbard" : "Svalbard", "Surinamese" : "Surinam", "Sudanese" : "Sudan", "Sri Lankan" : "Sri Lanka", "Spanish" : "Spain", "South Sudanese" : "South Sudan", "South Sandwich Island" : "South Georgia And Sandwich Isl.", "South Georgian" : "South Georgia And Sandwich Isl.", "South African" : "South Africa", "Somalilander" : "Somaliland", "Somali" : "Somalia", "Solomon Island" : "Solomon Islands", "Slovene" : "Slovenia", "Slovenian" : "Slovenia", "Slovak" : "Slovakia", "Sint Maarten" : "Sint Maarten", "Statian" : "Sint Eustatius", "Sint Eustatius" : "Sint Eustatius", "Singaporean" : "Singapore ", "Singapore" : "Singapore", "Sierra Leonean" : "Sierra Leone", "Seychellois" : "Seychelles", "Serbian" : "Serbia", "Senegalese" : "Senegal", "Scottish" : "Scotland", "Saudi Arabian" : "Saudi Arabia", "Saudi" : "Saudi Arabia", "Sao Tomean" : "Sao Tome and Príncipe", "Sammarinese" : "San Marino", "Samoan" : "Samoa", "Vincentian" : "Saint Vincent And Grenadines", "Saint Vincentian" : "Saint Vincent And Grenadines", "Miquelonnais" : "Saint Pierre And Miquelon", "Saint-Pierrais" : "Saint Pierre And Miquelon", "Saint-Martinoise" : "Saint Martin", "Saint Lucian" : "Saint Lucia", "Kittitian or Nevisian" : "Saint Kitts and Nevis", "Saint Helenian" : "Saint Helena", "Barthelemois" : "Saint Barthelemy", "Saba" : "Saba", "Rwandan" : "Rwanda", "Soviet" : "Russia", "Soviet-Russian" : "Russia", "Russian" : "Russia", "Romanian" : "Romania", "Reunionnais" : "Reunion ", "Reunionese" : "Reunion", "Qatari" : "Qatar", "Puerto Rican" : "Puerto Rico", "Portuguese" : "Portugal", "Polish" : "Poland", "Pitcairn Island" : "Pitcairn Islands", "Philippine" : "Philippines", "Filipino" : "Philippines", "Peruvian" : "Peru", "Paraguayan" : "Paraguay", "Papuan" : "Papua New Guinea", "Papua New Guinean" : "Papua New Guinea", "Panamanian" : "Panama", "Palestinian" : "Palestine", "Palauan" : "Palau", "Pakistani" : "Pakistan", "Omani" : "Oman", "Norwegian" : "Norway", "Northern Marianan" : "Northern Mariana Islands", "Irish" : "Ireland", "Northern Irish" : "Northern Ireland", "Norfolk Island" : "Norfolk Island", "Niuean" : "Niue", "Nigerian" : "Nigeria", "Nigerien" : "Niger", "Nicaraguan" : "Nicaragua", "New Zealand" : "New Zealand", "New Caledonian" : "New Caledonia", "Netherlandic" : "Netherlands ", "Dutch" : "Netherlands", "Nepalese" : "Nepal ", "Nepali" : "Nepal", "Nauruan" : "Nauru", "Namibian" : "Namibia", "Burmese" : "Myanmar", "Mozambican" : "Mozambique", "Moroccan" : "Morocco", "Montserratian" : "Montserrat", "Montenegrin" : "Montenegro", "Mongolian" : "Mongolia", "Monacan" : "Monaco ", "Monégasque" : "Monaco", "Moldovan" : "Moldova", "Micronesian" : "Micronesia- Federated States of", "Mexican" : "Mexico", "Mahoran" : "Mayotte", "Mauritian" : "Mauritius", "Mauritanian" : "Mauritania", "Martinican" : "Martinique ", "Martiniquais" : "Martinique", "Marshallese" : "Marshall Islands", "Maltese" : "Malta", "Malinese" : "Mali ", "Malian" : "Mali", "Maldivian" : "Maldives", "Malaysian" : "Malaysia", "Malawian" : "Malawi", "Malagasy" : "Madagascar", "Macedonian" : "Macedonia", "Chinese" : "Macau ", "Macanese" : "Macau", "Luxembourgish" : "Luxembourg ", "Luxembourg" : "Luxembourg", "Lithuanian" : "Lithuania", "Liechtensteiner" : "Liechtenstein", "Libyan" : "Libya", "Liberian" : "Liberia", "Basotho" : "Lesotho", "Lebanese" : "Lebanon", "Lettish" : "Latvia ", "Latvian" : "Latvia", "Laotian" : "Laos ", "Lao" : "Laos", "Kirghiz" : "Kyrgyzstan ", "Kirgiz" : "Kyrgyzstan ", "Kyrgyz" : "Kyrgyzstan ", "Kyrgyzstani" : "Kyrgyzstan", "Kuwaiti" : "Kuwait", "Kosovars" : "Kosovo", "Kosovan" : "Kosovo ", "Kosovar" : "Kosovo", "South Korean" : "South Korea", "North Korean" : "North Korea", "I-Kiribati" : "Kiribati", "Kenyan" : "Kenya", "Kazakh" : "Kazakhstan ", "Kazakhstani" : "Kazakhstan", "Jordanian" : "Jordan", "Channel Island" : "Jersey", "Japanese" : "Japan", "Jan Mayen" : "Jan Mayen", "Jamaican" : "Jamaica", "Ivorian" : "Ivory Coast", "Italian" : "Italy", "Israeli" : "Israel", "Manx" : "Isle of Man", "Irish" : "Ireland", "Iraqi" : "Iraq", "Persian" : "Iran", "Iranian" : "Iran", "Indonesian" : "Indonesia", "Indian" : "India", "Icelandic" : "Iceland", "Magyar" : "Iceland", "Hungarian" : "Hungary", "Hong Kongese" : "Hong Kong", "Honduran" : "Honduras", "McDonald Island" : "Heard Island & McDonald Islands", "Heard Island" : "Heard Island & McDonald Islands", "Haitian" : "Haiti", "Guyanese" : "Guyana", "Bissau-Guinean" : "Guinea-Bissau", "Guinean" : "Guinea", "Channel Island" : "Guernsey", "Guatemalan" : "Guatemala", "Guambat" : "Guam", "Guamanian" : "Guam", "Guadeloupe" : "Guadeloupe", "Grenadian" : "Grenada", "Greenlandic" : "Greenland", "Greek- Hellenic" : "Greece", "Gibraltar" : "Gibraltar", "Ghanaian" : "Ghana", "German" : "Germany", "Georgian" : "Georgia", "Gambian" : "Gambia", "Gabonese" : "Gabon", "French Southern Territories" : "French Southern Territories", "French Polynesian" : "French Polynesia", "French Guianese" : "French Guiana", "French" : "France", "Finnish" : "Finland", "Fijian" : "Fiji", "Faroese" : "Faroe Islands", "Falkland Island" : "Falkland Islands", "European" : "European Union", "Ethiopian" : "Ethiopia", "Estonian" : "Estonia", "Eritrean" : "Eritrea", "Equatoguinean" : "Equatorial Guinea", "Equatorial Guinean" : "Equatorial Guinea", "English" : "United Kingdom", "UK" : "United Kingdom", "British" : "United Kingdom", "Salvadoran" : "El Salvador", "Egyptian" : "Egypt", "Ecuadorian" : "Ecuador", "Timorese" : "East Timor", "Dominican" : "Dominican Republic", "Dominican" : "Dominica", "Djiboutian" : "Djibouti", "Danish" : "Denmark", "Czech" : "Czech Republic", "Cypriot" : "Cyprus", "Curacaoan" : "Curacao", "Cuban" : "Cuba", "Croatian" : "Croatia", "Ivorian" : "Cote D'Ivoire", "Costa Rican" : "Costa Rica", "Cook Island" : "Cook Islands", "Congolese" : "Congo- Democratic Republic", "Comorian" : "Comoros ", "Comoran" : "Comoros", "Colombian" : "Colombia", "Cocos Island" : "Cocos (Keeling) Islands", "Christmas Island" : "Christmas Island", "Chinese" : "China", "Chilean" : "Chile", "Chadian" : "Chad", "Central African" : "Central African Republic", "Caymanian" : "Cayman Islands", "Canadian" : "Canada", "Cameroonian" : "Cameroon", "Cambodian" : "Cambodia", "Cabo Verdean" : "Cabo Verde", "Burundian" : "Burundi", "Burmese" : "Burma", "Burkinabé" : "Burkina Faso", "Bulgarian" : "Bulgaria", "Bruneian" : "Brunei", "BIOT" : "British Indian Ocean Territory", "Brazilian" : "Brazil", "Bouvet Island" : "Bouvet Island", "Botswanan" : "Botswana", "Motswana" : "Botswana", "Herzegovinian" : "Bosnia And Herzegovina", "Bosnian" : "Bosnia And Herzegovina", "Bonaire" : "Bonaire", "Bolivian" : "Bolivia", "Bhutanese" : "Bhutan", "Bermudan" : "Bermuda ", "Bermudian" : "Bermuda", "Beninoises" : "Benin ", "Beninois" : "Benin ", "Beninese" : "Benin", "Belizean" : "Belize", "Belgian" : "Belgium", "Belarusian" : "Belarus", "Barbadian" : "Barbados", "Bangladeshi" : "Bangladesh", "Bahraini" : "Bahrain", "Bahamian" : "Bahamas", "Azeri" : "Azerbaijan ", "Azerbaijani" : "Azerbaijan", "Austrian" : "Austria", "Australian" : "Australia", "Aruban" : "Aruba", "Armenian" : "Armenia", "Argentine" : "Argentina", "Barbudan" : "Antigua And Barbuda", "Antiguan" : "Antigua And Barbuda", "Antarctic" : "Antarctica", "Anguillan" : "Anguilla", "Angolan" : "Angola", "Andorran" : "Andorra", "American Samoan" : "American Samoa", "Algerian" : "Algeria", "Albanian" : "Albania", "Aland Island" : "Aland Islands", "Afghan" : "Afghanistan", "Abkhazian" : "Abkhazia", "Abkhaz" : "Abkhazia"}

// list of country codes
countryLetters = {"UK" : "gb", "Zimbabwe" : "zw", "Zambia" : "zm", "Yemen" : "ye", "Western Sahara" : "eh", "Wallis And Futuna" : "wf", "Virgin Islands, U.S." : "vi", "Virgin Islands, British" : "vg", "Viet Nam" : "vn", "Venezuela" : "ve", "Vanuatu" : "vu", "Uzbekistan" : "uz", "Uruguay" : "uy", "United States Outlying Islands" : "um", "Chicago" : "us", "Ohio" : "us", "California" : "us", "U.S." : "us", "United States" : "us", "United Kingdom" : "gb", "United Arab Emirates" : "ae", "Ukraine" : "ua", "Uganda" : "ug", "Tuvalu" : "tv", "Turks And Caicos Islands" : "tc", "Turkmenistan" : "tm", "Turkey" : "tr", "Tunisia" : "tn", "Trinidad And Tobago" : "tt", "Tonga" : "to", "Tokelau" : "tk", "Togo" : "tg", "Timor-Leste" : "tl", "Thailand" : "th", "Tanzania" : "tz", "Tajikistan" : "tj", "Taiwan" : "tw", "Syria" : "sy", "Damascus" : "sy", "Syrian Arab Republic" : "sy", "Switzerland" : "ch", "Sweden" : "se", "Swaziland" : "sz", "Svalbard And Jan Mayen" : "sj", "Suriname" : "sr", "Sudan" : "sd", "Sri Lanka" : "lk", "Spain" : "es", "South Georgia And Sandwich Isl." : "gs", "South Africa" : "za", "Somalia" : "so", "Solomon Islands" : "sb", "Slovenia" : "si", "Slovakia" : "sk", "Singapore" : "sg", "Sierra Leone" : "sl", "Seychelles" : "sc", "Serbia" : "rs", "Senegal" : "sn", "Saudi Arabia" : "sa", "Sao Tome And Principe" : "st", "San Marino" : "sm", "Samoa" : "ws", "Saint Vincent And Grenadines" : "vc", "Saint Pierre And Miquelon" : "pm", "Saint Martin" : "mf", "Saint Lucia" : "lc", "Saint Kitts And Nevis" : "kn", "Saint Helena" : "sh", "Saint Barthelemy" : "bl", "Rwanda" : "rw", "Russian Federation" : "ru", "Russia" : "ru", "Romania" : "ro", "Reunion" : "re", "Qatar" : "qa", "Puerto Rico" : "pr", "Portugal" : "pt", "Poland" : "pl", "Pitcairn" : "pn", "Philippines" : "ph", "Peru" : "pe", "Paraguay" : "py", "Papua New Guinea" : "pg", "Panama" : "pa", "Palestinian Territory, Occupied" : "ps", "Palau" : "pw", "Pakistan" : "pk", "Oman" : "om", "Norway" : "no", "Northern Mariana Islands" : "mp", "Norfolk Island" : "nf", "Niue" : "nu", "Nigeria" : "ng", "Niger" : "ne", "Nicaragua" : "ni", "New Zealand" : "nz", "New Caledonia" : "nc", "Netherlands Antilles" : "an", "Netherlands" : "nl", "Nepal" : "np", "Nauru" : "nr", "Namibia" : "na", "Myanmar" : "mm", "Mozambique" : "mz", "Morocco" : "ma", "Montserrat" : "ms", "Montenegro" : "me", "Mongolia" : "mn", "Monaco" : "mc", "Moldova" : "md", "Micronesia, Federated States Of" : "fm", "Mexico" : "mx", "Mayotte" : "yt", "Mauritius" : "mu", "Mauritania" : "mr", "Martinique" : "mq", "Marshall Islands" : "mh", "Malta" : "mt", "Mali" : "ml", "Maldives" : "mv", "Malaysia" : "my", "Malawi" : "mw", "Madagascar" : "mg", "Macedonia" : "mk", "Macao" : "mo", "Luxembourg" : "lu", "Lithuania" : "lt", "Liechtenstein" : "li", "Libya" : "ly", "Libyan Arab Jamahiriya" : "ly", "Liberia" : "lr", "Lesotho" : "ls", "Lebanon" : "lb", "Latvia" : "lv", "Lao People's Democratic Republic" : "la", "Kyrgyzstan" : "kg", "Kuwait" : "kw", "South Korea" : "kr", "North Korea" : "kp", "Kiribati" : "ki", "Kenya" : "ke", "Kazakhstan" : "kz", "Jordan" : "jo", "Jersey" : "je", "Japan" : "jp", "Jamaica" : "jm", "Rome" : "it", "Italy" : "it", "Israel" : "il", "Isle Of Man" : "im", "Ireland" : "ie", "Iraq" : "iq", "Iran, Islamic Republic Of" : "ir", "Indonesia" : "id", "India" : "in", "Iceland" : "is", "Hungary" : "hu", "Hong Kong" : "hk", "Honduras" : "hn", "Holy See (Vatican City State)" : "va", "Heard Island & Mcdonald Islands" : "hm", "Haiti" : "ht", "Guyana" : "gy", "Guinea-Bissau" : "gw", "Guinea" : "gn", "Guernsey" : "gg", "Guatemala" : "gt", "Guam" : "gu", "Guadeloupe" : "gp", "Grenada" : "gd", "Greenland" : "gl", "Greece" : "gr", "Gibraltar" : "gi", "Ghana" : "gh", "Germany" : "de", "Georgia" : "ge", "Abkhazia" : "ge", "The Gambia" : "gm", "Gambia" : "gm", "Gabon" : "ga", "French Southern Territories" : "tf", "French Polynesia" : "pf", "French Guiana" : "gf", "France" : "fr", "Finland" : "fi", "Fiji" : "fj", "Faroe Islands" : "fo", "Falkland Islands (Malvinas)" : "fk", "Ethiopia" : "et", "Estonia" : "ee", "Eritrea" : "er", "Equatorial Guinea" : "gq", "El Salvador" : "sv", "Egypt" : "eg", "Ecuador" : "ec", "Dominican Republic" : "do", "Dominica" : "dm", "Djibouti" : "dj", "Denmark" : "dk", "Czech Republic" : "cz", "Cyprus" : "cy", "Cuba" : "cu", "Croatia" : "hr", "Ivory Coast" : "ci", "Cote D'Ivoire" : "ci", "Costa Rica" : "cr", "Cook Islands" : "ck", "Congo, Democratic Republic" : "cd", "Congo" : "cg", "Comoros" : "km", "Colombia" : "co", "Cocos (Keeling) Islands" : "cc", "Christmas Island" : "cx", "China" : "cn", "Chile" : "cl", "Chad" : "td", "Central African Republic" : "cf", "Cayman Islands" : "ky", "Cape Verde" : "cv", "Canada" : "ca", "Cameroon" : "cm", "Cambodia" : "kh", "Burundi" : "bi", "Burkina Faso" : "bf", "Bulgaria" : "bg", "Brunei Darussalam" : "bn", "British Indian Ocean Territory" : "io", "Brazil" : "br", "Bouvet Island" : "bv", "Botswana" : "bw", "Bosnia And Herzegovina" : "ba", "Bolivia" : "bo", "Bhutan" : "bt", "Bermuda" : "bm", "Benin" : "bj", "Belize" : "bz", "Belgium" : "be", "Belarus" : "by", "Barbados" : "bb", "Bangledesh" : "bd", "Bangladesh" : "bd", "Bahrain" : "bh", "Bahamas" : "bs", "Azerbaijan" : "az", "Austria" : "at", "Australia" : "au", "Aruba" : "aw", "Armenia" : "am", "Argentina" : "ar", "Antigua And Barbuda" : "ag", "Antarctica" : "aq", "Anguilla" : "ai", "Angola" : "ao", "Andorra" : "ad", "American Samoa" : "as", "Algeria" : "dz", "Albania" : "al", "Aland Islands" : "ax", "Afghanistan" : "af", "Unknown" : "undefined"}

//define dates
	monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	yesterday_year = yesterday.getFullYear();
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

	//add date to title
	$("#today-title").append(month + " " + day + ", " + year)

// Find Country Via Paragraph
findCountry = function(content) {
	var country = "unknown"
	for (var key in demonymic) { if (content.includes(key)) {country = countryLetters[demonymic[key]]}; }
	for (var key in countryLetters) { if (content.includes(key)) {country = countryLetters[key]}; }
	return country
}

//define source urls
	ongoing_protests="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_ongoing_protests_and_civil_unrest&contentmodel=wikitext&prop=wikitext&format=json"
	ongoing_armed_conflicts="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_ongoing_armed_conflicts&contentmodel=wikitext&prop=wikitext&format=json"
	terrorist_attacks="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_terrorist_incidents_in_"+month+"_"+year+"&contentmodel=wikitext&prop=wikitext&format=json"
	terrorist_attacks_2="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_terrorist_incidents_in_"+last_month+"_"+last_month_year+"&contentmodel=wikitext&prop=wikitext&format=json"
	heads_of_state="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_current_state_leaders_by_date_of_assumption_of_office&contentmodel=wikitext&prop=wikitext&format=json"
	notable_deaths="https://en.wikipedia.org/w/api.php?action=parse&page=Deaths_in_"+year+"&contentmodel=wikitext&prop=wikitext&format=json"
	wiki_news="https://en.wikipedia.org/w/api.php?action=parse&page=Portal%3aCurrent_events/"+year+"_"+month+"_"+day+"&contentmodel=wikitext&prop=wikitext&format=json"
	wiki_news_2="https://en.wikipedia.org/w/api.php?action=parse&page=Portal%3aCurrent_events/"+yesterday_year+"_"+yesterday_month+"_"+yesterday+"&contentmodel=wikitext&prop=wikitext&format=json"
	natural_disasters="https://api.sigimera.org/v1/crises?level=red&auth_token=zUbyCGBVs3Mra8J8TjtS" //G1g5PTC4P4hstvYf3ZRz
	natural_disasters_2="https://api.sigimera.org/v1/crises?level=orange&auth_token=G1g5PTC4P4hstvYf3ZRz" //zUbyCGBVs3Mra8J8TjtS
	disasters_url="https://en.wikinews.org/w/api.php?action=parse&page=Portal:Disasters_and_accidents&format=json"
	oil_spills="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_oil_spills&format=json"
	shipwrecks="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_shipwrecks_in_"+year+"&format=json&prop=wikitext"
	google_news_1="https://www.google.com/search?hl=en&gl=us&tbm=nws&authuser=0&q="
	google_news_2="&safe=off&hl=en&gl=us&authuser=0&tbm=nws&tbs=sbd:1&*"
	coup_attempts="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_coups_d%27état_and_coup_attempts_since_2010&contentmodel=wikitext&prop=wikitext&format=json"

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

		var list_deaths = function(day, location, today=false) {
			for (var i = 1; i < day.length; i++) {

				if (day[i].split(",")[2] == undefined) {
					var notability = ""
				}
				else {
					notability = day[i].split(",")[2].split(".")[0].split("(")[0]
					var nat = "unknown"
					nat = notability.split(" ")[1].split("-born")[0]
				};
				
				var person = day[i].split(",")[0].replace("{{ill|","").split("]]")[0].split("|")[0].replace(/\(([^)]+)\)/, "").replace(/\[/g, "")
				var url = "http" + day[i].split("http")[1].split(" ")[0]

				if (url.slice(-1)=="/") {url = url.slice(0, -1)};

				var date = window.day
				if (today) {date=month + " " + window.day};
				if (day==deaths_yesterday) {date=yesterday_month + " " + yesterday};
				if (day==deaths_third) {date=third_day_month + " " + third_day};

				country = demonymic[nat]

				var country = "unknown"
				for (var key in demonymic) { if (notability.includes(key)) {country = countryLetters[demonymic[key]]}; }
				for (var key in countryLetters) { if (notability.includes(key)) {country = countryLetters[key]}; }

				$(location).append("<div class='news_item'> <img src='flags/"+country+".png'> <br> <a target=_blank href=" + url + ">" + person + "</a> <br>" + notability + "<br>" + date + '</div>')

			    //add today to daily snapshot
			    if (today) {
			    	if (i==1) {
						$("#daily_snapshot").append("<div class='news-category' id='deaths1-div'><strong>Deaths: </strong><p>" + "<img src='flags/"+country+".png'>"  + notability + " <a target=_blank href=" + url + "> " + person + "&nbsp;&#10138</a></p></div>");
					}
					else {
						$("#deaths1-div").append("<p><strong></strong>" + " <img src='flags/"+country+".png'>" + notability + " <a target=_blank href=" + url + "> " + person + "&nbsp;&#10138</a></p>");
					};
				};

			    //add today to yesterday snapshot
			    if (date == yesterday_month + " " + yesterday) {
			    	if (i==1) {
						$("#yesterday_snapshot").append("<div class='news-category' id='deaths2-div'><strong>Deaths: </strong><p>" + " <img src='flags/"+country+".png'>"  + notability + " <a target=_blank href=" + url + "> " + person + "&nbsp;&#10138</a></p></div>");
					}
					else {
						$("#deaths2-div").append("<p><strong></strong>" + " <img src='flags/"+country+".png'>"  + notability + " <a target=_blank href=" + url + "> " + person + "&nbsp;&#10138</a></p>");
					};
				};

			};

		};

		list_deaths(deaths_today, "#notable_deaths", true)
		list_deaths(deaths_yesterday, "#notable_deaths")
		list_deaths(deaths_third, "#notable_deaths")

    }
});

// get relevant wikimedia news today
var getWikimediaNews = function(url, appendto, title, update){
	$.ajax({
	    url: url,
	    jsonp: "callback",
	    dataType: "jsonp",
	    success: function( data ) {

			var content = data["parse"]["wikitext"]["*"]

			if (content.split(title)[1] != undefined) {

				content = content.split(title)[1].split("\n\;")[0].split("All news items above this line")[0]
				items = content.split(")]\n")

				for (var i = 0; i < items.length-1; i++) {

					// find source url if possible
					if (items[i].split("[http")[1]!=undefined) {
						url="http" + items[i].split("[http")[1].split(" ")[0]
							if (url.slice(-1)=="/") {url = url.slice(0, -1)};
					};

					// define function for pulling human readable description
					var parse_wikimedia = function(text) {
						parsed = text.split("[http")[0].replace("*", "")
						parsed_array = parsed.split("|")
						double_def_array = []
						for (var i = 1; i < parsed_array.length; i++) {
							double_def_array.push(parsed_array[i].split("]]")[0])
						};
						for (var i = 0; i < double_def_array.length; i++) {
							parsed = parsed.replace(double_def_array[i] + "]]", "")
						};
						// return parsed.replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, "").split(/[a-z]\. [A-Z]/g)[0].split(/[a-z]\." [A-Z][a-z]/g)[0] + " "
						return parsed.replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, "").split(/\. [A-Z]/g)[0].split(/\." [A-Z][a-z]/g)[0] + ". "
					}

					// make sure longest description is shown
					var description = parse_wikimedia(items[i].split("**")[0])
					if(items[i].split("**")[1]!=undefined){ description = parse_wikimedia(items[i].split("**")[1]) };
					if(items[i].split("***")[1]!=undefined){ description = parse_wikimedia(items[i].split("***")[1]) };

					// find appropriate flag
					var country = "unknown"
					for (var key in demonymic) { if (description.includes(key)) {country = countryLetters[demonymic[key]]}; }
					for (var key in countryLetters) { if (description.includes(key)) {country = countryLetters[key]}; }

					// append to daily events list
			    	if (i==0) {
						if (description != " " && description != "" && description != "  ") {
							$(appendto).append(update + "<p> <img src='flags/"+country+".png'>" + description+"<a target='_blank' href="+url+">Story&nbsp;&#10138;</a></p></div>")
						};
					}
					else {
						if (description != " " && description != "" && description != "  ") {
							$(appendto).append("<p> <img src='flags/"+country+".png'>" + description+" <a target='_blank' href="+url+">Story&nbsp;&#10138;</a></p>")
						};
					};
				};
			};
	    }
	});
};

getWikimediaNews(wiki_news, "#daily_snapshot", "Politics and elections\n", "<strong>Politics Update: </strong><br>")
getWikimediaNews(wiki_news, "#daily_snapshot", "Disasters and accidents\n", "<strong>Disasters Update: </strong><br>")
getWikimediaNews(wiki_news, "#daily_snapshot", "Armed conflicts and attacks\n", "<strong>Conflicts Update: </strong><br>")
getWikimediaNews(wiki_news, "#daily_snapshot", "International relations\n", "<strong>Geopolitics Update: </strong><br>")

// get relevant wikimedia news from yesterday
getWikimediaNews(wiki_news_2, "#yesterday_snapshot", "Politics and elections\n", "<strong>Politics Update: </strong><br>")
getWikimediaNews(wiki_news_2, "#yesterday_snapshot", "Disasters and accidents\n", "<strong>Disasters Update: </strong><br>")
getWikimediaNews(wiki_news_2, "#yesterday_snapshot", "Armed conflicts and attacks\n", "<strong>Conflicts Update: </strong><br>")
getWikimediaNews(wiki_news_2, "#yesterday_snapshot", "International relations\n", "<strong>Geopolitics Update: </strong><br>")


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
	  	  var country = thing[4].slice(0,-3).split("}}")[0]
	  	  if (countryLetters[country]==undefined) {country="Unknown"};
	  	  var died = thing[5]
	  	  	if (isNaN(parseInt(died))) {died=thing[4].split('{{')[0]};
		  var url = "https://en.wikipedia.org/wiki/" + name.replace(/ /g, "_")

		  $("#ongoing_protests").append("<div class='news_item'> <img src='flags/"+countryLetters[country]+".png'> <a target='_blank' href=" + url + "><br>" + title + "</a> <br> SINCE: " + date + " <br>DEAD: " + died + "<br><a target='_blank' href=" + google_news_1 + title.replace(/ /g, "+") + google_news_2 + "> news&nbsp;&#10138; </a> </div>" );

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

    try {

	  var listvar = data["parse"]["wikitext"]["*"]
	  listvar = listvar.split('==10,000 or more deaths in current or past year==');
	  listvar = listvar[1].split('==Deaths by country==')[0]
	  listvar = listvar.split('align=center');

	}
	catch(err) {
    		console.log(err.message);
	}

	  var getinfo = function(line){
	  	for (var i = 1; i < line.length; i++) {
	  	  var thing=line[i].split("|");

	  	  if (thing[2]==" ") { thing[2]=thing[3] };

	  	  if (thing[2]=="") {
		  	  thing[2]=thing[2].replace('[[','').replace(']]','').split("*")[0]
	  	  };

	  	  death_toll=line[i].split("ntsh")
	  	  if (death_toll[1]!=undefined) {
	  	  	death_toll=death_toll[1].split("}}")[1].split("{{")[0].split("ref")
	  	  	death_toll=death_toll[0].slice(1).replace('[[','').replace(']]','').replace('|','').replace(/[^0-9, \-, +, \u2013|\u2014]+/g, '')
	  	  	var title = thing[2].replace(/[0-9]/g, '').replace(/\(([^()]+)\)/g, "").replace(/[^a-zA-Z\s\-\u2013|\u2014]/g, '').split("--")[0]
	  	  	var name = thing[2].replace("]]", "").replace("[[", "")
	  	  	var since = thing[1]
	  	  	var died = death_toll.split("--")[0]
	  	  	var url = "https://en.wikipedia.org/wiki/" + name.slice(1).replace(/ /g, "_").split("_<!")[0]
		  };

		  var country = "unknown"
		  for (var key in demonymic) { if (title.includes(key)) {country = countryLetters[demonymic[key]]}; }
		  for (var key in countryLetters) { if (title.includes(key)) {country = countryLetters[key]}; }


		  $("#ongoing_wars").append( "<div class='news_item'> <img src='flags/"+country+".png'> <br> <a target='_blank' href=" + url + ">" + title + "</a> <br>" + "SINCE:" + since + "<br>" + "DEAD: " + died + "<br> <a target='_blank' href=" + google_news_1 + title.replace(/ /g, "+").slice(0, -1) + google_news_2 + "> news&nbsp;&#10138; </a> </div>" );

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

		attacks = data["parse"]["wikitext"]["*"].split('== '+window.last_month+' ==')[0].split("|-")

		var last_date = attacks[attacks.length-1].split("|")[1]

		for (var i = attacks.length-1; i > 2; i--) {
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
			    if (perpetrator=="01" || perpetrator==03) {perpetrator = "unknown perpetrator"};
			var conflict = context[context.length-1].split("|")
			    conflict = conflict[conflict.length-1].slice(0,-3)

			var attack = attacks[i].split("|")
			var date = attack[1]
			var type = attack[2]
			var dead = attack[4]

			if (attacks[i].split("]], ")[1] != undefined) {
				full_where = attacks[i].split("]], ")[1].split("|")[0]
			}
			else {
				full_where = "unknown"
			}

			// var description = attack[9].split('{{')[0].replace(/\[/g, "").replace(/\]/g, "").split("http")[0]
			var display2 = false

			var now = new Date().toLocaleString().split("/")[1]
			var month = new Date().getMonth();

			if (date > yesterday-7+window.day) {
		    	$("#terrorist_attacks").append("<div class='news_item'> <img src='flags/"+countryLetters[full_where]+".png'><br> <a target='_blank' href=" + source + ">" + type + "</a><br>WHEN: " + window.last_month + " " + date + "<br> WHERE: " + full_where + "<br>DEAD: " + dead + "<br>PERPETRATOR: " + perpetrator + "</div>" );
		    };

			if (date == yesterday) {
				display2 = true
				$("#terrorlist2-div").append("<p><img src='flags/"+countryLetters[full_where]+".png'>" + perpetrator + " behind <a target='_blank' href=" + source + ">" + type + "&nbsp;&#10138;</a> in " + full_where + ", " + dead + "confirmed dead </p>")
		    };
			
			if (display2) {$("#terrorlist2").css({"display":"inherit"})};

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

    	$("#daily_snapshot").append("<div class='news-category' id='terrorlist1-div'><strong id='terrorlist1'>Terrorist Attacks: </strong></div>")
    	$("#yesterday_snapshot").append("<div class='news-category' id='terrorlist2-div'><strong id='terrorlist2'>Terrorist Attacks: </strong></div>")

		attacks = data["parse"]["wikitext"]["*"].split('== '+window.month+' ==')[0].split("|-")

		for (var i = attacks.length-1; i > 2; i--) {
				
			var source=attacks[i].split("http")[1]
			if (source!=null) { 
				source = source.split("|")[0]
				source = source.replace("</ref", "").replace("<ref", "").replace(" ", "").replace(">", "").replace(/\{\{citeweb/, "").replace(/\>/, "")
				if (source.slice(-1)=="/") {source = source.slice(0, -1)};
				source = 'http' + source
			};

			var context = attacks[i].split("[[")

			// prevent failure errors with unless
			unless(context[context.length-2]==undefined, function() {

				var perpetrator = context[context.length-2].split("]]")[0].split("|")
				    perpetrator = perpetrator[perpetrator.length-1]
				    if (perpetrator=="01" || perpetrator=="03") {perpetrator = "unknown perpetrator"};
				var conflict = context[context.length-1].split("|")
				    conflict = conflict[conflict.length-1].slice(0,-3)

				var attack = attacks[i].split("|")
				var date = attack[1]
				var type = attack[2]
				var dead = attack[4]

				if (attacks[i].split("]], ")[1] != undefined) {
					full_where = attacks[i].split("]], ")[1].split("|")[0].slice(0, -1)
				}
				else {
					full_where = "unknown"
				}

				// var description = attack[9].split('{{')[0].replace(/\[/g, "").replace(/\]/g, "").split("http")[0]

				var now = new Date().toLocaleString().split("/")[1]
				var month = new Date().getMonth();

				var display1 = false
				var display2 = false

				if (now-date < 8) {
			    	$("#terrorist_attacks").append("<div class='news_item'> <img src='flags/"+countryLetters[full_where]+".png'><br> <a target='_blank' href=" + source + ">" + type + "</a><br>WHEN: " + window.month + " " + date + "<br> WHERE: " + full_where + "<br>DEAD: " + dead + "<br>PERPETRATOR: " + perpetrator + "</div>" );

			    	//add today to daily snapshot

					if (date==window.day) {
						display1 = true
						$("#terrorlist1-div").append("<p><img src='flags/"+countryLetters[full_where]+".png'>" + perpetrator + " behind <a target='_blank' href=" + source + ">" + type + "&nbsp;&#10138;</a> in " + full_where + ", " + dead + "confirmed dead </p>")
					};

					if (date==yesterday) {
						display2 = true
						$("#terrorlist2-div").append("<p><img src='flags/"+countryLetters[full_where]+".png'>" + perpetrator + " behind <a target='_blank' href=" + source + ">" + type + "&nbsp;&#10138;</a> in " + full_where + ", " + dead + "confirmed dead </p>")
					};

			    };

			    if (display1) {$("#terrorlist1").css({"display":"inherit"})};
			    if (display2) {$("#terrorlist2").css({"display":"inherit"})};
			})
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
		heads = heads[heads.length-1].split("== List of upcoming leaders ==")[0].split("<!--")[0].split('|-')

		heads_of_state_array = []

		for (var i = 2; i < heads.length; i++) {
			var section = heads[i].replace(/\{\{small\|/g, "").split("|")

			if (section[2]!=undefined) {
				if (section[2].replace(/\[/g, "").replace(/\]/g, "").replace(/\}/g, "")=="{{flag") {section.shift(); section.unshift(heads[i-1].split("|")[2]); section.unshift("")};
				if (section[1]=='rowspan="2" ') {section.shift()};

				var date = section[1].replace(/[^0-9 ]/g, "")
				var month = section[1].replace(/[0-9 ]/g, "").slice(0,-1)
		
				if (section[2]=='rowspan="2" ') {section.shift();};
				if (section[2].split("{{")[1]!=undefined) {continue};

				if (section[2].split('[[')[1] != undefined) {
					who = section[2].split('[[')[1].split(']]')[0]
				}

				if (section[5]!=undefined) {var what = section[5].replace(/[^a-zA-Z \-]/g, "")
				var country = section[4].slice(0,-3).replace("}}", "").split("{")[0]};
				if (section.length>6) {
					var title = section[6].split("]]")[0].replace(/\[/g, "")
				};

				if (who=="Emmanuel Macron") {title = "President"; country="France"};
				if (who=="Enrico Carattoni") {title = "Captain Regent"; country="San Marino"};
				if (who=="Riad Seif") {title = "President"; country="The Syrian Resistance"};
				if (who=="Bjarni Benediktsson (born 1970)") {title = "Prime Minister"; country="Iceland"};

				var url = "https://en.wikipedia.org/wiki/" + who.replace(/ /g, "_")

				heads_of_state_array.unshift( "<div class='news_item'> <img src='flags/"+countryLetters[country]+".png'> <br> <a target=_blank href=" + url + ">" + who + "</a><br>" + title + " of " + country + "<br>SINCE: " + month + " " + date + "</div>" )

		    	//add today to daily snapshot
				if ((month==window.month)||(month==window.last_month&&date>day)) {
					if (date==window.day) {$("#daily_snapshot").append("<strong>New " + title + ":</strong> <p> <img src='flags/"+countryLetters[country]+".png'> <a target=_blank href=" + url + ">" + who + "</a> has assumed the office of " + title + " of " + country + "</p>")};
					if (date==yesterday) {$("#yesterday_snapshot").append("<strong>New " + title + ":</strong> <p> <img src='flags/"+countryLetters[country]+".png'> <a target=_blank href=" + url + ">" + who + "</a> has assumed the office of " + title + " of " + country + "</p>")};
			    };
		    };
		};

		for (var i = 1; i < heads_of_state_array.length; i++) {
			$("#new_heads").append(heads_of_state_array[i]);
		};
    }
});

//get recent shipwrecks
$.ajax({
    url: shipwrecks,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {
		var wrecks = data["parse"]["wikitext"]["*"].split("<!--Template for copying, insert new entries above.")[0].split(/\n\n===/g)
    	
    	var wrecks_array = []

    	for (var i = 1; i < wrecks.length; i++) {
	 		var all = wrecks[i].split("{{shipwreck list item")
	 		 for (var j = 1; j < all.length; j++) {
    			var wreck = all[j]
	    		var date = wrecks[i].split("| ")[0].split("===")[0]
	    		var url = ""
	    		var country = wreck.split("|desc=")[0].split("|flag=")[1].split("|")[1].slice(0,-3)
	    		if (wreck.split("http")[1] != undefined) { url = "http" + wreck.split("http")[1].split(" ")[0].split("|")[0]};
	    		
	    		if (wreck.split("|title=")[1] != undefined) {
	    			var headline = wreck.split("|desc=")[1].split("{{cite web")[0].replace(/\[/g, "").replace(/\]/g, "").split("\. [A-Z]")[0].replace(/\{([^)]+)\}/g, "").split("{")[0].replace("|", "/").replace(")", "").replace("The", "A")
	    			
	    			if (new Date(date + ", " + window.year).setHours(0,0,0,0) == today.setHours(0,0,0,0)) {$('#daily_snapshot').append("<strong>" + country + " Shipwreck:</strong>  <p><img src=flags/"+countryLetters[country]+".png>" + headline + "<a href='" + url +"'> Story&nbsp;&#10138</a></p>")};
	    			if (new Date(date + ", " + window.year).setHours(0,0,0,0) == new Date(today + ", " + window.year).setHours(0,0,0,0) - 1 ) {$('#yesterday_snapshot').append("<strong>" + country + " Shipwreck:</strong>  <p><img src=flags/"+countryLetters[country]+".png>" + headline + "<a href='" + url +"'> Story&nbsp;&#10138</a></p>")};
	    		};

				wrecks_array.unshift("<br><p>" + "<img src=flags/"+countryLetters[country]+".png>" + "<strong>" + date + ", " + country + "</strong><br>" + headline + "<a target='_blank' href='" + url +"'> Story&nbsp;&#10138</a></p>")
	 		};
    	};

    	for (var i = 0; i < wrecks_array.length; i++) {
    		$('#recent_shipwrecks').append(wrecks_array[i])
    	};

    }
});

// get oil spills
$.ajax({
    url: oil_spills,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {
		var spills = data["parse"]["text"]["*"].split("section: Underway")[1].split("Complete</span>")[0].split('<tr>')

		for (var i = 2; i < spills.length; i++) {
			var spill = spills[i]
			var title = spill.split('title="')[1].split('"')[0]
			var location = spill.split('<td align="left">')[2].split("</td>")[0].split("<br")[0].replace("<p>", "").replace("</p>", "").replace(/href=\"/g, "target='_blank' href=\"https://en.wikipedia.org")
			var note = spill.split('<td')
			
			note = note[note.length-1].split("</td>")[0].replace(/\(([^)]+)\)/g, "").replace(" , ", ", ").replace(/href=\"/g, "target='_blank' href=\"https://en.wikipedia.org")
			if (note[0]==">") {note = note.replace(">", "")};

			if (note.split('"left">')[1] != undefined) {
				note = note.split('"left">')[1]
			};

			url = "https://en.wikipedia.org" + spill.split("href")[1].split('"')[1].split('"')[0]

			$('#ongoing_oil_spills').append( "<br><p> <a href=" + url + " target='_blank'><strong>" + title + "</strong></a><br>" + location + "<br>" + note + "</p>" )
		};
    }
});

// coup attempts
$.ajax({
    url: coup_attempts,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {
		var coups = data["parse"]["wikitext"]["*"].split("Coups d'\u00e9tat and coup attempts since 2010")[1].split("\n==See also==\n")[0].split("\n|- ")
	
		for (var i = 2; i < coups.length-1; i++) {
			var coup = coups[i].split("\n|")[1]
			var title = coup.split("||")[0]
			var date = coup.split("||")[1].split("}}")[0].replace("{{nowrap|", "")
			var year = title.split(" ")[1].replace("[[", "")
			var url = coup.split("url=")[1]
			
			unless(url==undefined, function(){url=url.split("|")[0]});

			link = "<a target='_blank' href='" + url + "'>Story&nbsp;&#10138;</a>"

			if (url==undefined) {link = ""};

			// var endDate = date
			// if (date.split(" – ")[1] != undefined) {
			// 	endDate = date.split(" – ")[1]
			// };

			var country = coup.split("||")[3].split("[[")[1].split("]]")[0]
			var status = coup.split("||")[2]

			if (coup.split("http")[1]!=undefined) {
				var url = "http" + coup.split("http")[1].split("|")[0]
			};
			
			// if (status == " Ongoing ") {
			// 	$('#daily_snapshot').prepend("<br><strong>Coup: </strong><p><img src=flags/"+countryLetters[country]+".png>" + status + " in " + country + " since " + year + ", " + date + link +"</p>")
			// };

		}; 
    }
});


//show and hide info
var showandhide = function(btn="#", div, other="#"){
	$(btn).click(function(){
		$(".inner").css({"display":"none"})
		$(div).css({"display":"inline-block"})
		$(div + "> div ").css({"display":"inline-block"})
		$(other).css({"display":"inline-block"})
		$("button").children().css({"text-decoration":"none"})
		$(btn).children().css({"text-decoration":"underline"})
		$("#ongoing_sub_menu *").removeClass("show")
		$("#recent_sub_menu *").removeClass("show")
		
		// change url
		translation = {".button_two":"wars", ".button_one":"protests", ".button_six":"disasters", ".button_three":"attacks", ".button_five":"deaths", ".button_four":"heads", ".button_seven":"conflictnews", ".about_button":"about", ".button_zero":"brief", ".spills_button":"spills", ".wrecks_button":"wrecks"}
		window.location.href = window.location.href.split("/")[0] + "#" + translation[btn]

	});

	// use url to determine proper div to show
	parameters = window.location.href.split("/");
	parameters = parameters[parameters.length-1].replace("#", "");
	translation = {"wars":".button_two", "protests":".button_one", "disasters":".button_six", "attacks":".button_three", "deaths":".button_five", "heads":".button_four", "conflictnews":".button_seven", "about":".about_button", "spills":".spills_button", "wrecks":".wrecks_button"}
	$(translation[parameters]).trigger('click');

};

showandhide(".button_zero", "#snapshots")

showandhide('.about_button', "#about_this")

showandhide('.button_one', "#ongoing_protests")

showandhide('.button_two', "#ongoing_wars")

showandhide('.button_three', "#terrorist_attacks", "#terrorist_attacks_2")

showandhide('.button_four', "#new_heads")

showandhide('.button_five', "#notable_deaths")

showandhide('.button_six', "#natural_disasters")

showandhide('.button_seven', "#conflict_updates")

showandhide('.spills_button', "#ongoing_oil_spills")

showandhide('.wrecks_button', "#recent_shipwrecks")

// // make navbar stick to top
// $(window).scroll(function () {
// 	if ($(window).scrollTop() > 184) {
// 		$('.navbar').addClass('navbar-fixed');
// 		// $('#today-title').css({"padding-bottom":"65px"})
// 		$('#ongoing').css({"padding-top":"44px"})
// 	}
// 	if ($(window).scrollTop() < 184) {
// 		$('.navbar').removeClass('navbar-fixed');
// 		// $('#today-title').css({"margin-bottom":"20px"})
// 		$('#ongoing').css({"padding-top":"0px"})
// 	}
// });

// bookmark this page

// $(function() {
//   $('#bookmarkme').click(function() {
//     if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
//       window.sidebar.addPanel(document.title, window.location.href, '');
//     } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
//       window.external.AddFavorite(location.href, document.title);
//     } else if (window.opera && window.print) { // Opera Hotlist
//       this.title = document.title;
//       return true;
//     } else { // webkit - safari/chrome
//       alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
//     }
//   });
// });

// // PARALLAX
// $(window).scroll(function () {
// 	if ($(window).width() > 790) {
// 		position = ($(this).scrollTop() / 2)-135
// 	    $("header").css("background-position","50% " + position + "px");
// 	};
// });

// show/hide subnavigation
var showSubNav = function(button, other, sub) {
	button.click(function(){
		$(sub+" *").toggleClass("show")
		$(other+" *").removeClass("show")
	});
};

showSubNav($("#ongoing_button"), "#recent_sub_menu", "#ongoing_sub_menu")
showSubNav($("#recent_button"), "#ongoing_sub_menu", "#recent_sub_menu")

}); //end of script


// get disasters data from rss feed
request = "http://www.gdacs.org/xml/rss_7d.xml"
var yqlURL = [
    "http://query.yahooapis.com/v1/public/yql",
    "?q=" + encodeURIComponent("select * from xml where url='" + request + "'"),
    "&format=xml&callback=?"
].join("");
	$.getJSON(yqlURL, function(data){
    xmlContent = $(data.results[0]);
    var Abstract = $(xmlContent).find("channel").html();
    var output = Abstract.split("<item>")
    for (var i = 1; i < output.length; i++) {
    	var item = output[i]
    	var alertlevel = item.split("<gdacs:alertlevel>")[1].split("</gdacs:alertlevel>")[0]
    	var description = item.split("<description>")[1].split("</description>")[0]
    	var toDate = new Date(item.split("<gdacs:todate>")[1].split("</gdacs:todate>")[0])
    	var fromDate = new Date(item.split("<gdacs:fromdate>")[1].split("</gdacs:fromdate>")[0])
    	var dates = description.split(", ")[0]
    	var title = item.split("<title>")[1].split("</title>")[0].split("(")[0].split(". ")[0]
    	var image = item.split("<enclosure")[1].split("</enclosure>")[0].split("url=\"")[1].split("\"")[0]
    	var url = item.split("<link>")[1].split("<")[0]

    	var country = item.split("<gdacs:country>")[1].split("</gdacs:country>")[0]
    	if (country=="" || country==null) {country="unspecified country"};


		$('#natural_disasters').append("<div class='news_item' style=border-color:"+alertlevel+"> <img src='flags/"+countryLetters[country]+".png'> " + dates + " <strong> <br>" + title + " in " + country  + "</strong> " + "<img src='" + image + "'>" + " <br><a target=_blank href="+ url + "> Info&nbsp;&#10138 </a> </div>")

	    if (alertlevel!="Green" && alertlevel!="White") {
	    	if (toDate.setHours(0,0,0,0)==today.setHours(0,0,0,0)) {$('#daily_snapshot').append("<strong> Code <span style=color:"+alertlevel+">"+ alertlevel +"</span> alert: </strong> <br> <p> <img src='flags/"+countryLetters[country]+".png'> " + description+ "<a target=_blank href="+ url + "> Info&nbsp;&#10138 </a> </p>")};
	    	if ((fromDate.setHours(0,0,0,0) < today.setHours(0,0,0,0)-1) && (toDate.setHours(0,0,0,0) > today.setHours(0,0,0,0)-1)) {$('#yesterday_snapshot').append("<strong> Code <span style=color:"+alertlevel+">"+ alertlevel +"</span> alert: </strong> <br> <p> <img src='flags/"+countryLetters[country]+".png'>" + description+ "<a target=_blank href="+ url + "> Info&nbsp;&#10138 </a> </p>")};
	    };
    };
})

// get conflicts updates from rss feed
request = "https://twitrss.me/twitter_user_to_rss/?user=Conflicts"
var yqlURL = [
    "http://query.yahooapis.com/v1/public/yql",
    "?q=" + encodeURIComponent("select * from xml where url='" + request + "'"),
    "&format=xml&callback=?"
].join("");
	$.getJSON(yqlURL, function(data){
    xmlContent = $(data.results[0]);
    var Abstract = $(xmlContent).find("channel").html();
    var output = Abstract.split("<item>")
	for (var i = 2; i < output.length; i++) {

    	var item = output[i]

    	var date = new Date(item.split("<pubdate>")[1].split("</pubdate>")[0])

    	var title = item.split("<title>")[1].split("</title>")[0].split("(")[0].split(". ")[0].split(": ")[1]
    	if (title != undefined) { 
    		title = title.split(" - @")[0].split("http")[0] 
    	};

    	var country = findCountry(item)

    	var url = item.split("<link>")[1].split("<")[0]

		$('#conflict_updates').append("<strong><p><img src='flags/"+country+".png'>" + date.toLocaleString() + "</strong><br>" + title+ "<a target=_blank href="+ url + "> Info&nbsp;&#10138 </a> </p><br>")

    };
})
