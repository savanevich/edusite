import { CookieOptions, Errback, Response } from 'express';

export class ResponseBuilder {
  private response: any = {
    state: null,
    status: function(code: number): any {
      return this;
    },
    sendStatus(code: number): any {
      return this;
    },
    links(links: any): any {
      return this;
    },
    send: function(body: any): any {
      return this;
    },
    json: function(body: any): any {
      return this;
    },
    end: function(body: any): any {
      return this;
    },
    jsonp: function(body: any): any {
      return this;
    },
    sendFile: function(path: string): any {
      return this;
    },
    download: function(path: string, filename: string, fn: Errback): any {
      return this;
    },
    contentTyp: function(type: string): any {
      return this;
    },
    type: function(type: string): any {
      return this;
    },
    format: function(obj: any): any {
      return this;
    },
    attachment: function(filename?: string): any {
      return this;
    },
    set: function(field: string, value?: string): any {
      return this;
    },
    header: function(field: string, value?: string): any {
      return this;
    },
    headersSent: false,
    get: function(field: string): any {
      return this;
    },
    clearCookie: function(name: string, options?: any): any {
      return this;
    },
    cookie: function(name: string, val: any, options: CookieOptions): any {
      return this;
    },
    location: function(url: string): any {
      return this;
    },
    redirect: function(url: string): any {
      return this;
    },
    render: function(view: string, options?: Object, callback?: (err: Error, html: string) => void): any {
      return this;
    },
    locals: null,
    charset: null,
    on: function(eventName: string, handler: Function): any {
      return this;
    },
    setHeader: function(name: string, value: string): any {
      return this;
    }
  };

  public build(): Response {
    return this.response;
  }
}

/*
status(code: number): null,
sendStatus(code: number): null,
links(links: any): null,
send: null,
json: null,
jsonp: null,
sendFile(path: string): void;
sendFile(path: string, options: any): void;
sendFile(path: string, fn: Errback): void;
sendFile(path: string, options: any, fn: Errback): void;
sendfile(path: string): void;
sendfile(path: string, options: any): void;
sendfile(path: string, fn: Errback): void;
sendfile(path: string, options: any, fn: Errback): void;
download(path: string): void;
download(path: string, filename: string): void;
download(path: string, fn: Errback): void;
download(path: string, filename: string, fn: Errback): void;
contentType(type: string): null,
type(type: string): null,
format(obj: any): null,
attachment(filename?: string): null,
set(field: any): null,
set(field: string, value?: string): null,
header(field: any): null,
header(field: string, value?: string): null,
headersSent: false,
get (field: string): string;
clearCookie(name: string, options?: any): null,
cookie(name: string, val: string, options: CookieOptions): null,
cookie(name: string, val: any, options: CookieOptions): null,
cookie(name: string, val: any): null,
location(url: string): null,
redirect(url: string): void;
redirect(status: number, url: string): void;
redirect(url: string, status: number): void;
render(view: string, options?: Object, callback?: (err: Error, html: string) => void ): void;
render(view: string, callback?: (err: Error, html: string) => void ): void;
locals: any;
charset: string;
 */
