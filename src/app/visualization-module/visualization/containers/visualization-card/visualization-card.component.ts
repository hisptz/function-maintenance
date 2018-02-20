import { Component, Input, OnInit } from '@angular/core';

import * as fromModels from '../../models';
import * as fromConstants from '../../constants';
import { AnalyticsService } from '../../modules/analytics-engine/services';
import { INITIAL_LAYOUT_MODEL } from '../../../dimension-filters/layout';

@Component({
  selector: 'app-visualization-card',
  templateUrl: './visualization-card.component.html',
  styleUrls: ['./visualization-card.component.css']
})
export class VisualizationCardComponent implements OnInit {

  @Input() visualizationId: string;
  @Input() visualizationType: string;
  @Input() visualizationUiConfig: fromModels.VisualizationUiConfig;
  @Input() visualizationLayers: fromModels.VisualizationLayer[];
  @Input() fn;

  visualizationLoading: boolean;
  visualizationLoaded: boolean;

  constructor(private analyticsService: AnalyticsService) {
    this.visualizationUiConfig = fromConstants.DEFAULT_VISUALIZATION_UI_CONFIG;
    this.visualizationType = 'TABLE';
    this.visualizationLayers = [];
    this.visualizationLoading = true;
    this.visualizationLoaded = false;
  }

  ngOnInit() {
    if (this.visualizationLayers.length > 0) {
      this.visualizationLoading = false;
      this.visualizationLoaded = true;
    }
  }

  currentVisualizationChange(visualizationType: string) {
    this.visualizationType = visualizationType;
  }

  onVisualizationFilterUpdate(filters: any) {
    console.log("Filters:",filters);
    let results = null;
    this.visualizationLoading = true;
    this.visualizationLoaded = false;
    this.analyticsService.getAnalytics('', {
      dimensions: filters,
      analyticsType: 'AGGREGATE'
    }).subscribe((resultsResponse) => {
      results = resultsResponse;
    }, (error) => {
    }, () => {
      this.visualizationLayers = [{
        id: 'layer_id',
        data: results,
        layout: INITIAL_LAYOUT_MODEL
      }]
      this.visualizationLoading = false;
      this.visualizationLoaded = true;
    });
  }

  onVisualizationLayoutUpdate(layout: any) {
    console.log(layout);
  }

  // TODO replace this logic with analytics engine service
  loadAnalytics() {
  }
}
