const API = {
    BASE_URL: '//localhost:8000/',

    get: function (path, completeCallback) {
        return $.ajax({
            url: this.BASE_URL + path,
            complete: completeCallback,
            type: 'GET',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
    },
    post: function (path, data, completeCallback) {
        $.ajax({
            url: this.BASE_URL + path,
            data: JSON.stringify(data),
            complete: completeCallback,
            type: 'POST',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        });
    },
    put: function (path, data, completeCallback) {
        $.ajax({
            url: this.BASE_URL + path,
            data: JSON.stringify(data),
            complete: completeCallback,
            type: 'PUT',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        });
    },
    delete: function (path, completeCallback) {
        $.ajax({
            url: this.BASE_URL + path,
            complete: completeCallback,
            type: 'DELETE',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        });
    }
};

const Cookie = {
    get: function (name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },
};

const AJAX = {
    setupAuthentication: function () {
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (Auth.authentication) {
                    xhr.setRequestHeader('Authorization', `Token ${Auth.getToken()}`);
                }
            }
        });
    }
};

const Auth = {
    AUTH_KEY: 'authentication',
    authentication: null,
    saveAuthentication: function (auth) {
        localStorage.setItem(this.AUTH_KEY, JSON.stringify(auth));
    },
    loadAuthentication: function () {
        this.authentication = JSON.parse(localStorage.getItem(this.AUTH_KEY));
    },
    getUser: function () {
        return this.authentication.user;
    },
    getToken: function () {
        return this.authentication.token;
    },
    saveUser: function(newUser) {
        this.authentication.user = newUser;
        localStorage.setItem(this.AUTH_KEY, JSON.stringify(this.authentication));
    },
    logout: function () {
        localStorage.removeItem(Auth.AUTH_KEY);
    }
};

const HeaderControls = {
    fillName: function () {
        if (Auth.authentication) {
            let user = Auth.getUser();
            $('#full-name').text(`${user.firstName} ${user.lastName}`)
        }
    },
    bindLogout: function () {
        $('#log-out').on('click', (e) => {
            e.preventDefault();
            API.post('auth/logout', null, (response) => {
                Auth.logout();
                URL.redirect('signin.html');
            })
        })
    },
    insertUserStyle: function() {
        if (Auth.authentication) {
            $('head').append(`<style>${Auth.getUser().settings}</style>`);
        }
    },
    bindAll: function () {
        this.insertUserStyle();
        this.fillName();
        this.bindLogout();
    }
};

const URL = {
    getQueryParam: function (sParam) {
        let sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    },
    redirect: function (toUrl) {
        $(location).attr('href', toUrl);
    }
};

const Text = {
    sanitize: function(input) {
        return input
            .replace(/<script[^>]*?>.*?<\/script>/gi, '')
            .replace(/<[\/\!]*?[^<>]*?>/gi, '')
            .replace(/<style[^>]*?>.*?<\/style>/gi, '')
            .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
    }
};


// EXECUTE
Auth.loadAuthentication();
AJAX.setupAuthentication();

HeaderControls.bindAll();