const fs = require("fs");
const path = require("path");
const { mainModule } = require("process");
const convert = require("xml-js");
const dataPath = path.resolve("./data.xml");
const dataObject = path.join("./dataObject.json");

function listContacts() {
  fs.readFile(dataPath, "utf8", (error, data) => {
    if (error) {
      console.error(error);
    }

    const result1 = convert.xml2json(data, { compact: true, spaces: 4 });

    const dataArray = JSON.parse(result1);
    let initialValue = 0;

    const pricesSum = dataArray.CATALOG.CD.reduce(function (acc, currentValue) {
      return Math.round(acc + Number(currentValue.PRICE._text));
    }, initialValue);
    const cdsLength = dataArray.CATALOG.CD.length;

    const countriesData = dataArray.CATALOG.CD.map((el) => {
      return el.COUNTRY._text;
    });

    const dataYear = dataArray.CATALOG.CD.map((el) => {
      if (el.YEAR._text) {
        return el.YEAR._text;
      }
    });

    const minData = Math.min(...dataYear);
    const maxData = Math.max(...dataYear);

    const finalJSON = {
      cdsCount: cdsLength,
      pricesSum: pricesSum,
      countries: countriesData,
      minYear: minData,
      maxYear: maxData,
    };

    console.log(JSON.stringify(finalJSON));
    return finalJSON;
  });
}
listContacts();

module.exports = {
  dataPath,
  listContacts,
};
