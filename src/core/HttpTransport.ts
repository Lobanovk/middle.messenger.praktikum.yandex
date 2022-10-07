
enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

function queryStringify(data: Record<string, any>) {
    const result = Object.keys(data).reduce((acc, key, index, array) => {
        acc += `${key}=${data[key].toString()}${index === array.length - 1 ? "" : "&"}`;
        return acc;
    }, '?')

    return result.substring(0, result.length - 1);
}

type OptionsRequest = {
    data?: Record<string, any>,
    method: METHODS,
    headers?: Record<string, string>,
    timeout?: number
}

type Options = Omit<OptionsRequest, 'method'>


export default class HttpTransport {
    get = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    }

    put = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    }
    delete = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    }

    patch = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.PATCH}, options.timeout);
    }

    request = (url: string, options: OptionsRequest, timeout = 5000) => {
        const { method, data, headers } = options;

        return new Promise((res, rej) => {
            const isGetMethod = method === METHODS.GET;
            const xhr = new XMLHttpRequest();


            if (headers) {
                Object.keys(headers).forEach(header => {
                    xhr.setRequestHeader(header, headers[header]);
                })
            }

            xhr.timeout = timeout;

            xhr.open(method, isGetMethod && !!data ? `${url}${queryStringify(data)}` : url);

            xhr.onload = function() {
                res(xhr);
            }

            xhr.onabort = rej;
            xhr.onerror = rej;
            xhr.ontimeout = rej;
            if (isGetMethod || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        })
    } ;
}
