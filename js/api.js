const CLIENT_BASEURL = '.';
const SERVER_BASEURL = 'http://43.202.152.189';


function serverPath(path) {
    return SERVER_BASEURL + path;
}


function clientPath(path) {
    return CLIENT_BASEURL + path;
}


function setAuthToken(token) {
    window.sessionStorage.setItem('jwtToken', token);
}


function getAuthToken() {
    const token = window.sessionStorage.getItem('jwtToken');
    if (token == null) {
        throw 'Authorization token not found!';
    }
    return token;
}


class APIBuilder {
    constructor() {
        this._method = 'GET';
        this._path = '/';
        this._auth = false;
        this._data = '';
        this._success = (data) => { };
        this._error = (xhr, textStatus, errorThrown) => {
            switch (xhr.status) {
                case 400:
                    console.error("Bad Request:", jqXHR.responseText);
                    alert("형식이 올바르지 않습니다.");
                    break;

                case 401:
                    console.error("Unauthorized:", jqXHR.responseText);
                    alert("접근 권한이 없습니다.");
                    window.location.href = clientPath('/login.html');
                    break;

                case 403:
                    console.error("Forbidden:", jqXHR.responseText);
                    alert("올바른 접근이 아닙니다.");
                    break;

                default:
                    console.error(xhr.status, textStatus, errorThrown);
                    alert("서버 에러");
                    break;
            }
        };
    }

    setMethod(method) {
        this._method = method;
        return this;
    }

    setPath(path) {
        this._path = path;
        return this;
    }

    setData(data) {
        this._data = data;
        return this;
    }

    setSuccessHandler(onSuccess) {
        this._success = onSuccess;
        return this;
    }

    setErrorHandler(onError) {
        this._error = onError;
        return this;
    }

    useAuth(auth = true) {
        this._auth = auth;
        return this;
    }

    build() {
        const request = {
            url: serverPath(this._path),
            type: this._method,
            headers: {},
            data: this._data,
            success: this._success,
            error: this._error,
        };
        if (this._auth) {
            request.headers.Authorization = `Bearer ${getAuthToken()}`;
        }
        return request;
    }

    buildAndSend() {
        $.ajax(this.build());
    }
}
