import * as DatabaseInfoConstants from './DatabaseInfoConstants';


////////////////////////////////////////////////////////////////////////////////////////////////
// Affinity Map Dot
export const AFFINITY_MAP_DOT_TITLE = 'Affinity Map';
export const AFFINITY_MAP_SECTION = DatabaseInfoConstants.DEFINE_SECTION_TITLE;
export const AFFINITY_MAP_DOT_QUESTION_1 = 'Please post a link to your Affinity Map here:';
export const AFFINITY_MAP_DOT_QUESTION_2 = 'What similar precepts/ideas/thoughts did you find?';
export const AFFINITY_MAP_DOT_QUESTION_3 = 'What common words, emotions, obstacles did your customers share?';
export const AFFINITY_MAP_DOT_QUESTION_4 = 'What insightful quotes did you come across?';
export const AFFINITY_MAP_DOT_QUESTION_5 = 'Did you find any surprises and/or contradictions?';
export const AFFINITY_MAP_DOT_QUESTION_6 = 'What are the differences between customers?';
export const AFFINITY_MAP_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: AFFINITY_MAP_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: AFFINITY_MAP_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: AFFINITY_MAP_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 2,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: AFFINITY_MAP_DOT_QUESTION_2,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 3,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: AFFINITY_MAP_DOT_QUESTION_3,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 4,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: AFFINITY_MAP_DOT_QUESTION_4,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 5,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: AFFINITY_MAP_DOT_QUESTION_5,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 6,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: AFFINITY_MAP_DOT_QUESTION_6,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}



////////////////////////////////////////////////////////////////////////////////////////////////
// Empathy map row

// Saying dot
export const SAYING_DOT_TITLE = 'Saying';
export const SAYING_SECTION = DatabaseInfoConstants.DEFINE_SECTION_TITLE;
export const SAYING_DOT_QUESTION_1 = 'What are your people saying about their pains/problems?';
export const SAYING_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: SAYING_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: SAYING_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: SAYING_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}

// Doing dot
export const DOING_DOT_TITLE = 'Doing';
export const DOING_SECTION = DatabaseInfoConstants.DEFINE_SECTION_TITLE;
export const DOING_DOT_QUESTION_1 = 'What are your people doing about their pains/problems?';
export const DOING_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: DOING_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: DOING_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: DOING_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}

// Thinking dot
export const THINKING_DOT_TITLE = 'Thinking';
export const THINKING_SECTION = DatabaseInfoConstants.DEFINE_SECTION_TITLE;
export const THINKING_DOT_QUESTION_1 = 'What are your people thinking about their pains/problems?';
export const THINKING_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: THINKING_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: THINKING_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: THINKING_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}

// Feeling dot
export const FEELING_DOT_TITLE = 'Feeling';
export const FEELING_SECTION = DatabaseInfoConstants.DEFINE_SECTION_TITLE;
export const FEELING_DOT_QUESTION_1 = 'What are your people feeling about their pains/problems?';
export const FEELING_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: FEELING_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: FEELING_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: FEELING_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}
