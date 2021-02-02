import { green, orange, blue, blueGrey } from "@material-ui/core/colors";

export const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justityContent: 'flex-center',
		alignItems: 'space-between',		
	},
	dialog: {
		margin:'auto',
  },
  cointainer: {
    margin: 'auto',
    height: 350,
    width: 350,
    top: 177,
    marginTop: 190,
    border: '2px solid #d3d3d3',
  },
  panelContainer: {
    paddingLeft: 100,
    border: '2px solid #d3d3d3',
    backgroundColor: '#f5f5f5'
  },
  formCointainer: {
    paddingTop: 45,
    paddingBottom: 0,
    paddingLeft: 44,
    paddingRight: 57,
    justifyContent: 'space-between',
  },
	fieldControl: {
    border:'2px solid #d3d3d3',
    borderRadius:'2px',
    width:250,
  },
   labelControl:{
    fontSize:'larger',
    fontWeight:'bold',
    color:'#26365e',
    lineHeight:'2'
   },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  },
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 250,
		height: 200,
		alignItems:'space-between'
  },
  group: { 
	position: 'relative',
	Width: 250,
	margin: 45,
	left: 500,
	top: 120
  },
  propertySaveStart:{
    backgroundColor: blueGrey[400]
  },
  propertySaveSuccess:{
    backgroundColor: green[400]
  },
  propertySaveError:{
    backgroundColor: orange[400]
  },
  propertySaveMessage:{
    display: 'flex',
    alignItems: 'center'
  },
  loginSaveSuccess:{
    backgroundColor: green[400]
  },
  loginSaveError:{
    backgroundColor: orange[400]
  },
  loginSaveMessage:{
    display: 'flex',
    alignItems: 'center'
  }
	/* anchorOriginTopRight:{
		right: 12,
		top: 12,
	} */
});