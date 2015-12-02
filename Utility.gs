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

U.loadDataset = function (dataRange) {
  var values = dataRange.getValues();
  var firstRow = dataRange.getRow();

  var trainingX = [];
  var trainingY = [];
  var trainingRowMap = [];
  var predictionX = [];
  var predictionY = [];
  var predictionRowMap = [];
  for (var i = 0; i < values.length; i++) {
    var x = U.toNumber(values[i].slice(1));
    var y = values[i][0];
    var idx = i + firstRow;
    if (U.isNumber(y)) {
      trainingX.push(x);
      trainingY.push(y);
      trainingRowMap.push(idx);
    } else {
      predictionX.push(x);
      predictionRowMap.push(idx);
    }
  }

  return {
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

U.writeVector = function (sheet, column, vector, rowMap) {
  for (var i = 0; i < vector.length; i++) {
    sheet.getRange(rowMap[i], column).setValue(vector[i]);
  }
};
