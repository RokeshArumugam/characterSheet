'use strict';

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
	"welcome": `
		<dialog id="modal" role="alertdialog">
			<i id="modal__icon" class="fas"></i>
			<span id="modal__heading">Alert</span>
			<div id="modal__message"></div>
			<input id="modal__characterSheetFileInput" type="file" accept=".pdf">
			<template id="modal__characterSheetTemplate">
				<div class="modal__characterSheet">
					<div class="modal__characterSheetButton primaryButton">
						<span class="modal__characterName"></span>
						<i class="fas fa-times-circle modal__characterSheetDelete" title="Delete "></i>
						<span class="modal__characterDescription"></span>
					</div>
					<span class="modal__characterSheetLastSave"></span>
				</div>
			</template>
			<div id="modal__characterSheetsContainer"></div>
			<div id="modal__buttonContainer">
				<button class="modal__button primaryButton">Start a New Character</button>
			</div>
		</dialog>
	`,
	"save": `
		<dialog id="modal" role="alertdialog">
			<i id="modal__icon" class="fas"></i>
			<span id="modal__heading">Alert</span>
			<div id="modal__message"></div>
			<div class="modal__fileContainer">
				<div class="modal__file">
					<i class="fas fa-file-pdf modal__fileIcon" draggable="true"></i>
					<span class="modal__fileName"></span>
				</div>
				<button class="modal__fileDownload primaryButton">Download</button>
			</div>
			<div id="modal__buttonContainer">
				<button class="modal__button primaryButton">Cancel</button>
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
	`
};

const CORS_PROXIES = ["https://cors.caiusball.com/?", "https://corsproxy.io/?"];
const pathnamesForDetailType = {
	"Class": ["(detailUrlName)"],
	"Background": ["background:(detailUrlName)"],
	"Race": ["(mainRaceUrlName)"],
	"Subclass": ["(classUrlName):(detailUrlName)"],
	"Feat": ["feat:(detailUrlName)", "feat:(detailUrlName)-ua"],
	"Adventuring Gear": ["(detailUrlName)"],
	"Armor": ["(detailUrlName)"],
	"Wondrous Item": ["wondrous-items:(detailUrlName)"],
	"Spell": ["spell:(detailUrlName)"]
};

