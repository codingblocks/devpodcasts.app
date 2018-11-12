import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'

class Chart extends Component {
  constructor (props) {
    super(props)
    const dateCounts = []
    props.episodes.reverse().forEach(e => {
      let date = new Date(e.published.getFullYear(), e.published.getMonth() + 1, e.published.getDate(), 0, 0, 0)
      let lastIndex = dateCounts.length - 1
      if (lastIndex < 0 || dateCounts[lastIndex].x.getTime() !== date.getTime()) {
        dateCounts[lastIndex + 1] = {
          x: date,
          y: 1
        }
      } else {
        dateCounts[lastIndex] = {
          x: date,
          y: dateCounts[lastIndex].y + 1
        }
      }
    })
    this.state = {
      dateCounts: dateCounts,
      data: {
        datasets: [{
          label: 'Episodes',
          data: dateCounts,
          backgroundColor: '#339999',
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Episodes released by date'
        },
        scales: {
          xAxes: [{
            type: 'time'
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Episodes'
            }
          }]
        }
      }
    }
  }

  render () {
    return <Line data={this.state.data} options={this.state.options} />
  }
}

export default Chart
