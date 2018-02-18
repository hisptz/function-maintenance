import * as _ from 'lodash';
export function mapLocalDataResultsToRows(localDataResults: any[]) {
  return _.map(localDataResults, result => {
    const resultKeys = _.keys(result);
    const resultRows = [
      ..._.map(resultKeys ? resultKeys[0].split(';') : [], key => {
        const splitedKey = key.split('_');
        return { [splitedKey[0]]: splitedKey[1] };
      }),
      { value: result[resultKeys ? resultKeys[0] : ''] }
    ];

    return _.map(
      _.filter(
        resultRows,
        rowObject => _.keys(rowObject)[0] !== 'aggregationType'
      ),
      rowObject => {
        const rowKeys = _.keys(rowObject);
        return rowObject[rowKeys ? rowKeys[0] : ''];
      }
    );
  });
}
