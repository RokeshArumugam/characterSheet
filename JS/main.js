
// Variables

const currentUrlParams = new URLSearchParams(window.location.search);
const CORS_PROXY = "https://circumvent-cors.herokuapp.com/";

const modalTypes = {
	Information: "fa-info-circle",
	Success: "fa-check-circle",
	Warning: "fa-exclamation-triangle",
	Error: "fa-times-circle"
};
const alertTemplateString = `
	<div id="modal" class="modal" role="alertdialog">
		<div id="modal__overlay" class="modal__overlay"></div>
		<div id="modal__box" class="modal__box">
			<i id="modal__icon" class="fas"></i>
			<span id="modal__heading">Alert</span>
			<div id="modal__message"></div>
			<div id="modal__buttonContainer">
				<button class="modal__button primaryButton">Close</button>
			</div>
		</div>
	</div>
`;
const showInfoTemplateString = `
	<div id="modal" class="modal" role="alertdialog">
		<div id="modal__overlay" class="modal__overlay"></div>
		<div id="modal__box" class="modal__box">
			<i id="modal__icon" class="fas"></i>
			<span id="modal__heading">Alert</span>
			<a target="_blank" id="modal__source"></a>
			<div id="modal__prerequisites"></div>
			<div id="modal__message" data-heading="Description"></div>
			<div id="modal__buttonContainer">
				<button class="modal__button primaryButton">Close</button>
			</div>
		</div>
	</div>
`;

const detailTypes = {
	Feat: "feat:(detailUrlName)",
	Subclass: "(className):(detailUrlName)"
};

const skillsForAbilities = {
	"strength": ["athletics"],
	"dexterity": ["acrobatics", "sleightOfHand", "stealth"],
	"intelligence": ["arcana", "history", "investigation", "nature", "religion"],
	"wisdom": ["animalHandling", "insight", "medicine", "perception", "survival"],
	"charisma": ["deception", "intimidation", "performance", "persuasion"]
}

let data = {
	"characterName": "",
	"classAndLevel": "",
	"background": "",
	"playerName": "",
	"race": "",
	"alignment": "",
	"experiencePoints": "",
	"strengthAbilityModifier": 0,
	"strengthAbilityScore": 10,
	"dexterityAbilityModifier": 0,
	"dexterityAbilityScore": 10,
	"constitutionAbilityModifier": 0,
	"constitutionAbilityScore": 10,
	"intelligenceAbilityModifier": 0,
	"intelligenceAbilityScore": 10,
	"wisdomAbilityModifier": 0,
	"wisdomAbilityScore": 10,
	"charismaAbilityModifier": 0,
	"charismaAbilityScore": 10,
	"inspiration": false,
	"proficiencyBonus": 2,
	"strengthSavingThrowProficiencyLevel": 0,
	"strengthSavingThrowModifier": 0,
	"dexteritySavingThrowProficiencyLevel": 0,
	"dexteritySavingThrowModifier": 0,
	"constitutionSavingThrowProficiencyLevel": 0,
	"constitutionSavingThrowModifier": 0,
	"intelligenceSavingThrowProficiencyLevel": 0,
	"intelligenceSavingThrowModifier": 0,
	"wisdomSavingThrowProficiencyLevel": 0,
	"wisdomSavingThrowModifier": 0,
	"charismaSavingThrowProficiencyLevel": 0,
	"charismaSavingThrowModifier": 0,
	"acrobaticsSkillProficiencyLevel": 0,
	"acrobaticsSkillModifier": 0,
	"animalHandlingSkillProficiencyLevel": 0,
	"animalHandlingSkillModifier": 0,
	"arcanaSkillProficiencyLevel": 0,
	"arcanaSkillModifier": 0,
	"athleticsSkillProficiencyLevel": 0,
	"athleticsSkillModifier": 0,
	"deceptionSkillProficiencyLevel": 0,
	"deceptionSkillModifier": 0,
	"historySkillProficiencyLevel": 0,
	"historySkillModifier": 0,
	"insightSkillProficiencyLevel": 0,
	"insightSkillModifier": 0,
	"intimidationSkillProficiencyLevel": 0,
	"intimidationSkillModifier": 0,
	"investigationSkillProficiencyLevel": 0,
	"investigationSkillModifier": 0,
	"medicineSkillProficiencyLevel": 0,
	"medicineSkillModifier": 0,
	"natureSkillProficiencyLevel": 0,
	"natureSkillModifier": 0,
	"perceptionSkillProficiencyLevel": 0,
	"perceptionSkillModifier": 0,
	"performanceSkillProficiencyLevel": 0,
	"performanceSkillModifier": 0,
	"persuasionSkillProficiencyLevel": 0,
	"persuasionSkillModifier": 0,
	"religionSkillProficiencyLevel": 0,
	"religionSkillModifier": 0,
	"sleightOfHandSkillProficiencyLevel": 0,
	"sleightOfHandSkillModifier": 0,
	"stealthSkillProficiencyLevel": 0,
	"stealthSkillModifier": 0,
	"survivalSkillProficiencyLevel": 0,
	"survivalSkillModifier": 0,
	"armorClass": 10,
	"initiative": 0,
	"speed": 30,
	"hitPointMaximum": 0,
	"currentHitPoints": 0,
	"temporaryHitPoints": 0,
	"totalHitDice": "",
	"currentHitDice": "",
	"deathSaveSuccesses": 0,
	"deathSaveFailures": 0,
	"personalityTraits": "",
	"ideals": "",
	"bonds": "",
	"flaws": "",
	"attacksNotes": "",
	"featuresAndTraits": "",
	"passivePerception": "",
	"otherProficienciesAndLanguages": "",
	"copperPieces": 0,
	"silverPieces": 0,
	"electrumPieces": 0,
	"goldPieces": 0,
	"platinumPieces": 0,
	"equipmentNotes": ""
};
let searchedDetails = {};

