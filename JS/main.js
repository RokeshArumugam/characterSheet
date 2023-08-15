
// Variables

const modalTemplates = {
	"alert": `
		<dialog id="modal" role="alertdialog">
			<i id="modal__icon" class="fas"></i>
			<span id="modal__heading">Alert</span>
			<div id="modal__message"></div>
			<div id="modal__buttonContainer">
				<button class="modal__button primaryButton">Close</button>
			</div>
		</dialog>
	`,
	"prompt": `
		<dialog id="modal" role="alertdialog">
			<i id="modal__icon" class="fas"></i>
			<span id="modal__heading">Prompt</span>
			<div id="modal__message"></div>
			<input type="text" id="modal__field">
			<div id="modal__buttonContainer">
				<button id="modal__button--cancel" class="modal__button primaryButton">Cancel</button>
				<button id="modal__button--ok" class="modal__button primaryButton">OK</button>
			</div>
		</dialog>
	`,
	"detailInfo": `
		<dialog id="modal" role="alertdialog">
			<i id="modal__icon" class="fas"></i>
			<span id="modal__heading">Alert</span>
			<a target="_blank" id="modal__source"></a>
			<div id="modal__prerequisites"></div>
			<div id="modal__message" data-heading="Description"></div>
			<div id="modal__buttonContainer">
				<button class="modal__button primaryButton">Close</button>
			</div>
		</dialog>
	`,
	"save": `
		<dialog id="modal" role="alertdialog">
			<i id="modal__icon" class="fas"></i>
			<span id="modal__heading">Alert</span>
			<div id="modal__message"></div>
			<div id="modal__buttonContainer">
				<button id="modal__button--cancel" class="modal__button primaryButton">Cancel</button>
				<button id="modal__button--download" class="modal__button primaryButton">Download</button>
			</div>
		</dialog>
	`,
	"welcome": `
		<dialog id="modal" role="alertdialog">
			<i id="modal__icon" class="fas"></i>
			<span id="modal__heading">Alert</span>
			<div id="modal__message" data-heading="Welcome to Character Sheet!"></div>
			<input id="modal__characterSheetFileInput" type="file" accept=".characterSheet">
			<ul id="modal__characterSheetList"></ul>
			<div id="modal__buttonContainer">
				<button class="modal__button primaryButton">Start a New Character</button>
			</div>
		</dialog>
	`
};

const CORS_PROXY = "https://corsproxy.io/?";
const pathnamesForDetailType = {
	"Class": ["(detailUrlName)"],
	"Background": ["background:(detailUrlName)"],
	"Race": ["(mainRaceUrlName)"],
	"Subclass": ["(classUrlName):(detailUrlName)"],
	"Feat": ["feat:(detailUrlName)", "feat:(detailUrlName)-ua"]
};

const skillsForAbilities = {
	"strength": ["athletics"],
	"dexterity": ["acrobatics", "sleightOfHand", "stealth"],
	"constitution": [],
	"intelligence": ["arcana", "history", "investigation", "nature", "religion"],
	"wisdom": ["animalHandling", "insight", "medicine", "perception", "survival"],
	"charisma": ["deception", "intimidation", "performance", "persuasion"]
}
const minimumWeaponRows = 3;

