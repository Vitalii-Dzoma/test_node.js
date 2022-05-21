const fs = require("fs");
const path = require("path");
const convert = require("xml-js");
const dataPath = path.resolve("./data.xml");

function listContacts() {
  fs.readFile(dataPath, "utf8", (error, data) => {
    if (error) {
      console.error(error);
    }

    const result1 = convert.xml2json(data, { compact: true, spaces: 4 });

    const dataArray = JSON.parse(result1);
    dataArray.CATALOG.CD.map((el) => {
      console.table(el);
      const cdsLength = dataArray.CATALOG.CD.length;
      let sum = 0;
      sum = sum + Number(el.PRICE._text);
      console.log(sum);
      const pricesSum = Number(el.PRICE._text);

      //   const finalJSON = {
      //     cdsCount: cdsLength,
      //     pricesSum: 100,
      //     countries: [USA, UK],
      //     minYear: 1969,
      //     maxYear: 2012,
      //   };
    });
  });
}
listContacts();

// {
// 	“cdsCount”: 10,
// 	“pricesSum”: 100,
// “countries”: [“USA”, “UK”...],
// “minYear”: 1969,
// “maxYear”: 2012
// }

module.exports = {
  dataPath,
  listContacts,
};