// Utility Functions

function getAbilityModifierForScore(score) {
	return Math.floor((score - 10) / 2);
};

function getTitleCase(text) {
	return text.replaceAll(
		/\w\S*/g,
		(word, offset) => {
			if (offset && ["a", "an", "the", "of"].includes(word.toLowerCase()))
				return word.toLowerCase()
			return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
		}
	);
}

function getDetailUrlNameForDetailName(detailName) {
	return detailName.toLowerCase().replaceAll(" ", "-")
};

function getSanitizedHtmlWithLinksFromMarkdown(html) {
	let elem = document.createElement("div");
	elem.innerText = html;
	for (const link of elem.innerHTML.matchAll(/\[(.+?)\]\((.+?)\)/g)) {
		let tmpElem = document.createElement("div");

		tmpElem.innerHTML = link[2];
		let linkHref = tmpElem.innerText;

		tmpElem.innerHTML = link[1];
		let linkText = tmpElem.innerText;

		elem.innerHTML = elem.innerHTML.replace(link[0], "<a target='_blank' href='" + linkHref + "'>" + linkText + "</a>");
	};
	return elem.innerHTML
};

function createModal(templateString, message, type, heading) {
	let modalElem = new DOMParser().parseFromString(templateString, "text/html");
	let messageElem = modalElem.getElementById("modal__message");

	modalElem.getElementById("modal__icon").classList.add(type);

	modalElem.getElementById("modal__heading").innerText = heading;

	if (typeof message !== "string")
		message = String(message);

	let parentElements = [messageElem];
	for (let line of message.split("\n")) {
		let childElem;
		if (line.startsWith("| ")) {
			if (parentElements.at(-1).tagName != "TABLE") {
				parentElements = [parentElements[0]];
				parentElements.push(document.createElement("table"));
				parentElements.at(-2).appendChild(parentElements.at(-1));
			};
			childElem = document.createElement("tr");
			for (const cellText of line.substring(2, line.length - 2).split(" | ")) {
				let cellElem = document.createElement(parentElements.at(-1).rows.length ? "td" : "th");
				cellElem.innerHTML = getSanitizedHtmlWithLinksFromMarkdown(cellText);
				childElem.appendChild(cellElem);
			};
		} else if (line.startsWith("#")) {
			let numHashes = line.match("^#+")[0].length;
			childElem = document.createElement("h" + numHashes);
			childElem.innerHTML = getSanitizedHtmlWithLinksFromMarkdown(line.substring(numHashes + 1));
		} else if (line.startsWith("* ")) {
			if (parentElements.at(-1).tagName != "UL") {
				parentElements = [parentElements[0]];
				parentElements.push(document.createElement("ul"));
				parentElements.at(-2).appendChild(parentElements.at(-1));
			};
			childElem = document.createElement("li");
			childElem.innerHTML = getSanitizedHtmlWithLinksFromMarkdown(line.substring(2));
		} else {
			if (parentElements.length > 1)
				parentElements = [parentElements[0]];
			childElem = document.createElement("p");
			childElem.innerHTML = getSanitizedHtmlWithLinksFromMarkdown(line);
		};
		parentElements.at(-1).appendChild(childElem);
	};

	modalElem = modalElem.body.firstChild;
	modalElem.addEventListener("click", evt => {
		if (evt.target.classList.contains("modal__button")) {
			modalElem.remove();
		};
	});
	return modalElem;
};

