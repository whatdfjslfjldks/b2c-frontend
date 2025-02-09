const fs = require('fs');
const cities = require('../model/locationData.js'); 

const transformCities = (rawCities) => {
  return rawCities?.map(province => ({
    label: province.name,
    value: province.name, 
    children: province.city.map(city => ({
      label: city.name,
      value: city.name,
      children: city.area.map(area => ({
        label: area,
        value: area,
      })),
    })),
  }));
};

// console.log('cities:', cities);

const transformedData = transformCities(cities);


fs.writeFile('transformedData.json', JSON.stringify(transformedData, null, 2), (err) => {
  if (err) {
    console.error('保存文件时出错:', err);
  } else {
    console.log('数据已成功保存到 transformedData.json 文件中');
  }
});