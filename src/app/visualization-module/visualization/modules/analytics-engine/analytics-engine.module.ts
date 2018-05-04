import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import * as fromServices from './services';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [...fromServices.services]
})
export class AnalyticsEngineModule {}
