import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2'

class Chart extends Component {
  constructor (props) {
    super(props)
    const limit = props.limit || 10
    const limitedTags = props.tags.slice(0, limit)
    const backgroundColors = [
      '#e6194b',
      '#3cb44b',
      '#ffe119',
      '#4363d8',
      '#f58231',
      '#911eb4',
      '#46f0f0',
      '#f032e6',
      '#bcf60c',
      '#fabebe',
      '#008080',
      '#e6beff',
      '#9a6324',
      '#fffac8',
      '#800000',
      '#aaffc3',
      '#808000',
      '#ffd8b1',
      '#000075',
      '#808080',
      '#ffffff',
      '#000000'
    ].slice(0, limit)
    this.state = {
      data: {
        labels: limitedTags.map(t => {
          return t.tag
        }),
        datasets: [
          {
            data: limitedTags.map(t => {
              return t.count
            }),
            backgroundColor: backgroundColors
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Episodes by tag'
        },
        legend: {
          display: false
        }
      }
    }
  }

  render () {
    return <Doughnut data={this.state.data} options={this.state.options} />
  }
}

export default Chart
