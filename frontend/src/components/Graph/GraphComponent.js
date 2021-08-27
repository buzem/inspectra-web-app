import React from "react";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import {
  StatusButton,
  NeutralButton,
  AlertButton
} from "../../theming/objects";
import styles from "../../theming/styles";

/**
 * For presenting and changing dataCollector details
 * @param {props} props
 */
function GraphComponent(props) {
  const classes = styles();

  const getMean = (data, key) => {
    var sum = 0;
    for (let i in data){
        sum += data[i][key];
    }
    return Math.round((sum / data.length), 2);
  };

  const getMin = (data, key) => {
    var values = [];
    for (let i in data){
      values.push(data[i][key]);
    }
    return Math.min(...values);
  };

  const getMax = (data, key) => {
    var values = [];
    for (let i in data){
      values.push(data[i][key]);
      return Math.max(...values);
    }
  };
  
  const getAvailableShare = (data, key) => {
    var valid = 0;
    for (let i in data){
      if (data[i][key] < 300){
        valid += 1;
      }
    }
    return Math.round((valid / data.length) * 100, 1);
  };

  return (
    <ResponsiveContainer
      width="100%"
      height={props.height ? props.height : "100%"}
    >
      { props.data === undefined || props.data.length === 0 ? (
        <div className={classes.marginTopLarge}>
          <Typography variant="h5" align="center">
            No data available yet
          </Typography>
        </div>
      ): props.type === "bar" ? (
        <BarChart
          data={props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey={
              typeof props.alternateKey === "undefined"
                ? "timestamp"
                : props.alternateKey
            }
          />
          <Tooltip />
          {props.compact ? null : (
            <YAxis
              label={{ value: props.label, angle: -90, position: "insideLeft" }}
              domain={['auto', 'auto']}
            />
          )}
          {/* {props.compact ? null : <Legend verticalAlign="top" />} */}
          <Bar
            dataKey={
              typeof props.alternateValue === "undefined"
                ? "value"
                : props.alternateValue
            }
            fill={props.color}
          />
        </BarChart>
      ) : props.type === "line" ? (
        <LineChart
          data={props.data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis
            dataKey={
              typeof props.alternateKey === "undefined"
                ? "timestamp"
                : props.alternateKey
            }
          />
          <Tooltip />
          {props.compact ? null : (
            <YAxis
              label={{ value: props.label, angle: -90, position: "insideLeft" }}
              domain={['auto', 'auto']}
            />
          )}
          {/* {props.compact ? null : <Legend />} */}
          {props.compact ? null : <CartesianGrid stroke="#f5f5f5" />}
          <Line
            type="monotone"
            dataKey={
              typeof props.alternateValue === "undefined"
                ? "value"
                : props.alternateValue
            }
            fill={props.color}
            stroke={props.color}
            yAxisId={0}
          />
        </LineChart>
      ) : props.type === "metric" ? (
        <div>
          <Typography
            variant="h3"
            align="center"
            style={{ paddingTop: "40px"}}
          >
            { getMean(props.data, "value") }
          </Typography>
          <Typography
            variant="h5"
            align="center"
            style={{ paddingTop: "20px"}}
          >
            <StatusButton>Min</StatusButton> <NeutralButton>{ getMin(props.data, "value") }</NeutralButton> <br/>
            <AlertButton>Max</AlertButton> <NeutralButton>{ getMax(props.data, "value") }</NeutralButton>
          </Typography>
        </div>
      ) : props.type === "httpAvailability" ? (
        <Typography
          variant="h3"
          align="center"
          style={{ paddingTop: "25px", paddingRight: "35px" }}
        >
          { getAvailableShare(props.data, props.alternateValue) } %
        </Typography>
      ) : (
        <AreaChart
          data={props.data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis
            dataKey={
              typeof props.alternateKey === "undefined"
                ? "timestamp"
                : props.alternateKey
            }
          />
          <Tooltip />
          {props.compact ? null : (
            <YAxis
              label={{ value: props.label, angle: -90, position: "insideLeft" }}
              domain={['auto', 'auto']}
            />
          )}
          {/* {props.compact ? null : <Legend />} */}
          {props.compact ? null : <CartesianGrid stroke="#f5f5f5" />}
          <Area
            type="monotone"
            dataKey={
              typeof props.alternateValue === "undefined"
                ? "value"
                : props.alternateValue
            }
            fill={props.color}
            stroke="#000000"
            yAxisId={0}
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}

// attributes of props and their type
GraphComponent.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  data: PropTypes.array,
  type: PropTypes.string,
  height: PropTypes.number,
  compact: PropTypes.bool,
  alternateKey: PropTypes.string,
  alternateValue: PropTypes.string,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default withRouter(GraphComponent);
