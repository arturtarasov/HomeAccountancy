import { Component, OnInit } from '@angular/core';
import {Bill} from "../shared/models/bill.model";
import {BillService} from "../shared/services/bill.service";
import {Observable , Subscription} from "rxjs/Rx";

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {

  subscription: Subscription;
  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subscription = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
        console.log(data);
    });
  }

}
