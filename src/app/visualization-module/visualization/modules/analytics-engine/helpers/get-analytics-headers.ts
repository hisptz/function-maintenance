import * as _ from 'lodash';

import {
  sanitizeIncomingDimensionObject,
  sortDimensionAttributes
} from './get-paired-dimensions';

export function getAnalyticsHeaders(dimensionsObject: any) {
  /**
   * Clean up dimensions Object
   */

  const {
    displayProperty: displayPropertyRemoved,
    aggregationType: aggregationTypeRemoved,
    ...sanitizedDimensionsObject
  } = dimensionsObject;

  return [
    ..._.map(
      sortDimensionAttributes(_.keys(sanitizedDimensionsObject)),
      key => {
        return { name: key === 'fn' ? 'dx' : key, meta: true };
      }
    ),
    {
      name: 'value',
      meta: false
    }
  ];
}
