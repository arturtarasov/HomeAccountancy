import {Component , OnDestroy , OnInit} from '@angular/core';
import {ActivatedRoute , Params} from "@angular/router";
import {EventsService} from "../../shared/services/events.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {Observable , Subscription} from "rxjs/Rx";
import {WFMEvent} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  category: Category;
  event: WFMEvent;
  isLoaded = false;

  sub1: Subscription;
  constructor(private route: ActivatedRoute, private eventService: EventsService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.sub1 = this.route.params
      .mergeMap((params: Params) => this.eventService.getEventById(params[ 'id' ]))
      .mergeMap((event: WFMEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category);
      }).subscribe((category: category) => {
        this.category = category;
        this.isLoaded = true;
    });
  }
  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
