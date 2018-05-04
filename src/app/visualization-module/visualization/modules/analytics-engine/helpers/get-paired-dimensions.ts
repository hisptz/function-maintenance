import * as _ from 'lodash';
const SORTING_PREFERENCE = {
  aggregationType: 1,
  dx: 2,
  fn: 2,
  pe: 3,
  ou: 4
};

export function sanitizeIncomingDimensionObject(dimensionsObject: any) {
  const {
    displayProperty: displayPropertyRemoved,
    ...newDimensionsObject
  } = dimensionsObject;

  return newDimensionsObject;
}

export function sortDimensionAttributes(dimensionAttributes: any[]) {
  return _.map(
    _.sortBy(
      _.map(dimensionAttributes, (attributeString: string) => {
        return {
          name: attributeString,
          sortOrder: SORTING_PREFERENCE[attributeString]
        };
      }),
      'sortOrder'
    ),
    sortedAttibute => sortedAttibute.name
  );
}

export function getPairedArray(
  dimensionObject: any,
  sanitizedDimensionsObject
) {
  let dxDimensionArray = [];
  _.each(
    sortDimensionAttributes(_.keys(dimensionObject)),
    (dxAttribute, dxIndex) => {
      const dimensionArray = sanitizedDimensionsObject[dxAttribute].split(';');

      if (dxIndex === 0) {
        dxDimensionArray = [
          ...dxDimensionArray,
          ..._.map(dimensionArray, value => dxAttribute + '_' + value)
        ];
      } else {
        let newDimensionArray = [];
        if (dimensionArray.length > dxDimensionArray.length) {
          _.each(dimensionArray, dimensionValue => {
            const dimensionString = dxAttribute + '_' + dimensionValue;
            if (dxDimensionArray.length > 0) {
              _.each(dxDimensionArray, dxDimensionValue => {
                newDimensionArray = [
                  ...newDimensionArray,
                  dxDimensionValue + ';' + dimensionString
                ];
              });
            } else {
              newDimensionArray = newDimensionArray = [
                ...newDimensionArray,
                ..._.map(dimensionArray, value => dxAttribute + '_' + value)
              ];
            }
          });
        } else {
          _.each(dxDimensionArray, dxDimensionValue => {
            if (dimensionArray.length > 0) {
              _.each(dimensionArray, dimensionValue => {
                const dimensionString = dxAttribute + '_' + dimensionValue;
                newDimensionArray = [
                  ...newDimensionArray,
                  dxDimensionValue + ';' + dimensionString
                ];
              });
            } else {
              newDimensionArray = newDimensionArray = [
                ...newDimensionArray,
                ..._.map(dxDimensionArray, value => dxAttribute + '_' + value)
              ];
            }
          });
        }

        dxDimensionArray = [...newDimensionArray];
      }
    }
  );

  return dxDimensionArray;
}

export function getPairedDimensions(dimensionsObject: any): any[] {
  const pairedDimensionArray = [];
  /**
   * Clean up dimensions Object
   */
  const sanitizedDimensionsObject: any = sanitizeIncomingDimensionObject(
    dimensionsObject
  );

  /**
   * Separate functions from normal dx dimensions
   */
  const { dx: dxRemoved, ...functionDimension } = sanitizedDimensionsObject;
  const { fn: fnRemoved, ...dxDimension } = sanitizedDimensionsObject;

  return sanitizedDimensionsObject.fn
    ? [
        ...getPairedArray(dxDimension, sanitizedDimensionsObject),
        ...getPairedArray(functionDimension, sanitizedDimensionsObject)
      ]
    : [...getPairedArray(dxDimension, sanitizedDimensionsObject)];
}
