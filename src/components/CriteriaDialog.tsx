import React, {useState, useEffect} from 'react';
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CriteriaEditor from './CriteriaEditor';
import Grid from '@material-ui/core/Grid'
import CriteriaChart from './CriteriaChart'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  }
}))(MuiDialogActions);



interface ICriteriaDialogProps{
  title: string,
  xLabel: string,
  yLabel:string,
  xValues: Array<number|string>,
  yValues: Array<number>,
  onSave: (xValues:Array<number|string>, yValues:Array<number>) => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  margin5x:{
    margin: '5px'
  }
}));


const createDataObject = (x:Array<number|string>, y:Array<number>)=>{
  const data = [];
  const len = x.length;
  for(let i=0; i< len; i++) data.push(createPoint(x[i], y[i]));
  return data;
}

const createPoint = (x:number|string, y:number):Point =>{
  return {x, y};
}

export default function CriteriaDialog({xLabel, yLabel, xValues, yValues, title, onSave}:ICriteriaDialogProps) {
  const defaultVal:number = 0;
  const initialData:Array<Point> = createDataObject(xValues, yValues);
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState(initialData)
  const [chartData, setChartData] = useState(initialData); // this maintains the state of Chart Data
  const [showChart, SetShowChart] = useState(true); // if this is false then chart will be hidden

  useEffect(() => {
        let isNumeric = true;
        for(let val of tableData){
            isNumeric = isNumeric && !isNaN(Number(val.x))
        }
        SetShowChart(isNumeric);//if the x values are numeric then show the chart else hide
        return () => {
            SetShowChart(true);
        }
    }, [tableData]);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess =() =>{
    const xVals:Array<string|number> = [], yVals:Array<number>= [];
    for(let val of tableData){
      xVals.push(val.x);
      yVals.push(val.y);
    }
    onSave(xVals, yVals);
    setOpen(false);
  }

  const handleAddRow = ()=>{
    setTableData([...tableData, createPoint(defaultVal, defaultVal)]);
  }

  const handleChange = (x:number|string, y:number, index:number) => {
    console.log(x, y)
      const newData = tableData
      .map((point, i)=> i===index? {'x': x, 'y': y}:point);
      setTableData(newData);
  }

  const handleDelete = (index:number)=>{
      const newData = tableData.filter((point, i)=> i !==index);
      setTableData(newData);
  }

  const updateChartData = (data:Array<Point>)=>{
    let newChartData = [...data];
    //Before updating the chart, sort x values so that it will make sure that every x value has single y value
    setChartData(newChartData.sort((p1:Point, p2:Point) => (p1.x > p2.x) ? 1 :-1));
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" 
      disableBackdropClick={true}
      open={open} 
      fullWidth={true} 
      maxWidth = {'md'}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container xs={12} lg={12} spacing={2} >
              <Grid  xs={12}  lg={showChart?6:12} item spacing={3}>  
                <Grid  xs={12}  lg={12} item spacing={3}> 
                  <CriteriaEditor 
                    xLabel={xLabel} 
                    yLabel={yLabel} 
                    tableData= {tableData}
                    onChange = {handleChange}
                    onAddRow = {handleAddRow}
                    onDelete = {handleDelete}
                  />
                </Grid>
                {showChart && (<Grid xs={12} className={classes.margin5x} lg={12} item spacing={3}>
                  <Tooltip title="Click to Update Chart Data" arrow>
                      <Button autoFocus  onClick={()=> updateChartData(tableData)} variant="outlined">
                          Update Chart
                      </Button>
                  </Tooltip>
                </Grid>)}
              </Grid>

              {showChart && (<Grid  xs={12}  lg={6} item spacing={3}>  
                <CriteriaChart data={chartData} xLabel={xLabel} yLabel={yLabel}/>
              </Grid>)}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus  onClick={()=> handleSuccess()} color="primary">
            Save changes
          </Button>
          <Button autoFocus onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}