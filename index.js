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
// x = "Abkhazia,Abkhaz,Abkhazia,Abkhazian,Afghanistan,Afghan,Aland Islands,Aland Island,Albania,Albanian,Algeria,Algerian,American Samoa,American Samoan,Andorra,Andorran,Angola,Angolan,Anguilla,Anguillan,Antarctica,Antarctic,Antigua And Barbuda,Antiguan,Antigua And Barbuda,Barbudan,Argentina,Argentine,Armenia,Armenian,Aruba,Aruban,Australia,Australian,Austria,Austrian,Azerbaijan,Azerbaijani,Azerbaijan ,Azeri,Bahamas,Bahamian,Bahrain,Bahraini,Bangladesh,Bangladeshi,Barbados,Barbadian,Belarus,Belarusian,Belgium,Belgian,Belize,Belizean,Benin,Beninese,Benin ,Beninois,Benin ,Beninoises,Bermuda,Bermudian,Bermuda ,Bermudan,Bhutan,Bhutanese,Bolivia,Bolivian,Bonaire,Bonaire,Bosnia And Herzegovina,Bosnian,Bosnia And Herzegovina,Herzegovinian,Botswana,Motswana,Botswana,Botswanan,Bouvet Island,Bouvet Island,Brazil,Brazilian,British Indian Ocean Territory,BIOT,Brunei,Bruneian,Bulgaria,Bulgarian,Burkina Faso,Burkinabé,Burma,Burmese,Burundi,Burundian,Cabo Verde,Cabo Verdean,Cambodia,Cambodian,Cameroon,Cameroonian,Canada,Canadian,Cayman Islands,Caymanian,Central African Republic,Central African,Chad,Chadian,Chile,Chilean,China,Chinese,Christmas Island,Christmas Island,Cocos (Keeling) Islands,Cocos Island,Colombia,Colombian,Comoros,Comoran,Comoros ,Comorian,Congo- Democratic Republic,Congolese,Cook Islands,Cook Island,Costa Rica,Costa Rican,Cote D'Ivoire,Ivorian,Croatia,Croatian,Cuba,Cuban,Curacao,Curacaoan,Cyprus,Cypriot,Czech Republic,Czech,Denmark,Danish,Djibouti,Djiboutian,Dominica,Dominican,Dominican Republic,Dominican,East Timor,Timorese,Ecuador,Ecuadorian,Egypt,Egyptian,El Salvador,Salvadoran,United Kingdom,British,United Kingdom,UK,United Kingdom,English,Equatorial Guinea,Equatorial Guinean,Equatorial Guinea,Equatoguinean,Eritrea,Eritrean,Estonia,Estonian,Ethiopia,Ethiopian,European Union,European,Falkland Islands,Falkland Island,Faroe Islands,Faroese,Fiji,Fijian,Finland,Finnish,France,French,French Guiana,French Guianese,French Polynesia,French Polynesian,French Southern Territories,French Southern Territories,Gabon,Gabonese,Gambia,Gambian,Georgia,Georgian,Germany,German,Ghana,Ghanaian,Gibraltar,Gibraltar,Greece,Greek- Hellenic,Greenland,Greenlandic,Grenada,Grenadian,Guadeloupe,Guadeloupe,Guam,Guamanian,Guam,Guambat,Guatemala,Guatemalan,Guernsey,Channel Island,Guinea,Guinean,Guinea-Bissau,Bissau-Guinean,Guyana,Guyanese,Haiti,Haitian,Heard Island & McDonald Islands,Heard Island,Heard Island & McDonald Islands,McDonald Island,Honduras,Honduran,Hong Kong,Hong Kongese,Hungary,Hungarian,Iceland,Magyar,Iceland,Icelandic,India,Indian,Indonesia,Indonesian,Iran,Iranian,Iran,Persian,Iraq,Iraqi,Ireland,Irish,Isle of Man,Manx,Israel,Israeli,Italy,Italian,Ivory Coast,Ivorian,Jamaica,Jamaican,Jan Mayen,Jan Mayen,Japan,Japanese,Jersey,Channel Island,Jordan,Jordanian,Kazakhstan,Kazakhstani,Kazakhstan ,Kazakh,Kenya,Kenyan,Kiribati,I-Kiribati,North Korea,North Korean,South Korea,South Korean,Kosovo,Kosovar,Kosovo ,Kosovan,Kosovo,Kosovars,Kuwait,Kuwaiti,Kyrgyzstan,Kyrgyzstani,Kyrgyzstan ,Kyrgyz,Kyrgyzstan ,Kirgiz,Kyrgyzstan ,Kirghiz,Laos,Lao,Laos ,Laotian,Latvia,Latvian,Latvia ,Lettish,Lebanon,Lebanese,Lesotho,Basotho,Liberia,Liberian,Libya,Libyan,Liechtenstein,Liechtensteiner,Lithuania,Lithuanian,Luxembourg,Luxembourg,Luxembourg ,Luxembourgish,Macau,Macanese,Macau ,Chinese,Macedonia,Macedonian,Madagascar,Malagasy,Malawi,Malawian,Malaysia,Malaysian,Maldives,Maldivian,Mali,Malian,Mali ,Malinese,Malta,Maltese,Marshall Islands,Marshallese,Martinique,Martiniquais,Martinique ,Martinican,Mauritania,Mauritanian,Mauritius,Mauritian,Mayotte,Mahoran,Mexico,Mexican,Micronesia- Federated States of,Micronesian,Moldova,Moldovan,Monaco,Monégasque,Monaco ,Monacan,Mongolia,Mongolian,Montenegro,Montenegrin,Montserrat,Montserratian,Morocco,Moroccan,Mozambique,Mozambican,Myanmar,Burmese,Namibia,Namibian,Nauru,Nauruan,Nepal,Nepali,Nepal ,Nepalese,Netherlands,Dutch,Netherlands ,Netherlandic,New Caledonia,New Caledonian,New Zealand,New Zealand,Nicaragua,Nicaraguan,Niger,Nigerien,Nigeria,Nigerian,Niue,Niuean,Norfolk Island,Norfolk Island,Northern Ireland,Northern Irish,Ireland,Irish,Northern Mariana Islands,Northern Marianan,Norway,Norwegian,Oman,Omani,Pakistan,Pakistani,Palau,Palauan,Palestine,Palestinian,Panama,Panamanian,Papua New Guinea,Papua New Guinean,Papua New Guinea,Papuan,Paraguay,Paraguayan,Peru,Peruvian,Philippines,Filipino,Philippines,Philippine,Pitcairn Islands,Pitcairn Island,Poland,Polish,Portugal,Portuguese,Puerto Rico,Puerto Rican,Qatar,Qatari,Reunion,Reunionese,Reunion ,Reunionnais,Romania,Romanian,Russia,Russian,Rwanda,Rwandan,Saba,Saba,Saint Barthelemy,Barthelemois,Saint Helena,Saint Helenian,Saint Kitts and Nevis,Kittitian or Nevisian,Saint Lucia,Saint Lucian,Saint Martin,Saint-Martinoise,Saint Pierre And Miquelon,Saint-Pierrais,Saint Pierre And Miquelon,Miquelonnais,Saint Vincent And Grenadines,Saint Vincentian,Saint Vincent And Grenadines,Vincentian,Samoa,Samoan,San Marino,Sammarinese,Sao Tome and Príncipe,Sao Tomean,Saudi Arabia,Saudi,Saudi Arabia,Saudi Arabian,Scotland,Scottish,Senegal,Senegalese,Serbia,Serbian,Seychelles,Seychellois,Sierra Leone,Sierra Leonean,Singapore,Singapore,Singapore ,Singaporean,Sint Eustatius,Sint Eustatius,Sint Eustatius,Statian,Sint Maarten,Sint Maarten,Slovakia,Slovak,Slovenia,Slovenian,Slovenia,Slovene,Solomon Islands,Solomon Island,Somalia,Somali,Somaliland,Somalilander,South Africa,South African,South Georgia And Sandwich Isl.,South Georgian,South Georgia And Sandwich Isl.,South Sandwich Island,South Sudan,South Sudanese,Spain,Spanish,Sri Lanka,Sri Lankan,Sudan,Sudanese,Surinam,Surinamese,Svalbard,Svalbard,Swaziland,Swazi,Sweden,Swedish,Switzerland,Swiss,Syria,Syrian,Tajikistan,Tajikistani,Tanzania,Tanzanian,Thailand,Thai,Timor-Leste,Timorese,Togo,Togolese,Tokelau,Tokelauan,Tonga,Tongan,Trinidad And Tobago,Trinidadian,Trinidad And Tobago,Tobagonian,Tunisia,Tunisian,Turkey,Turkish,Turkmenistan,Turkmen,Turks And Caicos Islands,Turks and Caicos Island,Tuvalu,Tuvaluan,Uganda,Ugandan,Ukraine,Ukrainian,United Arab Emirates,Emirati,United Arab Emirates,Emirian,United Arab Emirates,Emiri,United States,American,Uruguay,Uruguayan,Uzbekistan,Uzbekistani,Uzbekistan ,Uzbek,Vanuatu,Ni-Vanuatu,Vanuatu ,Vanuatuan,Vatican City State,Vatican,Venezuela,Venezuelan,Vietnam,Vietnamese,Virgin Islands- British,British Virgin Island,Virgin Islands- United States,U.S. Virgin Island,Wales,Welsh,Wallis And Futuna,Wallis and Futuna,Wallis And Futuna,Wallisian,Wallis And Futuna,Futunan,Western Sahara,Sahrawi,Western Sahara,Sahrawian,Western Sahara,Sahraouian,Yemen,Yemeni,Zambia,Zambian,Zimbabwe,Zimbabwean"

