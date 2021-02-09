// story object
export const STORY_COLLECTION_NAME = 'stories';
export const STORY_ATTRIBUTE_TITLE = 'title';
export const STORY_ATTRIBUTE_USERS = 'user_references';
export const STORY_DOT_COLLECTION_TITLE = 'dots';
export const STORY_NEW_PROJECT_DEFAULT_TITLE = 'New Project';
export const STORY_ATTRIBUTE_PROGRESS_MAP = 'progress_map';
export const STORY_PROGRESS_MAP = {
	'Identify People': false,
	'Choose People': false,
	'Affinity Map': false,
	'Saying': false,
	'Doing': false,
	'Thinking': false,
	'Feeling': false,
	'evaluation': false,
	'prototype_test_analyze': false,
	'learn_iterate_repeat': false,
	'build_test_finalize': false,
	'out': false,
}
// export const STORY_ATTRIBUTE_BLOCKED_DOTS = 'blocked_dots';

// user object
export const USER_COLLECTION_NAME = 'users';
export const USER_ATTRIBUTE_EMAIL = 'email';
export const USER_ATTRIBUTE_FIRST_NAME = 'first_name';
export const USER_ATTRIBUTE_LAST_NAME = 'last_name';
export const USER_ATTRIBUTE_ROLE = 'role';
export const USER_ATTRIBUTE_STORY_REFERENCES = 'story_references';
export const USER_ATTRIBUTE_STUDENTS_LIST = 'students_list';

// dot object
export const DOT_COLLECTION_NAME = 'dots';
export const DOT_ATTRIBUTE_QA_PAIRS = 'qa_pairs';
export const DOT_ATTRIBUTE_ICON = 'icon';
export const DOT_ATTRIBUTE_SECTION = 'section';
export const DOT_ATTRIBUTE_TITLE = 'title';
export const DOT_ATTRIBUTE_IS_CHECKPOINT = 'is_checkpoint';
// qa_pairs array
export const QA_PAIRS_QUESTION = 'question';
export const QA_PAIRS_ANSWER = 'answer';
export const QA_PAIRS_ID = 'qa_id';
export const QA_PAIRS_EDITED_BY = 'edited_by';

// four section info
export const DISCOVER_SECTION_TITLE = 'Discover';
export const DEFINE_SECTION_TITLE = 'Define';
export const DEVELOP_SECTION_TITLE = 'Develop';
export const DELIVER_SECTION_TITLE = 'Deliver';

// Dot color info
export const ALL_SECTIONS_DARK_ICON_COLOR = 'rgba(53, 52, 52, 1)';
export const ALL_SECTIONS_LIGHT_ICON_COLOR = 'rgb(128, 128, 128)';

export const DISCOVER_SECTION_DARK_BACKGROUND_COLOR = '#ffd249';
export const DISCOVER_SECTION_LIGHT_BACKGROUND_COLOR = '#ffe596';
export const DEFINE_SECTION_DARK_BACKGROUND_COLOR = '#4976FF';
export const DEFINE_SECTION_LIGHT_BACKGROUND_COLOR = '#96b0ff';
export const DEVELOP_SECTION_DARK_BACKGROUND_COLOR = '';
export const DEVELOP_SECTION_LIGHT_BACKGROUND_COLOR = '';
export const DELIVER_SECTION_DARK_BACKGROUND_COLOR = '';
export const DELIVER_SECTION_LIGHT_BACKGROUND_COLOR = '';

// Roles
export const ROLE_STUDENT = 'student';
export const ROLE_PROFESSOR = 'professor';

// Checkpoint
export const CHECKPOINT_TITLE = 'title';
export const CHECKPOINT_DOT_REF = 'dot_ref';
export const CHECKPOINT_IS_STUCK_AT_CHECKPOINT = 'is_stuck_at_checkpoint';
