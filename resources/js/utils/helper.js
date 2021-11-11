import Api from "./api";

export const setCookie = data => {

    var d = new Date();
    d.setDate(d.getDate() + 1);
    var expires = "expires=" + d.toUTCString();
    document.cookie = data[0] + "=" + data[1] + ";" + expires + ";path=/";
};


export const getCookie = cname => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

export const eraseCookie = cname => {
    document.cookie = name+'=; Max-Age=-99999999;';  
    return "";
};







export const UniversalValidator = data => {
    const re = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!data.isValidate || data.value.length <= 0) return data.errorMsg;
    if (data.isUrl && !re.test(data.value)) return 'Ooops! We need a valid Url.(http://|https://|ftp://)';

    return '';
};


export const apiCall = params => {
    Api.CustomerSave(params).then((result) => {
        return result.data;
    }).catch((error) => {
        return error;
        if (error.response) {
            // Request made and server responded
            return  [{error: true, message: error.response.data.message}];

            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            return  [{error: true, message: error.request}];
        } else {
            // Something happened in setting up the request that triggered an Error
            return  [{error: true, message: error.message}];
        }
    });
};



export const makeid = length => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 };
