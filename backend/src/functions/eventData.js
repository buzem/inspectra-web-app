const DataCollectorEventModel = require("../models/data_collector_event");
const parsing = require("./parsing");

const getGraphData = async (dataCollectorId, path) => {
  let dataCollectorEvents = await getDCEventsByDCID(dataCollectorId);
  let results = [];
  dataCollectorEvents.map((event) => {
    try {
      let dataPoint = parsing.getDataForPath(event.data, path);
      results.push({ timestamp: event.timestamp, value: dataPoint });
    } catch (e) {
      // Todo: Error
    }
  });
  return results;
};

const getDCEventsByDCID = async (dataCollectorId, limit = 20) => {
  let dataCollectorEvents = await DataCollectorEventModel.find({
    dataCollectorId: dataCollectorId,
  })
    .sort({ createdAt: -1 })
    .limit(20)
    .exec();
  return dataCollectorEvents;
};

module.exports = {
  getGraphData,
  getDCEventsByDCID,
};
