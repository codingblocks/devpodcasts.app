import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2'

class Chart extends Component {
  constructor (props) {
    super(props)
    const limit = props.limit || 10
    const showLegend = props.showLegend || false
    const showNull = props.showNull || false
    const filteredTags = showNull
      ? props.tags
      : props.tags.filter(t => t.tag !== 'none')

    const limitedTags = filteredTags.slice(0, limit)
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
        maintainAspectRatio: false,
        title: {
          display: false
        },
        legend: {
          display: showLegend,
          position: 'top',
          fullWidth: false,
          onClick: (e, key) => {
            window.location.href = `https://qit.cloud/search/"${window.encodeURI(
              key.text.replace('-', ' ')
            )}"`
          }
        }
      }
    }
  }

  render () {
    return (
      <div className='tag-chart-container'>
        <Doughnut data={this.state.data} options={this.state.options} />
      </div>
    )
  }
}

export default Chart