window.alert = (message, type = modalTypes.Information, heading) => {
	if (!heading) {
		heading = Object.keys(modalTypes).find(key => modalTypes[key] === type);
	};
	return new Promise((resolve, reject) => {
		let modalElem = createModal(alertTemplateString, message, type, heading);
		modalElem.getElementsByClassName("modal__button")[0].addEventListener("click", () => {
			resolve(undefined);
		});
		document.body.appendChild(modalElem);
	})
};

window.showInfo = (message, heading = "Information", sourceLink, sourceText, prerequisites = []) => {
	return new Promise((resolve, reject) => {
		let modalElem = createModal(showInfoTemplateString, message, modalTypes.Information, heading);

		if (sourceLink) {
			let sourceElem = modalElem.querySelector("#modal__source");
			sourceElem.href = sourceLink;
			sourceElem.innerText = "Source: " + (sourceText || sourceLink);
		};

		if (prerequisites.length) {
			let prerequisitesElem = modalElem.querySelector("#modal__prerequisites");
			let listElem = document.createElement("ul");
			for (const prerequisite of prerequisites) {
				let listItemElem = document.createElement("li");
				listItemElem.innerText = prerequisite;
				listElem.appendChild(listItemElem);
			};
			prerequisitesElem.appendChild(listElem);
		};

		modalElem.getElementsByClassName("modal__button")[0].addEventListener("click", () => {
			resolve(undefined);
		});
		document.body.appendChild(modalElem);
	})
};

// Main Functions

function updateDataValueAndInput(id, value) {
	data[id] = value;
	const elem = document.getElementById(id);
	if (elem.type == "checkbox")
		elem.checked = value
	else {
		if (["doubleCheckbox", "tripleCheckbox"].includes(elem.name))
			elem.setAttribute("value", value)
		if ((elem.type == "text") && (typeof value == "number") && (value > 0))
			value = "+" + value;
		elem.value = value;
	};
	if (id == "featuresAndTraits")
		checkForDetail(value);
};

function importDataFromUrl() {
	const keys = Object.keys(data);
	let values = Object.values(data);
	if (currentUrlParams.has("values"))
		values = JSON.parse(atob(currentUrlParams.get("values")));
	for (let i = 0; i < values.length; i++) {
		updateDataValueAndInput(keys[i], values[i]);
	};
};

function exportDataToUrl() {
	return window.location.origin + window.location.pathname + "?values=" + btoa(JSON.stringify(Object.values(data)));
};

function updateSavingThrowModifier(abilityName) {
	updateDataValueAndInput(
		abilityName + "SavingThrowModifier",
		data[abilityName + "AbilityModifier"] + (data[abilityName + "SavingThrowProficiencyLevel"] * data["proficiencyBonus"])
	);
};

function updateSkillModifier(skillName) {
	updateDataValueAndInput(
		skillName + "SkillModifier",
		data[Object.keys(skillsForAbilities).filter(key => skillsForAbilities[key].includes(skillName)) + "AbilityModifier"] + (data[skillName + "SkillProficiencyLevel"] * data["proficiencyBonus"])
	);
};

function updateAbilityDependentModifiers(abilityName) {
	updateSavingThrowModifier(abilityName);
	for (const skillName of skillsForAbilities[abilityName]) {
		updateSkillModifier(skillName)
	};
};

function updateProficiencyDependentModifiers() {
	for (const [abilityName, skillNames] of Object.entries(skillsForAbilities)) {
		updateSavingThrowModifier(abilityName);
		for (const skillName of skillNames) {
			updateSkillModifier(skillName);
		};
	};
};

