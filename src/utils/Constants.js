/**
 * App constants to avoid typos
 */
// Loading bar constants
export const LOADING_BAR_VISIBILITY = 'default';
export const LOADING_BAR_SHOWING = 1;
// App constants
export const SIGNED_OUT_USER = '';
// Location/path constants
export const PATH_TO_ROOT = '/';
export const PATH_TO_SIGN_IN = '/sign-in';
export const PATH_TO_DASHBOARD = PATH_TO_ROOT;
export const PATH_TO_UNANSWERED_QUESTIONS_PARAMS = '';
export const PATH_TO_UNANSWERED_QUESTIONS = PATH_TO_DASHBOARD + PATH_TO_UNANSWERED_QUESTIONS_PARAMS;
export const PATH_TO_ANSWERED_QUESTIONS_PARAMS = '?answered=true';
export const PATH_TO_ANSWERED_QUESTIONS = PATH_TO_DASHBOARD + PATH_TO_ANSWERED_QUESTIONS_PARAMS;
export const PATH_TO_NEW_QUESTION = '/add';
export const PATH_TO_LEADER_BOARD = '/leaderboard';
export const PATH_TO_QUESTION_PART = '/questions';
export const PATH_TO_QUESTION = PATH_TO_QUESTION_PART + '/:id';
