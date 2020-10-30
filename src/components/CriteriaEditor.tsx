import React, { FunctionComponent } from 'react'
import CriteriaRow from './CriteriaRow'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table';
import Tooltip from '@material-ui/core/Tooltip';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddBoxIcon from '@material-ui/icons/AddBox';

export interface ICriteriaEditorProps {
    xLabel: string,
    yLabel:string,
    tableData: Array<Point>,
    onChange: (x:number|string, y:number, index:number)=> void,
    onAddRow: ()=> void,
    onDelete: (index:number)=> void
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    button:{
        margin: '3px',
        float: 'left'
    },
    pointer:{
        cursor:'pointer'
    }
}));

const CriteriaEditor:  FunctionComponent<ICriteriaEditorProps> = (props)=> {
    const classes = useStyles();
    const {xLabel, yLabel, tableData, onChange, onAddRow, onDelete} = props;

    return (
    <Grid  xs={12} lg={12} item spacing={3}>
        <Tooltip title="Click to add new row in the table." arrow>
            <AddBoxIcon  className={classes.pointer} onClick={onAddRow} fontSize="large"/>
        </Tooltip>
        <Table aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell>{xLabel}</StyledTableCell>
                    <StyledTableCell>{yLabel}</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {tableData.map((d:Point, i:number)=> (<CriteriaRow key={i} data={d} index={i} isDelete={tableData.length >2} onChange={onChange} onDelete={onDelete}/>))}
            </TableBody>
        </Table>
    </Grid>
    )    
}

export default CriteriaEditor