function updateAbilityModifier(abilityName) {
	updateDataValueAndInput(
		abilityName + "AbilityModifier",
		getAbilityModifierForScore(data[abilityName + "AbilityScore"])
	);
	updateAbilityDependentModifiers(abilityName);
};

function rollDie(sides) {
	return Math.floor(Math.random() * sides) + 1;
};

function roll(expression) {
	expression = expression.toLowerCase().replaceAll(/\s/g, "").replaceAll(/([\+\-\*])/g, " $1 ").replace(/^ (.) /, "$1");
	if (expression.match(/[^d\d\+\-\* ]/)) {
		console.log("Invalid Roll: Only digits and 'd+-* ' are allowed.");
		return;
	};

	console.log(expression);
	expression = expression.replaceAll(/(\d*)d(\d+)/g, (_, p1, p2) => {
		let rolls = [];
		for (let i = 0; i < p1; i++) {
			rolls.push(rollDie(p2));
		};
		return rolls.join("+");
	});
	console.log(expression);

	return eval(expression);
};

function showDetailInfo(detailName, detailUrlName) {
	showInfo(
		searchedDetails[detailUrlName]["description"],
		detailName,
		searchedDetails[detailUrlName]["url"],
		searchedDetails[detailUrlName]["source"],
		searchedDetails[detailUrlName]["prerequisites"]
	);
};

function addDetailButton(detailName, detailUrlName) {
	let detailButtonElem = document.createElement("div");
	detailButtonElem.id = "detailButton-" + detailUrlName;
	detailButtonElem.classList.add("featuresAndTraits__detailButton")
	detailButtonElem.classList.add("primaryButton")
	detailButtonElem.addEventListener("click", evt => {
		if (evt.target.tagName != "I")
			showDetailInfo(detailName, detailUrlName);
	});

	let detailButtonTextElem = document.createElement("span");
	detailButtonTextElem.innerText = detailName;
	detailButtonElem.appendChild(detailButtonTextElem);

	let detailButtonCloseElem = document.createElement("i");
	detailButtonCloseElem.classList.add("fas")
	detailButtonCloseElem.classList.add("fa-close")
	detailButtonCloseElem.addEventListener("click", _ => detailButtonElem.remove());
	detailButtonElem.appendChild(detailButtonCloseElem);

	document.getElementsByClassName("featuresAndTraits__detailButtonsContainer")[0].appendChild(detailButtonElem);
}

async function searchAndAddDetail(detailName) {
	detailName = getTitleCase(detailName);
	const detailUrlName = getDetailUrlNameForDetailName(detailName);
	const classAndLevel = document.getElementById("classAndLevel").value;
	const className = getDetailUrlNameForDetailName(classAndLevel.match(/^\S*/)[0]);

	for (const detailType in detailTypes) {
		let urlPathname = detailTypes[detailType];
		for (const variable of urlPathname.matchAll(/\((.*?)\)/g)) {
			let variableValue = eval(variable[1]);
			urlPathname = urlPathname.replace(variable[0], variableValue);
		};

		const url = "http://dnd5e.wikidot.com/" + urlPathname;
		await fetch(
			CORS_PROXY + (url)
		).then((response) => {
			if (response.status == 200)
				return response.text();
			else if (response.status == 404)
				return null
			else
				console.error("Status Code: " + response.status);
		}).then((data) => {
			if (!data)
				return

			let contentElem = new DOMParser().parseFromString(data, "text/html").getElementById("page-content");

			let source = "";
			for (const elem of contentElem.getElementsByTagName("p")) {
				if (!(elem.innerText.startsWith("Source: ")))
					continue;
				source = elem.innerText.substring("Source: ".length);
				elem.remove()
			};

			let prerequisites = [];
			if (contentElem.firstElementChild.innerText.startsWith("Prerequisite: ")) {
				prerequisites = contentElem.firstElementChild.innerText.substring("Prerequisite: ".length).split(",");
				contentElem.firstElementChild.remove();
			};

			for (let i = 1; i <= 3; i++) {
				for (const elem of contentElem.getElementsByTagName("h" + i)) {
					elem.innerText = "#".repeat(i) + " " + elem.innerText.trim();
				};
			};
			for (const elem of contentElem.getElementsByTagName("a")) {
				elem.innerText = "[" + elem.innerText.trim() + "](" + elem.href + ")";
			};
			for (const elem of contentElem.getElementsByTagName("li")) {
				elem.innerText = "* " + elem.innerText.trim();
			};
			for (const elem of contentElem.getElementsByTagName("table")) {
				elem.innerText = [...elem.rows].slice(1).map(row => {
					return "| " + [...row.cells].map(cell => {
						return cell.innerText.trim().replaceAll("\n", " ").replaceAll("|", "!")
					}).join(" | ") + " |"
				}).join("\n");
			};

			let description = contentElem.innerText.trim().replaceAll(/\n\n+/g, "\n");

			searchedDetails[detailUrlName] = {
				"detailType": detailType,
				"description": description,
				"prerequisites": prerequisites,
				"source": source,
				"url": url
			};

			addDetailButton(detailName, detailUrlName);
		}).catch(err => {
			console.error(err);
		});
		if ((Object.keys(searchedDetails[detailUrlName]).length) || !className)
			break;
	};
};

