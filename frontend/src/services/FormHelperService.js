export default class FormHelperServices {
  // updates Dropdown Options for Data Collectors Dropdown
  static updateDataCollectorDropdown = (dataCollectors = []) => {
    console.log(dataCollectors);
    let options = [];
    if (dataCollectors && dataCollectors.length > 0) {
      dataCollectors.map((dataCollector) => {
        options.push({
          key: dataCollector._id,
          text: dataCollector.title,
          value: dataCollector._id,
        });
      });
    }
    return options;
  };

  //   update Dropdown Options for Schema Dropdow
  static updateSchemaDropdown = (currentPaths = []) => {
    let options = [];
    if (currentPaths?.length > 0) {
      currentPaths
        .filter((item) => item.type !== "Dict" && item.type !== "String")
        .map((item) => {
          let text = item.path + " [" + item.type + "]";
          options.push({ key: item.path, text: text, value: item.path });
        });
    }
    return options;
  };
}
