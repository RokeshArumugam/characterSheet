const currentUrlParams = new URLSearchParams(window.location.search);

let data = {
	"strengthAbilityModifier": "",
	"strengthAbilityScore": "",
	"dexterityAbilityModifier": "",
	"dexterityAbilityScore": "",
	"constitutionAbilityModifier": "",
	"constitutionAbilityScore": "",
	"intelligenceAbilityModifier": "",
	"intelligenceAbilityScore": "",
	"wisdomAbilityModifier": "",
	"wisdomAbilityScore": "",
	"charismaAbilityModifier": "",
	"charismaAbilityScore": "",
	"inspiration": false,
	"proficiency": "",
	"strengthSavingThrowProficiency": "",
	"strengthSavingThrowModifier": "",
	"dexteritySavingThrowProficiency": "",
	"dexteritySavingThrowModifier": "",
	"constiutionSavingThrowProficiency": "",
	"constitutionSavingThrowModifier": "",
	"intelligenceSavingThrowProficiency": "",
	"intelligenceSavingThrowModifier": "",
	"wisdomSavingThrowProficiency": "",
	"wisdomSavingThrowModifier": "",
	"charismaSavingThrowProficiency": "",
	"charismaSavingThrowModifier": "",
	"acrobaticsSkillProficiency": "",
	"acrobaticsSkillModifier": "",
	"animalHandlingSkillProficiency": "",
	"animalHandlingSkillModifier": "",
	"arcanaSkillProficiency": "",
	"arcanaSkillModifier": "",
	"athleticsSkillProficiency": "",
	"athleticsSkillModifier": "",
	"deceptionSkillProficiency": "",
	"deceptionSkillModifier": "",
	"historySkillProficiency": "",
	"historySkillModifier": "",
	"insightSkillProficiency": "",
	"insightSkillModifier": "",
	"intimidationSkillProficiency": "",
	"intimidationSkillModifier": "",
	"investigationSkillProficiency": "",
	"investigationSkillModifier": "",
	"medicineSkillProficiency": "",
	"medicineSkillModifier": "",
	"natureSkillProficiency": "",
	"natureSkillModifier": "",
	"perceptionSkillProficiency": "",
	"perceptionSkillModifier": "",
	"performanceSkillProficiency": "",
	"performanceSkillModifier": "",
	"persuasionSkillProficiency": "",
	"persuasionSkillModifier": "",
	"religionSkillProficiency": "",
	"religionSkillModifier": "",
	"sleightOfHandSkillProficiency": "",
	"sleightOfHandSkillModifier": "",
	"stealthSkillProficiency": "",
	"stealthSkillModifier": "",
	"survivalSkillProficiency": "",
	"survivalSkillModifier": "",
	"armorClass": "",
	"initiative": "",
	"speed": "",
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

function importDataFromURL() {
	if (!currentUrlParams.has("values"))
		return
	const values = JSON.parse(atob(currentUrlParams.get("values")));
	const keys = Object.keys(data);
	for (let i = 0; i < values.length; i++) {
		data[keys[i]] = values[i];
	};
};

function exportDataToURL() {
	console.log(window.location.href + "?values=" + btoa(JSON.stringify(Object.values(data))));
};

function populateInputs() {
	for (const [id, value] of Object.entries(data)) {
		document.getElementById(id).value = value;
	};
};

importDataFromURL();
populateInputs();