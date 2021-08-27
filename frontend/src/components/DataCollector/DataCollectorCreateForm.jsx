import React from "react";

import { Table, TableBody, TableRow } from "@material-ui/core";
import PropTypes from "prop-types";

import { Dropdown } from "semantic-ui-react";
import { WarnButton } from '../../theming/objects';
import styles from "../../theming/styles";
import TextField from '@material-ui/core/TextField';

const getpostArray = [
     {
          key: "GET",
          text: "GET",
          value: "GET",
     },
     {
          key: "POST",
          text: "POST",
          value: "POST",
     },
];

const frequencyArray = [
     {
          key: "1",
          text: "Every minute",
          value: "* * * * *",
     },
     {
          key: "2",
          text: "Every 2 minutes",
          value: "*/2 * * * *",
     },
     {
          key: "5",
          text: "Every 5 minutes",
          value: "*/5 * * * *",
     },
     {
          key: "10",
          text: "Every 10 minutes",
          value: "*/10 * * * *",
     },
     {
          key: "15",
          text: "Every 15 minutes",
          value: "*/15 * * * *",
     },
     {
          key: "30",
          text: "Every 30 minutes",
          value: "*/30 * * * *",
     },
     {
          key: "60",
          text: "Every hour",
          value: "0 * * * *",
     },
     {
          key: "120",
          text: "Every 2nd hour",
          value: "0 */2 * * *",
     },
     {
          key: "180",
          text: "Every 3rd hour",
          value: "0 */3 * * *",
     },
     {
          key: "360",
          text: "Every 6th hour",
          value: "0 */6 * * *",
     },
     {
          key: "720",
          text: "Every 12th hour",
          value: "0 */12 * * *",
     },
     {
          key: "1440",
          text: "Every day",
          value: "0 12 * * *",
     },
     {
          key: "10080",
          text: "Every week",
          value: "0 12 * * 1",
     }
];
/**
 * For presenting and changing dataCollector details
 * @param {props} props
 */
