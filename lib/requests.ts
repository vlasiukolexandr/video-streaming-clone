export class Requests {
  private baseURL: string = "";
  private requestSettings: RequestSettings;

  constructor (baseUrl?: string, headers?: RequestHeaders) {
    if (!!baseUrl) {
      this.baseURL = baseUrl;
    }
  
    this.requestSettings = {
      mode: CustomMode.CORS,
      cache: CustomCache.NO_CACHE,
      credentials: CustomCredentials.SAME_ORIGIN,
      headers: {
        ...DEFAULT_HEADERS,
        ...headers
      },
      redirect: CustomRedirect.FOLLOW,
      referrerPolicy: CustomReferPolicy.NO_REFERRER,
    };
  }

  private request = async <T>(url: string, method: CustomMethod, data?: Data | FormData): Promise<CustomResponse<T>> => {
    const response = await fetch(`${this.baseURL}${url}`, {
      method,
      ...this.requestSettings,
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
    const body = await response.json();

    if (!!body.error) {
      throw new Error(body.error);
    }

    return {
      status: response.status,
      data: body, 
    };
  }

  public get = async <T>(url: string): Promise<CustomResponse<T>> => this.request<T>(url, CustomMethod.GET);
  public delete = async (url: string) => this.request(url, CustomMethod.DELETE);
  public post = async (url: string, data: Data) => this.request(url, CustomMethod.POST, data);
  public update = async (url: string, data: Data) => this.request(url, CustomMethod.PUT, data);
}

interface RequestHeaders {
  [ x: string ]: string;
}

interface RequestSettings {
  mode: CustomMode;
  cache: CustomCache;
  headers: RequestHeaders;
  credentials: CustomCredentials;
  redirect: CustomRedirect;
  referrerPolicy: CustomReferPolicy;
}

interface Data {
  [ x: string ]: string;
}

enum CustomMethod {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

enum CustomMode {
  NO_CORS = "no-cors",
  CORS = "cors",
  SAME_ORIGIN = "same-origin"
}

enum CustomCache {
  DEFAULT = "default",
  NO_CACHE = "no-cache",
  RELOAD = "reload",
  FORCE_CACHE = "force-cache",
  ONLY_IF_CACHED = "only-if-cached"
}

enum CustomCredentials {
  INCLUDE = "include",
  SAME_ORIGIN = "same-origin", 
  OMIT = "omit"
}

enum CustomRedirect {
  MANUAL = "manual",
  FOLLOW = "follow",
  ERROR = "error"
}

enum CustomReferPolicy {
  NO_REFERRER = "no-referrer",
  NO_REFERRER_WHEN_DOWNGRADE = "no-referrer-when-downgrade",
  ORIGIN = "origin",
  ORIGIN_WHEN_CROSS_ORIGIN = "origin-when-cross-origin",
  SAME_ORIGIN = "same-origin",
  STRICT_ORIGIN = "strict-origin",
  STRICT_ORIGIN_WHEN_CROSS_ORIGIN = "strict-origin-when-cross-origin",
  UNSAFE_URL = "unsafe-url"
}

type CustomResponse<T> = {
  status: number;
  data?: T;
  error?: unknown;
}

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}
