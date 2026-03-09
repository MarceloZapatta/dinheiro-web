"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PizzaChartProps {
  income: number;
  outcome: number;
}

const COLORS = ['#22C55E', '#EF4444']; // Green for income, Red for outcome

export function PizzaChart({ income, outcome }: PizzaChartProps) {
  const data = [
    { name: 'Receita', value: income },
    { name: 'Despesa', value: outcome },
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