// x = x.split(",")

// for (var i = 0; i < x.length; i+=2) {
// 	$("#daily_snapshot").prepend('"'+x[i+1]+'" : "'+x[i]+'", ')
// };

var demonymic = {"Zimbabwean" : "Zimbabwe", "Zambian" : "Zambia", "Yemeni" : "Yemen", "Sahraouian" : "Western Sahara", "Sahrawian" : "Western Sahara", "Sahrawi" : "Western Sahara", "Futunan" : "Wallis And Futuna", "Wallisian" : "Wallis And Futuna", "Wallis and Futuna" : "Wallis And Futuna", "Welsh" : "Wales", "U.S. Virgin Island" : "Virgin Islands- United States", "British Virgin Island" : "Virgin Islands- British", "Vietnamese" : "Vietnam", "Venezuelan" : "Venezuela", "Vatican" : "Vatican City State", "Vanuatuan" : "Vanuatu ", "Ni-Vanuatu" : "Vanuatu", "Uzbek" : "Uzbekistan ", "Uzbekistani" : "Uzbekistan", "Uruguayan" : "Uruguay", "American" : "United States", "Emiri" : "United Arab Emirates", "Emirian" : "United Arab Emirates", "Emirati" : "United Arab Emirates", "Ukrainian" : "Ukraine", "Ugandan" : "Uganda", "Tuvaluan" : "Tuvalu", "Turks and Caicos Island" : "Turks And Caicos Islands", "Turkmen" : "Turkmenistan", "Turkish" : "Turkey", "Tunisian" : "Tunisia", "Tobagonian" : "Trinidad And Tobago", "Trinidadian" : "Trinidad And Tobago", "Tongan" : "Tonga", "Tokelauan" : "Tokelau", "Togolese" : "Togo", "Timorese" : "Timor-Leste", "Thai" : "Thailand", "Tanzanian" : "Tanzania", "Tajikistani" : "Tajikistan", "Syrian" : "Syria", "Swiss" : "Switzerland", "Swedish" : "Sweden", "Swazi" : "Swaziland", "Svalbard" : "Svalbard", "Surinamese" : "Surinam", "Sudanese" : "Sudan", "Sri Lankan" : "Sri Lanka", "Spanish" : "Spain", "South Sudanese" : "South Sudan", "South Sandwich Island" : "South Georgia And Sandwich Isl.", "South Georgian" : "South Georgia And Sandwich Isl.", "South African" : "South Africa", "Somalilander" : "Somaliland", "Somali" : "Somalia", "Solomon Island" : "Solomon Islands", "Slovene" : "Slovenia", "Slovenian" : "Slovenia", "Slovak" : "Slovakia", "Sint Maarten" : "Sint Maarten", "Statian" : "Sint Eustatius", "Sint Eustatius" : "Sint Eustatius", "Singaporean" : "Singapore ", "Singapore" : "Singapore", "Sierra Leonean" : "Sierra Leone", "Seychellois" : "Seychelles", "Serbian" : "Serbia", "Senegalese" : "Senegal", "Scottish" : "Scotland", "Saudi Arabian" : "Saudi Arabia", "Saudi" : "Saudi Arabia", "Sao Tomean" : "Sao Tome and Príncipe", "Sammarinese" : "San Marino", "Samoan" : "Samoa", "Vincentian" : "Saint Vincent And Grenadines", "Saint Vincentian" : "Saint Vincent And Grenadines", "Miquelonnais" : "Saint Pierre And Miquelon", "Saint-Pierrais" : "Saint Pierre And Miquelon", "Saint-Martinoise" : "Saint Martin", "Saint Lucian" : "Saint Lucia", "Kittitian or Nevisian" : "Saint Kitts and Nevis", "Saint Helenian" : "Saint Helena", "Barthelemois" : "Saint Barthelemy", "Saba" : "Saba", "Rwandan" : "Rwanda", "Soviet" : "Russia", "Soviet-Russian" : "Russia", "Russian" : "Russia", "Romanian" : "Romania", "Reunionnais" : "Reunion ", "Reunionese" : "Reunion", "Qatari" : "Qatar", "Puerto Rican" : "Puerto Rico", "Portuguese" : "Portugal", "Polish" : "Poland", "Pitcairn Island" : "Pitcairn Islands", "Philippine" : "Philippines", "Filipino" : "Philippines", "Peruvian" : "Peru", "Paraguayan" : "Paraguay", "Papuan" : "Papua New Guinea", "Papua New Guinean" : "Papua New Guinea", "Panamanian" : "Panama", "Palestinian" : "Palestine", "Palauan" : "Palau", "Pakistani" : "Pakistan", "Omani" : "Oman", "Norwegian" : "Norway", "Northern Marianan" : "Northern Mariana Islands", "Irish" : "Ireland", "Northern Irish" : "Northern Ireland", "Norfolk Island" : "Norfolk Island", "Niuean" : "Niue", "Nigerian" : "Nigeria", "Nigerien" : "Niger", "Nicaraguan" : "Nicaragua", "New Zealand" : "New Zealand", "New Caledonian" : "New Caledonia", "Netherlandic" : "Netherlands ", "Dutch" : "Netherlands", "Nepalese" : "Nepal ", "Nepali" : "Nepal", "Nauruan" : "Nauru", "Namibian" : "Namibia", "Burmese" : "Myanmar", "Mozambican" : "Mozambique", "Moroccan" : "Morocco", "Montserratian" : "Montserrat", "Montenegrin" : "Montenegro", "Mongolian" : "Mongolia", "Monacan" : "Monaco ", "Monégasque" : "Monaco", "Moldovan" : "Moldova", "Micronesian" : "Micronesia- Federated States of", "Mexican" : "Mexico", "Mahoran" : "Mayotte", "Mauritian" : "Mauritius", "Mauritanian" : "Mauritania", "Martinican" : "Martinique ", "Martiniquais" : "Martinique", "Marshallese" : "Marshall Islands", "Maltese" : "Malta", "Malinese" : "Mali ", "Malian" : "Mali", "Maldivian" : "Maldives", "Malaysian" : "Malaysia", "Malawian" : "Malawi", "Malagasy" : "Madagascar", "Macedonian" : "Macedonia", "Chinese" : "Macau ", "Macanese" : "Macau", "Luxembourgish" : "Luxembourg ", "Luxembourg" : "Luxembourg", "Lithuanian" : "Lithuania", "Liechtensteiner" : "Liechtenstein", "Libyan" : "Libya", "Liberian" : "Liberia", "Basotho" : "Lesotho", "Lebanese" : "Lebanon", "Lettish" : "Latvia ", "Latvian" : "Latvia", "Laotian" : "Laos ", "Lao" : "Laos", "Kirghiz" : "Kyrgyzstan ", "Kirgiz" : "Kyrgyzstan ", "Kyrgyz" : "Kyrgyzstan ", "Kyrgyzstani" : "Kyrgyzstan", "Kuwaiti" : "Kuwait", "Kosovars" : "Kosovo", "Kosovan" : "Kosovo ", "Kosovar" : "Kosovo", "South Korean" : "South Korea", "North Korean" : "North Korea", "I-Kiribati" : "Kiribati", "Kenyan" : "Kenya", "Kazakh" : "Kazakhstan ", "Kazakhstani" : "Kazakhstan", "Jordanian" : "Jordan", "Channel Island" : "Jersey", "Japanese" : "Japan", "Jan Mayen" : "Jan Mayen", "Jamaican" : "Jamaica", "Ivorian" : "Ivory Coast", "Italian" : "Italy", "Israeli" : "Israel", "Manx" : "Isle of Man", "Irish" : "Ireland", "Iraqi" : "Iraq", "Persian" : "Iran", "Iranian" : "Iran", "Indonesian" : "Indonesia", "Indian" : "India", "Icelandic" : "Iceland", "Magyar" : "Iceland", "Hungarian" : "Hungary", "Hong Kongese" : "Hong Kong", "Honduran" : "Honduras", "McDonald Island" : "Heard Island & McDonald Islands", "Heard Island" : "Heard Island & McDonald Islands", "Haitian" : "Haiti", "Guyanese" : "Guyana", "Bissau-Guinean" : "Guinea-Bissau", "Guinean" : "Guinea", "Channel Island" : "Guernsey", "Guatemalan" : "Guatemala", "Guambat" : "Guam", "Guamanian" : "Guam", "Guadeloupe" : "Guadeloupe", "Grenadian" : "Grenada", "Greenlandic" : "Greenland", "Greek- Hellenic" : "Greece", "Gibraltar" : "Gibraltar", "Ghanaian" : "Ghana", "German" : "Germany", "Georgian" : "Georgia", "Gambian" : "Gambia", "Gabonese" : "Gabon", "French Southern Territories" : "French Southern Territories", "French Polynesian" : "French Polynesia", "French Guianese" : "French Guiana", "French" : "France", "Finnish" : "Finland", "Fijian" : "Fiji", "Faroese" : "Faroe Islands", "Falkland Island" : "Falkland Islands", "European" : "European Union", "Ethiopian" : "Ethiopia", "Estonian" : "Estonia", "Eritrean" : "Eritrea", "Equatoguinean" : "Equatorial Guinea", "Equatorial Guinean" : "Equatorial Guinea", "English" : "United Kingdom", "UK" : "United Kingdom", "British" : "United Kingdom", "Salvadoran" : "El Salvador", "Egyptian" : "Egypt", "Ecuadorian" : "Ecuador", "Timorese" : "East Timor", "Dominican" : "Dominican Republic", "Dominican" : "Dominica", "Djiboutian" : "Djibouti", "Danish" : "Denmark", "Czech" : "Czech Republic", "Cypriot" : "Cyprus", "Curacaoan" : "Curacao", "Cuban" : "Cuba", "Croatian" : "Croatia", "Ivorian" : "Cote D'Ivoire", "Costa Rican" : "Costa Rica", "Cook Island" : "Cook Islands", "Congolese" : "Congo- Democratic Republic", "Comorian" : "Comoros ", "Comoran" : "Comoros", "Colombian" : "Colombia", "Cocos Island" : "Cocos (Keeling) Islands", "Christmas Island" : "Christmas Island", "Chinese" : "China", "Chilean" : "Chile", "Chadian" : "Chad", "Central African" : "Central African Republic", "Caymanian" : "Cayman Islands", "Canadian" : "Canada", "Cameroonian" : "Cameroon", "Cambodian" : "Cambodia", "Cabo Verdean" : "Cabo Verde", "Burundian" : "Burundi", "Burmese" : "Burma", "Burkinabé" : "Burkina Faso", "Bulgarian" : "Bulgaria", "Bruneian" : "Brunei", "BIOT" : "British Indian Ocean Territory", "Brazilian" : "Brazil", "Bouvet Island" : "Bouvet Island", "Botswanan" : "Botswana", "Motswana" : "Botswana", "Herzegovinian" : "Bosnia And Herzegovina", "Bosnian" : "Bosnia And Herzegovina", "Bonaire" : "Bonaire", "Bolivian" : "Bolivia", "Bhutanese" : "Bhutan", "Bermudan" : "Bermuda ", "Bermudian" : "Bermuda", "Beninoises" : "Benin ", "Beninois" : "Benin ", "Beninese" : "Benin", "Belizean" : "Belize", "Belgian" : "Belgium", "Belarusian" : "Belarus", "Barbadian" : "Barbados", "Bangladeshi" : "Bangladesh", "Bahraini" : "Bahrain", "Bahamian" : "Bahamas", "Azeri" : "Azerbaijan ", "Azerbaijani" : "Azerbaijan", "Austrian" : "Austria", "Australian" : "Australia", "Aruban" : "Aruba", "Armenian" : "Armenia", "Argentine" : "Argentina", "Barbudan" : "Antigua And Barbuda", "Antiguan" : "Antigua And Barbuda", "Antarctic" : "Antarctica", "Anguillan" : "Anguilla", "Angolan" : "Angola", "Andorran" : "Andorra", "American Samoan" : "American Samoa", "Algerian" : "Algeria", "Albanian" : "Albania", "Aland Island" : "Aland Islands", "Afghan" : "Afghanistan", "Abkhazian" : "Abkhazia", "Abkhaz" : "Abkhazia"}