const skillsForAbilities = {
	"strength": ["athletics"],
	"dexterity": ["acrobatics", "sleightOfHand", "stealth"],
	"constitution": [],
	"intelligence": ["arcana", "history", "investigation", "nature", "religion"],
	"wisdom": ["animalHandling", "insight", "medicine", "perception", "survival"],
	"charisma": ["deception", "intimidation", "performance", "persuasion"]
}

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
	"weapons": Array.from({ length: 3 }, () => ["", "", ""]),
	"attacksNotes": "",
	"featuresAndTraits": "",
	"passivePerception": "",
	"otherProficienciesAndLanguages": "",
	"copperPieces": 0,
	"silverPieces": 0,
	"electrumPieces": 0,
	"goldPieces": 0,
	"platinumPieces": 0,
	"equipmentNotes": "",
	"age": "",
	"height": "",
	"weight": "",
	"eyes": "",
	"skin": "",
	"hair": "",
	"characterAppearance": "",
	"alliesAndOrganisations": "",
	"characterBackstory": "",
	"additionalFeaturesAndTraits": "",
	"treasure": "",
	"spellcastingClass": "",
	"spellcastingAbility": "",
	"spellSaveDc": "",
	"spellAttackBonus": "",
	"spellsLevel0": Array.from({ length: 8 }, () => [null, ""]),
	"spellsLevel1": Array.from({ length: 13 }, () => [false, ""]),
	"spellSlotsTotalLevel1": "",
	"spellSlotsExpendedLevel1": "",
	"spellsLevel2": Array.from({ length: 13 }, () => [false, ""]),
	"spellSlotsTotalLevel2": "",
	"spellSlotsExpendedLevel2": "",
	"spellsLevel3": Array.from({ length: 13 }, () => [false, ""]),
	"spellSlotsTotalLevel3": "",
	"spellSlotsExpendedLevel3": "",
	"spellsLevel4": Array.from({ length: 13 }, () => [false, ""]),
	"spellSlotsTotalLevel4": "",
	"spellSlotsExpendedLevel4": "",
	"spellsLevel5": Array.from({ length: 9 }, () => [false, ""]),
	"spellSlotsTotalLevel5": "",
	"spellSlotsExpendedLevel5": "",
	"spellsLevel6": Array.from({ length: 9 }, () => [false, ""]),
	"spellSlotsTotalLevel6": "",
	"spellSlotsExpendedLevel6": "",
	"spellsLevel7": Array.from({ length: 9 }, () => [false, ""]),
	"spellSlotsTotalLevel7": "",
	"spellSlotsExpendedLevel7": "",
	"spellsLevel8": Array.from({ length: 7 }, () => [false, ""]),
	"spellSlotsTotalLevel8": "",
	"spellSlotsExpendedLevel8": "",
	"spellsLevel9": Array.from({ length: 7 }, () => [false, ""]),
	"spellSlotsTotalLevel9": "",
	"spellSlotsExpendedLevel9": ""
};
const pdfKeyMap = {
	"CharacterName": "characterName",
	"CharacterName 2": "characterName",
	"ClassLevel": "classAndLevel",
	"Background": "background",
	"PlayerName": "playerName",
	"Race ": "race",
	"Alignment": "alignment",
	"XP": "experiencePoints",
	"STR": "strengthAbilityModifier",
	"STRmod": "strengthAbilityScore",
	"DEX": "dexterityAbilityModifier",
	"DEXmod ": "dexterityAbilityScore",
	"CON": "constitutionAbilityModifier",
	"CONmod": "constitutionAbilityScore",
	"INT": "intelligenceAbilityModifier",
	"INTmod": "intelligenceAbilityScore",
	"WIS": "wisdomAbilityModifier",
	"WISmod": "wisdomAbilityScore",
	"CHA": "charismaAbilityModifier",
	"CHamod": "charismaAbilityScore",
	"Inspiration": "inspiration",
	"ProfBonus": "proficiencyBonus",
	"Check Box 11": "strengthSavingThrowProficiencyLevel",
	"ST Strength": "strengthSavingThrowModifier",
	"Check Box 18": "dexteritySavingThrowProficiencyLevel",
	"ST Dexterity": "dexteritySavingThrowModifier",
	"Check Box 19": "constitutionSavingThrowProficiencyLevel",
	"ST Constitution": "constitutionSavingThrowModifier",
	"Check Box 20": "intelligenceSavingThrowProficiencyLevel",
	"ST Intelligence": "intelligenceSavingThrowModifier",
	"Check Box 21": "wisdomSavingThrowProficiencyLevel",
	"ST Wisdom": "wisdomSavingThrowModifier",
	"Check Box 22": "charismaSavingThrowProficiencyLevel",
	"ST Charisma": "charismaSavingThrowModifier",
	"Check Box 23": "acrobaticsSkillProficiencyLevel",
	"Acrobatics": "acrobaticsSkillModifier",
	"Check Box 24": "animalHandlingSkillProficiencyLevel",
	"Animal": "animalHandlingSkillModifier",
	"Check Box 25": "arcanaSkillProficiencyLevel",
	"Arcana": "arcanaSkillModifier",
	"Check Box 26": "athleticsSkillProficiencyLevel",
	"Athletics": "athleticsSkillModifier",
	"Check Box 27": "deceptionSkillProficiencyLevel",
	"Deception ": "deceptionSkillModifier",
	"Check Box 28": "historySkillProficiencyLevel",
	"History ": "historySkillModifier",
	"Check Box 29": "insightSkillProficiencyLevel",
	"Insight": "insightSkillModifier",
	"Check Box 30": "intimidationSkillProficiencyLevel",
	"Intimidation": "intimidationSkillModifier",
	"Check Box 31": "investigationSkillProficiencyLevel",
	"Investigation ": "investigationSkillModifier",
	"Check Box 32": "medicineSkillProficiencyLevel",
	"Medicine": "medicineSkillModifier",
	"Check Box 33": "natureSkillProficiencyLevel",
	"Nature": "natureSkillModifier",
	"Check Box 34": "perceptionSkillProficiencyLevel",
	"Perception ": "perceptionSkillModifier",
	"Check Box 35": "performanceSkillProficiencyLevel",
	"Performance": "performanceSkillModifier",
	"Check Box 36": "persuasionSkillProficiencyLevel",
	"Persuasion": "persuasionSkillModifier",
	"Check Box 37": "religionSkillProficiencyLevel",
	"Religion": "religionSkillModifier",
	"Check Box 38": "sleightOfHandSkillProficiencyLevel",
	"SleightofHand": "sleightOfHandSkillModifier",
	"Check Box 39": "stealthSkillProficiencyLevel",
	"Stealth ": "stealthSkillModifier",
	"Check Box 40": "survivalSkillProficiencyLevel",
	"Survival": "survivalSkillModifier",
	"AC": "armorClass",
	"Initiative": "initiative",
	"Speed": "speed",
	"HPMax": "hitPointMaximum",
	"HPCurrent": "currentHitPoints",
	"HPTemp": "temporaryHitPoints",
	"HDTotal": "totalHitDice",
	"HD": "currentHitDice",
	"Check Box 12": "deathSaveSuccesses",
	"Check Box 13": "deathSaveSuccesses",
	"Check Box 14": "deathSaveSuccesses",
	"Check Box 15": "deathSaveFailures",
	"Check Box 16": "deathSaveFailures",
	"Check Box 17": "deathSaveFailures",
	"PersonalityTraits ": "personalityTraits",
	"Ideals": "ideals",
	"Bonds": "bonds",
	"Flaws": "flaws",
	"Wpn Name": ["weapons", 0, 0],
	"Wpn1 AtkBonus": ["weapons", 0, 1],
	"Wpn1 Damage": ["weapons", 0, 2],
	"Wpn Name 2": ["weapons", 1, 0],
	"Wpn2 AtkBonus ": ["weapons", 1, 1],
	"Wpn2 Damage ": ["weapons", 1, 2],
	"Wpn Name 3": ["weapons", 2, 0],
	"Wpn3 AtkBonus  ": ["weapons", 2, 1],
	"Wpn3 Damage ": ["weapons", 2, 2],
	"AttacksSpellcasting": "attacksNotes",
	"Features and Traits": "featuresAndTraits",
	"Passive": "passivePerception",
	"ProficienciesLang": "otherProficienciesAndLanguages",
	"CP": "copperPieces",
	"SP": "silverPieces",
	"EP": "electrumPieces",
	"GP": "goldPieces",
	"PP": "platinumPieces",
	"Equipment": "equipmentNotes",
	"Age": "age",
	"Height": "height",
	"Weight": "weight",
	"Eyes": "eyes",
	"Skin": "skin",
	"Hair": "hair",
	"Allies": "alliesAndOrganisations",
	"Backstory": "characterBackstory",
	"Feat+Traits": "additionalFeaturesAndTraits",
	"Treasure": "treasure",
	"Spellcasting Class 2": "spellcastingClass",
	"SpellcastingAbility 2": "spellcastingAbility",
	"SpellSaveDC  2": "spellSaveDc",
	"SpellAtkBonus 2": "spellAttackBonus",
	"Spells 1014": ["spellsLevel0", 0, 1],
	"Spells 1016": ["spellsLevel0", 1, 1],
	"Spells 1017": ["spellsLevel0", 2, 1],
	"Spells 1018": ["spellsLevel0", 3, 1],
	"Spells 1019": ["spellsLevel0", 4, 1],
	"Spells 1020": ["spellsLevel0", 5, 1],
	"Spells 1021": ["spellsLevel0", 6, 1],
	"Spells 1022": ["spellsLevel0", 7, 1],
	"Check Box 251": ["spellsLevel1", 0, 0],
	"Spells 1015": ["spellsLevel1", 0, 1],
	"Check Box 309": ["spellsLevel1", 1, 0],
	"Spells 1023": ["spellsLevel1", 1, 1],
	"Check Box 3010": ["spellsLevel1", 2, 0],
	"Spells 1024": ["spellsLevel1", 2, 1],
	"Check Box 3011": ["spellsLevel1", 3, 0],
	"Spells 1025": ["spellsLevel1", 3, 1],
	"Check Box 3012": ["spellsLevel1", 4, 0],
	"Spells 1026": ["spellsLevel1", 4, 1],
	"Check Box 3013": ["spellsLevel1", 5, 0],
	"Spells 1027": ["spellsLevel1", 5, 1],
	"Check Box 3014": ["spellsLevel1", 6, 0],
	"Spells 1028": ["spellsLevel1", 6, 1],
	"Check Box 3015": ["spellsLevel1", 7, 0],
	"Spells 1029": ["spellsLevel1", 7, 1],
	"Check Box 3016": ["spellsLevel1", 8, 0],
	"Spells 1030": ["spellsLevel1", 8, 1],
	"Check Box 3017": ["spellsLevel1", 9, 0],
	"Spells 1031": ["spellsLevel1", 9, 1],
	"Check Box 3018": ["spellsLevel1", 10, 0],
	"Spells 1032": ["spellsLevel1", 10, 1],
	"Check Box 3019": ["spellsLevel1", 11, 0],
	"Spells 1033": ["spellsLevel1", 11, 1],
	"SlotsTotal 19": "spellSlotsTotalLevel1",
	"SlotsRemaining 19": "spellSlotsExpendedLevel1",
	"Check Box 313": ["spellsLevel2", 0, 0],
	"Spells 1046": ["spellsLevel2", 0, 1],
	"Check Box 310": ["spellsLevel2", 1, 0],
	"Spells 1034": ["spellsLevel2", 1, 1],
	"Check Box 3020": ["spellsLevel2", 2, 0],
	"Spells 1035": ["spellsLevel2", 2, 1],
	"Check Box 3021": ["spellsLevel2", 3, 0],
	"Spells 1036": ["spellsLevel2", 3, 1],
	"Check Box 3022": ["spellsLevel2", 4, 0],
	"Spells 1037": ["spellsLevel2", 4, 1],
	"Check Box 3023": ["spellsLevel2", 5, 0],
	"Spells 1038": ["spellsLevel2", 5, 1],
	"Check Box 3024": ["spellsLevel2", 6, 0],
	"Spells 1039": ["spellsLevel2", 6, 1],
	"Check Box 3025": ["spellsLevel2", 7, 0],
	"Spells 1040": ["spellsLevel2", 7, 1],
	"Check Box 3026": ["spellsLevel2", 8, 0],
	"Spells 1041": ["spellsLevel2", 8, 1],
	"Check Box 3027": ["spellsLevel2", 9, 0],
	"Spells 1042": ["spellsLevel2", 9, 1],
	"Check Box 3028": ["spellsLevel2", 10, 0],
	"Spells 1043": ["spellsLevel2", 10, 1],
	"Check Box 3029": ["spellsLevel2", 11, 0],
	"Spells 1044": ["spellsLevel2", 11, 1],
	"Check Box 3030": ["spellsLevel2", 12, 0],
	"Spells 1045": ["spellsLevel2", 12, 1],
	"SlotsTotal 20": "spellSlotsTotalLevel2",
	"SlotsRemaining 20": "spellSlotsExpendedLevel2",
	"Check Box 315": ["spellsLevel3", 0, 0],
	"Spells 1048": ["spellsLevel3", 0, 1],
	"Check Box 314": ["spellsLevel3", 1, 0],
	"Spells 1047": ["spellsLevel3", 1, 1],
	"Check Box 3031": ["spellsLevel3", 2, 0],
	"Spells 1049": ["spellsLevel3", 2, 1],
	"Check Box 3032": ["spellsLevel3", 3, 0],
	"Spells 1050": ["spellsLevel3", 3, 1],
	"Check Box 3033": ["spellsLevel3", 4, 0],
	"Spells 1051": ["spellsLevel3", 4, 1],
	"Check Box 3034": ["spellsLevel3", 5, 0],
	"Spells 1052": ["spellsLevel3", 5, 1],
	"Check Box 3035": ["spellsLevel3", 6, 0],
	"Spells 1053": ["spellsLevel3", 6, 1],
	"Check Box 3036": ["spellsLevel3", 7, 0],
	"Spells 1054": ["spellsLevel3", 7, 1],
	"Check Box 3037": ["spellsLevel3", 8, 0],
	"Spells 1055": ["spellsLevel3", 8, 1],
	"Check Box 3038": ["spellsLevel3", 9, 0],
	"Spells 1056": ["spellsLevel3", 9, 1],
	"Check Box 3039": ["spellsLevel3", 10, 0],
	"Spells 1057": ["spellsLevel3", 10, 1],
	"Check Box 3040": ["spellsLevel3", 11, 0],
	"Spells 1058": ["spellsLevel3", 11, 1],
	"Check Box 3041": ["spellsLevel3", 12, 0],
	"Spells 1059": ["spellsLevel3", 12, 1],
	"SlotsTotal 21": "spellSlotsTotalLevel3",
	"SlotsRemaining 21": "spellSlotsExpendedLevel3",
	"Check Box 317": ["spellsLevel4", 0, 0],
	"Spells 1061": ["spellsLevel4", 0, 1],
	"Check Box 316": ["spellsLevel4", 1, 0],
	"Spells 1060": ["spellsLevel4", 1, 1],
	"Check Box 3042": ["spellsLevel4", 2, 0],
	"Spells 1062": ["spellsLevel4", 2, 1],
	"Check Box 3043": ["spellsLevel4", 3, 0],
	"Spells 1063": ["spellsLevel4", 3, 1],
	"Check Box 3044": ["spellsLevel4", 4, 0],
	"Spells 1064": ["spellsLevel4", 4, 1],
	"Check Box 3045": ["spellsLevel4", 5, 0],
	"Spells 1065": ["spellsLevel4", 5, 1],
	"Check Box 3046": ["spellsLevel4", 6, 0],
	"Spells 1066": ["spellsLevel4", 6, 1],
	"Check Box 3047": ["spellsLevel4", 7, 0],
	"Spells 1067": ["spellsLevel4", 7, 1],
	"Check Box 3048": ["spellsLevel4", 8, 0],
	"Spells 1068": ["spellsLevel4", 8, 1],
	"Check Box 3049": ["spellsLevel4", 9, 0],
	"Spells 1069": ["spellsLevel4", 9, 1],
	"Check Box 3050": ["spellsLevel4", 10, 0],
	"Spells 1070": ["spellsLevel4", 10, 1],
	"Check Box 3051": ["spellsLevel4", 11, 0],
	"Spells 1071": ["spellsLevel4", 11, 1],
	"Check Box 3052": ["spellsLevel4", 12, 0],
	"Spells 1072": ["spellsLevel4", 12, 1],
	"SlotsTotal 22": "spellSlotsTotalLevel4",
	"SlotsRemaining 22": "spellSlotsExpendedLevel4",
	"Check Box 319": ["spellsLevel5", 0, 0],
	"Spells 1074": ["spellsLevel5", 0, 1],
	"Check Box 318": ["spellsLevel5", 1, 0],
	"Spells 1073": ["spellsLevel5", 1, 1],
	"Check Box 3053": ["spellsLevel5", 2, 0],
	"Spells 1075": ["spellsLevel5", 2, 1],
	"Check Box 3054": ["spellsLevel5", 3, 0],
	"Spells 1076": ["spellsLevel5", 3, 1],
	"Check Box 3055": ["spellsLevel5", 4, 0],
	"Spells 1077": ["spellsLevel5", 4, 1],
	"Check Box 3056": ["spellsLevel5", 5, 0],
	"Spells 1078": ["spellsLevel5", 5, 1],
	"Check Box 3057": ["spellsLevel5", 6, 0],
	"Spells 1079": ["spellsLevel5", 6, 1],
	"Check Box 3058": ["spellsLevel5", 7, 0],
	"Spells 1080": ["spellsLevel5", 7, 1],
	"Check Box 3059": ["spellsLevel5", 8, 0],
	"Spells 1081": ["spellsLevel5", 8, 1],
	"SlotsTotal 23": "spellSlotsTotalLevel5",
	"SlotsRemaining 23": "spellSlotsExpendedLevel5",
	"Check Box 321": ["spellsLevel6", 0, 0],
	"Spells 1083": ["spellsLevel6", 0, 1],
	"Check Box 320": ["spellsLevel6", 1, 0],
	"Spells 1082": ["spellsLevel6", 1, 1],
	"Check Box 3060": ["spellsLevel6", 2, 0],
	"Spells 1084": ["spellsLevel6", 2, 1],
	"Check Box 3061": ["spellsLevel6", 3, 0],
	"Spells 1085": ["spellsLevel6", 3, 1],
	"Check Box 3062": ["spellsLevel6", 4, 0],
	"Spells 1086": ["spellsLevel6", 4, 1],
	"Check Box 3063": ["spellsLevel6", 5, 0],
	"Spells 1087": ["spellsLevel6", 5, 1],
	"Check Box 3064": ["spellsLevel6", 6, 0],
	"Spells 1088": ["spellsLevel6", 6, 1],
	"Check Box 3065": ["spellsLevel6", 7, 0],
	"Spells 1089": ["spellsLevel6", 7, 1],
	"Check Box 3066": ["spellsLevel6", 8, 0],
	"Spells 1090": ["spellsLevel6", 8, 1],
	"SlotsTotal 24": "spellSlotsTotalLevel6",
	"SlotsRemaining 24": "spellSlotsExpendedLevel6",
	"Check Box 323": ["spellsLevel7", 0, 0],
	"Spells 1092": ["spellsLevel7", 0, 1],
	"Check Box 322": ["spellsLevel7", 1, 0],
	"Spells 1091": ["spellsLevel7", 1, 1],
	"Check Box 3067": ["spellsLevel7", 2, 0],
	"Spells 1093": ["spellsLevel7", 2, 1],
	"Check Box 3068": ["spellsLevel7", 3, 0],
	"Spells 1094": ["spellsLevel7", 3, 1],
	"Check Box 3069": ["spellsLevel7", 4, 0],
	"Spells 1095": ["spellsLevel7", 4, 1],
	"Check Box 3070": ["spellsLevel7", 5, 0],
	"Spells 1096": ["spellsLevel7", 5, 1],
	"Check Box 3071": ["spellsLevel7", 6, 0],
	"Spells 1097": ["spellsLevel7", 6, 1],
	"Check Box 3072": ["spellsLevel7", 7, 0],
	"Spells 1098": ["spellsLevel7", 7, 1],
	"Check Box 3073": ["spellsLevel7", 8, 0],
	"Spells 1099": ["spellsLevel7", 8, 1],
	"SlotsTotal 25": "spellSlotsTotalLevel7",
	"SlotsRemaining 25": "spellSlotsExpendedLevel7",
	"Check Box 325": ["spellsLevel8", 0, 0],
	"Spells 10101": ["spellsLevel8", 0, 1],
	"Check Box 324": ["spellsLevel8", 1, 0],
	"Spells 10100": ["spellsLevel8", 1, 1],
	"Check Box 3074": ["spellsLevel8", 2, 0],
	"Spells 10102": ["spellsLevel8", 2, 1],
	"Check Box 3075": ["spellsLevel8", 3, 0],
	"Spells 10103": ["spellsLevel8", 3, 1],
	"Check Box 3076": ["spellsLevel8", 4, 0],
	"Spells 10104": ["spellsLevel8", 4, 1],
	"Check Box 3077": ["spellsLevel8", 5, 0],
	"Spells 10105": ["spellsLevel8", 5, 1],
	"Check Box 3078": ["spellsLevel8", 6, 0],
	"Spells 10106": ["spellsLevel8", 6, 1],
	"SlotsTotal 26": "spellSlotsTotalLevel8",
	"SlotsRemaining 26": "spellSlotsExpendedLevel8",
	"Check Box 327": ["spellsLevel9", 0, 0],
	"Spells 10108": ["spellsLevel9", 0, 1],
	"Check Box 326": ["spellsLevel9", 1, 0],
	"Spells 10107": ["spellsLevel9", 1, 1],
	"Check Box 3079": ["spellsLevel9", 2, 0],
	"Spells 10109": ["spellsLevel9", 2, 1],
	"Check Box 3080": ["spellsLevel9", 3, 0],
	"Spells 101010": ["spellsLevel9", 3, 1],
	"Check Box 3081": ["spellsLevel9", 4, 0],
	"Spells 101011": ["spellsLevel9", 4, 1],
	"Check Box 3082": ["spellsLevel9", 5, 0],
	"Spells 101012": ["spellsLevel9", 5, 1],
	"Check Box 3083": ["spellsLevel9", 6, 0],
	"Spells 101013": ["spellsLevel9", 6, 1],
	"SlotsTotal 27": "spellSlotsTotalLevel9",
	"SlotsRemaining 27": "spellSlotsExpendedLevel9"
}
let characterSheetData = structuredClone(emptyCharacterSheetData);
const weaponRowTemplate = document.getElementById("weaponRowTemplate");
const spellRowTemplate = document.getElementById("spellRowTemplate");
const detailButtonTemplate = document.getElementById("detailButtonTemplate");
let searchedDetails = {};

