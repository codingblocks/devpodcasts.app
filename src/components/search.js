import React from 'react'
import SearchResults from './searchResults'

export default class Search extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      searchResults: {
        value: []
      },
      searchTerm: ''
    }
  }

  search () {
    const searchTerm = this.refs.searchInput.value
    if (searchTerm.length) {
      const url = `https://podcasts.search.windows.net/indexes/podcasts/docs?api-version=2017-11-11&$count=true&$top=10&queryType=full&search=%22${encodeURI(
        searchTerm
      )}%22` // TODO env

      const options = {
        headers: {
          'api-key': '18EA821D408444FCF3DC3EC4F3790FEC' // TODO env
        }
      }

      window
        .fetch(url, options)
        .then(response => response.json())
        .then(result => {
          this.setState({ searchResults: result, searchTerm: searchTerm })
        })
        .catch(e => window.alert)
    }
  }

  render () {
    return (
      <section id='section-about' className='section clearfix'>
        <div className='container'>
          <div className='section-header'>
            <h2>Searching</h2>
          </div>
          <p>
            The <a href='https://qit.cloud'>QIT</a> engine makes it easy to find
            the programming podcasts for the techs you are interested in.
          </p>
          <br />
          <p>
            Why don't you give it a shot? The more niche the topic, the better,
            but either way we'll prioritize the results so that you get more
            recent episodes about whatever you search for.
          </p>
          <br />
          <div className='form-group'>
            <label htmlFor='inlineSearchInput'>Give it a shot:</label>
            <div className='input-group nav-search'>
              <input
                type='search'
                ref='searchInput'
                placeholder='Search for a topic here'
                className='form-control'
                aria-describedby='emailHelp'
                id='inlineSearchInput'
              />
              <span className='input-group-append'>
                <button
                  className='btn btn-outline-secondary'
                  type='button'
                  onClick={this.search.bind(this)}
                >
                  <i className='fa fa-search' />
                </button>
              </span>
            </div>
            <small id='emailHelp' className='form-text text-muted'>
              Need a suggestion? Try something like "Docker" or "Gatsby" to
              learn about how this app was made.
            </small>
          </div>
          <SearchResults
            searchResults={this.state.searchResults}
            searchTerm={this.state.searchTerm}
          />
        </div>
      </section>
    )
  }
}