// list of country codes
countryLetters = {"UK" : "gb", "Zimbabwe" : "zw", "Zambia" : "zm", "Yemen" : "ye", "Western Sahara" : "eh", "Wallis And Futuna" : "wf", "Virgin Islands, U.S." : "vi", "Virgin Islands, British" : "vg", "Viet Nam" : "vn", "Venezuela" : "ve", "Vanuatu" : "vu", "Uzbekistan" : "uz", "Uruguay" : "uy", "United States Outlying Islands" : "um", "United States" : "us", "United Kingdom" : "gb", "United Arab Emirates" : "ae", "Ukraine" : "ua", "Uganda" : "ug", "Tuvalu" : "tv", "Turks And Caicos Islands" : "tc", "Turkmenistan" : "tm", "Turkey" : "tr", "Tunisia" : "tn", "Trinidad And Tobago" : "tt", "Tonga" : "to", "Tokelau" : "tk", "Togo" : "tg", "Timor-Leste" : "tl", "Thailand" : "th", "Tanzania" : "tz", "Tajikistan" : "tj", "Taiwan" : "tw", "Syria" : "sy", "Syrian Arab Republic" : "sy", "Switzerland" : "ch", "Sweden" : "se", "Swaziland" : "sz", "Svalbard And Jan Mayen" : "sj", "Suriname" : "sr", "Sudan" : "sd", "Sri Lanka" : "lk", "Spain" : "es", "South Georgia And Sandwich Isl." : "gs", "South Africa" : "za", "Somalia" : "so", "Solomon Islands" : "sb", "Slovenia" : "si", "Slovakia" : "sk", "Singapore" : "sg", "Sierra Leone" : "sl", "Seychelles" : "sc", "Serbia" : "rs", "Senegal" : "sn", "Saudi Arabia" : "sa", "Sao Tome And Principe" : "st", "San Marino" : "sm", "Samoa" : "ws", "Saint Vincent And Grenadines" : "vc", "Saint Pierre And Miquelon" : "pm", "Saint Martin" : "mf", "Saint Lucia" : "lc", "Saint Kitts And Nevis" : "kn", "Saint Helena" : "sh", "Saint Barthelemy" : "bl", "Rwanda" : "rw", "Russian Federation" : "ru", "Russia" : "ru", "Romania" : "ro", "Reunion" : "re", "Qatar" : "qa", "Puerto Rico" : "pr", "Portugal" : "pt", "Poland" : "pl", "Pitcairn" : "pn", "Philippines" : "ph", "Peru" : "pe", "Paraguay" : "py", "Papua New Guinea" : "pg", "Panama" : "pa", "Palestinian Territory, Occupied" : "ps", "Palau" : "pw", "Pakistan" : "pk", "Oman" : "om", "Norway" : "no", "Northern Mariana Islands" : "mp", "Norfolk Island" : "nf", "Niue" : "nu", "Nigeria" : "ng", "Niger" : "ne", "Nicaragua" : "ni", "New Zealand" : "nz", "New Caledonia" : "nc", "Netherlands Antilles" : "an", "Netherlands" : "nl", "Nepal" : "np", "Nauru" : "nr", "Namibia" : "na", "Myanmar" : "mm", "Mozambique" : "mz", "Morocco" : "ma", "Montserrat" : "ms", "Montenegro" : "me", "Mongolia" : "mn", "Monaco" : "mc", "Moldova" : "md", "Micronesia, Federated States Of" : "fm", "Mexico" : "mx", "Mayotte" : "yt", "Mauritius" : "mu", "Mauritania" : "mr", "Martinique" : "mq", "Marshall Islands" : "mh", "Malta" : "mt", "Mali" : "ml", "Maldives" : "mv", "Malaysia" : "my", "Malawi" : "mw", "Madagascar" : "mg", "Macedonia" : "mk", "Macao" : "mo", "Luxembourg" : "lu", "Lithuania" : "lt", "Liechtenstein" : "li", "Libya" : "ly", "Libyan Arab Jamahiriya" : "ly", "Liberia" : "lr", "Lesotho" : "ls", "Lebanon" : "lb", "Latvia" : "lv", "Lao People's Democratic Republic" : "la", "Kyrgyzstan" : "kg", "Kuwait" : "kw", "South Korea" : "kr", "North Korea" : "kp", "Kiribati" : "ki", "Kenya" : "ke", "Kazakhstan" : "kz", "Jordan" : "jo", "Jersey" : "je", "Japan" : "jp", "Jamaica" : "jm", "Rome" : "it", "Italy" : "it", "Israel" : "il", "Isle Of Man" : "im", "Ireland" : "ie", "Iraq" : "iq", "Iran, Islamic Republic Of" : "ir", "Indonesia" : "id", "India" : "in", "Iceland" : "is", "Hungary" : "hu", "Hong Kong" : "hk", "Honduras" : "hn", "Holy See (Vatican City State)" : "va", "Heard Island & Mcdonald Islands" : "hm", "Haiti" : "ht", "Guyana" : "gy", "Guinea-Bissau" : "gw", "Guinea" : "gn", "Guernsey" : "gg", "Guatemala" : "gt", "Guam" : "gu", "Guadeloupe" : "gp", "Grenada" : "gd", "Greenland" : "gl", "Greece" : "gr", "Gibraltar" : "gi", "Ghana" : "gh", "Germany" : "de", "Georgia" : "ge", "Abkhazia" : "ge", "The Gambia" : "gm", "Gambia" : "gm", "Gabon" : "ga", "French Southern Territories" : "tf", "French Polynesia" : "pf", "French Guiana" : "gf", "France" : "fr", "Finland" : "fi", "Fiji" : "fj", "Faroe Islands" : "fo", "Falkland Islands (Malvinas)" : "fk", "Ethiopia" : "et", "Estonia" : "ee", "Eritrea" : "er", "Equatorial Guinea" : "gq", "El Salvador" : "sv", "Egypt" : "eg", "Ecuador" : "ec", "Dominican Republic" : "do", "Dominica" : "dm", "Djibouti" : "dj", "Denmark" : "dk", "Czech Republic" : "cz", "Cyprus" : "cy", "Cuba" : "cu", "Croatia" : "hr", "Ivory Coast" : "ci", "Cote D'Ivoire" : "ci", "Costa Rica" : "cr", "Cook Islands" : "ck", "Congo, Democratic Republic" : "cd", "Congo" : "cg", "Comoros" : "km", "Colombia" : "co", "Cocos (Keeling) Islands" : "cc", "Christmas Island" : "cx", "China" : "cn", "Chile" : "cl", "Chad" : "td", "Central African Republic" : "cf", "Cayman Islands" : "ky", "Cape Verde" : "cv", "Canada" : "ca", "Cameroon" : "cm", "Cambodia" : "kh", "Burundi" : "bi", "Burkina Faso" : "bf", "Bulgaria" : "bg", "Brunei Darussalam" : "bn", "British Indian Ocean Territory" : "io", "Brazil" : "br", "Bouvet Island" : "bv", "Botswana" : "bw", "Bosnia And Herzegovina" : "ba", "Bolivia" : "bo", "Bhutan" : "bt", "Bermuda" : "bm", "Benin" : "bj", "Belize" : "bz", "Belgium" : "be", "Belarus" : "by", "Barbados" : "bb", "Bangledesh" : "bd", "Bangladesh" : "bd", "Bahrain" : "bh", "Bahamas" : "bs", "Azerbaijan" : "az", "Austria" : "at", "Australia" : "au", "Aruba" : "aw", "Armenia" : "am", "Argentina" : "ar", "Antigua And Barbuda" : "ag", "Antarctica" : "aq", "Anguilla" : "ai", "Angola" : "ao", "Andorra" : "ad", "American Samoa" : "as", "Algeria" : "dz", "Albania" : "al", "Aland Islands" : "ax", "Afghanistan" : "af", "Unknown" : "UNKNOWN"}

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
	$("#today-title").append(month + " " + day + ", " + year)
	$("#yesterday-title").append(yesterday_month + " " + yesterday + ", " + yesterday_year)

