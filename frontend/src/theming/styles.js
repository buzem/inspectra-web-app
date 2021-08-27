import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  appRoot: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  toolbar: {
    flexGrow: 1,
    backgroundColor: "#F2F3F5",
    color: "#444444",
  },
  toolbarTitle: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  justifySpaceBetween: {
    justifyContent: "space-between",
  },
  flex: {
    flex: 1,
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
  marginSides: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  center: {
    margin: "auto",
  },
  paddingSmall: {
    padding: theme.spacing(1.5),
  },
  padding: {
    padding: theme.spacing(2),
  },
  paddingLarge: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
    marginLeft: 0,
  },
  paddingCreatePage: {
    paddingLeft: theme.spacing(2.5),
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2),
    marginLeft: 0,
    marginBottom: theme.spacing(1),
  },
  maxWidth: {
    width: "100%",
    maxWidth: "1050px",
  },
  pageArea: {
    paddingBottom: theme.spacing(2),
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  paper: {
    width: "1050px",
  },
  alignLeft: {
    alignItems: "left",
  },
  alignRight: {
    alignItems: "right",
  },
  alignCenter: {
    alignItems: "center",
  },
  listRoot: {
    paddingTop: theme.spacing(3.5),
    paddingBottom: theme.spacing(2),
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  listHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    maxWidth: "1050px",
  },
  boxPadding: {
    padding: theme.spacing(2),
  },
  boxPaddingLarge: {
    padding: theme.spacing(4),
  },
  graphPadding: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  graphTitle: {
    paddingLeft: theme.spacing(1.7),
    marginBottom: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2.7),
  },
  marginTopSmall: {
    marginTop: theme.spacing(1.5),
  },
  marginTop: {
    marginTop: theme.spacing(2.7),
  },
  marginTopLarge: {
    marginTop: theme.spacing(3.2),
  },
  marginTopXLarge: {
    marginTop: theme.spacing(5),
  },
  titleBox: {
    backgroundColor: "#C8FACD",
  },
  detailsBox: {
    backgroundColor: "rgba(206, 206, 206, 0.6)",
  },
  warningsBox: {
    backgroundColor: "#FFF7CD",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(222, 222, 222, 0.3)",
  },
  headerBox: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
  },
  roundBox: {
    borderRadius: 12,
  },
  borderBox: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(222, 222, 222, 0.5)",
  },
  roundTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  roundBottom: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  shadow: {
    boxShadow: "0px 8px 12px 0px rgba(206,206,206,0.3)",
  },
  barMinHeight: {
    minHeight: theme.spacing(5),
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(2),
  },
  addButton: {
    borderRadius: 8,
    height: "40px",
    boxShadow: "0px 8px 12px 0px rgba(206,206,206,0.3)",
  },
  textfielRoot: {
    minHeight: theme.mixins.textfieldminheight,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  inputBase: {
    padding: theme.spacing(1),
    color: "inherit !important",
    width: "100%",
  },
  input: {
    padding: theme.spacing(0.5),
    textAlign: "left",
    color: "inherit",
    height: "25px",
    width: "100%",
  },
  inputLabel: {
    fontFamily: "Source Sans Pro",
    fontSize: "1.5em",
    fontWeight: "600",
    marginTop: "10px",
  },
  inputField: {
    width: "100%",
    padding: "15px",
    marginBottom: "5px",
    borderRadius: "6px",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(222, 222, 222, 1)",
    fontFamily: "Source Sans Pro",
    fontSize: "1.3em",
  },
  dropdown: {
    paddingTop: "20px!important",
    paddingBottom: "20px!important",
    marginBottom: "5px",
    alignItems: "center",
    fontFamily: "Source Sans Pro",
    fontSize: "1.3em",
  },
}));

export default styles;
