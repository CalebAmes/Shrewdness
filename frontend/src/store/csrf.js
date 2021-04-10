import Cookies from 'js-cookie';

export async function csrFetch(url, options = {}) {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    if (options.headers["Content-Type"] === "multipart/form-data") {
      delete options.headers["Content-Type"];
    } else {
      options.headers["Content-Type"] =
        options.headers["Content-Type"] || "application/json";
    }
    options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
  }

  const res = await window.csrFetch(url, options);

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
    res.data = data;
  }

  if (res.status >= 400) throw res;

  return res;
}

export function restoreCSRF() {
  return csrFetch('/api/csrf/restore');
}