//define source urls
	ongoing_protests="https://en.wikipedia.org/w/api.php?action=parse&page=List_of_ongoing_protests&contentmodel=wikitext&prop=wikitext&format=json"
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

				var notability = day[i].split(",")[2].split("[")[0].replace("(", "").replace(".", "").replace(/\"/g, '')
				var death = day[i].split(">[")[1].split("]</ref>")[0]
				var person = day[i].split(",")[0].replace("{{ill|","").split("]]")[0].split("|")[0].replace(/\(([^)]+)\)/, "").replace(/\[/g, "")
				var url = death.split(" ")[0]
					if (url.slice(-1)=="/") {url = url.slice(0, -1)};
				var explanation = death.replace(url, "").replace("/ ", "").split("]")[0]

				var date = window.day
				if (today) {date=month + " " + window.day};
				if (day==deaths_yesterday) {date=yesterday_month + " " + yesterday};
				if (day==deaths_third) {date=third_day_month + " " + third_day};

				var nat = "unknown"
				nat = notability.split(" ")[1].split("-born")[0]
				country = demonymic[nat]

				$(location).append("<div class='news_item'> <img src='flags/"+countryLetters[country]+".png'> <br> <a target=_blank href=" + url + ">" + person + "</a> <br>" + notability + "<br>" + date + '</div>')

			    //add today to daily snapshot
			    if (today) {
			    	if (i==1) {
						$("#daily_snapshot").append("<br><strong>Deaths: </strong><p>" + "<img src='flags/"+countryLetters[country]+".png'>"  + notability + " <a target=_blank href=" + url + "> " + person + " &#10138</a></p>");
					}
					else {
						$("#daily_snapshot").append("<p><strong></strong>" + " <img src='flags/"+countryLetters[country]+".png'>" + notability + " <a target=_blank href=" + url + "> " + person + " &#10138</a></p>");
					};
				};

			    //add today to yesterday snapshot
			    if (date == yesterday_month + " " + yesterday) {
			    	if (i==1) {
						$("#yesterday_snapshot").append("<br><strong>Deaths: </strong><p>" + " <img src='flags/"+countryLetters[country]+".png'>"  + notability + " <a target=_blank href=" + url + "> " + person + " &#10138</a></p>");
					}
					else {
						$("#yesterday_snapshot").append("<p><strong></strong>" + " <img src='flags/"+countryLetters[country]+".png'>"  + notability + " <a target=_blank href=" + url + "> " + person + " &#10138</a></p>");
					};
				};

			};

		};

		list_deaths(deaths_today, "#notable_deaths", true)
		list_deaths(deaths_yesterday, "#notable_deaths")
		list_deaths(deaths_third, "#notable_deaths")

    }
});

