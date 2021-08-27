import { getFieldSchemas } from "../../redux/actions";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CustomTextField from "../General/CustomTextField";
import { Table, TableBody, TableRow } from "@material-ui/core";
import { Dropdown } from "semantic-ui-react";
import { WarnButton } from '../../theming/objects';
import styles from "../../theming/styles";

const channelArray = [
	{
		key: "EMAIL",
		text: "E-MAIL",
		value: "EMAIL",
	},
	{
		key: "TWILIO",
		text: "SMS",
		value: "TWILIO",
	},
];

const ruleArray = [
	{
		key: "<",
		text: "less than",
		value: "<",
	},
	{
		key: "<=",
		text: "less than or equal to",
		value: "<=",
	},
	{
		key: "==",
		text: "equal",
		value: "==",
	},
	{
		key: ">=",
		text: "greater than or equal to",
		value: "==",
	},
	{
		key: ">",
		text: "greater than",
		value: ">",
	},
];
function NotificationCreateForm(props) {
	const classes = styles();

	const [titleValid, setTitleValid] = React.useState("");
	const [thresholdValid, setThresholdValid] = React.useState("");
	const [phoneValid, setPhoneValid] = React.useState("");
	const [emailValid, setEmailValid] = React.useState("");

	// const [dataCollectorId, setDataCollectorId] = useState("");



	useEffect(()=>{
		if(titleValid === "" && props.dataCollectorId){
			if(props.channel === "EMAIL" && emailValid === ""){
				props.setFormErrors(false);
			} else if(props.channel === "TWILIO" && phoneValid === ""){
				props.setFormErrors(false);
			} else{
				props.setFormErrors(true);
			}
		} else {
			props.setFormErrors(true);
		}
	}, [phoneValid, emailValid, titleValid, props.dataCollectorId])


	// const loadFieldSchemas = async () => {
	// 	// trigger the redux action getDataCollectors
	// 	props.dispatch(getFieldSchemas(dataCollectorId));
	// };

	const handleOnChannelChange = (e, data) => {
		props.onChangeChannel(data.value);
	};
	const handleOnRuleChange = (e, data) => {
		props.onChangeRule(data.value);
	};


	const handleDataCollectorSelection = (e, data) => {
		// console.log(data.value);
		props.onDataCollectorSelection(e, data);
		// props.updateDataCollectorSchema(data.value);
	  };

	const handleOnFieldChange = (e, data) => {
		props.onChangeField(data.value);
	};

	const validateTitle = (e) => {
		let value = e.target.value;
		props.onChangeTitle(value);
		if(value === '' || value === null) {
			 setTitleValid("Please enter a Name that is not empty");
		} else if (value.match("[^A-Za-z]+$")) {
			 setTitleValid("Please enter a Name that contains only latters and not ends with a space.");
		} else {
			 setTitleValid("");
			 
		}
   };

    const validateThreshold = (e) => {
		let value = e.target.value;
		props.onChangeCriticalValue(value);
		if(value === '' || value === null) {
			setThresholdValid("Please enter a Value that is not empty");
		} else if (value.match("[^0-9]+$")) {
			setThresholdValid("Please enter a Value that contains only numbers and a dot.");
		} else {
			setThresholdValid("");
			
		}
	};

	const validatePhone = (e) => {
		let value = e.target.value;
		props.onChangePhone(value);
		if(value === '' || value === null) {
			setPhoneValid("Please enter a Phone number in the format: +49123472712");
		} else if (!value.match("^([0-9\(\)\/\+ \-]*)$")) {
			setPhoneValid("Please enter a valid Phone number.");
		} else {
			setPhoneValid("");
			
		}
	};

	const validateEmail = (e) => {
		let value = e.target.value;
		props.onChangeEmail(value);
		if(value === '' || value === null) {
			setEmailValid("Please enter an E-Mail that is not empty");
		} else if (!value.match(".+@.+\..+")) {
			setEmailValid("Please enter a valid E-Mail address.");
		} else {
			setEmailValid("");
			
		}
	};

	return props.editMode && props.dataCollectors ? (
		<div className={classes.flexCol}>
			<Table>
				<TableBody>
					<TableRow>
						<label className={classes.inputLabel}>Name</label>
						<input
							type="text"
							className={classes.inputField}
							placeholder="Please enter a name for the notification"
							value={props.title}
							onChange={(e)=>{validateTitle(e)}}
						/>
						{ titleValid !== "" ? <WarnButton className={classes.inputWarning}>{ titleValid }</WarnButton> : null }
					</TableRow>
					<TableRow>
						<label className={classes.inputLabel}>Data Collector</label>
						
							<Dropdown
							placeholder="Select a data collector"
							fluid
							selection
							value={props.dataCollectorId}
							options={props.dataCollectorDropdownOptions}
							onChange={handleDataCollectorSelection}
							className={classes.dropdown}
							/>
					</TableRow>
					<TableRow>
						<label className={classes.inputLabel}>Notification Datapoint</label>
						<Dropdown
							placeholder="Please select a notification datapoint"
							fluid
							selection
							value={props.field === null ? null : props.field?.path} 
							options={props.schemaDropdownOptions}
							onChange={handleOnFieldChange}
							className={classes.dropdown}
						/>
					</TableRow>
					{props.field != null ? (<TableRow>
						<label className={classes.inputLabel}>Threshold Type</label>
						<Dropdown
							value={props.rule}
							placeholder="Please select a threshold type"
							fluid
							selection
							options={ruleArray}
							onChange={handleOnRuleChange}
							className={classes.dropdown}
						/>
					</TableRow> ) : null}
					{props.field != null ?
					<TableRow>
						<label className={classes.inputLabel}>Threshold Value</label>
						<input
							type="text"
							className={classes.inputField}
							placeholder="Please enter a numeric threshold value"
							value={props.criticalvalue}
							onChange={(e)=>{validateThreshold(e)}}
						/>
						{ thresholdValid !== "" ? <WarnButton className={classes.inputWarning}>{ thresholdValid }</WarnButton> : null }
					</TableRow> : null}
					{props.field != null ?
					<TableRow>
						<label className={classes.inputLabel}>Notification Channel</label>
						<Dropdown
							placeholder="Please select"
							fluid
							selection
							options={channelArray}
							onChange={handleOnChannelChange}
							value={props.channel}
							className={classes.dropdown}
						/>
					</TableRow> : null}
					{props.channel === "TWILIO" && props.field != null ? (
						<TableRow>
							<label className={classes.inputLabel}>Phone Number</label>
							<input
								type="text"
								className={classes.inputField}
								placeholder="Please enter a phone number in the format +49123456789"
								defaultValue={props.phone}
								onChange={(e)=>{validatePhone(e)}}
							/>
							{ phoneValid !== "" ? <WarnButton className={classes.inputWarning}>{ phoneValid }</WarnButton> : null }
						</TableRow>
					) : props.channel === "EMAIL" && props.field != null ? (
						<TableRow>
							<label className={classes.inputLabel}>E-Mail Address</label>
							<input
								type="text"
								className={classes.inputField}
								placeholder="Please enter an e-mail address"
								defaultValue={props.email}
								onChange={(e)=>{validateEmail(e)}}
							/>
							{ emailValid !== "" ? <WarnButton className={classes.inputWarning}>{ emailValid }</WarnButton> : null }
						</TableRow>
					) : null}
				 </TableBody>
			</Table>
		</div>
	) : (
		<div className={classes.flexRow}>
			<CustomTextField
				value={props.title} 
				editMode={props.editMode}
				onChange={props.onChangeTitle}
				isEmptyText="tba"
			/>
		</div>
	);
}


export default connect()(NotificationCreateForm);