let existingCharacterSheetIds = Object.keys(localStorage);
let characterSheetId;
do characterSheetId = String(Math.random());
while (existingCharacterSheetIds.includes(characterSheetId));
const emptyCharacterSheetData = {
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
	"weapons": Array(minimumWeaponRows).fill(["", "", ""]),
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
let characterSheetData = Object.assign({}, emptyCharacterSheetData);
let searchedDetails = {};

// Utility Functions

function showModal(options) {
	return new Promise((resolve, reject) => {
		options["template"] ??= modalTemplates["alert"];
		let modalElem = new DOMParser().parseFromString(options["template"], "text/html");
		let messageElem = modalElem.getElementById("modal__message");

		modalElem.getElementById("modal__icon").classList.add(options["icon"] ?? "fa-info-circle");

		modalElem.getElementById("modal__heading").innerText = options["heading"] ?? "Information";

		if (typeof options["message"] !== "string") options["message"] = String(options["message"]);

		let parentElements = [messageElem];
		for (let line of options["message"].split("\n")) {
			let childElem;
			if (line.startsWith("| ")) {
				if (parentElements.at(-1).tagName != "TABLE") {
					parentElements = [parentElements[0]];
					parentElements.push(document.createElement("table"));
					parentElements.at(-2).appendChild(parentElements.at(-1));
				};
				childElem = document.createElement("tr");
				for (let cellText of line.substring(2, line.length - 2).split(" | ")) {
					let cellElem = document.createElement(parentElements.at(-1).rows.length ? "td" : "th");
					cellElem.innerHTML = sanitizeHtmlAndConvertMarkdownLinks(cellText);
					childElem.appendChild(cellElem);
				};
			} else if (line.startsWith("#")) {
				if (parentElements.length > 1) parentElements = [parentElements[0]];
				let numHashes = line.match("^#+")[0].length;
				childElem = document.createElement("h" + (numHashes + 1));
				childElem.innerHTML = sanitizeHtmlAndConvertMarkdownLinks(line.substring(numHashes + 1));
			} else if (line.startsWith("* ")) {
				if (parentElements.at(-1).tagName != "UL") {
					parentElements = [parentElements[0]];
					parentElements.push(document.createElement("ul"));
					parentElements.at(-2).appendChild(parentElements.at(-1));
				};
				childElem = document.createElement("li");
				childElem.innerHTML = sanitizeHtmlAndConvertMarkdownLinks(line.substring(2));
			} else {
				if (parentElements.length > 1) parentElements = [parentElements[0]];
				childElem = document.createElement("p");
				childElem.innerHTML = sanitizeHtmlAndConvertMarkdownLinks(line);
			};
			parentElements.at(-1).appendChild(childElem);
		};

		switch (options["template"]) {
			case modalTemplates["prompt"]:
				let modalFieldElem = modalElem.getElementById("modal__field");
				let modalOkElem = modalElem.getElementById("modal__button--ok");
				if (options["defaultPromptText"])
					modalFieldElem.value = options["defaultPromptText"];
				modalFieldElem.addEventListener("keyup", evt => {
					if (evt.key != "Enter") return;
					evt.preventDefault();
					modalOkElem.click();
				});
				modalOkElem.addEventListener("click", evt => {
					evt.target.parentElement.parentElement.close();
					resolve(modalFieldElem.value);
				});
				break;
			case modalTemplates["detailInfo"]:
				if (options["sourceLink"]) {
					let sourceElem = modalElem.getElementById("modal__source");
					sourceElem.href = options["sourceLink"];
					sourceElem.innerText = "Source: " + (options["sourceText"] || options["sourceLink"]);
				};
				if (options["prerequisites"]?.length) {
					let prerequisitesElem = modalElem.getElementById("modal__prerequisites");
					let listElem = document.createElement("ul");
					for (let prerequisite of prerequisites) {
						let listItemElem = document.createElement("li");
						listItemElem.innerText = prerequisite;
						listElem.appendChild(listItemElem);
					};
					prerequisitesElem.appendChild(listElem);
				};
				break;
			case modalTemplates["save"]:
				modalElem.getElementById("modal__button--download").addEventListener("click", evt => {
					evt.target.parentElement.parentElement.close();
					resolve(true);
				});
				break;
			case modalTemplates["welcome"]:
				modalElem.getElementById("modal__characterSheetFileInput").addEventListener("input", inputEvt => {
					let reader = new FileReader();
					reader.addEventListener("load", loadEvt => {
						try {
							characterSheetData = JSON.parse(loadEvt.target.result);
							inputEvt.target.parentElement.close();
							resolve(null);
						} catch (error) {
							inputEvt.target.setCustomValidity("File contents are invalid");
							inputEvt.target.reportValidity();
						};
					});
					reader.readAsText(inputEvt.target.files[0]);
				});

				let timeFormatter = new Intl.RelativeTimeFormat("en-gb", { numeric: "auto" })
				let characterSheetListElem = modalElem.getElementById("modal__characterSheetList");
				existingCharacterSheetIds.map(
					id => [id, JSON.parse(localStorage.getItem(id))]
				).sort(
					(a, b) => b[1]["lastAutosave"] - a[1]["lastAutosave"]
				).forEach(([existingCharacterSheetId, existingCharacterSheetData]) => {
					let liElem = document.createElement("li");
					liElem.classList.add("modal__characterSheet");

					let buttonElem = document.createElement("div");
					buttonElem.classList.add("modal__characterSheetButton", "primaryButton");
					buttonElem.addEventListener("click", evt => {
						characterSheetId = existingCharacterSheetId;
						characterSheetData = existingCharacterSheetData;
						evt.target.parentElement.parentElement.parentElement.close()
						resolve(null);
					});
					liElem.appendChild(buttonElem);

					let nameElem = document.createElement("span");
					nameElem.classList.add("modal__characterName");
					nameElem.innerText = existingCharacterSheetData["characterName"] || "Unamed character";
					buttonElem.appendChild(nameElem);

					let descriptionElem = document.createElement("span");
					descriptionElem.classList.add("modal__characterDescription");
					descriptionElem.innerText = (existingCharacterSheetData["race"] || "<unknown race>") + ", " + (existingCharacterSheetData["classAndLevel"] || "<unknown class and level>");
					buttonElem.appendChild(descriptionElem);

					let metadataElem = document.createElement("div");
					metadataElem.classList.add("modal__characterSheetMetadata");

					let timestampElem = document.createElement("span");
					timestampElem.classList.add("modal__characterSheetLastSave");

					let seconds = Math.round((Date.now() - existingCharacterSheetData["lastAutosave"]) / 1000);
					let timeUnitLimits = [
						[60, "seconds"],
						[60 * 60, "minutes"],
						[60 * 60 * 24, "hours"],
						[60 * 60 * 24 * 30.5, "days"],
						[60 * 60 * 24 * 365, "months"],
						[60 * 60 * 24 * 365 * 999, "years"],
					];
					for (let i = 0; i < timeUnitLimits.length; i++) {
						if (seconds >= timeUnitLimits[i][0]) continue;
						timestampElem.innerText = "Last saved " + timeFormatter.format(
							-Math.round(seconds / (timeUnitLimits[i - 1] ?? [1, ""])[0]),
							timeUnitLimits[i][1]
						);
						break;
					};
					metadataElem.appendChild(timestampElem);

					let deleteElem = document.createElement("i");
					deleteElem.classList.add("fas", "fa-trash-can", "modal__characterSheetDelete")
					deleteElem.addEventListener("click", evt => {
						evt.target.parentElement.parentElement.remove();
						localStorage.removeItem(existingCharacterSheetId);
					});
					metadataElem.appendChild(deleteElem);

					liElem.appendChild(metadataElem);
					characterSheetListElem.appendChild(liElem);
				});
				break;
			default:
				break;
		};

		modalElem.getElementsByClassName("modal__button")[0].addEventListener("click", evt => {
			evt.target.parentElement.parentElement.close();
			resolve(null);
		});

		modalElem = modalElem.body.firstChild;
		modalElem.addEventListener("close", () => modalElem.remove());
		modalElem.addEventListener("cancel", () => resolve(null));

		document.body.appendChild(modalElem);
		modalElem.showModal();
	});
};
window.alert = (message, heading, icon) => {
	return showModal({ message, heading, icon })
};
window.prompt = (message, heading = "Prompt", defaultText = "") => {
	return showModal({
		"template": modalTemplates["prompt"],
		message,
		heading,
		"icon": "fa-question-circle",
		"defaultPromptText": defaultText
	})
};

String.prototype.toSmartTitleCase = function () {
	return this.replace(
		/\w\S*/g,
		(word, offset) => {
			if (offset && ["a", "an", "the", "of"].includes(word.toLowerCase()))
				return word.toLowerCase()
			return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
		}
	);
}

function getDetailUrlNameForDetailName(detailName) {
	return detailName.toLowerCase().replace(/[\(\)]/g, "").replaceAll(" ", "-")
};

function sanitizeHtmlAndConvertMarkdownLinks(html) {
	let elem = document.createElement("div");
	elem.innerText = html;
	for (let link of elem.innerHTML.matchAll(/\[(.+?)\]\((.+?)\)/g)) {
		let tmpElem = document.createElement("div");

		tmpElem.innerHTML = link[2];
		let linkHref = tmpElem.innerText;

		tmpElem.innerHTML = link[1];
		let linkText = tmpElem.innerText;

		elem.innerHTML = elem.innerHTML.replace(link[0], "<a target='_blank' href='" + linkHref + "'>" + linkText + "</a>");
	};
	return elem.innerHTML
};

// Main Functions

// -- Data Manipulation and Population

function autosaveCharacterSheet() {
	if (JSON.stringify(characterSheetData) == JSON.stringify(emptyCharacterSheetData)) return;
	characterSheetData["lastAutosave"] = Date.now();
	localStorage.setItem(characterSheetId, JSON.stringify(characterSheetData));
};

function addWeaponRow(weaponData) {
	let weaponsElem = document.getElementById("weapons");

	let rowElem = document.createElement("tr");
	rowElem.classList.add("weapon__row")

	let nameElem = document.createElement("td");
	let nameInputElem = document.createElement("input");
	nameInputElem.type = "text";
	nameInputElem.classList.add("weapon__name");
	nameInputElem.value = weaponData[0];
	nameInputElem.addEventListener("input", inputEventListener);
	nameElem.appendChild(nameInputElem);
	rowElem.appendChild(nameElem);

	let atkBonusElem = document.createElement("td");
	let atkBonusInputElem = document.createElement("input");
	atkBonusInputElem.type = "text";
	atkBonusInputElem.pattern = "[\\+\\-]?\\d*";
	atkBonusInputElem.classList.add("weapon__atkBonus");
	atkBonusInputElem.value = weaponData[1];
	atkBonusInputElem.addEventListener("input", inputEventListener);
	atkBonusElem.appendChild(atkBonusInputElem);
	rowElem.appendChild(atkBonusElem);

	let damageOrTypeElem = document.createElement("td");
	let damageOrTypeInputElem = document.createElement("input");
	damageOrTypeInputElem.type = "text";
	damageOrTypeInputElem.classList.add("weapon__damageOrType");
	damageOrTypeInputElem.value = weaponData[2];
	damageOrTypeInputElem.addEventListener("input", inputEventListener);
	damageOrTypeElem.appendChild(damageOrTypeInputElem);
	rowElem.appendChild(damageOrTypeElem);

	weaponsElem.appendChild(rowElem)
};

function updateDataValueAndInput(id, value) {
	characterSheetData[id] = value;
	autosaveCharacterSheet();

	let elem = document.getElementById(id);

	if (elem.id == "lastAutosave") {
		let datetimeString = new Date(value).toLocaleString("en-gb").slice(0, -3);
		if (datetimeString.slice(0, 10) == new Date().toLocaleString("en-gb").slice(0, 10))
			datetimeString = datetimeString.slice(12)
		else
			datetimeString = datetimeString.slice(0, 6) + datetimeString.slice(8)
		elem.innerText = "Last autosave: " + datetimeString;
	} else if (elem.type == "checkbox")
		elem.checked = value
	else if (elem.id == "weapons") {
		document.getElementById("weapons").innerHTML = "";
		value.forEach(weaponData => addWeaponRow(weaponData));
	} else {
		if (["doubleCheckbox", "tripleCheckbox"].includes(elem.name))
			elem.setAttribute("value", value)
		if ((elem.type == "text") && (typeof value == "number") && (value > 0))
			value = "+" + value;
		elem.value = value;
	};
	switch (id) {
		case "classAndLevel":
			checkForDetail(id, ["Class"]);
			break;
		case "background":
			checkForDetail(id, ["Background"]);
			break;
		case "race":
			checkForDetail(id, ["Race"]);
			break;
		case "featuresAndTraits":
			checkForDetail(id, ["Subclass", "Feat"]);
			break;
		default:
			break;
	}
};

// -- Updating Modifiers

function updateSavingThrowModifier(abilityName) {
	updateDataValueAndInput(
		abilityName + "SavingThrowModifier",
		characterSheetData[abilityName + "AbilityModifier"] + (characterSheetData[abilityName + "SavingThrowProficiencyLevel"] * characterSheetData["proficiencyBonus"])
	);
};

function updateSkillModifier(skillName) {
	updateDataValueAndInput(
		skillName + "SkillModifier",
		characterSheetData[Object.keys(skillsForAbilities).filter(key => skillsForAbilities[key].includes(skillName)) + "AbilityModifier"] + (characterSheetData[skillName + "SkillProficiencyLevel"] * characterSheetData["proficiencyBonus"])
	);
};

function updateAbilityDependentModifiers(abilityName) {
	updateSavingThrowModifier(abilityName);
	skillsForAbilities[abilityName].forEach(skillName => updateSkillModifier(skillName));
};

function updateProficiencyDependentModifiers() {
	Object.entries(skillsForAbilities).forEach(([abilityName, skillNames]) => {
		updateSavingThrowModifier(abilityName);
		skillNames.forEach(skillName => updateSkillModifier(skillName))
	});
};

function updateAbilityModifier(abilityName) {
	updateDataValueAndInput(
		abilityName + "AbilityModifier",
		Math.floor((characterSheetData[abilityName + "AbilityScore"] - 10) / 2)
	);
	updateAbilityDependentModifiers(abilityName);
};

// -- Details

function addDetailButtonIfNotExist(detailName, detailUrlName) {
	if (document.getElementById("detailButton-" + detailUrlName)) return;

	let detailButtonElem = document.createElement("div");
	detailButtonElem.id = "detailButton-" + detailUrlName;
	detailButtonElem.classList.add("featuresAndTraits__detailButton", "primaryButton");
	detailButtonElem.addEventListener("click", evt => {
		if (evt.target.tagName == "I") return;
		showModal({
			"template": modalTemplates["detailInfo"],
			"message": searchedDetails[detailUrlName]["description"],
			"heading": detailName,
			"sourceLink": searchedDetails[detailUrlName]["url"],
			"sourceText": searchedDetails[detailUrlName]["source"],
			"prerequisites": searchedDetails[detailUrlName]["prerequisites"]
		});
	});

	let detailButtonTextElem = document.createElement("span");
	detailButtonTextElem.innerText = detailName;
	detailButtonElem.appendChild(detailButtonTextElem);

	let detailButtonCloseElem = document.createElement("i");
	detailButtonCloseElem.classList.add("fas", "fa-close");
	detailButtonCloseElem.addEventListener("click", _ => detailButtonElem.remove());
	detailButtonElem.appendChild(detailButtonCloseElem);

	document.getElementsByClassName("featuresAndTraits__detailButtonsContainer")[0].appendChild(detailButtonElem);
}

async function searchAndAddDetail(detailName, detailTypes) {
	detailName = detailName.toSmartTitleCase();
	let detailUrlName = getDetailUrlNameForDetailName(detailName);

	let classUrlName = "";
	let mainRaceName = "";
	let mainRaceUrlName = "";
	if (detailTypes.includes("Subclass")) {
		classUrlName = getDetailUrlNameForDetailName(
			document.getElementById("classAndLevel").value.match(/^\S*/)[0]
		);
	} else if (detailTypes.includes("Race")) {
		mainRaceName = detailName.match(/\S*$/g)[0].toSmartTitleCase();
		mainRaceUrlName = getDetailUrlNameForDetailName(mainRaceName);
	};

	if (detailUrlName in searchedDetails) {
		if (Object.keys(searchedDetails[detailUrlName]).length)
			addDetailButtonIfNotExist(detailName, detailUrlName);
		return;
	};
	searchedDetails[detailUrlName] = {};

	let checkedUrls = [];
	for (let detailType of detailTypes) {
		if ((detailType == "Subclass") && !classUrlName) continue;

		let urls = [];
		for (let urlPathname of pathnamesForDetailType[detailType]) {
			for (let variable of urlPathname.matchAll(/\((.*?)\)/g)) {
				let variableValue = eval(variable[1]);
				urlPathname = urlPathname.replace(variable[0], variableValue);
			};
			let url = "http://dnd5e.wikidot.com/" + urlPathname;
			if (checkedUrls.includes(url)) continue;
			urls.push(url);
			checkedUrls.push(url);
		};

		for (let url of urls) {
			await fetch(CORS_PROXY + url)
				.then((response) => {
					if (response.status == 200) return response.text();
					else if (response.status == 404) return null;
					else console.error("Status Code: " + response.status);
				}).then((data) => {
					if (!data) return;

					let contentElem = new DOMParser().parseFromString(data, "text/html").getElementById("page-content");

					contentElem.querySelector("#toc")?.remove();

					let source = "";
					for (let elem of contentElem.getElementsByTagName("p")) {
						if (!(elem.innerText.startsWith("Source: "))) continue;
						source = elem.innerText.substring("Source: ".length);
						elem.remove()
					};

					let prerequisites = [];
					if (contentElem.firstElementChild.innerText.startsWith("Prerequisite: ")) {
						prerequisites = contentElem.firstElementChild.innerText.substring("Prerequisite: ".length).split(",");
						contentElem.firstElementChild.remove();
					};

					if (detailType == "Race") {
						let rowElems = [...contentElem.getElementsByClassName("row")].slice(1);
						let wholeRaceName = detailName.trim().toLowerCase();
						let subraceRowElem = rowElems.find(row => row.querySelector("h3 > span").innerText.trim().toLowerCase() == wholeRaceName);
						if (subraceRowElem)
							rowElems.forEach(rowElem => { if (rowElem != subraceRowElem) rowElem.remove() });
						else {
							detailName = mainRaceName;
							detailUrlName = mainRaceUrlName;
						};
					};

					for (let i = 1; i <= 3; i++) {
						for (let elem of contentElem.getElementsByTagName("h" + i))
							elem.innerText = "#".repeat(i) + " " + elem.innerText.trim();
					};
					for (let elem of contentElem.getElementsByTagName("a"))
						elem.innerText = "[" + elem.innerText.trim() + "](" + elem.href + ")";
					for (let elem of contentElem.getElementsByTagName("li"))
						elem.innerText = "* " + elem.innerText.trim();
					for (let elem of contentElem.getElementsByClassName("hover"))
						elem.firstElementChild.innerText = " (" + elem.firstElementChild.innerText.toLowerCase() + ")";
					for (let elem of contentElem.getElementsByTagName("table")) {
						let rows = elem.rows;
						if (elem.rows[0].cells.length == 1) elem.rows[0].remove()

						elem.innerText = [...rows].map(row => {
							return "| " + [...row.cells].map(cell => {
								return cell.innerText.trim().replaceAll("\n", " ").replaceAll("|", "!")
							}).join(" | ") + " |"
						}).join("\n");
					};

					let description = contentElem.innerText.trim().replace(/\n\n+/g, "\n");

					searchedDetails[detailUrlName] = {
						"detailType": detailType,
						"description": description,
						"prerequisites": prerequisites,
						"source": source,
						"url": url
					};

					addDetailButtonIfNotExist(detailName, detailUrlName);
				}).catch(err => console.error(err));
			if (Object.keys(searchedDetails[detailUrlName]).length) return;
		};
	};
};

const checkForDetail = (() => {
	let delay = 1000;
	let timeouts = {};
	return (inputId, detailTypes) => {
		clearTimeout(timeouts[inputId]);
		timeouts[inputId] = setTimeout(() => {
			let detailTypesForRegexString = {};

			if (detailTypes.includes("Class"))
				detailTypesForRegexString["/^(\\w+)/g"] = ["Class"];

			if (detailTypes.includes("Background") || detailTypes.includes("Race"))
				detailTypesForRegexString["/\\s*(.+)\\s*/g"] = ["Background", "Race"].filter(item => detailTypes.includes(item));

			if (detailTypes.includes("Feat") || detailTypes.includes("Subclass"))
				detailTypesForRegexString["/^\\s*([\\w\(\)][\\w \(\)]*)(:| - )\\s*$/gm"] = ["Feat", "Subclass"].filter(item => detailTypes.includes(item));

			Object.entries(detailTypesForRegexString).forEach(([regexString, types]) => {
				for (
					let detail of document.getElementById(inputId).value.matchAll(new RegExp(...regexString.split("/").slice(1)))
				) {
					let detailName = detail[1].trim();
					if (!detailName) continue;
					searchAndAddDetail(detailName, types);
				};
			});
		}, delay);
	};
})();

// -- Rolls

function rollDie(sides) {
	return Math.floor(Math.random() * sides) + 1;
};

function roll(expression) {
	expression = expression.toLowerCase().replace(/\s/g, "").replace(/([\+\-\*])/g, " $1 ").replace(/^ (.) /, "$1");
	if (expression.match(/[^d\d\+\-\* ]/)) {
		alert("Only digits and 'd+-* ' are allowed.", "Invalid Roll", "fa-times-circle");
		return;
	};

	let output = ["Roll: " + expression];
	expression = expression.replace(/(\d*)d(\d+)/g, (_, p1, p2) => {
		let rolls = [];
		for (let i = 0; i < (p1 || 1); i++) rolls.push(rollDie(p2));
		return rolls.length ? rolls.join("+") : [0];
	});
	if (expression.includes(" ")) output.push("Roll: " + expression);
	output.push("Total: " + eval(expression));
	alert(output.join("\n"), "Roll")
};

// Event Listeners

function inputEventListener(evt) {
	let elem = evt.target;
	if (!elem.validity.valid) return

	if (elem.className.startsWith("weapon__")) {
		let cellElem = elem.parentElement;
		let rowElem = cellElem.parentElement;
		let cellIndex = [...rowElem.children].indexOf(cellElem);
		let tbodyElem = rowElem.parentElement;

		characterSheetData["weapons"][[...tbodyElem.children].indexOf(rowElem)][cellIndex] = elem.value;
		if (characterSheetData["weapons"].at(-1).join("")) {
			characterSheetData["weapons"].push(["", "", ""]);
			addWeaponRow(characterSheetData["weapons"].at(-1));
		};

		while ((characterSheetData["weapons"].length > minimumWeaponRows) && !(characterSheetData["weapons"].at(-2).join(""))) {
			characterSheetData["weapons"].splice(characterSheetData["weapons"].length - 2, 1);
			tbodyElem.children[tbodyElem.children.length - 2].remove();
			tbodyElem.lastChild.firstChild.children[cellIndex].focus();
		};
	} else if (elem.type == "checkbox")
		characterSheetData[elem.id] = elem.checked;
	else
		characterSheetData[elem.id] = (typeof characterSheetData[elem.id] == "number") ? Number(elem.value) : elem.value;
	autosaveCharacterSheet();

	switch (elem.id) {
		case "classAndLevel":
			checkForDetail(elem.id, ["Class"]);
			break;
		case "background":
			checkForDetail(elem.id, ["Background"]);
			break;
		case "race":
			checkForDetail(elem.id, ["Race"]);
			break;
		case "proficiencyBonus":
			updateProficiencyDependentModifiers();
			break;
		case "featuresAndTraits":
			checkForDetail(elem.id, ["Subclass", "Feat"]);
			break;
		default:
			break;
	};

	if (elem.classList.contains("ability__score"))
		updateAbilityModifier(elem.id.substring(0, elem.id.length - "AbilityScore".length));
	else if (elem.classList.contains("ability__score"))
		updateAbilityDependentModifiers(elem.id.substring(0, elem.id.length - "AbilityModifier".length));
};

document.querySelectorAll("input,textarea").forEach(elem => {
	if (elem.id) elem.addEventListener("input", inputEventListener);
});
document.querySelectorAll("[name='doubleCheckbox'] + label").forEach(elem => {
	elem.addEventListener("click", _ => {
		let inputElem = elem.previousElementSibling;
		let newValue = (inputElem.value + 1) % 3;
		inputElem.setAttribute("value", newValue);
		inputElem.value = newValue;
		characterSheetData[inputElem.id] = newValue;

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
		for (let i = 0; i < (index % 3); i++)
			inputElem = inputElem.previousElementSibling;

		let newValue = (index % 3) + 1;
		newValue = (inputElem.value == newValue) ? 0 : newValue;

		inputElem.setAttribute("value", newValue);
		inputElem.value = newValue;
		characterSheetData[inputElem.id] = newValue;
	});
});

document.getElementsByClassName("donationButton")[0].addEventListener("click", _ => {
	alert(
		"If you like using this digital character sheet and would like to give back in some way, [donations](" + "https://donate.stripe.com/fZe5kv5SJ3jZfjG000" + ") are most welcome!",
		'Donations',
		"fa-heart"
	);
});
document.getElementsByClassName("saveButton")[0].addEventListener("click", _ => {
	showModal({
		"template": modalTemplates["save"],
		"message": "You can click 'Download' to download a copy of this character sheet and upload it the next time you visit this website.\n\nYour character sheet is also automatically saved in your browser so as long as you don't clear your browsing data, when you open up this website up again on this device you can access your previously used character sheets.",
		"heading": "Saving This Character Sheet",
		"icon": "fa-floppy-disk"
	}).then(response => {
		if (!response) return;
		let linkElem = document.createElement("a");
		linkElem.setAttribute(
			"href",
			"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(characterSheetData))
		);
		linkElem.setAttribute("download", characterSheetData["characterName"] + ".characterSheet");
		linkElem.click();
	});
});
document.addEventListener("click", evt => {
	let modalElem = document.getElementById("modal");
	if (!modalElem || evt.target.tagName != "HTML") return;

	let rect = modalElem.getBoundingClientRect();
	if (
		evt.clientY < rect.top ||
		evt.clientY > rect.top + rect.height ||
		evt.clientX < rect.left ||
		evt.clientX > rect.left + rect.width
	)
		document.dispatchEvent(new KeyboardEvent("keydown", { "key": "Escape" }));;
});
document.addEventListener("keydown", evt => {
	let button;
	if ((evt.ctrlKey || evt.metaKey) && evt.key == "s") {
		evt.preventDefault();
		button = document.getElementsByClassName("saveButton")[0];
	} else if ((evt.ctrlKey || evt.metaKey) && evt.shiftKey && evt.key == "r") {
		evt.preventDefault();
		button = document.getElementsByClassName("rollButton")[0];
	} else if ((evt.ctrlKey || evt.metaKey) && evt.shiftKey && evt.key == "d") {
		evt.preventDefault();
		button = document.getElementsByClassName("donationButton")[0];
	};
	if (document.getElementById("modal")) return
	button?.click();
});

// Main

showModal({
	"template": modalTemplates["welcome"],
	"message": "This is an online digital character sheet that can be used for games such as DnD.\n\nYou can load a character sheet from a file, or you can use one that you have previously used on this device, or start a new character altogether.",
	"heading": "Welcome",
	"icon": "fa-dice-d20"
}).then(_ => {
	Object.entries(characterSheetData).forEach(([key, value]) => updateDataValueAndInput(key, value))
});