var getWikimediaNews = function(title, update){
	$.ajax({
	    url: wiki_news,
	    jsonp: "callback",
	    dataType: "jsonp",
	    success: function( data ) {

			var content = data["parse"]["wikitext"]["*"]

			if (content.split(title)[1] != undefined) {

				content = content.split(title)[1].split("\n\;")[0].split("All news items above this line")[0]
				items = content.split(")]\n")

				for (var i = 0; i < items.length-1; i++) {
					if (items[i].split("[http")[1]!=undefined) {
						url="http" + items[i].split("[http")[1].split(" ")[0]
							if (url.slice(-1)=="/") {url = url.slice(0, -1)};
					};
					var description = items[i].split("**")[0].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/[a-z]\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "

					if(items[i].split("**")[1]!=undefined){
						description = items[i].split("**")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/[a-z]\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "
					};

					if(items[i].split("***")[1]!=undefined){
						description = items[i].split("***")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/[a-z]\. [A-Z]/g)[0].split(/\." [A-Z]/g)[0] + " "
					};

					var country = "unknown"

					for (var key in demonymic) {
						if (description.includes(key)) {country = countryLetters[demonymic[key]]};
					}

					for (var key in countryLetters) {
						if (description.includes(key)) {country = countryLetters[key]};
					}

			    	if (i==0) {
						if (description != " " && description != "" && description != "  ") {
							$("#daily_snapshot").append(update + "<p> <img src='flags/"+country+".png'>" + description+"<a target='_blank' href="+url+">Story &#10138;</a></p>")
						};
					}
					else {
						if (description != " " && description != "" && description != "  ") {
							$("#daily_snapshot").append("<p> <img src='flags/"+country+".png'>" + description+" <a target='_blank' href="+url+">Story &#10138;</a></p>")
						};
					};
				};
			};
	    }
	});
};

