"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface PizzaChartProps {
  income: number;
  outcome: number;
}

const PizzaChart: React.FC<PizzaChartProps> = ({ income, outcome }) => {
  const data: ChartData[] = [
    { name: 'Income', value: income, color: '#22C55E' }, // Green for Income
    { name: 'Outcome', value: Math.abs(outcome), color: '#EF4444' }, // Red for Outcome
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PizzaChart;
