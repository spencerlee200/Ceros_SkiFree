export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';

export const SKIER_JUMP_1 = 'skier_jump_1';
export const SKIER_JUMP_2 = 'skier_jump_2';
export const SKIER_JUMP_3 = 'skier_jump_3';
export const SKIER_JUMP_4 = 'skier_jump_4';
export const SKIER_JUMP_5 = 'skier_jump_5';
export const SKIER_JUMP_6 = 'skier_jump_6';

export const RHINO_DEFAULT = 'rhino_default';
export const RHINO_EAT_1 = 'rhino_eat_1';
export const RHINO_EAT_2 = 'rhino_eat_2';
export const RHINO_EAT_3 = 'rhino_eat_3';
export const RHINO_EAT_4 = 'rhino_eat_4';
export const RHINO_EAT_5 = 'rhino_eat_5';
export const RHINO_EAT_6 = 'rhino_eat_6';
export const RHINO_EAT_7 = 'rhino_eat_7';
export const RHINO_EAT_8 = 'rhino_eat_8';
export const RHINO_EAT_9 = 'rhino_eat_9';
export const RHINO_EAT_10 = 'rhino_eat_10';
export const RELEASE_THE_RHINO = 100;

export const RHINO_RUN_LEFT_1 = 'rhino_run_left_1';
export const RHINO_RUN_LEFT_2 = 'rhino_run_left_2';
export const RHINO_RUN_RIGHT_1 = 'rhino_run_right_1';
export const RHINO_RUN_RIGHT_2 = 'rhino_run_right_2';

export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const RAMP = 'ramp';
export const RAMP_BONUS = 300;

export const HEART = 'heart';

export const SKIER_STARTING_SPEED = 8;
export const SKIER_MAX_SPEED = 15;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [SKIER_JUMP_1]: 'img/skier_jump_1.png',
    [SKIER_JUMP_2]: 'img/skier_jump_2.png',
    [SKIER_JUMP_3]: 'img/skier_jump_3.png',
    [SKIER_JUMP_4]: 'img/skier_jump_4.png',
    [SKIER_JUMP_5]: 'img/skier_jump_1.png',
    [SKIER_JUMP_6]: 'img/skier_jump_6.png',
    [RHINO_DEFAULT]: 'img/rhino_default.png',
    [RHINO_EAT_1]: 'img/rhino_eat_1.png',
    [RHINO_EAT_2]: 'img/rhino_eat_2.png',
    [RHINO_EAT_3]: 'img/rhino_eat_3.png',
    [RHINO_EAT_4]: 'img/rhino_eat_4.png',
    [RHINO_EAT_5]: 'img/rhino_eat_5.png',
    [RHINO_EAT_6]: 'img/rhino_eat_6.png',
    [RHINO_EAT_7]: 'img/rhino_eat_5.png',
    [RHINO_EAT_8]: 'img/rhino_eat_6.png',
    [RHINO_EAT_9]: 'img/rhino_eat_5.png',
    [RHINO_EAT_10]: 'img/rhino_eat_6.png',
    [RHINO_RUN_LEFT_1]: 'img/rhino_run_left_1.png',
    [RHINO_RUN_LEFT_2]: 'img/rhino_run_left_2.png',
    [RHINO_RUN_RIGHT_1]: 'img/rhino_run_right_1.png',
    [RHINO_RUN_RIGHT_2]: 'img/rhino_run_right_2.png',
    [TREE] : 'img/tree_1.png',
    [TREE_CLUSTER] : 'img/tree_cluster.png',
    [ROCK1] : 'img/rock_1.png',
    [ROCK2] : 'img/rock_2.png',
    [RAMP] : 'img/jump_ramp.png',
    [HEART] : 'img/heart.png'
};

export const SKIER_DIRECTIONS = {
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5,
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT
};

export const RHINO_DIRECTIONS = {
    DOWN : 0,
    LEFT : 1,
    LEFT_ALT: 2,
    RIGHT : 3,
    RIGHT_ALT: 4
};

export const RHINO_DIRECTION_ASSET = {
    [RHINO_DIRECTIONS.DOWN] : RHINO_DEFAULT,
    [RHINO_DIRECTIONS.LEFT] : RHINO_RUN_LEFT_1,
    [RHINO_DIRECTIONS.LEFT_ALT] : RHINO_RUN_LEFT_2,
    [RHINO_DIRECTIONS.RIGHT] : RHINO_RUN_RIGHT_1,
    [RHINO_DIRECTIONS.RIGHT_ALT] : RHINO_RUN_RIGHT_2
};

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40
};