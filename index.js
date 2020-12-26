import Cookies from 'js-cookie'

const cookieName = "preferences";

let data = {
    // appearance: null,
    // muted: null,
    // language: null,
    // timezone: null,
    // currency: null,
}

const base64String = Cookies.get(cookieName);
if (base64String)
    data = JSON.parse(atob(base64String));


const setCookie = () => {
    Cookies.set(cookieName, btoa(JSON.stringify(data)), {expires: 7, path: "/"});
}

export default {
    get: (attribute, defaultValue) => {
        return data.hasOwnProperty(attribute)
            ? data[attribute]
            : defaultValue;
    },
    set: (attribute, value) => {
        data[attribute] = value;
        setCookie();
    },
    unset: (attribute) => {
        if (typeof data[attribute] !== "undefined") {
            delete data[attribute];
            setCookie();
        }
    },
}
