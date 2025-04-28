type NumericRecord = Record<string, number>;
//accept an array
const ConvertToMapData = (object: NumericRecord) => {
  const mapData = Object.entries(object).map(([key, value]) => ({
    name: Number(key),
    value: parseFloat(value.toFixed(2)),
  }));
  return mapData;
};

export default ConvertToMapData;