function checkForDetail(text) {
	for (const detail of text.matchAll(/(^|\n)([\w ]+)(:| - ).*$/g)) {
		const detailName = detail[2].replaceAll("(", "").replaceAll(")", "");
		const detailUrlName = getDetailUrlNameForDetailName(detailName);
		if (detailUrlName in searchedDetails) {
			if (!(document.getElementById("detailButton-" + detailUrlName)) && Object.keys(searchedDetails[detailUrlName]).length)
				addDetailButton(detailName, detailUrlName);
		} else {
			searchedDetails[detailUrlName] = {};
			searchAndAddDetail(detailName);
		};
	};
};

// Event Listeners

for (const elem of document.getElementsByTagName("input")) {
	if (elem.id)
		elem.addEventListener("input", _ => {
			if (!elem.validity.valid)
				return
			if (elem.type == "checkbox")
				data[elem.id] = elem.checked;
			else
				data[elem.id] = (typeof data[elem.id] == "number") ? Number(elem.value) : elem.value;
		});
};
for (const elem of document.getElementsByClassName("ability__score")) {
	elem.addEventListener("input", _ => {
		if (!elem.validity.valid)
			return
		updateAbilityModifier(elem.id.substring(0, elem.id.length - "AbilityScore".length));
	});
};
for (const elem of document.getElementsByClassName("ability__modifier")) {
	elem.addEventListener("input", _ => {
		if (!elem.validity.valid)
			return
		updateAbilityDependentModifiers(elem.id.substring(0, elem.id.length - "AbilityModifier".length));
	});
};
document.getElementById("proficiencyBonus").addEventListener("input", evt => {
	if (!evt.target.validity.valid)
		return
	updateProficiencyDependentModifiers();
});
document.querySelectorAll("[name='doubleCheckbox'] + label").forEach(elem => {
	elem.addEventListener("click", _ => {
		const inputElem = elem.previousElementSibling;
		const newValue = (inputElem.value + 1) % 3;
		inputElem.setAttribute("value", newValue);
		inputElem.value = newValue;
		data[inputElem.id] = newValue;

		if (inputElem.id.includes("SavingThrow")) {
			updateSavingThrowModifier(
				inputElem.id.substring(0, inputElem.id.length - "SavingThrowProficiencyLevel".length)
			);
		} else {
			updateSkillModifier(
				inputElem.id.substring(0, inputElem.id.length - "SkillProficiencyLevel".length)
			);
		};
	});
});
document.querySelectorAll("[name='tripleCheckbox'] ~ label").forEach((elem, index) => {
	elem.addEventListener("click", _ => {
		let inputElem = elem.previousElementSibling;
		for (let i = 0; i < (index % 3); i++) {
			inputElem = inputElem.previousElementSibling;
		};

		let newValue = (index % 3) + 1;
		newValue = (inputElem.value == newValue) ? 0 : newValue;

		inputElem.setAttribute("value", newValue);
		inputElem.value = newValue;
		data[inputElem.id] = newValue;
	});
});
document.getElementById("featuresAndTraits").addEventListener("input", evt => {
	checkForDetail(evt.target.value);
});

// Main

importDataFromUrl();