function DataCollectorCreateForm(props) {
     const classes = styles();

     const [titleValid, setTitleValid] = React.useState("");
     const [endpointValid, setEndpointValid] = React.useState("");
     const [bodyValid, setBodyValid] = React.useState("");
     const [headerValid, setHeaderValid] = React.useState("");


     const handleOnFrequencyChange = (e, data) => {
          props.onChangeFrequency(data.value);
          console.log(data.value);
     };
     const handleOnMethodChange = (e, data) => {
          props.onChangeMethod(data.value);
          console.log(data.value);
     };

     const validateTitle = (e) => {
          let value = e.target.value;
          if (value === '' || value === null) {
               setTitleValid("Please enter a Title that is not empty");
          } else if (value.match("[^A-Za-z]+$")) {
               setTitleValid("Please enter a Title that contains only latters and not ends with a space.");
          } else {
               setTitleValid("");
               props.onChangeTitle(value);
          }
     };

     const validateHeader = (e) => {
          let value = e.target.value;
          if (value === '' || value === null) {
               setHeaderValid("Please enter a Body");
          } else if (!validateJson(value)) {
               setHeaderValid("Please enter a valid JSON schema.");
          } else {
               setHeaderValid("");
               props.onChangeHeader(value);
          }
     };

     const validateBody = (e) => {
          let value = e.target.value;
          if (value === '' || value === null) {
               setBodyValid("Please enter a Body");
          } else if (!validateJson(value)) {
               setBodyValid("Please enter a valid JSON schema.");
          } else {
               setBodyValid("");
               props.onChangeBody(value);
          }
     };

     const validateJson = (data) => {

          try {
               var json = JSON.parse(data);
               return (typeof json === 'object')
          } catch (e) {
               return false;
          }

     }

     const validateEndpoint = (e) => {
          let value = e.target.value;
          if (value === '' || value === null) {
               setEndpointValid("Please enter an Endpoint that is not empty");
          } else if (!value.match("^(http|https)://")) {
               setEndpointValid("Please enter an Endpoint that starts with either http or https.");
          } else if (!value.includes(".")) {
               setEndpointValid("Please enter an Endpoint that contains a valid URL.");
          } else {
               setEndpointValid("");
               props.onChangeEndpoint(value);
          }
     };

     return props.editMode ? (
          <div className={classes.flexCol}>
               
               <Table>
                    <TableBody>
                         <TableRow>
                              <label htmlFor="title" className={classes.inputLabel}>Data Collector Title</label>
                              <input
                                   type="text" id="title" name="title"
                                   className={classes.inputField}
                                   placeholder="Enter a Title"
                                   defaultValue={props.title}
                                   onChange={(e) => { validateTitle(e) }}
                              />
                              {titleValid !== "" ? <WarnButton className={classes.inputWarning}>{titleValid}</WarnButton> : null}
                         </TableRow>
                         <TableRow>
                              <label htmlFor="endpoint" className={classes.inputLabel}>Endpoint</label>
                              <input
                                   type="text" id="endpoint" name="endpoint"
                                   className={classes.inputField}
                                   placeholder="Enter an Endpoint"
                                   defaultValue={props.endpoint}
                                   onChange={(e) => { validateEndpoint(e) }}
                              />
                              {endpointValid !== "" ? <WarnButton className={classes.inputWarning}>{endpointValid}</WarnButton> : null}
                         </TableRow>
                         <TableRow>
                              <label className={classes.inputLabel}>Endpoint Method</label>
                              <Dropdown
                                   placeholder="Please select"
                                   fluid
                                   selection
                                   options={getpostArray}
                                   onChange={handleOnMethodChange}
                                   value={props.method}
                                   className={classes.dropdown}
                              />
                         </TableRow>
                         {props.method === "POST" || props.method === "GET" ?
                         <TableRow>
                              <label htmlFor="header" className={classes.inputLabel}>Header</label>
                              <TextField
                                   type="header" id="header" name="header"
                                   multiline
                                   rows={4}
                                   className={classes.inputField}
                                   placeholder="Enter a Header"
                                   defaultValue={props.header}
                                   onChange={(e) => { validateHeader(e) }}
                                   disabled={false}
                              />
                              {headerValid !== "" ? <WarnButton className={classes.inputWarning}>{headerValid}</WarnButton> : null}
                         </TableRow> : null}
                         {props.method === "POST" ?
                         <TableRow>
                              <label htmlFor="body" className={classes.inputLabel}>Body</label>
                              <TextField
                                   type="body" id="body" name="body"
                                   multiline
                                   rows={4}
                                   className={classes.inputField}
                                   placeholder="Enter a Body"
                                   defaultValue={props.body}
                                   onChange={(e) => { validateBody(e) }}
                                   disabled={props.method !== "POST"}
                              />
                              {bodyValid !== "" ? <WarnButton className={classes.inputWarning}>{bodyValid}</WarnButton> : null}
                         </TableRow> : null}
                         <TableRow>
                              <label className={classes.inputLabel}>Frequency</label>
                              <Dropdown
                                   placeholder="Please select"
                                   fluid
                                   selection
                                   options={frequencyArray}
                                   onChange={handleOnFrequencyChange}
                                   value={props.frequency}
                                   className={classes.dropdown}
                              />
                         </TableRow>
                    </TableBody>
               </Table>
          </div>
     ) : null;
}

// attributes of props and their type
DataCollectorCreateForm.propTypes = {
     title: PropTypes.string,
     endpoint: PropTypes.string,
     frequency: PropTypes.string,
     body: PropTypes.string,
     header: PropTypes.string,
     editMode: PropTypes.bool,
     onChangeTitle: PropTypes.func,
     onChangeEndpoint: PropTypes.func,
     onChangeFrequency: PropTypes.func,
     onChangeMethod: PropTypes.func,
     onChangeHeader: PropTypes.func,
     onChangeBody: PropTypes.func,
};

export default DataCollectorCreateForm;
