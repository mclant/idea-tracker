import * as DatabaseInfoConstants from './DatabaseInfoConstants';

////////////////////////////////////////////////////////////////////////////////////////////////
// Identify People Dot
export const IDENTIFY_PEOPLE_DOT_TITLE = 'Identify People';
export const IDENTIFY_PEOPLE_SECTION = DatabaseInfoConstants.DISCOVER_SECTION_TITLE;
export const IDENTIFY_PEOPLE_DOT_QUESTION_1 = 'Characteristics of members of the communities (# / community)';
export const IDENTIFY_PEOPLE_DOT_QUESTION_2 = 'Extreme limits of people with each characteristic (# / characteristic)';
export const IDENTIFY_PEOPLE_DOT_QUESTION_3 = 'Places, people, experiences in the lives of people in extreme limits (# / extreme limit group)';
export const IDENTIFY_PEOPLE_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: false,
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



////////////////////////////////////////////////////////////////////////////////////////////////
// Choose People Dot
export const CHOOSE_PEOPLE_DOT_TITLE = 'Choose People';
export const CHOOSE_PEOPLE_SECTION = DatabaseInfoConstants.DISCOVER_SECTION_TITLE;
export const CHOOSE_PEOPLE_DOT_QUESTION_1 = 'What are each team member’s preferences? (each team member gets 3 votes)';
export const CHOOSE_PEOPLE_DOT_QUESTION_2 = 'What kind of access does your team have to the people? (explain points of contact, obstacles to access, gateways through obstacles)';
export const CHOOSE_PEOPLE_DOT_QUESTION_3 = 'What clusters of users are there? (describe the elements of the cluster of users - not just the name of the cluster)';
export const CHOOSE_PEOPLE_DOT_QUESTION_4 = 'What trends about the customers have you found? (show logic on growth trends, show data as well)';
export const CHOOSE_PEOPLE_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: false,
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
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 4,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: CHOOSE_PEOPLE_DOT_QUESTION_4,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}




////////////////////////////////////////////////////////////////////////////////////////////////
// Primary Research Dot
export const PRIMARY_RESEARCH_DOT_TITLE = 'Primary Research';
export const PRIMARY_RESEARCH_SECTION = DatabaseInfoConstants.DISCOVER_SECTION_TITLE;
export const PRIMARY_RESEARCH_DOT_QUESTION_1 = 'Which communities have you reached ---  (# / community?)';
export const PRIMARY_RESEARCH_DOT_QUESTION_2 = 'What methods for reaching out did you use? (polling, surveys, group conversations, etc.)';
export const PRIMARY_RESEARCH_DOT_QUESTION_3 = 'How many pieces of contact information did you receive per method of reaching out? (fractions with numerator and denominator named - # of contact info / # of reach-outs per method: example: 150 emails / 3 facebook group posts)';
export const PRIMARY_RESEARCH_DOT_QUESTION_4 = 'How many interviews did you conduct? (fractions with numerator and denominator named - example: 100 interviews conducted, 200 requested)';
export const PRIMARY_RESEARCH_DOT_QUESTION_5 = 'Information entropy — how many comments from the last interview (or survey) were repeated?  How many were new?'
export const PRIMARY_RESEARCH_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: false,
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
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 4,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PRIMARY_RESEARCH_DOT_QUESTION_4,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 5,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PRIMARY_RESEARCH_DOT_QUESTION_5,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}




////////////////////////////////////////////////////////////////////////////////////////////////
// Secondary Research Dot
export const SECONDARY_RESEARCH_DOT_TITLE = 'Secondary Research';
export const SECONDARY_RESEARCH_SECTION = DatabaseInfoConstants.DISCOVER_SECTION_TITLE;
export const SECONDARY_RESEARCH_DOT_QUESTION_1 = 'What sources did you search?';
export const SECONDARY_RESEARCH_DOT_QUESTION_2 = 'What data did you gather? (demographics, trends, competitors, profits, etc.)';
export const SECONDARY_RESEARCH_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: false,
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
	]
}
