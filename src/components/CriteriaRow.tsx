import React, {FunctionComponent} from 'react'
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';

interface ICriteriaRow{
    data: Point,
    index: number,
    onChange: Function,
    onDelete: Function,
    maxRange?: number,
    minRange?:number,
    isDelete?: Boolean
}

function iconStyles() {
    return {
      deleteIcon: {
        color: 'black',
      }
    }
  }


const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

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

const CriteriaRow: FunctionComponent<ICriteriaRow> = ({data, onChange, index, onDelete, maxRange = 1, minRange=-1, isDelete = true}) => {
    const classes = makeStyles(iconStyles)();

    const validInputeRange = (value:string)=>{
      if(value==='' ||value === '-' || value === '+') return true;
        return Number(value) <= maxRange && Number(value) >= minRange;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
      const value:string = event.target.value;  
     
      switch (event.target.name) {
        case 'x':
            onChange(value, data.y, index);
          break;
        case 'y':
          if(validInputeRange(value)) onChange(data.x, value, index); 
          break;
      }
    }


    return (
        <StyledTableRow key={index}>
                <StyledTableCell>
                    <TextField id={`x-${index}`} label=""  name="x" value={data.x} onChange={handleChange} />
                </StyledTableCell>
                <StyledTableCell>
                    <TextField id={`y-${index}`} label="" name="y" value={data.y} onChange={handleChange}/>
                </StyledTableCell>
              <StyledTableCell>
                 {isDelete && (
                  <Tooltip title="Click to delete this row." arrow>
                    <DeleteIcon className={classes.deleteIcon} onClick={() => onDelete(index)}/>
                  </Tooltip>)}
              </StyledTableCell>
        </StyledTableRow>
    )
};

export default CriteriaRow;
