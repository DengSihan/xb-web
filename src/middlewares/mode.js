import getCurrentMode from '~/plugins/mode.js';

const mode = (allows) => (to, from, next) => {

	if (allows.includes(getCurrentMode())) {
        next();
    }
    else {
        next({
            name: 'index'
        });
    }
}

export default mode;