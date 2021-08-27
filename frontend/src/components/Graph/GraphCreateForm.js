import React, { useEffect } from "react";

import styles from "../../theming/styles";

import { WarnButton } from "../../theming/objects";
import { Table, TableBody, TableRow } from "@material-ui/core";

import { HexColorPicker } from "react-colorful";
import { Dropdown } from "semantic-ui-react";

function GraphCreateForm(props) {
  const classes = styles();

  const [titleValid, setTitleValid] = React.useState("");
  const [yAxisTitleValid, setYAxisTitleValid] = React.useState("");

  const graphTypes = [
    { key: "bar", text: "bar", value: "bar" },
    { key: "line", text: "line", value: "line" },
    { key: "area", text: "area", value: "area" },
    { key: "metric", text: "metric", value: "metric" },
  ];

  useEffect(() => {
    if (
      titleValid === "" &&
      yAxisTitleValid === "" &&
      props.dataPath !== null
    ) {
      props.setGraphValid(true);
    } else {
      props.setGraphValid(false);
    }
  }, [titleValid, yAxisTitleValid, props.dataPath]);

  const validateYAxisTitle = (e) => {
    let value = e.target.value;
    props.onChangeYAxisTitle(value);
    if (value === "" || value === null) {
      setYAxisTitleValid("Please enter a y-Axis Title that is not empty");
    } else {
      setYAxisTitleValid("");
    }
  };

  const handleDataCollectorSelection = (e, data) => {
    props.onDataCollectorSelection(e, data);
    // props.updateDataCollectorSchema(data.value);
  };

  const validateTitle = (e) => {
    let value = e.target.value;
    props.onChangeTitle(value);
    if (value === "" || value === null) {
      setTitleValid("Please enter a Title that is not empty");
    } else if (value.match("[^A-Za-z]+$")) {
      setTitleValid("Please enter valid Title");
    } else {
      setTitleValid("");
    }
  };

  return (
    <div className={classes.flexCol}>
      <Table>
        <TableBody>
          <TableRow>
            <input
              type="text"
              id="title"
              name="title"
              className={classes.inputField}
              placeholder="Enter a Title"
              defaultValue={props.graphTitle}
              onChange={(e) => {
                validateTitle(e);
              }}
            />
            {titleValid !== "" ? (
              <WarnButton className={classes.inputWarning}>
                {titleValid}
              </WarnButton>
            ) : null}
          </TableRow>
          <TableRow>
            <label className={classes.inputLabel}>Data Collector</label>
            <Dropdown
              placeholder="Select a data collector"
              fluid
              selection
              value={props.dataCollector}
              options={props.dataCollectorDropdownOptions}
              onChange={handleDataCollectorSelection}
              className={classes.dropdown}
            />
          </TableRow>
          {props.dataCollector ? (
            <TableRow>
              <Dropdown
                placeholder="Select a value from the data collector"
                fluid
                selection
                value={props.dataPath}
                options={props.schemaDropdownOptions}
                disabled={props.dataCollector ? false : true}
                onChange={props.updateGraphPath}
                className={classes.dropdown}
              />
            </TableRow>
          ) : null}
          {props.dataPath ? (
            <TableRow>
              <input
                type="text"
                id="yAxisTitle"
                name="yAxisTitle"
                className={classes.inputField}
                placeholder="Enter a yAxisTitle"
                value={props.yAxisTitle}
                onChange={(e) => {
                  validateYAxisTitle(e);
                }}
              />
              {yAxisTitleValid !== "" ? (
                <WarnButton className={classes.inputWarning}>
                  {yAxisTitleValid}
                </WarnButton>
              ) : null}
            </TableRow>
          ) : null}
          {props.dataPath ? (
            <TableRow>
              <label className={classes.inputLabel}>Graph Details</label>
              <Dropdown
                placeholder="Select a graph type"
                fluid
                selection
                value={props.graphType}
                options={graphTypes}
                onChange={props.onChangeGraphType}
                className={classes.dropdown}
              />
            </TableRow>
          ) : null}
          {props.dataPath && props.graphType !== "metric" ? (
            <TableRow>
              <HexColorPicker
                style={{ maxHeight: "100px" }}
                color={props.graphColor}
                onChange={props.onChangeColor}
              />
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}

export default GraphCreateForm;
