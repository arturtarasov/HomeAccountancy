import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Bill} from "../models/bill.model";
import {BaseApi} from "../../../shared/core/base-api";

@Injectable()
export class BillService extends BaseApi {
  private access_key = 'b68cd687e5f66f21bc50af9c881562fc';
  constructor(public http: Http) {
    super(http);
  }
  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  updateBill(bill: Bill): Observable<Bill>  {
    return this.put('bill', bill);
  }

  getCurrency(symbol: string = 'RUB,USD'): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=${this.access_key}&symbols=${symbol}`)
      .map((response: Response) => response.json());
  }
}
