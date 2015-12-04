var N = numeric;

var U = {};

U.isNumber = function (x) {
  return typeof(x) === 'number';
}

U.toNumber = function (array) {
  return array.map(function (x) {
    return U.isNumber(x) ? x : 0;
  });
};

U.zeros = function (m, n) {
  if (n === undefined) {
    return Array.apply(null, new Array(m)).map(function () { return 0 });
  } else {
    return Array.apply(null, new Array(m)).map(function () { return U.zeros(n) });
  }
};

U.biased = function (x) {
  var ret = Array(x.length);
  for (var i = 0; i < x.length; i++) {
    ret[i] = N.clone(x[i]);
    ret[i].unshift(1.0);
  }
  return ret;
};

U.rmse = function (v1, v2) {
  return N.sum(N.pow(N.sub(v1, v2), 2)) / v1.length;
};

U.loadDataset = function (rawValues, withLabel) {
  var labelX = undefined;
  var labelY = undefined;
  var trainingX = [];
  var trainingY = [];
  var trainingRowMap = [];
  var predictionX = [];
  var predictionRowMap = [];
  for (var i = 0; i < rawValues.length; i++) {
    if (withLabel && i == 0) {
      labelX = rawValues[i].slice(1);
      labelY = rawValues[i][0];
      continue;
    }
    var x = U.toNumber(rawValues[i].slice(1));
    var y = rawValues[i][0];
    var rowIdx = i + 1;
    if (U.isNumber(y)) {
      trainingX.push(x);
      trainingY.push(y);
      trainingRowMap.push(rowIdx);
    } else {
      predictionX.push(x);
      predictionRowMap.push(rowIdx);
    }
  }

  return {
    label: {
      x: labelX,
      y: labelY
    },
    training: {
      x: trainingX,
      y: trainingY,
      rowMap: trainingRowMap
    },
    prediction: {
      x: predictionX,
      rowMap: predictionRowMap
    }
  };
};

U.mergeValues = function (predictionY, predictionRowMap, trainingY, trainingRowMap, labelY) {
  var values = [];
  values[0] = [labelY];
  for (i = 0; i < predictionY.length; i++) {
    var idx = predictionRowMap[i] - 1;
    values[idx] = [predictionY[i]];
  }
  for (i = 0; i < trainingY.length; i++) {
    var idx = trainingRowMap[i] - 1;
    values[idx] = [trainingY[i]];
  }
  for (i = 0; i < values.length; i++) {
    if (!values[i]) {
      values[i] = [undefined];
    }
  }
  return values;
};
