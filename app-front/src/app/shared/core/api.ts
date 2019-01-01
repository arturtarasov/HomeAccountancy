import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class Api {

  /*
   *  порт сервера
   */
  private baseUrl = 'http://localhost:3300/';

  constructor(private http: HttpClient) {}

  /*
   *  возвращает полный адрес сервера, включая его параметры
   */
  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  /*
   *  get запрос, возвращает объект в формате json
   */
  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url))
      .map((response: Response) => response.json());
  }

  /*
   *  post запрос, добавлянт объект в формате json
   *  url - адрес сервера, data - изменяемый объект
   */
  public post(url: string = '', data: any = []): Observable<any> {
    return this.http.post(this.getUrl(url), data)
      // .map((response: Response) => response.json());
  }

  /*
   *  put запрос, возвращает измененный объект в формате json
   *  url - адрес сервера, data - изменяемый объект
   */
  public put(url: string = '', data: any = []): Observable<any> {
    return this.http.put(this.getUrl(url), data)
      .map((response: Response) => response.json());
  }
}
