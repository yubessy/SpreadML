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

U.loadDataset = function (rawValues) {
  var trainingX = [];
  var trainingY = [];
  var trainingIdxMap = [];
  var predictionX = [];
  var predictionIdxMap = [];
  for (var i = 0; i < rawValues.length; i++) {
    var x = U.toNumber(rawValues[i].slice(1));
    var y = rawValues[i][0];
    if (U.isNumber(y)) {
      trainingX.push(x);
      trainingY.push(y);
      trainingIdxMap.push(i);
    } else {
      predictionX.push(x);
      predictionIdxMap.push(i);
    }
  }

  return {
    training: {
      x: trainingX,
      y: trainingY,
      idxMap: trainingIdxMap
    },
    prediction: {
      x: predictionX,
      idxMap: predictionIdxMap
    }
  };
};

U.mergeValues = function (predictionY, predictionIdxMap, trainingY, trainingIdxMap) {
  var values = [];
  for (i = 0; i < predictionY.length; i++) {
    var idx = predictionIdxMap[i];
    values[idx] = [predictionY[i]];
  }
  for (i = 0; i < trainingY.length; i++) {
    var idx = trainingIdxMap[i];
    values[idx] = [trainingY[i]];
  }
  return values;
};