getWikimediaNews("Politics and elections\n", "<br><strong>Politics Update: </strong><br>")
getWikimediaNews("Disasters and accidents\n", "<br><strong>Disasters Update: </strong><br>")
getWikimediaNews("Armed conflicts and attacks\n", "<br><strong>Conflicts Update: </strong><br>")
getWikimediaNews("International relations\n", "<br><strong>Geopolitics Update: </strong><br>")


var getWikimediaNews_yesterday = function(title, update){
	$.ajax({
	    url: wiki_news_2,
	    jsonp: "callback",
	    dataType: "jsonp",
	    success: function( data ) {

			var content = data["parse"]["wikitext"]["*"]

			if (content.split(title)[1] != undefined) {

				content = content.split(title)[1].split("\n\;")[0].split("All news items above this line")[0]
				items = content.split(")]\n")

				for (var i = 0; i < items.length-1; i++) {

					if (items[i].split("[http")[1]!=undefined) {
						url="http" + items[i].split("[http")[1].split(" ")[0]
							if (url.slice(-1)=="/") {url = url.slice(0, -1)};
					};
					var description = items[i].split("**")[0].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/[a-z]\." [A-Z]/g)[0] + " "

					if(items[i].split("**")[1]!=undefined){
						description = items[i].split("**")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/[a-z]\." [A-Z]/g)[0] + " "
					};

					if(items[i].split("***")[1]!=undefined){
						description = items[i].split("***")[1].split("[http")[0].replace("*", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\|/g, " / ").split(/\. [A-Z]/g)[0].split(/[a-z]\." [A-Z]/g)[0] + " "
					};

					var country = "unknown"

					for (var key in demonymic) {
						if (description.includes(key)) {country = countryLetters[demonymic[key]]};
					}

					for (var key in countryLetters) {
						if (description.includes(key)) {country = countryLetters[key]};
					}

			    	if (i==0) {
						if (description != " " && description != "" && description != "  ") {
							$("#yesterday_snapshot").append(update + "<p> <img src='flags/"+country+".png'>" + description+"<a target='_blank' href="+url+">Story &#10138;</a></p>")
						};
					}
					else {
						if (description != " " && description != "" && description != "  ") {
							$("#yesterday_snapshot").append("<p> <img src='flags/"+country+".png'>" + description+"<a target='_blank' href="+url+">Story &#10138;</a></p>")
						};
					};


				};
			};
	    }
	});
};

getWikimediaNews_yesterday("Politics and elections\n", "<br><strong>Politics Update: </strong><br>")
getWikimediaNews_yesterday("Disasters and accidents\n", "<br><strong>Disasters Update: </strong><br>")
getWikimediaNews_yesterday("Armed conflicts and attacks\n", "<br><strong>Conflicts Update: </strong><br>")
getWikimediaNews_yesterday("International relations\n", "<br><strong>Geopolitics Update: </strong><br>")


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

		  $("#ongoing_protests").append("<div class='news_item'> <img src='flags/"+countryLetters[country]+".png'> <a target='_blank' href=" + url + "><br>" + title + "</a> <br> SINCE: " + date + " <br>DEAD: " + died + "<br><a target='_blank' href=" + google_news_1 + title.replace(/ /g, "+") + google_news_2 + "> news &#10138; </a> </div>" );

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
			    if (perpetrator=="01" || perpetrator==03) {perpetrator = "unknown perpetrator"};
			var conflict = context[context.length-1].split("|")
			    conflict = conflict[conflict.length-1].slice(0,-3)

			var attack = attacks[i].split("|")
			var date = attack[1]
			var type = attack[2]
			var dead = attack[4]
			var where = attacks[i].split("{{")[1].split("}}")[0].split("|")[1]
			if (countryLetters[where]==undefined) {where="Unknown"};

			// var description = attack[9].split('{{')[0].replace(/\[/g, "").replace(/\]/g, "").split("http")[0]

			var now = new Date().toLocaleString().split("/")[1]
			var month = new Date().getMonth();

			if (date > Number(last_date)-7+window.day) {
		    	$("#terrorist_attacks").append("<div class='news_item'> <img src='flags/"+countryLetters[where]+".png'><br> <a target='_blank' href=" + source + ">" + type + "</a><br>WHEN: " + window.last_month + " " + date + "<br> WHERE: " + where + "<br>DEAD: " + dead + "<br>PERPETRATOR: " + perpetrator + "</div>" );
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

    	$("#daily_snapshot").append("<br><strong id='terrorlist1'>Terrorist Attacks: </strong>")
    	$("#yesterday_snapshot").append("<br><strong id='terrorlist2'>Terrorist Attacks: </strong>")

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
				var where = attacks[i].split("{{")[1].split("}}")[0].split("|")[1]

				// var description = attack[9].split('{{')[0].replace(/\[/g, "").replace(/\]/g, "").split("http")[0]

				var now = new Date().toLocaleString().split("/")[1]
				var month = new Date().getMonth();

				var display1 = false
				var display2 = false

				if (now-date < 8) {
			    	$("#terrorist_attacks").append("<div class='news_item'> <img src='flags/"+countryLetters[where]+".png'><br> <a target='_blank' href=" + source + ">" + type + "</a><br>WHEN: " + window.month + " " + date + "<br> WHERE: " + where + "<br>DEAD: " + dead + "<br>PERPETRATOR: " + perpetrator + "</div>" );

			    	//add today to daily snapshot
			   //  		if (date==window.day) {$("#daily_snapshot").append("<br><strong>Terrorist Attack: </strong><br><p>" + perpetrator + " behind <a target='_blank' href=" + source + ">" + type + "&#10138;</a> in " + where + ", " + dead + "confirmed dead </p>")};
						// if (date==yesterday) {$("#yesterday_snapshot").append("<br><strong>Terrorist Attack: </strong><br<p>" + perpetrator + " behind <a target='_blank' href=" + source + ">" + type + "&#10138;</a> in " + where + ", " + dead + "confirmed dead </p>")};
			

					if (date==window.day) {
						display1 = true
						$("#daily_snapshot").append("<p><img src='flags/"+countryLetters[where]+".png'>" + perpetrator + " behind <a target='_blank' href=" + source + ">" + type + "&#10138;</a> in " + where + ", " + dead + "confirmed dead </p>")
					};

					if (date==yesterday) {
						display2 = true
						$("#yesterday_snapshot").append("<p><img src='flags/"+countryLetters[where]+".png'>" + perpetrator + " behind <a target='_blank' href=" + source + ">" + type + "&#10138;</a> in " + where + ", " + dead + "confirmed dead </p>")
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
				if (section[1]=='rowspan="2" ') {section.shift();};

				var date = section[1].replace(/[^0-9 ]/g, "")
				var month = section[1].replace(/[0-9 ]/g, "").slice(0,-1)
				var who = section[2].replace(/\[/g, "").replace(/\]/g, "").replace(/\}/g, "")
				if (section[5]!=undefined) {var what = section[5].replace(/[^a-zA-Z \-]/g, "")
				var country = section[4].slice(0,-3).replace("}}", "").split("{")[0]};
				if (section.length>6) {var title = section[6].split("]]")[0].replace(/\[/g, "")};
				var url = "https://en.wikipedia.org/wiki/" + who.replace(/ /g, "_")

				heads_of_state_array.unshift( "<div class='news_item'> <img src='flags/"+countryLetters[country]+".png'> <br> <a target=_blank href=" + url + ">" + who + "</a><br>" + title + " of " + country + "<br>SINCE: " + month + " " + date + "</div>" )


		    	//add today to daily snapshot
				if ((month==window.month)||(month==window.last_month&&date>=day)) {
					if (date==window.day) {$("#daily_snapshot").prepend("<strong>***New " + title + ":</strong> <p> <img src='flags/"+countryLetters[country]+".png'> <a target=_blank href=" + url + ">" + who + "</a> has assumed the office of " + title + " of " + country + "</p>")};
					if (date==yesterday) {$("#yesterday_snapshot").append("<strong>***New " + title + ":</strong> <p> <img src='flags/"+countryLetters[country]+".png'> <a target=_blank href=" + url + ">" + who + "</a> has assumed the office of " + title + " of " + country + "</p>")};
			    };
		    };
		};

		for (var i = 1; i < heads_of_state_array.length; i++) {
			$("#new_heads").append(heads_of_state_array[i]);
		};
    }
});