// Utility Functions

function showModal(options) {
	return new Promise(async (resolve, reject) => {
		options["template"] ??= modalTemplates["alert"];
		let modalElem = new DOMParser().parseFromString(options["template"], "text/html");
		let messageElem = modalElem.getElementById("modal__message");

		modalElem.getElementById("modal__icon").classList.add(options["icon"] ?? "fa-info-circle");

		modalElem.getElementById("modal__heading").innerText = options["heading"] ?? "Information";

		if (typeof options["message"] !== "string") options["message"] = String(options["message"]);

		let parentElements = [messageElem];
		for (let line of options["message"].split("\n")) { // converting Markdown message into HTML elements
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
				if (!childElem.innerHTML) continue;
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
			case modalTemplates["welcome"]:
				modalElem.getElementById("modal__characterSheetFileInput").addEventListener("input", evt => {
					evt.target.files[0].arrayBuffer()
						.then(pdfBytes => PDFLib.PDFDocument.load(pdfBytes))
						.then(pdfDoc => { // parse PDF into characterSheetData
							pdfDoc.getForm().getFields().forEach(field => {
								let fieldName = field.getName();
								let dataKey = pdfKeyMap[fieldName]
								if (!dataKey) return;
								if (typeof dataKey != "object") dataKey = [dataKey];

								let data = (field.constructor.name == "PDFCheckBox") ? field.isChecked() : (field.getText() ?? "");

								if (dataKey[0] == "inspiration") {
									data = ["yes", "y"].includes(data.toLowerCase()) || (parseInt(data) > 0);
								} else if (["proficiencyBonus", "armorClass", "initiative", "speed", "hitPointMaximum", "currentHitPoints", "temporaryHitPoints"].includes(dataKey[0]) || dataKey[0].endsWith("Score") || dataKey[0].endsWith("Modifier") || dataKey[0].endsWith("Pieces")) {
									data = parseInt(data) || 0;
								} else if (dataKey[0].endsWith("ProficiencyLevel")) {
									data = Math.max(characterSheetData[dataKey[0]], data ? 1 : 0);
								} else if (["deathSaveSuccesses", "deathSaveFailures"].includes(dataKey[0])) {
									if (["Check Box 12", "Check Box 15"].includes(fieldName))
										data = Math.max(characterSheetData[dataKey[0]], data ? 1 : 0);
									else if (["Check Box 13", "Check Box 16"].includes(fieldName))
										data = Math.max(characterSheetData[dataKey[0]], data ? 2 : 0);
									else if (["Check Box 14", "Check Box 17"].includes(fieldName))
										data = Math.max(characterSheetData[dataKey[0]], data ? 3 : 0);
								} else if (dataKey[0] == "attacksNotes") {
									let delimiterIndex = data.indexOf("\n\n");
									if (delimiterIndex != -1) {
										let dataHead = data.slice(0, delimiterIndex);
										let dataBody = data.slice(delimiterIndex + 2);
										let extraWeapons = Array.from(dataHead.matchAll(/^(.*), (.*), (.*)$/gm));
										if (extraWeapons.length) {
											data = dataHead.replace(/^(.*), (.*), (.*)$/gm, "").trim() + dataBody;
											characterSheetData["weapons"] = characterSheetData["weapons"].slice(0, emptyCharacterSheetData["weapons"].length)
											extraWeapons.forEach(extraWeapon => {
												characterSheetData["weapons"].push(extraWeapon.slice(1));
											});
										};
									};
								} else if ((dataKey[0] == "otherProficienciesAndLanguages")) {
									let savingThrowExpertise;
									let skillExpertise;
									let delimiterIndex = data.indexOf("\n\n");
									if (delimiterIndex != -1) {
										let dataHead = data.slice(0, delimiterIndex);
										let dataBody = data.slice(delimiterIndex + 2);
										savingThrowExpertise = dataHead.match(/^Expertise in Saving Throws: (.+)$/im)?.[1];
										skillExpertise = dataHead.match(/^Expertise in Skill Checks: (.+)$/im)?.[1];
										if (savingThrowExpertise || skillExpertise)
											data = dataHead.replace(/^Expertise in (Saving Throws|Skill Checks): .+$/igm, "").trim() + dataBody;
									};
									savingThrowExpertise?.split(", ").forEach(savingThrow => {
										characterSheetData[savingThrow.toLowerCamelCase() + "SavingThrowProficiencyLevel"] = 2;
									});
									skillExpertise?.split(", ").forEach(skill => {
										characterSheetData[skill.toLowerCamelCase() + "SkillProficiencyLevel"] = 2;
									});
								} else if ((fieldName == "CharacterName 2") && characterSheetData["characterName"]) {
									return;
								} else if ((dataKey[0] == "additionalFeaturesAndTraits")) {
									let delimiterIndex = data.indexOf("\n\n");
									if (delimiterIndex != -1) {
										let dataHead = data.slice(0, delimiterIndex);
										let dataBody = data.slice(delimiterIndex + 2);
										let appearance = dataHead.match(/^Character Appearance: ([^]*)/im)?.[1];
										if (appearance) {
											data = dataHead.replace(/^Character Appearance: [^]*/im, "").trim() + dataBody;
											characterSheetData["characterAppearance"] = appearance;
										};
									};
								} else if (
									dataKey[0].startsWith("spells") &&
									[
										"Spells 1022", "Spells 1033", "Spells 1045", "Spells 1059", "Spells 1072", "Spells 1081", "Spells 1090", "Spells 1099", "Spells 10106", "Spells 101013"
									].includes(fieldName)
								) {
									let extraSpells = data.split(", ").slice(1).map(spell => {
										return [(fieldName == "Spells 1022") ? null : spell.includes("prepared"), spell.replace(/^\(u?n?prepared\) /, "")]
									});
									if (extraSpells.length) {
										data = data.split(", ", 1)[0];
										characterSheetData[dataKey[0]] = characterSheetData[dataKey[0]].slice(
											0,
											emptyCharacterSheetData[dataKey[0]].length - ((fieldName == "Spells 1033") ? 1 : 0)
										)
										extraSpells.forEach(extraSpell => {
											characterSheetData[dataKey[0]].push(extraSpell);
										});
									};
								};

								if (dataKey.length == 1) characterSheetData[dataKey[0]] = data;
								else if (dataKey.length == 2) characterSheetData[dataKey[0]][dataKey[1]] = data;
								else if (dataKey.length == 3) characterSheetData[dataKey[0]][dataKey[1]][dataKey[2]] = data;

								if (
									((dataKey[0] == "weapons") || dataKey[0].startsWith("spells")) &&
									JSON.stringify(characterSheetData[dataKey[0]].at(-1)) != JSON.stringify(emptyCharacterSheetData[dataKey[0]][0])
								)
									characterSheetData[dataKey[0]].push([...emptyCharacterSheetData[dataKey[0]][0]]);
							});
							characterSheetData["lastAutosave"] = Date.now();
							evt.target.parentElement.close();
							resolve();
						}).catch(() => {
							evt.target.setCustomValidity("File contents are invalid. Must be the official editable PDF (link given above).");
							evt.target.reportValidity();
						});
				});

				let timeFormatter = new Intl.RelativeTimeFormat("en-gb", { numeric: "auto" })
				let characterSheetListElem = modalElem.getElementById("modal__characterSheetsContainer");
				const characterSheetTemplate = modalElem.getElementById("modal__characterSheetTemplate");
				existingCharacterSheetIds.map(
					id => [id, JSON.parse(localStorage.getItem(id))]
				).sort(
					(a, b) => b[1]["lastAutosave"] - a[1]["lastAutosave"]
				).forEach(([existingCharacterSheetId, existingCharacterSheetData]) => {
					let characterSheetElem = characterSheetTemplate.content.cloneNode(true).firstElementChild;

					characterSheetElem.getElementsByClassName("modal__characterSheetButton")[0].addEventListener("click", evt => {
						if (evt.target.classList.contains("modal__characterSheetDelete")) return;
						characterSheetId = existingCharacterSheetId;
						characterSheetData = existingCharacterSheetData;
						let parentElement = evt.target;
						do parentElement = parentElement.parentElement
						while (parentElement.tagName != "DIALOG");
						parentElement.close()
						resolve();
					});

					characterSheetElem.getElementsByClassName("modal__characterName")[0].innerText =
						existingCharacterSheetData["characterName"].trim() || "Unnamed character";

					let deleteElem = characterSheetElem.getElementsByClassName("modal__characterSheetDelete")[0]
					deleteElem.title = "Delete " + existingCharacterSheetData["characterName"].trim();
					deleteElem.addEventListener("click", evt => {
						evt.target.parentElement.parentElement.remove();
						localStorage.removeItem(existingCharacterSheetId);
					});

					characterSheetElem.getElementsByClassName("modal__characterDescription")[0].innerText =
						(existingCharacterSheetData["race"].trim() || "<unknown race>") +
						", " +
						(existingCharacterSheetData["classAndLevel"].trim() || "<unknown class and level>");

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
						characterSheetElem.getElementsByClassName("modal__characterSheetLastSave")[0].innerText =
							"Last saved " +
							timeFormatter.format(
								-Math.round(seconds / (timeUnitLimits[i - 1] ?? [1, ""])[0]),
								timeUnitLimits[i][1]
							);
						break;
					};
					characterSheetListElem.appendChild(characterSheetElem);
				});
				break;
			case modalTemplates["save"]:
				let downloadUri = await fetch("editableCharacterSheet.pdf")
					.then(response => response.arrayBuffer())
					.then(pdfBytes => PDFLib.PDFDocument.load(pdfBytes))
					.then(pdfDoc => { // inject characterSheetData into PDF
						pdfDoc.getForm().getFields().forEach(field => {
							let fieldName = field.getName();
							let dataKey = pdfKeyMap[fieldName]
							if (!dataKey) return;
							if (typeof dataKey != "object") dataKey = [dataKey];

							let data = characterSheetData;
							for (let key of dataKey) data = data[key];

							if (dataKey[0] == "inspiration") {
								data = data ? "Yes" : "No";
							} else if (["proficiencyBonus", "initiative"].includes(dataKey[0]) || dataKey[0].endsWith("Modifier")) {
								data = ((data > 0) ? "+" : "") + data;
							} else if (["deathSaveSuccesses", "deathSaveFailures"].includes(dataKey[0])) {
								if (["Check Box 12", "Check Box 15"].includes(fieldName)) data = (data >= 1);
								else if (["Check Box 13", "Check Box 16"].includes(fieldName)) data = (data >= 2);
								else if (["Check Box 14", "Check Box 17"].includes(fieldName)) data = (data >= 3);
							} else if (dataKey[0] == "attacksNotes") {
								let extraWeapons = characterSheetData["weapons"].slice(
									emptyCharacterSheetData["weapons"].length
								).filter(
									weapon => weapon.join("")
								).map(
									weapon => weapon.join(", ")
								).join("\n");
								data = extraWeapons + ((data && extraWeapons) ? "\n\n" : "") + data;
							} else if ((dataKey[0] == "otherProficienciesAndLanguages")) {
								let savingThrowExpertise = [];
								let skillExpertise = [];
								let expertiseText = "";
								for (let key of Object.keys(characterSheetData).filter(key => key.endsWith("ProficiencyLevel"))) {
									if (characterSheetData[key] != 2) continue;
									let keyStem = key.replace(/(SavingThrow|Skill)ProficiencyLevel$/, "").replace(/([A-Z])/g, " $1").toSmartTitleCase();
									if (key.includes("SavingThrow")) savingThrowExpertise.push(keyStem);
									else skillExpertise.push(keyStem);
								};
								if (savingThrowExpertise.length) expertiseText += "Expertise in Saving Throws: " + savingThrowExpertise.join(", ") + "\n";
								if (skillExpertise.length) expertiseText += "Expertise in Skill Checks: " + skillExpertise.join(", ") + "\n";
								if (expertiseText) data = expertiseText + "\n" + data;
							} else if ((dataKey[0] == "additionalFeaturesAndTraits") && characterSheetData["characterAppearance"]) {
								data = "Character Appearance: " + characterSheetData["characterAppearance"] + "\n\n" + data;
							} else if (
								dataKey[0].startsWith("spells") &&
								[
									"Spells 1022", "Spells 1033", "Spells 1045", "Spells 1059", "Spells 1072", "Spells 1081", "Spells 1090", "Spells 1099", "Spells 10106", "Spells 101013"
								].includes(fieldName)) {
								let extraSpells = characterSheetData[dataKey[0]].slice(
									dataKey[1] + 1
								).filter(
									spell => spell[0] || spell[1]
								).map(
									spell => ((fieldName == "Spells 1022") ? "" : (spell[0] ? "(prepared) " : "(unprepared) ")) + spell[1]
								).join(", ");
								data += ((data && extraSpells) ? ", " : "") + extraSpells;
							};

							switch (field.constructor.name) {
								case "PDFTextField":
									field.setText(String(data));
									break;
								case "PDFCheckBox":
									if (data) field.check();
									else field.uncheck();
									break;
								default:
									break;
							}
						})
						return pdfDoc.saveAsBase64({ dataUri: true });
					});

				let fileName = (characterSheetData["characterName"].trim() || "Unnamed Character") + ".pdf";
				let downloadLinkElem = document.createElement("a");
				downloadLinkElem.setAttribute("href", downloadUri);
				downloadLinkElem.setAttribute("download", fileName);

				modalElem.getElementsByClassName("modal__fileName")[0].innerText = fileName;
				modalElem.getElementsByClassName("modal__fileDownload")[0].addEventListener("click", evt => {
					evt.target.parentElement.parentElement.close();
					downloadLinkElem.click();
					resolve();
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
			default:
				break;
		};

		modalElem.getElementsByClassName("modal__button")[0].addEventListener("click", evt => {
			evt.target.parentElement.parentElement.close();
			resolve();
		});

		modalElem = modalElem.body.firstChild;
		modalElem.addEventListener("close", () => modalElem.remove());
		modalElem.addEventListener("cancel", () => resolve());

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
String.prototype.toLowerCamelCase = function () {
	return this.replace(
		/\w\S*/g,
		(word, offset) => {
			return (offset ? word.charAt(0).toUpperCase() : word.charAt(0).toLowerCase()) + word.substring(1).toLowerCase();
		}
	).replaceAll(" ", "");
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

function autosaveCharacterSheet(updateLastAutosave = true) {
	if (JSON.stringify(characterSheetData) == JSON.stringify(emptyCharacterSheetData)) return;
	if (updateLastAutosave) characterSheetData["lastAutosave"] = Date.now();
	localStorage.setItem(characterSheetId, JSON.stringify(characterSheetData));

	let datetimeString = new Date(characterSheetData["lastAutosave"]).toLocaleString("en-gb").slice(0, -3);
	if (datetimeString.slice(0, 10) == new Date().toLocaleString("en-gb").slice(0, 10))
		datetimeString = datetimeString.slice(12);
	else
		datetimeString = datetimeString.slice(0, 6) + datetimeString.slice(8);
	document.getElementsByClassName("lastAutosave")[0].innerText = "Last autosave: " + datetimeString;
};

function addWeaponRow(weaponData) {
	let weaponsElem = document.getElementById("weapons");
	let rowElem = weaponRowTemplate.content.cloneNode(true).firstElementChild;
	Array.from(rowElem.getElementsByTagName("input")).forEach((elem, index) => {
		elem.value = weaponData[index];
		elem.addEventListener("input", inputEventListener);
	});
	weaponsElem.appendChild(rowElem);
};

function addSpellRow(tbodyId, spellData) {
	let spellsElem = document.getElementById(tbodyId);
	let rowElem = spellRowTemplate.content.cloneNode(true).firstElementChild;
	let preparedElem = rowElem.getElementsByClassName("spell__prepared")[0];
	if (preparedElem) {
		preparedElem.id = tbodyId + "-" + (spellsElem.children.length + 1);
		preparedElem.nextElementSibling.htmlFor = preparedElem.id;
	}
	Array.from(rowElem.getElementsByTagName("input")).forEach((elem, index) => {
		if (spellData[index] == null)
			elem.parentElement.remove();
		else {
			if (elem.type == "checkbox") elem.checked = spellData[index];
			else elem.value = spellData[index];
			elem.addEventListener("input", inputEventListener);
		}
	});
	spellsElem.appendChild(rowElem);
	let spellNameElem = spellsElem.lastElementChild.getElementsByClassName("spell__name")[0];
	if ((tbodyId == "spellsLevel1") && (spellsElem.childElementCount == 1)) spellNameElem.placeholder = "Spell Name";
	checkForDetailsInInput(spellNameElem);
};

function updateInput(id, value) {
	let elem = document.getElementById(id);
	if (!elem) return;

	if (elem.type == "checkbox")
		elem.checked = value
	else if (elem.id == "weapons") {
		elem.innerHTML = "";
		value.forEach(weaponData => addWeaponRow(weaponData));
	} else if (elem.id.startsWith("spells")) {
		elem.innerHTML = "";
		value.forEach(spellData => addSpellRow(elem.id, spellData));
	} else {
		if (["doubleCheckbox", "tripleCheckbox"].includes(elem.name))
			elem.setAttribute("value", value)
		if ((elem.type == "text") && (typeof value == "number") && (value > 0))
			value = "+" + value;
		elem.value = value;
	};
	if (["characterName", "characterName2"].includes(elem.id))
		document.getElementById((elem.id == "characterName") ? "characterName2" : "characterName").value = elem.value;
	checkForDetailsInInput(elem);
};

function updateCharacterSheetDataAndInput(id, value) {
	characterSheetData[id] = value;
	autosaveCharacterSheet();
	updateInput(id, value);
};

// -- Updating Modifiers

function updateSavingThrowModifier(abilityName) {
	updateCharacterSheetDataAndInput(
		abilityName + "SavingThrowModifier",
		characterSheetData[abilityName + "AbilityModifier"] + (characterSheetData[abilityName + "SavingThrowProficiencyLevel"] * characterSheetData["proficiencyBonus"])
	);
};

function updateSkillModifier(skillName) {
	updateCharacterSheetDataAndInput(
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
	updateCharacterSheetDataAndInput(
		abilityName + "AbilityModifier",
		Math.floor((characterSheetData[abilityName + "AbilityScore"] - 10) / 2)
	);
	updateAbilityDependentModifiers(abilityName);
};

// -- Details

function addDetailButtonIfNotExist(detailName, detailUrlName, containerElem) {
	if (document.getElementById("detailButton-" + detailUrlName)) return;

	let detailButtonElem = detailButtonTemplate.content.cloneNode(true).firstElementChild;
	detailButtonElem.id += detailUrlName;
	detailButtonElem.addEventListener("click", evt => {
		if (evt.target.tagName == "I") {
			detailButtonElem.remove();
			return;
		}
		showModal({
			"template": modalTemplates["detailInfo"],
			"message": searchedDetails[detailUrlName]["description"],
			"heading": detailName,
			"sourceLink": searchedDetails[detailUrlName]["url"],
			"sourceText": searchedDetails[detailUrlName]["source"],
			"prerequisites": searchedDetails[detailUrlName]["prerequisites"]
		});
	});

	detailButtonElem.getElementsByTagName("span")[0].innerText = detailName;

	containerElem.appendChild(detailButtonElem);
}

async function searchDetail(detailName, detailTypes) {
	let detailUrlName = getDetailUrlNameForDetailName(detailName);

	let classUrlName = "";
	let mainRaceName = "";
	let mainRaceUrlName = "";
	if (detailTypes.includes("Subclass")) {
		classUrlName = getDetailUrlNameForDetailName(
			document.getElementById("classAndLevel").value.match(/^\s*(.+?)(,? ?(level)? ? \d+)?\s*$/i)?.[1] ?? ""
		);
	} else if (detailTypes.includes("Race")) {
		mainRaceName = detailName.match(/\S*$/)[0].toSmartTitleCase();
		mainRaceUrlName = getDetailUrlNameForDetailName(mainRaceName);
	};

	if (detailUrlName in searchedDetails) {
		if (Object.keys(searchedDetails[detailUrlName]).length)
			return detailUrlName;
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
			for (const CORS_PROXY of CORS_PROXIES) {
				let fetchFailed = await fetch(CORS_PROXY + url)
					.then((response) => {
						if (response.status == 200) return response.text();
						else if (response.status != 404) console.error("Status Code (" + url + "): " + response.status);
					}).then((data) => {
						if (!data) return;

						let contentElem = new DOMParser().parseFromString(data, "text/html").getElementById("page-content");

						contentElem.querySelector("#toc")?.remove();

						let source = "";
						for (let elem of contentElem.querySelectorAll("p" + (contentElem.getElementsByTagName("h1").length ? ":has(~ h1:first-of-type)" : ""))) {
							if (!(elem.innerText.startsWith("Source: "))) continue;
							source = elem.innerText.substring("Source: ".length);
							elem.remove();
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
							if (subraceRowElem) {
								for (let elem of subraceRowElem.getElementsByTagName("p")) {
									if (!(elem.innerText.startsWith("Source: "))) continue;
									source = elem.innerText.substring("Source: ".length);
									elem.remove();
									break;
								};
								rowElems.forEach(rowElem => { if (rowElem != subraceRowElem) rowElem.remove() });
							} else {
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
							if (elem.rows[0].cells.length == 1) elem.rows[0].remove()
							if (elem.rows[0].cells[0].innerText.trim() == elem.rows[0].innerText.trim()) {
								let heading = document.createElement("h2");
								heading.innerText = "## " + elem.rows[0].innerText.trim() + "\n";
								elem.before(heading);
								elem.rows[0].remove();
							};

							elem.innerText = [...elem.rows].map(row => {
								return "| " + [...row.cells].map(cell => {
									return cell.innerText.trim().replaceAll("\n", " ").replaceAll("|", "!")
								}).join(" | ") + " |"
							}).join("\n") + "\n";
						};

						let description = contentElem.innerText.trim()
							.replace(/([^\n])\n\n+([^\n\|])/g, "$1\n$2")
							.replace(/([^\n\|])\n\n+([^\n])/g, "$1\n$2")
							.replace(/\|\n\n\n+\|/g, "|\n\n|");

						searchedDetails[detailUrlName] = {
							detailType, description, prerequisites, source, url
						};
					}).catch(err => {
						console.error(err)
						return true;
					});
				if (fetchFailed) continue;
				if (Object.keys(searchedDetails[detailUrlName]).length)
					return detailUrlName;
				break;
			};
		};
	};
};

const checkForDetailsInInput = (() => {
	let delay = 1000;
	let timeouts = {};
	return (elem) => {
		let identifier = elem.id;
		if (!elem.id) {
			let cellElem = elem.parentElement;
			let rowElem = cellElem?.parentElement;
			let tbodyElem = rowElem?.parentElement;
			if (!tbodyElem) return;
			identifier =
				tbodyElem.id +
				"-" +
				([...tbodyElem.children].indexOf(rowElem) + 1) +
				"-" +
				([...rowElem.children].indexOf(cellElem) + 1);
		};
		clearTimeout(timeouts[identifier]);
		timeouts[identifier] = setTimeout(() => {
			let detailTypes = [];
			switch (elem.id) {
				case "classAndLevel":
					detailTypes = ["Class"];
					break;
				case "background":
					detailTypes = ["Background"];
					break;
				case "race":
					detailTypes = ["Race"];
					break;
				case "featuresAndTraits":
					detailTypes = ["Subclass", "Feat"];
					break;
				case "equipmentNotes":
					detailTypes = ["Adventuring Gear", "Armor", "Wondrous Item"];
					break;
				default:
					break;
			};
			if (!detailTypes.length) {
				switch (elem.className) {
					case "spell__name":
						detailTypes = ["Spell"];
						break;
					default:
						break;
				};
			};

			let regexes = [];

			if (detailTypes.includes("Class"))
				regexes.push({ "regexObject": /^\s*(.+?)(,? ?(level)? ? \d+)?\s*$/ig, "detailTypes": ["Class"] });

			if (detailTypes.includes("Background") || detailTypes.includes("Race"))
				regexes.push({
					"regexObject": /\s*(.+)\s*/g,
					"detailTypes": ["Background", "Race"].filter(item => detailTypes.includes(item))
				});

			if (detailTypes.includes("Feat") || detailTypes.includes("Subclass"))
				regexes.push({
					"regexObject": /^\s*([\w\(\)][\w \(\)]*)(:| - )\s*$/gm,
					"detailTypes": ["Feat", "Subclass"].filter(item => detailTypes.includes(item))
				});

			if (detailTypes.includes("Adventuring Gear"))
				regexes.push({ "regexObject": /^\s*(.*)'s pack( ?x ?\d+)?\s*$/igm, "detailTypes": ["Adventuring Gear"] });

			if (detailTypes.includes("Armor"))
				regexes.push({ "regexObject": /^\s*(.*) armou?r( ?x ?\d+)?\s*$/igm, "detailTypes": ["Armor"] });

			if (detailTypes.includes("Wondrous Item"))
				regexes.push({ "regexObject": /^\s*([\w ]+?)( ?x ?\d+)?\s*$/gm, "detailTypes": ["Wondrous Item"] });

			if (detailTypes.includes("Spell"))
				regexes.push({ "regexObject": /^\s*(.+?)( ?\(.+\))?\s*$/g, "detailTypes": ["Spell"] });

			regexes.forEach((regex) => {
				for (let detail of elem.value.matchAll(regex["regexObject"])) {
					let detailName = detail[1].trim().toSmartTitleCase();
					if (!detailName) continue;

					if (regex["detailTypes"].includes("Adventuring Gear"))
						detailName = "Adventuring Gear";
					else if (regex["detailTypes"].includes("Armor"))
						detailName = "Armor";

					searchDetail(detailName, regex["detailTypes"])
						.then(detailUrlName => {
							if (!searchedDetails[detailUrlName]) return;

							let containerElem;
							if (["Adventuring Gear", "Armor", "Wondrous Item"].includes(searchedDetails[detailUrlName]["detailType"]))
								containerElem = document.getElementsByClassName("equipment__detailButtonsContainer")[0];
							else if (searchedDetails[detailUrlName]["detailType"] == "Spell")
								containerElem = elem.parentElement;
							else
								containerElem = document.getElementsByClassName("featuresAndTraits__detailButtonsContainer")[0];

							addDetailButtonIfNotExist(detailName, detailUrlName, containerElem);
						});
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
		return rolls.join("+") || "0";
	});
	if (expression.match(/[^\d\+\-\* ]/)) {
		alert("The roll you entered wasn't understood.", "Invalid Roll", "fa-times-circle");
		return;
	};
	if (expression.match(/[^\d]/)) output.push("Roll: " + expression);
	output.push("Total: " + eval(expression));
	alert(output.join("\n"), "Roll")
};

// Event Listeners

function inputEventListener(evt) {
	let elem = evt.target;
	if (!elem.validity.valid) return

	if (["characterName", "characterName2"].includes(elem.id)) {
		characterSheetData["characterName"] = elem.value;
		document.getElementById((elem.id == "characterName") ? "characterName2" : "characterName").value = elem.value;
	} else if (elem.className.startsWith("weapon__")) {
		let cellElem = elem.parentElement;
		let rowElem = cellElem.parentElement;
		let cellIndex = [...rowElem.children].indexOf(cellElem);
		let tbodyElem = rowElem.parentElement;

		characterSheetData["weapons"][[...tbodyElem.children].indexOf(rowElem)][cellIndex] = elem.value;
		if (JSON.stringify(characterSheetData["weapons"].at(-1)) != JSON.stringify(emptyCharacterSheetData["weapons"][0])) {
			characterSheetData["weapons"].push([...emptyCharacterSheetData["weapons"][0]]);
			addWeaponRow(characterSheetData["weapons"].at(-1));
		};

		while (
			(characterSheetData["weapons"].length > emptyCharacterSheetData["weapons"].length) &&
			(JSON.stringify(characterSheetData["weapons"].at(-2)) == JSON.stringify(emptyCharacterSheetData["weapons"][0]))
		) {
			characterSheetData["weapons"].splice(characterSheetData["weapons"].length - 2, 1);
			tbodyElem.children[tbodyElem.children.length - 2].remove();
			tbodyElem.lastElementChild.children[cellIndex].firstElementChild.focus();
		};
	} else if (elem.className.startsWith("spell__")) {
		let cellElem = elem.parentElement;
		let rowElem = cellElem.parentElement;
		let cellIndex = [...rowElem.children].indexOf(cellElem);
		let tbodyElem = rowElem.parentElement;
		let value = (elem.type == "checkbox") ? elem.checked : elem.value;

		characterSheetData[tbodyElem.id][[...tbodyElem.children].indexOf(rowElem)][cellIndex + ((tbodyElem.id == "spellsLevel0") ? 1 : 0)] = value;
		if (JSON.stringify(characterSheetData[tbodyElem.id].at(-1)) != JSON.stringify(emptyCharacterSheetData[tbodyElem.id][0])) {
			characterSheetData[tbodyElem.id].push([...emptyCharacterSheetData[tbodyElem.id][0]]);
			addSpellRow(tbodyElem.id, characterSheetData[tbodyElem.id].at(-1));
		};

		while (
			(characterSheetData[tbodyElem.id].length > emptyCharacterSheetData[tbodyElem.id].length) &&
			(JSON.stringify(characterSheetData[tbodyElem.id].at(-2)) == JSON.stringify(emptyCharacterSheetData[tbodyElem.id][0]))
		) {
			characterSheetData[tbodyElem.id].splice(characterSheetData[tbodyElem.id].length - 2, 1);
			tbodyElem.children[tbodyElem.children.length - 2].remove();
			tbodyElem.lastElementChild.children[cellIndex].firstElementChild.focus();
		};
	} else if (elem.type == "checkbox")
		characterSheetData[elem.id] = elem.checked;
	else
		characterSheetData[elem.id] = (typeof characterSheetData[elem.id] == "number") ? Number(elem.value) : elem.value;
	autosaveCharacterSheet();

	checkForDetailsInInput(elem);

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
document.getElementsByClassName("previousButton")[0].addEventListener("click", evt => {
	let headers = Array.from(document.getElementsByTagName("header"));
	let newIndex = headers.indexOf(document.querySelector("header:not(.hidden)")) - 1;
	headers.forEach((header, index) => header.classList.toggle("hidden", index != newIndex))
	Array.from(document.getElementsByTagName("main")).forEach(
		(main, index) => main.classList.toggle("hidden", index != newIndex)
	);
	evt.target.classList.toggle("invisible", newIndex == 0);
	evt.target.nextElementSibling.nextElementSibling.classList.remove("invisible");
});
document.getElementsByClassName("nextButton")[0].addEventListener("click", evt => {
	let headers = Array.from(document.getElementsByTagName("header"));
	let newIndex = headers.indexOf(document.querySelector("header:not(.hidden)")) + 1;
	headers.forEach((header, index) => header.classList.toggle("hidden", index != newIndex))
	Array.from(document.getElementsByTagName("main")).forEach(
		(main, index) => main.classList.toggle("hidden", index != newIndex)
	);
	evt.target.classList.toggle("invisible", newIndex == (headers.length - 1));
	evt.target.previousElementSibling.previousElementSibling.classList.remove("invisible");
});
document.getElementsByClassName("saveButton")[0].addEventListener("click", _ => {
	showModal({
		"template": modalTemplates["save"],
		"message": "You can click 'Download' to download an editable PDF of this character sheet and upload it the next time you visit this website.\n\nYour character sheet also autosaves on your device so as long as you don't clear your browsing data, when you open up this website up again on this device you can access your previously used character sheets.",
		"heading": "Saving This Character Sheet",
		"icon": "fa-floppy-disk"
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
	if (evt.key == "Escape" && ["INPUT", "TEXTAREA"].includes(evt.target.tagName)) {
		evt.target.blur();
	} else if ((evt.ctrlKey || evt.metaKey) && (evt.key == "s")) {
		evt.preventDefault();
		button = document.getElementsByClassName("saveButton")[0];
	} else if ((evt.ctrlKey || evt.metaKey) && evt.shiftKey && (evt.key == "r")) {
		evt.preventDefault();
		button = document.getElementsByClassName("rollButton")[0];
	} else if ((evt.ctrlKey || evt.metaKey) && evt.shiftKey && (evt.key == "d")) {
		evt.preventDefault();
		button = document.getElementsByClassName("donationButton")[0];
	} else if (
		(evt.ctrlKey || evt.metaKey) &&
		evt.shiftKey &&
		(["ArrowLeft", "ArrowRight"].includes(evt.key)) &&
		!["INPUT", "TEXTAREA"].includes(evt.target.tagName)
	) {
		evt.preventDefault();
		button = document.getElementsByClassName((evt.key == "ArrowLeft") ? "previousButton" : "nextButton")[0];
		if (button.classList.contains("invisible")) button = undefined;
	};
	if (document.getElementById("modal")) return;
	button?.click();
});

// Main

fetch("README.md")
	.then(response => response.text())
	.then(response => showModal({
		"template": modalTemplates["welcome"],
		"message": response.replace(/^.+\n/, "").replace(/^\n#/gm, "#"),
		"heading": "Welcome",
		"icon": "fa-dice-d20"
	})).then(_ => {
		autosaveCharacterSheet(false);
		Object.entries(characterSheetData).forEach(([key, value]) => updateInput(key, value))
	});