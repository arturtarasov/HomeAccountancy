import {Component , OnDestroy , OnInit} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {Observable , Subscription} from "rxjs/Rx";
import {Category} from "../shared/models/category.model";
import {Bill} from "../shared/models/bill.model";
import {WFMEvent} from "../shared/models/event.model";

@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  isLoaded = false;
  bill: Bill;
  category: Category[] = [];
  events: WFMEvent[] = [];

  constructor(
    private billService: BillService,
    private categoryService: CategoriesService,
    private evetntsService: EventsService
  ) { }

  ngOnInit() {
    Observable.combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.evetntsService.getEvents()
    ).subscribe((data: [Bill, Category, WFMEvent]) => {
      this.bill = data[0];
      this.category = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, event) => {
      total += event.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number{
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColoClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }

  }

}
