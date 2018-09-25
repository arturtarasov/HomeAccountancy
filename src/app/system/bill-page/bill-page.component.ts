import {Component, OnInit} from '@angular/core';
import {Bill} from '../shared/models/bill.model';
import {BillService} from '../shared/services/bill.service';
import {Observable , Subscription} from 'rxjs/Rx';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {

  sub1: Subscription;
  sub2: Subscription;

  constructor(private billService: BillService) { }

  currency: any;
  bill: Bill;
  isLoaded = false;

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).delay(2000)
      .subscribe((data: [Bill, any]) => {
        console.log(data);
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
      .delay(2000)
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }
}
