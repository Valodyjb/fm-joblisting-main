let response = fetch('https://remotive.io/api/remote-jobs');
const api_url = 'https://remotive.io/api/remote-jobs';
let jobDatabase = [];
let filteredTags = [];
// let titles = [];
const jobTags = [
	'it',
	'devops',
	'css',
	'html',
	'sql',
	'nosql',
	'js',
	'javascript',
	'react',
	'node.js',
	'node',
	'golang',
	'rest',
	'ruby',
	'python',
	'aws',
	'php',
	'security',
	'junior',
	'senior',
];

async function getAPI() {
	const response = await fetch('https://remotive.io/api/remote-jobs');

	let data = await response.json();
	return data;
}

async function getJobs(jobArray) {
	for (let i = 0; i < 500; i++) {
		jobDatabase.push(jobArray[i]);
		// titles = jobDatabase.
	}
	// console.log(JSON.parse(JSON.stringify(jobDatabase)));
	jobListings = jobDatabase;
	console.log(jobListings);
	// return (jobListings = jobDatabase);
}

getAPI().then((data) =>
	getJobs(data['jobs'])
		.then(displayFilterBoard())
		.then(filterFunctionality())

		.then(displayJobBoard())
);

function getCommonValues(baseArray, newArray) {
	let commonTags = newArray.filter((x) => baseArray.indexOf(x) !== -1);
	return commonTags;
}

function isInArray(value, array) {
	return array.indexOf(value) > -1;
}

function createFilterButtons(commonTags, jobFilterTags) {
	for (let i = 0; i < commonTags.length; i++) {
		let jobFilters = document.createElement('button');
		jobFilters.setAttribute('type', 'button');

		jobFilters.innerText = commonTags[i];
		jobFilterTags.appendChild(jobFilters);

		jobFilters.addEventListener('click', () => {
			let filterContainer = createDiv('filterContainer');
			let jobFilter = createFilterDiv('jobFilter', jobFilters.innerText);
			let filterButton = createButton('filterButton');
			let imageSpan = createImageSpan();
			let outFilterContainer = document.getElementById('outFilterContainer');
			// console.log(isInArray(jobFilters.innerText, filteredTags));
			if (isInArray(jobFilters.innerText, filteredTags)) {
				displayJobBoard();
				return;
			}
			outFilterContainer.append(filterContainer);
			filterContainer.append(jobFilter);
			filterContainer.append(filterButton);
			filterButton.appendChild(imageSpan);
			filteredTags.push(jobFilters.innerText);
			displayJobBoard();
			// console.log();
			filterButton.addEventListener('click', () => {
				for (let i = 0; i < filteredTags.length; i++) {
					if (filteredTags[i].toLowerCase() == jobFilters.innerText) {
						filteredTags.splice(i, 1);
					}
				}

				outFilterContainer.removeChild(filterContainer);
				clearJobListings();
				displayJobBoard();
			});
		});
	}
}

function changeToLowercase(jobFilters) {
	let lowercaseFilters = jobFilters.map((jobFilters) =>
		jobFilters.toLowerCase()
	);
	return lowercaseFilters;
}

function createDiv(tagName) {
	div = document.createElement('div');
	div.classList.add(tagName);
	return div;
}

function createClearButton() {
	clear = document.createElement('button');
	clear.setAttribute('id', 'resetButton');
	clear.setAttribute('type', 'reset');
	clear.innerText = 'Clear';

	// clear.addEventListener('click')
	return clear;
}

function createFilterDiv(tagName, filter) {
	div = document.createElement('div');
	div.classList.add(tagName);
	div.innerText = filter;
	return div;
}

function createImageSpan() {
	span = document.createElement('span');
	span.classList.add('material-icons');
	span.innerText = 'close';
	return span;
}

function createLink(tagName) {
	a = document.createElement('a');
	a.href = tagName;
	a.setAttribute('id', 'jobUrl');
	// a.classList.add(tagName);
	return a;
}

function createButton(tagName) {
	btn = document.createElement('button');
	btn.classList.add(tagName);
	btn.setAttribute('id', tagName);
	return btn;
}

function convertTimeToDays(jobPublicationDate) {
	let today = new Date();
	jobPublicationDate = new Date(jobPublicationDate);
	let days = Math.floor((today - jobPublicationDate) / 1000 / 60 / 60 / 24);
	return days;
}

function fromCurrentTime(jobPublicationDate) {
	let days = Math.floor(convertTimeToDays(jobPublicationDate));

	if (days <= 0) return 'Today';
	else if (days > 0 && days < 7) return days + 'd ago';
	else if (days >= 7 && days <= 28) return Math.floor(days / 7) + 'w ago';
	else if (days >= 29) return Math.floor(days / 29) + 'm ago';
}

function displayFilterBoard() {
	let jobFiltersContainer = createDiv('jobFiltersContainer');
	let outFilterContainer = createDiv('outFilterContainer');
	outFilterContainer.setAttribute('id', 'outFilterContainer');
	// let filterContainer = createDiv('filterContainer');
	let clearButton = createClearButton();
	// let jobFilter = createFilterDiv('jobFilter',jobD);

	document.getElementById('jobListings').append(jobFiltersContainer);
	jobFiltersContainer.append(outFilterContainer, clearButton);
	// outFilterContainer.append(filterContainer);
	// filterContainer.append(jobFilter);

	clearButton.addEventListener('click', () => {
		outFilterContainer.innerText = '';
		filteredTags = new Array();
		clearJobListings();
		generateJobCards();
	});
}

