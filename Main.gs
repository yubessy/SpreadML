function main() {
  var sheet = SpreadsheetApp.getActiveSheet();

  var firstRow = 2;
  var firstColumn = 3;
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var dataRange = sheet.getRange(firstRow, firstColumn, lastRow - firstRow + 1, lastColumn - firstColumn + 1);
  var dataset = U.loadDataset(dataRange);

  var model = new LinearRegression();
  model.train(dataset.training.x, dataset.training.y, 0.03, 100);

  var predictionY = model.predict(dataset.prediction.x);
  U.writeVector(sheet, firstColumn - 1, predictionY, dataset.prediction.rowMap);

  var trainingY_ = model.predict(dataset.training.x);
  U.writeVector(sheet, firstColumn - 1, trainingY_, dataset.training.rowMap);

  var ui = SpreadsheetApp.getUi();
  ui.alert("RMSE(training): " + U.rmse(dataset.training.y, trainingY_));
  ui.alert("theta: " + model.getTheta());
}
