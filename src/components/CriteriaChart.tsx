import React from 'react'
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, CartesianGrid, YAxis, Label} from 'recharts';


interface ICriteriaChartProps {
    data: Array<Point>,
    xLabel?: string,
    yLabel?:string
}

const CriteriaChart: React.FunctionComponent<ICriteriaChartProps> = ({data, xLabel = "", yLabel = ""}) => {
    const theme = useTheme();

    const chartData =  React.useMemo(
      () => data,
      [data]
    )

    return (
      <React.Fragment>
          <LineChart
          width={400}
          height={400}
          data={chartData}
          margin={{ top: 5, right: 20, left: 10, bottom: 15 }}
          >
              <XAxis dataKey="x" type="number">
                 <Label value={xLabel} offset={-10} position="insideBottom" />
              </XAxis>
              <CartesianGrid stroke="#f5f5f5" />
              <YAxis stroke={theme.palette.text.secondary}>
                  <Label value={yLabel} angle={270} offset={10} position="insideLeft" /> 
              </YAxis>
              <Line 
                type="linear" dataKey="y" 
                stroke={theme.palette.primary.main} 
                dot={true}
              />
          </LineChart>  
      </React.Fragment>
    );
};

export default CriteriaChart;
