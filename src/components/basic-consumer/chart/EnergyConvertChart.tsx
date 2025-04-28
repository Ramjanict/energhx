//accept an array
const EnergyConvertChart = (obj?: {}) => {
  const mapData = Object.entries(obj || {}).map(([key, value]) => ({
    name: key,
    value: value,
  }));
  return mapData;
};

export default EnergyConvertChart;
