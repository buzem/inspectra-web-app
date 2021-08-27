import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import DetailsArea from "../General/DetailsArea";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationCreateForm from "./NotificationCreateForm";
import FormHelperServices from "../../services/FormHelperService";
import {
  StatusButton,
  RequestButton,
  NeutralButton,
  WarnButton,
} from "../../theming/objects";
import styles from "../../theming/styles";
import CustomAlert from "../General/CustomAlert";

/**
 * For presenting and changing notification details
 * @param {props} props
 */
function NotificationDetailsComponent(props) {
  const classes = styles();

  const fieldSchemas = useSelector((state) => state.fieldSchemas);
  const selectedNotification = useSelector(
    (state) => state.selectedNotification
  );

  const [editMode, setEditMode] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [channel, setChannel] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [rule, setRule] = React.useState("");
  const [criticalvalue, setCriticalValue] = React.useState(0);
  const [selectedDataCollectorId, setSelectedDataCollectorId] =
    React.useState("");
  const [dataCollectorTitle, setDataCollectorTitle] = React.useState("");
  const [updatedAt, setUpdatedAt] = React.useState(0);
  const [field, setField] = React.useState(null);
  const [paused, setPaused] = React.useState(false);
  const [schemaDropdownOptions, setSchemaDropdownOptions] = React.useState([]);
  const [dataCollectorDropdownOptions, setDataCollectorDropdownOptions] =
    React.useState([]);
  const [formErrors, setFormErrors] = React.useState(true);

  /*
     const datacollectors = useSelector((state) => state.entities.datacollectors);
     const [datacollectorstate, setDatacollectorstate] = React.useState(datacollectors);
     console.log("inside component");
     console.log(datacollectorstate);
   

     useEffect(() => {
          // load datacollectors when the page is loaded or the datacollectors have changed.
          if (!datacollectors) {
               loadDataCollectors();
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [datacollectors]);

     const loadDataCollectors = async () => {
          // trigger the redux action getDataCollectors
          props.dispatch(getDataCollectors());
     };
     */
  // const [notificationId, setNotificationId] = React.useState("");

  // for extracting the attributes of the given notification to the approriate state variables
  const extractNotification = () => {
    if (!props.notification) {
      return;
    }
    setTitle(props.notification.title);
    setChannel(props.notification.channel);
    setEmail(props.notification.email);
    setPhone(props.notification.phone);
    setRule(props.notification.rule);
    setPaused(props.notification.paused);
    setCriticalValue(props.notification.criticalvalue);
    setSelectedDataCollectorId(props.notification.dataCollectorId);
    setDataCollectorTitle(props.notification.dataCollectorTitle);
    setUpdatedAt(props.notification.updatedAt);
    setField(props.notification.field);
  };

  // creating a object with all relevant data to update or create a changed notification
  const packNotification = () => {
    let back = {
      ...props.notification,
    };
    back.title = title;
    back.channel = channel;
    back.email = email;
    back.phone = phone;
    back.rule = rule;
    back.paused = paused;
    back.criticalvalue = criticalvalue;
    back.dataCollectorId = selectedDataCollectorId;
    back.dataCollectorTitle = dataCollectorTitle;
    back.field = field;
    return back;
  };

  // triggers when a new notification is given to this component or the new parameter is changed
  useEffect(() => {
    if (!props.new) {
      extractNotification();
      setEditMode(false);
    }
  }, [props.notification, props.new]);

  useEffect(() => {
    console.log(field);
  }, [field]);

  useEffect(() => {
    if (props.new) {
      setEditMode(true);
    }
  }, [props.new]);

  // triggers when fieldSchemas is updated
  // translates fieldSchemas into dropdown options for the selection of the right path
  useEffect(() => {
    updateSchemaDropdown();
  }, [fieldSchemas]);

  // update list of datacollectors whenever props.datacollector updates
  useEffect(() => {
    console.log(props.dataCollectors);
    // translate list of data collectors from state into dropdown options
    let dataCollectorDropdownOptions =
      FormHelperServices.updateDataCollectorDropdown(props.dataCollectors);
    setDataCollectorDropdownOptions(dataCollectorDropdownOptions);
  }, [props.dataCollectors]);

  useEffect(() => {
    console.log(selectedDataCollectorId);
    if (selectedDataCollectorId) {
      // reset schema dropdown
      setSchemaDropdownOptions([]);
      // load schema for selected data collector id
      retrieveSchema(selectedDataCollectorId);
    }
  }, [selectedDataCollectorId]);

  // props for all grid items used below in the JSX
  const girdItemProps = {
    item: true,
    className: classes.padding,
  };

  // function that handles the onClick event for the warning button
  const onWarningClick = () => {
    console.log("error of collector: ", fieldSchemas.error.dataCollectorId);
    props.history.push("/data-collector/" + fieldSchemas.error.dataCollectorId);
  };

  const onChangeTitle = (value) => {
    setTitle(value);
  };

  const onChangeChannel = (value) => {
    setChannel(value);
  };
  const onChangeEmail = (value) => {
    setEmail(value);
  };
  const onChangePhone = (value) => {
    setPhone(value);
  };
  const onChangeRule = (value) => {
    setRule(value);
  };
  const onChangeCriticalValue = (value) => {
    setCriticalValue(value);
  };
  // const onChangeDataCollectorId = (value) => {
  //   setSelectedDataCollectorId(value);
  // };

  const onChangeDataCollectorTitle = (value) => {
    setDataCollectorTitle(value);
  };
  const onChangeField = (value) => {
    // console.log(value);
    let currentFields = fieldSchemas.fieldSchemas;
    // console.log(currentFields);
    if (currentFields.length > 0) {
      let currentField = currentFields.find((item) => item.path === value);
      setField(currentField);
    } else {
      setField(null);
    }
  };

  const togglePaused = (value) => {
    setPaused(!paused);
  };
  // retrieves schema for data collector
  const retrieveSchema = () => {
    props.retrieveSchema(selectedDataCollectorId);
  };

  // refreshes the dropdown options for the schema dropdown
  const updateSchemaDropdown = async () => {
    if (fieldSchemas.error) {
      setSchemaDropdownOptions([]);
      return;
    }

    let options = FormHelperServices.updateSchemaDropdown(
      fieldSchemas.fieldSchemas
    );
    setSchemaDropdownOptions(options);
  };

  // function that handles a change of the data collector
  const onDataCollectorSelection = (e, data) => {
    setSelectedDataCollectorId(data.value);
    setField(null);
    updateSchemaDropdown([]);
  };

  // cancel is called, functionality differs whether it is a new notification or not
  const onCancel = () => {
    if (props.new) {
      props.history.push("/notifications");
    } else {
      setEditMode(false);
      extractNotification();
    }
  };

  // save is called, functionality differs whether it is a new notification or not
  const onSave = () => {
    if (props.new) {
      props.onCreate(packNotification());
    } else {
      props.onSave(packNotification());
    }
  };

  const onWarningClickCreateDataCollector = () => {
    props.history.push("/data-collector/new");
  };

  return (
    <div
      className={
        classes.flexCol +
        " " +
        classes.padding +
        " " +
        classes.center +
        " " +
        classes.flex +
        " " +
        classes.maxWidth
      }
    >
      <div
        className={
          classes.flexRow +
          " " +
          classes.flexEnd +
          " " +
          classes.barMinHeight +
          " " +
          classes.marginTopSmall
        }
      >
        {editMode ? (
          <React.Fragment>
            <Button
              onClick={onCancel}
              variant="contained"
              color="primary"
              className={classes.marginSides}
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              variant="contained"
              color="primary"
              className={classes.marginSides}
              disabled={false}
            >
              {props.new ? "Create" : "Save"}
            </Button>
          </React.Fragment>
        ) : (
          <Button
            onClick={(e) => setEditMode(true)}
            variant="contained"
            color="primary"
            className={classes.marginSides}
            disabled={!props.isLoggedIn}
          >
            Edit
          </Button>
        )}
      </div>
      {/* More detail data of the notification, grouped in DetailsArea.js for a consistent look */}
      {editMode ? (
        <Grid container>
          {!props.dataCollectors || props.dataCollectors?.length === 0 ? (
            <Grid item xs={12} sm={12}>
              <CustomAlert
                title={"No DataCollectors found!"}
                details={
                  "Notifications can only be edited if data collectors are available. Before creating or editing a notification, please ensure that at least one data collector is available."
                }
                buttonTitle={"Create new Data Collector"}
                onClick={onWarningClickCreateDataCollector}
                onDismissWarning={props.onDismissWarning}
              />
            </Grid>
          ) : null}
          {props.dataCollectors &&
          selectedDataCollectorId &&
          fieldSchemas.error ? (
            <Grid item xs={12} sm={12}>
              <CustomAlert
                title={fieldSchemas.error.title}
                details={fieldSchemas.error.details}
                buttonTitle={"Inspect DataCollector"}
                onClick={onWarningClick}
                onDismissWarning={props.onDismissWarning}
              />
            </Grid>
          ) : null}

          {props.dataCollectors && selectedNotification.error ? (
            <Grid item xs={12} sm={12}>
              <CustomAlert
                title={selectedNotification.error.title}
                details={selectedNotification.error.details}
                // buttonTitle={"Inspect DataCollector"}
                // onClick={onWarningClick}
                onDismissWarning={props.onDismissWarning}
              />
            </Grid>
          ) : null}
          <Grid item sm={12} xs={12}>
            <Grid
              container
              spacing={3}
              className={`${classes.roundBox} ${classes.detailsBox} ${classes.paper} ${classes.paddingCreatePage} ${classes.marginTopSmall}`}
            >
              <Grid item>
                <Typography variant="h1" align="left">
                  Notification
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h1" align="left">
                  {paused ? (
                    <WarnButton onClick={togglePaused}>paused</WarnButton>
                  ) : (
                    <StatusButton onClick={togglePaused}>active</StatusButton>
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid xl={12} lg={12} md={12} ms={12} xs={12} {...girdItemProps}>
            <DetailsArea
              title="Create Notification"
              content={
                <NotificationCreateForm
                  editMode={editMode}
                  dataCollectors={props.dataCollectors}
                  dataCollectorDropdownOptions={dataCollectorDropdownOptions}
                  schemaDropdownOptions={schemaDropdownOptions}
                  title={title}
                  channel={channel}
                  email={email}
                  phone={phone}
                  rule={rule}
                  criticalvalue={criticalvalue}
                  dataCollectorTitle={dataCollectorTitle}
                  dataCollectorId={selectedDataCollectorId}
                  updatedAt={updatedAt}
                  field={field}
                  onDataCollectorSelection={onDataCollectorSelection}
                  onChangeTitle={onChangeTitle}
                  onChangeRule={onChangeRule}
                  onChangeChannel={onChangeChannel}
                  onChangeEmail={onChangeEmail}
                  onChangePhone={onChangePhone}
                  onChangeCriticalValue={onChangeCriticalValue}
                  // onChangeDataCollectorId={onChangeDataCollectorId}
                  onChangeDataCollectorTitle={onChangeDataCollectorTitle}
                  onChangeField={onChangeField}
                  setFormErrors={setFormErrors}
                />
              }
            />
          </Grid>
        </Grid>
      ) : (
        // Notification Details Sections
        <div className={`${classes.listRoot} ${classes.alignCenter}`}>
          <Grid
            container
            spacing={3}
            className={`${classes.roundBox} ${classes.borderBox} ${classes.shadow} ${classes.headerBox} ${classes.boxPadding}`}
          >
            <Grid item sm={12} xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h4" align="left">
                    {title} &nbsp;
                    {paused ? (
                      <WarnButton>paused</WarnButton>
                    ) : (
                      <StatusButton>active</StatusButton>
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.marginTopLarge}>
                  <RequestButton>Data Collector</RequestButton>
                  <NeutralButton>{selectedDataCollectorId}</NeutralButton>
                </Grid>
                <Grid item xs={12}>
                  <RequestButton>Value</RequestButton>
                  <NeutralButton>{field?.path}</NeutralButton>
                  <NeutralButton>{rule}</NeutralButton>
                  <NeutralButton>{criticalvalue}</NeutralButton>
                </Grid>
                <Grid item xs={12}>
                  <RequestButton>{channel}</RequestButton>
                  <NeutralButton>
                    {channel === "EMAIL" ? email : phone}
                  </NeutralButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

// attributes of props and their type
NotificationDetailsComponent.propTypes = {
  notification: PropTypes.object,
  new: PropTypes.bool,
  onCreate: PropTypes.func,
  onSave: PropTypes.func,
};

export default withRouter(NotificationDetailsComponent);
