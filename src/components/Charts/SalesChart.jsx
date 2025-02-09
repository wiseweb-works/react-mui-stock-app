import { Card, CardContent, Typography } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const SalesChart = ({ data }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Sales</Typography>
      <AreaChart width={675} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.1}
        />
      </AreaChart>
    </CardContent>
  </Card>
);

export default SalesChart;
