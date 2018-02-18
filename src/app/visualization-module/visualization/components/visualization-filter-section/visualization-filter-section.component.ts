import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as _ from 'lodash';

import * as fromLayout from '../../../dimension-filters/layout';

export const INITIAL_FILTER_CONFIG = {
  showLayout: true,
  showData: true
};

@Component({
  selector: 'app-visualization-filter-section',
  templateUrl: './visualization-filter-section.component.html',
  styleUrls: ['./visualization-filter-section.component.css'],
  animations: [
    trigger('open', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(700)
      ]),
      transition('* => void', [
        animate(300),
        style({
          opacity: 0
        }),
      ])
    ])
  ]
})
export class VisualizationFilterSectionComponent implements OnInit {

  @Input() selectedDimensions: any;
  @Input() visualizationType: string;
  @Input() loaded: boolean;
  @Input() filterConfig: any;
  @Input() showFilters: boolean;
  @Output() onFilterUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLayoutUpdate: EventEmitter<any> = new EventEmitter<any>();
  selectedFilter: string;

  // TODO FIND BEST WAY TO KEEP SELECTION GENERIC
  selectedOu: any = {dimension: 'ou', value: 'USER_ORGUNIT'};
  selectedPe: any = {dimension: 'pe', value: 'LAST_YEAR'};
  selectedDx: any;
  selectedFn: any;

  constructor() {
    this.showFilters = true;
    this.filterConfig = INITIAL_FILTER_CONFIG;
    this.selectedDimensions = {
      orgUnitModel: {
        selectionMode: 'orgUnit',
        selectedLevels: [],
        showUpdateButton: true,
        selectedGroups: [],
        orgUnitLevels: [],
        orgUnitGroups: [],
        selectedOrgUnits: [],
        userOrgUnits: [],
        type: 'report', // can be 'data_entry'
        selectedUserOrgUnits: []
      },
      selectedPeriods: [],
      selectedDataItems: [],
      layoutModel: fromLayout.INITIAL_LAYOUT_MODEL
    };
  }

  ngOnInit() {


  }

  toggleFilters(e) {
    e.stopPropagation();
    this.showFilters = !this.showFilters;
  }

  toggleCurrentFilter(e, selectedFilter) {
    e.stopPropagation();
    this.selectedFilter = selectedFilter;
  }

  onFilterUpdateAction(filterValue: any, filterType: string) {

    this.selectedFilter = undefined;

    if (filterType === 'LAYOUT') {
      this.onLayoutUpdate.emit(filterValue);
    } else {

      // TODO REMOVE THIS HACK
      const selectionArray = _.filter([this.selectedOu, this.selectedPe, this.selectedDx, this.selectedFn],
        selection => selection);
      if (filterType === 'PERIOD') {
        this.selectedPe.value = filterValue.value;
        selectionArray.push(this.selectedPe);
      } else if (filterType === 'ORG_UNIT') {
        this.selectedOu.value = filterValue.value;
        selectionArray.push(this.selectedOu);
      } else {
        const dxValues = _.map(_.filter(filterValue.itemList, item => item.type !== 'FUNCTION_RULE'), item => item.id).
          join(';');
        this.selectedDx = {
          dimension: 'dx',
          value: dxValues
        };

        if (dxValues !== '') {
          selectionArray.push(this.selectedDx);
        }

        const fnValues = _.map(_.filter(filterValue.itemList, item => item.type === 'FUNCTION_RULE'), item => item.id).
          join(';');
        this.selectedFn = {
          dimension: 'fn',
          value: fnValues
        };

        if (fnValues !== '') {
          selectionArray.push(this.selectedFn);
        }
      }
      this.onFilterUpdate.emit(selectionArray);
    }
  }

}