// function isJobTagInFilter(jobTags, filter) {
// 	for (let i = 0; i < jobTags.length; i++) {
// 		for (let j = 0; j < jobTags[i].tags.length; j++) {
// 			console.log(jobTags[i].tags);
// 			// if (isInArray(jobTags, filter)) {
// 			// 	return true;
// 			// } else return false;
// 		}
// 	}
// }

function generateJobCards() {
	for (let i = 0; i < jobDatabase.length; i++) {
		generateJobCard(i);
	}
}

function generateJobCard(i) {
	let jobCardContainer = createDiv('jobCardContainer');
	let jobUrl = createLink(jobDatabase[i].url);
	let jobLogo = createDiv('jobLogo');
	let jobListingInfo = createDiv('jobListingInfo');
	let jobCompanyHeader = createDiv('jobCompanyHeader');
	let jobCompanyName = createDiv('jobCompanyName');
	let jobPositionTitle = createDiv('jobPositionTitle');
	let jobDemographics = createDiv('jobDemographics');
	let jobPublishDate = createDiv('jobPublishDate');
	let jobPositionType = createDiv('jobPositionType');
	let jobRegion = createDiv('jobRegion');
	let jobFilterTags = createDiv('jobFilterTags');
	let jobNewPublication = createDiv('jobNewPublication');

	jobCardContainer.setAttribute('id', 'jobCardContainer');

	// document.getElementById
	document.getElementById('jobListings').append(jobCardContainer);

	let logoUrl = jobDatabase[i].company_logo;
	jobLogo.style.backgroundImage = 'url(' + logoUrl + ')';
	jobCompanyName.innerText = jobDatabase[i].company_name;
	jobPositionTitle.innerText = jobDatabase[i].title;
	jobPublishDate.innerText = fromCurrentTime(jobDatabase[i].publication_date);
	jobPositionType.innerText = jobDatabase[i].job_type;
	jobNewPublication.innerText = 'New';
	// jobUrl.innerText = jobDatabase[i].url;

	if ((jobPositionType.innerText = 'full_time')) {
		jobPositionType.innerText = 'Full Time';
	} else if (
		(jobPositionType.innerText = 'freelance') ||
		(jobPositionType.innerText = 'contractor')
	) {
		jobPositionType.innerText = 'Contractor/Freelance';
	} else {
		jobPositionType.innerText = 'N/A';
	}

	jobRegion.innerText = jobDatabase[i].candidate_required_location;

	jobCardContainer.append(jobLogo, jobListingInfo);

	jobListingInfo.appendChild(jobCompanyHeader);

	jobCompanyHeader.appendChild(jobCompanyName);
	if (jobPublishDate.innerText == 'Today') {
		jobCompanyHeader.appendChild(jobNewPublication);
	}

	jobListingInfo.appendChild(jobUrl);
	jobUrl.appendChild(jobPositionTitle);

	jobListingInfo.appendChild(jobDemographics);

	jobDemographics.append(jobPublishDate, jobPositionType, jobRegion);

	jobListingInfo.appendChild(jobFilterTags);

	let jobFiltersArray = changeToLowercase(jobDatabase[i].tags);
	// jobFiltersArray = jobDatabase[i].tags;
	const lowercaseFilters = changeToLowercase(jobFiltersArray);

	let commonTags = getCommonValues(jobTags, lowercaseFilters);
	createFilterButtons(commonTags, jobFilterTags);
}

function clearJobListings() {
	while (
		document.getElementById('jobListings').lastChild.classList !=
		'jobFiltersContainer'
	) {
		document
			.getElementById('jobListings')
			.removeChild(document.getElementById('jobListings').lastChild);
	}
}

function displayJobBoard() {
	if (document.getElementById('outFilterContainer').innerText == '') {
		for (let i = 0; i < jobDatabase.length; i++) {
			generateJobCard(i);
		}
	} else {
		// document.getElementById('jobListings').innerHTML = '';

		// console.log(document.querySelectorAll('#jobCardContainer'));
		clearJobListings();

		for (let i = 0; i < jobDatabase.length; i++) {
			// isJobTagInFilter(jobDatabase[i], filteredTags);
			let resultsArray = new Array();
			let matchedTags = 0;

			for (let j = 0; j < jobDatabase[i].tags.length; j++) {
				// console.log(jobDatabase[i].tags.length);

				let checkTag = isInArray(
					jobDatabase[i].tags[j],
					changeToLowercase(filteredTags)
				);

				resultsArray.push(checkTag);
				if (checkTag == true) matchedTags++;
			}
			// let test = 'true';
			// console.log(resultsArray);

			generateJobCard(i);
			console.log('matched: ', matchedTags, 'filtered: ', filteredTags.length);

			if (matchedTags != filteredTags.length) {
				document.getElementById('jobListings').lastElementChild.remove();
			} else if (!isInArray(true, resultsArray)) {
				document.getElementById('jobListings').lastElementChild.remove();
			}

			// if (!isInArray(true, resultsArray)) {
			// 	break;
			// } else {
			// 	generateJobCards(i);
			// }
		}
	}
}

function filterFunctionality() {
	for (let i = 0; i < jobDatabase.length; i++) {
		let lowerCaseFilters = changeToLowercase(jobDatabase[i].tags);
		let commonTags = getCommonValues(jobTags, lowerCaseFilters);
		jobDatabase[i].tags = commonTags;
		// console.log(jobDatabaseTest[i].tags);
	}
}
