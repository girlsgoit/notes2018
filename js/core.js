const API = {
    BASE_URL: 'https://notes-api.girlsgoit.org/',

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
    csrfSafeMethod: function (method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    },
    setupCsrf: function () {
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!AJAX.csrfSafeMethod(settings.type)) {
                    xhr.setRequestHeader("X-CSRFToken", Cookie.get('csrftoken'));
                }
            }
        });
    }
};

const User = {
    LS_KEY: 'authUser',
    authUser: null,
    saveUser: (user) => {
        localStorage.setItem(this.LS_KEY, JSON.stringify(user));
    },
    loadUser: () => {
        this.authUser = JSON.parse(localStorage.getItem(this.LS_KEY));
    },
};

const HeaderControls = {
    fillName: () => {
        if (User.authUser) {
            $('#full-name').text(`${User.authUser.firstName} ${User.authUser.lastName}`)
        }
    },
    bindLogout: () => {
        $('#logout').on('click', (e) => {
            e.preventDefault();
            API.post('auth/logout', null, (response) => {
                URL.redirect('/pages/signin.html');
            })
        })
    },
    bindAll: () => {
        HeaderControls.fillName();
        HeaderControls.bindLogout();
    }
};

const URL = {
    getQueryParam: (sParam) => {
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
    redirect: (toUrl) => {
        $(location).attr('href', toUrl);
    }
};


// EXECUTE
API.get('ping/', (response) => {
    if (response.status !== 200) {
        console.log(response);
    }
});

AJAX.setupCsrf();
User.loadUser();

HeaderControls.bindAll();