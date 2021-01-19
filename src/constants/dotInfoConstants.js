import * as DatabaseInfoConstants from './DatabaseInfoConstants';

// Identify People Dot
export const IDENTIFY_PEOPLE_DOT_TITLE = 'Identify People';
export const IDENTIFY_PEOPLE_SECTION = DatabaseInfoConstants.DISCOVER_SECTION_TITLE;
export const IDENTIFY_PEOPLE_DOT_QUESTION_1 = 'Who are the people you will focus on?';
export const IDENTIFY_PEOPLE_DOT_QUESTION_2 = 'Why are you focusing on these people?';
export const IDENTIFY_PEOPLE_DOT_QUESTION_3 = 'Tasks';
export const IDENTIFY_PEOPLE_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: IDENTIFY_PEOPLE_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: IDENTIFY_PEOPLE_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: IDENTIFY_PEOPLE_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 2,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: IDENTIFY_PEOPLE_DOT_QUESTION_2,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 3,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: IDENTIFY_PEOPLE_DOT_QUESTION_3,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}

// Choose People Dot
export const CHOOSE_PEOPLE_DOT_TITLE = 'Choose People';
export const CHOOSE_PEOPLE_SECTION = DatabaseInfoConstants.DISCOVER_SECTION_TITLE;
export const CHOOSE_PEOPLE_DOT_QUESTION_1 = 'choose people q 1';
export const CHOOSE_PEOPLE_DOT_QUESTION_2 = 'choose people q 2';
export const CHOOSE_PEOPLE_DOT_QUESTION_3 = '';
export const CHOOSE_PEOPLE_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: CHOOSE_PEOPLE_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: CHOOSE_PEOPLE_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: CHOOSE_PEOPLE_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 2,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: CHOOSE_PEOPLE_DOT_QUESTION_2,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 3,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: CHOOSE_PEOPLE_DOT_QUESTION_3,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}

// Primary Research Dot
export const PRIMARY_RESEARCH_DOT_TITLE = 'Primary Research';
export const PRIMARY_RESEARCH_SECTION = DatabaseInfoConstants.DISCOVER_SECTION_TITLE;
export const PRIMARY_RESEARCH_DOT_QUESTION_1 = 'primary rsearch q 1';
export const PRIMARY_RESEARCH_DOT_QUESTION_2 = 'q 2';
export const PRIMARY_RESEARCH_DOT_QUESTION_3 = 'primary research q 3';
export const PRIMARY_RESEARCH_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: PRIMARY_RESEARCH_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: PRIMARY_RESEARCH_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PRIMARY_RESEARCH_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 2,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PRIMARY_RESEARCH_DOT_QUESTION_2,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 3,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PRIMARY_RESEARCH_DOT_QUESTION_3,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}

// Secondary Research Dot
export const SECONDARY_RESEARCH_DOT_TITLE = 'Secondary Research';
export const SECONDARY_RESEARCH_SECTION = DatabaseInfoConstants.DISCOVER_SECTION_TITLE;
export const SECONDARY_RESEARCH_DOT_QUESTION_1 = '';
export const SECONDARY_RESEARCH_DOT_QUESTION_2 = '';
export const SECONDARY_RESEARCH_DOT_QUESTION_3 = '';
export const SECONDARY_RESEARCH_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: SECONDARY_RESEARCH_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: SECONDARY_RESEARCH_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: SECONDARY_RESEARCH_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 2,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: SECONDARY_RESEARCH_DOT_QUESTION_2,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 3,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: SECONDARY_RESEARCH_DOT_QUESTION_3,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}
