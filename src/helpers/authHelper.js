import {Cookie} from "./cookieHelper.js";

export function checkAuthentication (router) {
    let cookie = new Cookie();

    let uid = cookie.getCookie('uid');
    let token = cookie.getCookie('token');

    if (uid && token) {
        if (location.pathname === '/login') {
            router.push('/')
        }

        return true;
    } else {
        if (location.pathname !== '/login') {
            router.push('/login')
        }

        return false;
    }
}