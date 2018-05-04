export function getDimensionsFromUrl(analyticsUrl): any {
  const analyticsDimensionSection = analyticsUrl.split('?')[1];

  if (!analyticsDimensionSection) {
    return [];
  }

  const splitedDimensionSection = analyticsDimensionSection.split('&');

  if (splitedDimensionSection.length === 0) {
    return [];
  }

  const dimensionObject = {};

  // TODO refactor this section to remove any potential mutation

  splitedDimensionSection.forEach((dimensionSectionString: any) => {
    const splitedDimension = dimensionSectionString.split('=');

    if (splitedDimension[1]) {
      const dimensionKeyValuePairArray = splitedDimension[1].split(':');

      if (dimensionKeyValuePairArray.length > 1) {
        dimensionObject[dimensionKeyValuePairArray[0]] = dimensionKeyValuePairArray[1];
      } else {
        dimensionObject[splitedDimension[0]] = dimensionKeyValuePairArray[0];
      }
    }
  });

  return dimensionObject;
}
