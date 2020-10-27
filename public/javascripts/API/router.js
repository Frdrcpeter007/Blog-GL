import { register } from './users.js';

(() => {
    var pathname = window.location.pathname;

    if (/users/i.test(pathname.split("/")[1])) {
        if (/inscription/i.test(pathname.split("/")[2])) {
            register()
        }
    }
})();