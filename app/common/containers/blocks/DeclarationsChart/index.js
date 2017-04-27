import React from 'react';
import withStyles from 'withStyles';
import { translate } from 'react-i18next';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

import styles from './styles.scss';

const CustomizedAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dy={0} fontSize={10} textAnchor="middle" fill="#666" transform="rotate(-35)">{payload.value}</text>
  </g>
);

const CustomizedLabel = ({ x, y, stroke, value }) => (
  <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>
);

@withStyles(styles)
@translate()
export default class Chart extends React.Component {
  render() {
    const { data, t } = this.props;

    return (
      <div className={styles.chart}>
        <ComposedChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
          stackOffset="sign"
        >
          <XAxis dataKey="name" tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip formatter={value => Math.abs(value)} />
          <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
          <ReferenceLine y={0} stroke="#000" />
          <Bar name={t('Closed')} dataKey="closed" stackId="a" barSize={20} fill="#fc0f1b" isAnimationActive={false} />
          <Bar name={t('Open')} dataKey="open" stackId="a" barSize={20} fill="#17af55" isAnimationActive={false} />
          <Line name={t('Total')} type="monotone" dataKey="all" stroke="#72ab4e" strokeWidth={3} label={<CustomizedLabel />} />
          <Legend />
        </ComposedChart>
      </div>

    );
  }
}
