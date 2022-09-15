const currentUrlParams = new URLSearchParams(window.location.search);
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

const skillsForAbilities = {
	"strength": ["athletics"],
	"dexterity": ["acrobatics", "sleightOfHand", "stealth"],
	"intelligence": ["arcana", "history", "investigation", "nature", "religion"],
	"wisdom": ["animalHandling", "insight", "medicine", "perception", "survival"],
	"charisma": ["deception", "intimidation", "performance", "persuasion"]
}

let data = {
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
	"deathSaveSuccess1": false,
	"deathSaveSuccess2": false,
	"deathSaveSuccess3": false,
	"deathSaveFailure1": false,
	"deathSaveFailure2": false,
	"deathSaveFailure3": false,
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

function getAbilityModifierForScore(score) {
	return Math.floor((score - 10) / 2);
};

function updateDataValueAndInput(id, value) {
	data[id] = value;
	const elem = document.getElementById(id);
	if (elem.name == "doubleCheckbox")
		elem.setAttribute("value", value)
	if ((elem.type == "text") && (typeof value == "number") && (value > 0))
		value = "+" + value;
	elem.value = value;
};

function importDataFromURL() {
	const keys = Object.keys(data);
	let values = Object.values(data);
	if (currentUrlParams.has("values"))
		values = JSON.parse(atob(currentUrlParams.get("values")));
	for (let i = 0; i < values.length; i++) {
		updateDataValueAndInput(keys[i], values[i]);
	};
};

function exportDataToURL() {
	console.log(window.location.href + "?values=" + btoa(JSON.stringify(Object.values(data))));
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
	return Math.floor(Math.random() * sides + 1);
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

function searchFeat(featName) {
	fetch(CORS_PROXY + encodeURIComponent("http://dnd5e.wikidot.com/feat:" + featName))
		.then((response) => {
			if (response.status == 200)
				return response.text();
			else
				console.error("Status Code: " + response.status);
		}).then((data) => {
			let htmlDoc = new DOMParser().parseFromString(data, "text/html");
			let contentElem = htmlDoc.getElementById("page-content");
			alert(contentElem.innerText.replaceAll(/\n\n+/g, "\n"));
		}).catch(err => {
			console.error(err);
		});
};

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
for (const elem of document.querySelectorAll("[name='doubleCheckbox'] + label")) {
	elem.addEventListener("click", _ => {
		const inputElem = elem.previousElementSibling;
		const newValue = (inputElem.value + 1) % 3;
		inputElem.setAttribute("value", newValue);
		inputElem.value = newValue;
		data[inputElem.id] = newValue;
		
		if (inputElem.id.includes("SavingThrow")) {
			console.log(inputElem.value)
			updateSavingThrowModifier(
				inputElem.id.substring(0, inputElem.id.length - "SavingThrowProficiencyLevel".length)
			);
		} else {
			updateSkillModifier(
				inputElem.id.substring(0, inputElem.id.length - "SkillProficiencyLevel".length)
			);
		};
	});
};

importDataFromURL();