//get recent code RED disasters news
$.ajax({
    url: natural_disasters,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

    	$('#disasters').append("<h5><em>Code Red</em></h5>")

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

	    		country = country.split(" ")

	    		for (var j = 0; j < country.length; j++) {
	    			country[j] = country[j][0].toUpperCase() + country[j].slice(1)
	    		};
	    		country = country.join(" ")

	    	$('#disasters').append("<div class='news_item'> <img src='flags/"+countryLetters[country]+".png'> <strong> " + what + " in " + country  + "</strong><br>" + date + "<br>" + title + "<br>" + " <a target=_blank href="+ url + "> Info &#10138 </a> </div>")

	    	if (nowdate==window.day) {$('#daily_snapshot').append("<br><strong>***Code Red " + what + " in " + country + "</strong>: <p> <img src='flags/"+countryLetters[country]+".png'>" + title + "</strong> <a target=_blank href="+ url + ">Info &#10138 </a> </p>")};
	    	if (nowdate==yesterday) {$('#yesterday_snapshot').append("<br><strong>***Code Red " + what + " in " + country + "</strong>: <p> <img src='flags/"+countryLetters[country]+".png'>" + title + "</strong> <a target=_blank href="+ url + ">Info &#10138 </a> </p>")};

    	};
    }
});

