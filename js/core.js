const API = {
    BASE_URL: '//localhost:3000/',

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


// EXECUTE

// Setup csrf header on each non-safe http method call
AJAX.setupCsrf();
