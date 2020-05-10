// Libraries
import React from 'react'
import { PieChart, Pie } from 'recharts'

// Styles
import './index.css'

export default props => <div className='SimplePieChart'>
  <div className='chart-container'>
    <PieChart width={144} height={140}>
      <Pie
        cx={67}
        cy={67}
        data={props.data}
        dataKey='value'
        endAngle={-270}
        fill={props.color}
        innerRadius={53}
        outerRadius={67}
        startAngle={90}
        strokeWidth={0}
      />
    </PieChart>
    <div className='inner-label' style={{ color: props.color }}>{props.innerLabel}</div>
    <span className='outer-label'>{props.outerLabel}</span>
  </div>
</div>
