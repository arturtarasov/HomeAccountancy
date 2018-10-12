import {NgModule} from '@angular/core';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { LoaderComponent } from './components/loader/loader/loader.component';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, NgxChartsModule],
  exports: [ReactiveFormsModule, FormsModule, NgxChartsModule, LoaderComponent],
  declarations: [LoaderComponent]
})

export class SharedModule {}
