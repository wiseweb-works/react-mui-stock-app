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

const PurchaseChart = ({ data }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Purchases</Typography>
      <AreaChart width={675} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="purchase"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.1}
        />
      </AreaChart>
    </CardContent>
  </Card>
);

export default PurchaseChart;