//get recent code ORANGE disasters news
$.ajax({
    url: natural_disasters_2,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {

    	$('#disasters').append("<h5><em>Code Orange</em></h5>")

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

	    		country = country.split(" ")

	    		for (var j = 0; j < country.length; j++) {
	    			country[j] = country[j][0].toUpperCase() + country[j].slice(1)
	    		};
	    		country = country.join(" ")

	    	$('#disasters').append("<div class='news_item'><img src='flags/"+countryLetters[country]+".png'> <strong> " + what + " in " + country  + "</strong><br>" + date + "<br>" + title + "<br>" + " <a target=_blank href="+ url + "> Info &#10138 </a> </div>")

	    	if (nowdate==window.day) {$('#daily_snapshot').append("<br><strong> Code Orange " + what + " in " + country + "</strong>: <p><img src='flags/"+countryLetters[country]+".png'>" + title + "</strong> <a target=_blank href="+ url + ">Info &#10138 </a> </p>")};
	    	if (nowdate==yesterday) {$('#yesterday_snapshot').append("<br><strong> Code Orange " + what + " in " + country + "</strong>: <p><img src='flags/"+countryLetters[country]+".png'>" + title + "</strong> <a target=_blank href="+ url + ">Info &#10138 </a> </p>")};

    	};
    }
});

//get recent shipwrecks
$.ajax({
    url: shipwrecks,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {
		var wrecks = data["parse"]["wikitext"]["*"].split(/\n\n===/g)
    	 for (var i = 1; i < wrecks.length; i++) {
	 		var all = wrecks[i].split("{{shipwreck list item")
	 		 for (var j = 1; j < all.length; j++) {
    			var wreck = all[j]
	    		var date = wrecks[i].split("| ")[0].split("===")[0]
	    		var url = ""
	    		var country = wreck.split("|desc=")[0].split("|flag=")[1].split("|")[1].slice(0,-3)
	    		if (wreck.split("http")[1] != undefined) { url = "http" + wreck.split("http")[1].split(" ")[0].split("|")[0]};
	    		if (wreck.split("|title=")[1] != undefined) {
	    			var headline = wreck.split("|desc=")[1].split("{{cite web")[0].replace(/\[/g, "").replace(/\]/g, "").split("\. [A-Z]")[0].replace(/\{([^)]+)\}/g, "")
	    			if (date.split(" ")[0]==window.day && date.split(" ")[1]==window.month) {$('#daily_snapshot').append("<br><strong>" + country + " Shipwreck:</strong>  <p>" + headline + "<a href='" + url +"'> Story &#10138</a></p>")};
	    		};
	    		// $('#daily_snapshot').prepend("<br><strong>" + country + " Shipwreck:</strong>  <p>" + headline + "<a href='" + url +"'> Story &#10138</a></p>")
	 		};
    	};
    }
});

// // get oil spills
// $.ajax({
//     url: oil_spills,
//     jsonp: "callback",
//     dataType: "jsonp",
//     success: function( data ) {
// 		var spills = data["parse"]["text"]["*"].split("section: Underway")[1].split("Complete</span>")[0].split(" title=")
// 		$('#daily_snapshot').prepend(spills)
//     }
// });

// coup attempts
$.ajax({
    url: coup_attempts,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( data ) {
		var coups = data["parse"]["wikitext"]["*"].split("Coups d'\u00e9tat and coup attempts since 2010")[1].split("\n==See also==\n")[0].split("\n|- ")
	
		for (var i = 2; i < coups.length-1; i++) {
			coup = coups[i].split("\n|")[1]
			var title = coup.split("||")[0]
			var date = coup.split("||")[1]

			var country = coup.split("||")[3].split("[[")[1].split("]]")[0]
			var status = coup.split("||")[2]

			if (coup.split("http")[1]!=undefined) {
				var url = "http" + coup.split("http")[1].split("|")[0]
			};
			
			// if (status == " Ongoing ") {
			// 	$('#daily_snapshot').prepend("<br>Coup: <p>" + status + " in " + country + " on " + date+ "</p>")
			// };
		};
    }
});


//show and hide info
var showandhide = function(btn="#", div, other="#"){
		$(".inner").css({"display":"none"})
		$(div).css({"display":"inline-block"})
		$(div + "> div ").css({"display":"inline-block"})
		$(other).css({"display":"inline-block"})
		// $("button").css({"background-color":"transparent"})
		$("button").children().css({"text-decoration":"none"})
		// $(btn).css({"background-color":"rgba(255, 255, 255, 0.2)"})
		$(btn).children().css({"text-decoration":"underline"})
};

$('#button_zero').click(function(){
	showandhide("#button_zero", "#daily_snapshot", "#yesterday_snapshot")
});

// $('#button_zero_point_one').click(function(){
// 	showandhide('#button_zero_point_one', "#yesterday_snapshot")
// });

$('#about_button').click(function(){
	showandhide('#about_button', "#about")
});

$('#button_one').click(function(){
	showandhide('#button_one', "#ongoing_protests")
});

$('#button_two').click(function(){
	showandhide('#button_two', "#ongoing_wars")
});

$('#button_three').click(function(){
	showandhide('#button_three', "#terrorist_attacks", "#terrorist_attacks_2")
});

$('#button_four').click(function(){
	showandhide('#button_four', "#new_heads")
});

$('#button_five').click(function(){
	showandhide('#button_five', "#notable_deaths")
});

$('#button_six').click(function(){
	showandhide('#button_six', "#disasters")
});

// make navbar stick to top
  $(window).scroll(function () {
    if ($(window).scrollTop() > 184) {
      $('.navbar').addClass('navbar-fixed');
      $('#today-title').css({"padding-bottom":"65px"})
    }
    if ($(window).scrollTop() < 184) {
      $('.navbar').removeClass('navbar-fixed');
      $('#today-title').css({"padding-bottom":"20px"})
    }
  });

});