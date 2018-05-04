import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfigurationService } from '../../services/chart-configuration.service';
import { ChartItemComponent } from '../chart-item/chart-item.component';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css']
})
export class ChartListComponent implements OnInit {

  @Input() visualizationLayers: any[];
  @Input() visualizationId: string;
  @Input() chartHeight: string;
  chartLayers: Array<{chartConfiguration: any; analyticsObject: any}>;

  @ViewChild(ChartItemComponent)
  chartItem: ChartItemComponent;

  constructor(private chartConfig: ChartConfigurationService) {
    this.visualizationLayers = [];
    this.visualizationId = 'chart_container';
    this.chartLayers = [];
  }

  ngOnInit() {
    if (this.visualizationLayers.length > 0) {
      this.chartLayers = this.visualizationLayers.map((layer: any, layerIndex: number) => {
        return {
          chartConfiguration: this.chartConfig.getChartConfiguration(
            layer.config || {},
            this.visualizationId + '_' + layerIndex,
            layer.layout
          ),
          analyticsObject: layer.data
        };
      });
    }
  }

  onParentEvent(parentEvent) {
    if (this.chartItem) {
      this.chartItem.onFocus(parentEvent);
    }
  }

}
