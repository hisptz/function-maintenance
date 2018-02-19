import * as _ from 'lodash';
import {
  DataDimension,
  Dimension,
  DimensionConfig
} from '../models/data-dimension';

function flattenDimensions(dimensions: Dimension[]): string {

  if (_.some(dimensions, (dimension: any) => dimension.value === '')) {
    return '';
  }

  return _.map(dimensions, (dimensionObject: Dimension) => {
    const dimensionPrefix = 'dimension=';
    return dimensionObject.value !== ''
      ? dimensionPrefix +
             dimensionObject.dimension +
             ':' +
             dimensionObject.value
      : '';
  }).join('&');
}

function getAggregateAnalyticsUrl(dataDimension: DataDimension): string {
  const flattenedDimensionString = flattenDimensions(dataDimension.dimensions);
  return flattenedDimensionString !== ''
    ? 'analytics.json?' +
           flattenedDimensionString +
           getAnalyticsUrlOptions(dataDimension.config)
    : '';
}

function getAnalyticsUrlOptions(dimensionConfig: DimensionConfig) {
  if (!dimensionConfig) {
    return '';
  }

  const displayPropertySection = dimensionConfig.displayNameProperty
    ? '&displayProperty=' + dimensionConfig.displayNameProperty
    : '';

  const aggregrationTypeSection =
    dimensionConfig.aggregationType &&
    dimensionConfig.aggregationType !== 'DEFAULT'
      ? '&aggregationType=' + dimensionConfig.aggregationType
      : '';

  return displayPropertySection + aggregrationTypeSection;
}

function getEventAnalyticsUrl() {
  return '';
}

export function getAnalyticsUrl(dataDimension: DataDimension): string {
  if (!dataDimension) {
    return '';
  }

  switch (dataDimension.analyticsType) {
    case 'AGGREGATE':
      return getAggregateAnalyticsUrl(dataDimension);
    case 'EVENT':
      return getEventAnalyticsUrl();
    default:
      return '';
  }
}
