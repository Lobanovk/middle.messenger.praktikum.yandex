
enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export function queryStringify(data: Record<string, any>) {
  const result = Object.keys(data).reduce((acc, key, index, array) => {
    acc += `${key}=${data[key].toString()}${index === array.length - 1 ? "" : "&"}`;
    return acc;
  }, "?");

  return result.substring(0, result.length);
}

type OptionsRequest = {
  data?: Document | XMLHttpRequestBodyInit | null,
  queryParams?: Record<string, any>,
  method: METHODS,
  headers?: Record<string, string>,
  timeout?: number
}

type Options = Omit<OptionsRequest, "method">


class HttpTransport {
  private baseUrl = "";

  constructor(url: string) {
    this.baseUrl = url;
  }
  get<T extends any>(url: string, options: Options = {}) {
    return this.request<T>(url, {...options, method: METHODS.GET}, options.timeout);
  }

  post<T extends any>(url: string, options: Options = {}) {
    return this.request<T>(url, {...options, method: METHODS.POST}, options.timeout);
  }

  put<T extends any>(url: string, options: Options = {}) {
    return this.request<T>(url, {...options, method: METHODS.PUT}, options.timeout);
  }

  delete<T extends any>(url: string, options: Options = {}) {
    return this.request<T>(url, {...options, method: METHODS.DELETE}, options.timeout);
  }

  patch<T extends any>(url: string, options: Options = {}) {
    return this.request<T>(url, {...options, method: METHODS.PATCH}, options.timeout);
  }

  request<T>(url: string, options: OptionsRequest, timeout = 5000): Promise<T> {
    const { method, data, queryParams, headers } = options;

    url = `${this.baseUrl}${url}`;

    return new Promise((res, rej) => {
      const isGetMethod = method === METHODS.GET;
      const xhr = new XMLHttpRequest();

      xhr.timeout = timeout;
      xhr.withCredentials = true;


      xhr.open(method, isGetMethod && !!queryParams ? `${url}${queryStringify(queryParams as Record<string, any>)}` : url, true);
      if (headers) {
        Object.keys(headers).forEach(header => {
          xhr.setRequestHeader(header, headers[header]);
        });
      }

      xhr.responseType = "json";

      xhr.onload = function() {
        res(xhr.response as T);
      };

      xhr.onabort = rej;
      xhr.onerror = rej;
      xhr.ontimeout = rej;
      if (isGetMethod || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

export const httpTransport = new HttpTransport("https://ya-praktikum.tech/api/v2");
