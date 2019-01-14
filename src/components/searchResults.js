import React, { Component } from 'react'
import { Link } from 'gatsby'

class SearchResults extends Component {
  render () {
    const showResults =
      this.props.searchResults &&
      this.props.searchResults.value &&
      this.props.searchResults['@odata.count']

    const resultSentence = showResults
      ? `${this.props.searchResults.value.length} / ${
        this.props.searchResults['@odata.count']
      } results shown.`
      : ''

    const qitSentence = showResults
      ? `Want to listen to these episodes? Head over to <a href="https://qit.cloud/search/"${
        this.props.searchTerm
      }">QIT</a> and start listening!`
      : ''
    return (
      <div className={this.props.searchResults.length ? '' : 'hidden'}>
        <p>{resultSentence}</p>
        {this.props.searchResults.value.map(hit => (
          <div key={hit.episodeTitle}>
            <Link
              to={`/shows/${hit.podcastTitle
                .toLowerCase()
                .replace(/\s/g, '-')}`}
            >
              {hit.podcastTitle}
            </Link>
            : {hit.episodeTitle}
          </div>
        ))}
        <br />
        <p dangerouslySetInnerHTML={{ __html: qitSentence }} />
      </div>
    )
  }
}

export default SearchResults
