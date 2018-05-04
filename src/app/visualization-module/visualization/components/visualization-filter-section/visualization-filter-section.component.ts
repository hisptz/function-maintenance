import { Component, EventEmitter, Input, OnInit, Output,ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as _ from 'lodash';

import * as fromLayout from '../../../dimension-filters/layout';
import {PeriodFilterComponent} from "../../../dimension-filters/period-filter/period-filter.component";
import {OrgUnitFilterComponent} from "../../../dimension-filters/org-unit-filter/org-unit-filter.component";

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
  @Input() fn;
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
  objectKeys = Object.keys;
  @ViewChild('periodTree') periodComponent: PeriodFilterComponent;
  @ViewChild('orgUnitTree') orgUnitComponent: OrgUnitFilterComponent;
  runOptions={
    OneOne:{name:"1 Org Unit & 1 Period",orgUnits:1,periods:1},
    OneMany:{name:"1 Org Unit & Multiple Period",orgUnits:1,periods:2},
    ManyOne:{name:"Multiple Org Unit & 1 Period",orgUnits:2,periods:1},
    ManyMany:{name:"Multiple Org Unit & Multiple Period",orgUnits:2,periods:2},
    ZeroOne:{name:"0 Org Unit & 1 Period",orgUnits:0,periods:1,exception:true},
    OneZero:{name:"1 Org Unit & 0 Period",orgUnits:1,periods:0,exception:true}
  }
  currentRunOption
  updateSelection(){
    if(!this.currentRunOption){
      this.currentRunOption = this.runOptions.OneOne;
    }
    this.currentRunOption.periods = this.selectedOu.value.split(";").length > 1?2:this.selectedOu.value.split(";").length
    this.run(this.currentRunOption);
  }
  run(counts) {
    if(counts.orgUnits == 2){
      this.orgUnitComponent.setMultipleOrgUnits()
    }else if(counts.orgUnits == 1){
      this.orgUnitComponent.setOneOrgUnit()
    }else{
      this.orgUnitComponent.setNoOrgUnits();
    }
    this.selectedOu.value = this.orgUnitComponent.getSelectedOrgUnits()
    if(counts.periods == 2){
      this.periodComponent.setMultiplePeriod()
    }else if(counts.periods == 1){
      this.periodComponent.setOnePeriod()
    }else{
      this.periodComponent.setNoPeriod()
    }
    this.selectedPe.value = this.periodComponent.getSelectedPeriods()
    this.currentRunOption = counts;
    this.onFilterUpdateAction("", "")
  }
  onFilterUpdateAction(filterValue: any, filterType: string) {

    console.log("Filter:",filterValue);
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
