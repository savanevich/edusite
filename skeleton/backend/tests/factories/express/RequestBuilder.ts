import { Request } from 'express';

export class RequestBuilder {
  private request: any = {
    get: null,
    header: null,
    headers: {},
    accepts: function(type: string | string[]): any {
      return this;
    },
    acceptsCharsets: function(charset?: string | string[]): any {
      return this;
    },
    acceptsEncodings: function(encoding?: string | string[]): any {
      return this;
    },
    acceptsLanguages: function(lang?: string | string[]): any {
      return this;
    },
    range: function(size: number): any {
      return this;
    },
    accepted: [],
    param: function(name: string, defaultValue?: any): any {
      return this;
    },
    is: function(type: string): any {
      return this;
    },
    protocol: '',
    secure: false,
    ip: '',
    ips: [],
    subdomains: [],
    path: '',
    hostname: '',
    host: '',
    fresh: false,
    stale: false,
    xhr: false,
    body: null,
    cookies: null,
    method: '',
    params: {},
    user: null,
    authenticatedUser: null,
    clearCookie: null,
    query: {},
    route: null,
    signedCookies: null,
    originalUrl: '',
    url: '',
    baseUrl: '',
    app: null,
    // From other Interfaces
    connection: null,
    httpVersion: '',
    httpVersionMajor: null,
    httpVersionMinor: null,
    rawHeaders: null,
    trailers: null,
    rawTrailers: null,
    setTimeout: null,
    socket: null,
    destroy: null,
    readable: null,
    _read: null
  };

  public setBody(body: any): RequestBuilder {
    this.request.body = body;
    return this;
  }

  public setUser(user: any): RequestBuilder {
    this.request.user = user;
    return this;
  }

  public setParams(params: any): RequestBuilder {
    this.request.params = params;
    return this;
  }

  public setQuery(query: any): RequestBuilder {
    this.request.query = query;
    return this;
  }

  public setHeaders(headers: any): RequestBuilder {
    this.request.headers = headers;
    return this;
  }

  public build(): Request {
    return this.request;
  }
}
