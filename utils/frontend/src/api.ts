import { objectToQueryUrl } from "../../general";
import { getCookie, removeCookie } from "typescript-cookie";

export const onLogout = ({ redirectTo } = { redirectTo: "/login" }) => {
  const cookieConfigs: any = {};
  const domain = process?.env?.NEXT_PUBLIC_PARENT_DOMAIN;
  if (domain) cookieConfigs.domain = domain;
  removeCookie("userToken", cookieConfigs);
  removeCookie("userAuthed", cookieConfigs);
  window.location.href = redirectTo;
};

type typeApi = (properties: {
  path: string;
  objParams?: Record<string, any>;
  body?: FormData | Record<string, any> | string;
  method?: string;
  headers?: Record<string, string>;
  host?: string;
  staleTime?: number;
}) => Promise<Response>;

export const api: typeApi = async ({
  path,
  objParams,
  body,
  method,
  headers = {},
  host = process.env.NEXT_PUBLIC_BFF_URL ?? "",
  staleTime = 0,
}) => {
  /**
   * Setup var
   */
  path =
    path +
    (path.includes("?") ? "&" : "?") +
    (objParams ? objectToQueryUrl(objParams) : "");

  /**
   * Check cache
   */
  if (staleTime > 0) {
    const cache = (window as any)?.fetchDataCached?.[path];
    if (cache && cache.expiredAt >= Date.now()) {
      return new Promise((resolve) => resolve(cache.result.clone()));
    }
  }

  /**
   * Set default header cors
   */
  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
  headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";

  /**
   * Get user token
   */
  try {
    const userToken = getCookie("userToken");
    headers["Authorization"] = `Bearer ${userToken}`;
  } catch (error) {}

  /**
   * Set content type
   */
  if (body && !(body instanceof FormData)) {
    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";
    if (typeof body == "object") body = JSON.stringify(body);
  }

  /**
   * Fething server
   */
  const response = fetch(host + path, {
    method: method ?? "get",
    body,
    headers,
  });

  /**
   * Pre return
   */
  response.then((res) => {
    /**
     * Check unauthed
     */
    if (res.status == 401) onLogout();

    /**
     * Caching data
     */
    if (staleTime > 0 && res.status == 200) {
      (window as any).fetchDataCached = {
        ...((window as any)?.fetchDataCached ?? {}),
        [path]: {
          expiredAt: Date.now() + staleTime * 60 * 1000,
          result: res.clone(),
        },
      };
    }
  });

  /**
   * Return data
   */
  return response;
};

/**
 * 



interface typeApiFetch {
  path: string,
  objParams?: Record<string, any>,
  body?: FormData | Record<string, any> | string,
  method?: string,
  headers?: Record<string, string>,
  host?: string
}

export const api = async ({
  path,
  objParams,
  body,
  method,
  headers = {},
  host = (process.env.NEXT_PUBLIC_BFF_URL ?? '')
}: typeApiFetch) => {
  // get user token
  try {
    const userToken = getCookie("userToken")
    headers['Authorization'] = `Bearer ${userToken}`
  } catch (error) { }

  // set content type
  if (body && !(body instanceof FormData)) {
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    if (typeof (body) == "object") {
      body = JSON.stringify(body);
    }
  }

  // exec
  path = path + (path.includes('?') ? '&' : '?') + (objParams ? objectToQueryUrl(objParams) : '')
  const response = fetch((host + path), {
    method: (method ?? 'get'),
    body,
    headers
  });

  // check unauthed
  response.then((res) => {
    if (res.status == 401) {
      onLogout()
    }
  })

  // return
  return response;
}
 */
