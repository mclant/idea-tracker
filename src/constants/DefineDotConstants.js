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
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: true,
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
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: false,
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
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: false,
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
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: false,
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
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: false,
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




////////////////////////////////////////////////////////////////////////////////////////////////
// Opportunity Areas row

// Persona dot
export const PERSONA_DOT_TITLE = 'Persona';
export const PERSONA_SECTION = DatabaseInfoConstants.DEFINE_SECTION_TITLE;
export const PERSONA_DOT_QUESTION_1 = 'Which group does this person belong to?';
export const PERSONA_DOT_QUESTION_2 = 'Name the person.';
export const PERSONA_DOT_QUESTION_3 = 'Paste a link to a stock photo of a person here:';
export const PERSONA_DOT_QUESTION_4 = 'What are their characteristics?';
export const PERSONA_DOT_QUESTION_5 = 'What are their values? (what do they care about?)';
export const PERSONA_DOT_QUESTION_6 = 'Write a sketch of their life including narrative stories from their life:';
export const PERSONA_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: false,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: PERSONA_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: PERSONA_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PERSONA_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 2,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PERSONA_DOT_QUESTION_2,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 3,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PERSONA_DOT_QUESTION_3,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 4,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PERSONA_DOT_QUESTION_4,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 5,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PERSONA_DOT_QUESTION_5,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 6,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PERSONA_DOT_QUESTION_6,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}


// Experience Map dot
export const EXPERIENCE_MAP_DOT_TITLE = 'Experience Map';
export const EXPERIENCE_MAP_SECTION = DatabaseInfoConstants.DEFINE_SECTION_TITLE;
export const EXPERIENCE_MAP_DOT_QUESTION_1 = 'What objective is the customer is trying to complete?';
export const EXPERIENCE_MAP_DOT_QUESTION_2 = 'What are the key stages the customer progresses through to complete the objective?';
export const EXPERIENCE_MAP_DOT_QUESTION_3 = 'For each stage, use ethnographic data (from empathy map), to organize your data and empathy analysis. What is the customer saying in this stage? What is the customer doing in this stage? What is the customer thinking in this stage? What is the customer feeling in this stage?';
export const EXPERIENCE_MAP_DOT_QUESTION_4 = 'What are the opportunities to solve the customer’s pain that emerge from your empathy analysis?';
export const EXPERIENCE_MAP_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: false,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: EXPERIENCE_MAP_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: EXPERIENCE_MAP_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: EXPERIENCE_MAP_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 2,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: EXPERIENCE_MAP_DOT_QUESTION_2,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 3,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: EXPERIENCE_MAP_DOT_QUESTION_3,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 4,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: EXPERIENCE_MAP_DOT_QUESTION_4,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}







////////////////////////////////////////////////////////////////////////////////////////////////
// Identify the Pain row

// Pain dot
export const PAIN_DOT_TITLE = 'Pain';
export const PAIN_SECTION = DatabaseInfoConstants.DEFINE_SECTION_TITLE;
export const PAIN_DOT_QUESTION_1 = 'What pain will you focus on?';
export const PAIN_DOT_QUESTION_2 = 'What category of pain is this? (functional, physical, financial, social, emotional etc.)';
export const PAIN_DOT_QUESTION_3 = 'What is the depth of pain? (almost impossible to measure)';
export const PAIN_DOT_QUESTION_4 = 'What is the breadth of pain? (who has it)';
export const PAIN_DOT_QUESTION_5 = 'What solutions already exist?';
export const PAIN_DOT_QUESTION_6 = 'What are the residual pains?';
export const PAIN_DOT_QUESTION_7 = 'What problems must be overcome to solve this pain? (multi-sided platform, regulations, etc.)';
export const PAIN_EMPTY_DOT = {
	dotId: null,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]: false,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]: PAIN_DOT_TITLE,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: PAIN_SECTION,
	[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: [
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 1,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PAIN_DOT_QUESTION_1,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 2,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PAIN_DOT_QUESTION_2,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 3,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PAIN_DOT_QUESTION_3,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 4,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PAIN_DOT_QUESTION_4,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 5,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PAIN_DOT_QUESTION_5,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 6,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PAIN_DOT_QUESTION_6,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
		{
			[DatabaseInfoConstants.QA_PAIRS_ID]: 7,
			[DatabaseInfoConstants.QA_PAIRS_QUESTION]: PAIN_DOT_QUESTION_7,
			[DatabaseInfoConstants.QA_PAIRS_ANSWER]: '',
		},
	]
}
