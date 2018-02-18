import * as _ from 'lodash';
export function mapDataResultToDimensionObject(resultArray: any[]) {
  const newDimensionObject = {};
  _.each(
    _.map(resultArray, result => {
      const splitedKeys = _.keys(result)[0].split(';');

      return _.map(splitedKeys, key => {
        const splitedKey = key.split('_');
        return { [splitedKey[0]]: splitedKey[1] };
      });
    }),
    splitedResult => {
      _.each(splitedResult, result => {
        const attributeKey = _.keys(result)[0];

        if (attributeKey) {
          newDimensionObject[attributeKey] = _.uniq(
            newDimensionObject[attributeKey]
              ? [...newDimensionObject[attributeKey], result[attributeKey]]
              : [result[attributeKey]]
          );
        }
      });
    }
  );

  const sanitizedDimensionObject = {};

  _.each(_.keys(newDimensionObject), dimensionKey => {
    sanitizedDimensionObject[dimensionKey] = newDimensionObject[
      dimensionKey
    ].join(';');
  });

  return {
    dimensions: _.filter(
      _.map(_.keys(sanitizedDimensionObject), key => {
        return { dimension: key, value: sanitizedDimensionObject[key] };
      }),
      dimensionObject => dimensionObject.dimension !== 'aggregationType'
    ),
    analyticsType: 'AGGREGATE',
    config: {
      aggregationType: sanitizedDimensionObject['aggregationType']
    }
  };
}
