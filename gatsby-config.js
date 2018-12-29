module.exports = {
  siteMetadata: {
    title: 'dev podcasts'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-qit-episodes',
      options: {
        key: '18EA821D408444FCF3DC3EC4F3790FEC',
        allShowsUrl:
          'https://podcasts.search.windows.net/indexes/podcasts/docs?api-version=2017-11-11&facet=podcastTitle,count:9999&$top=0',
        individualUrl:
          'https://podcasts.search.windows.net/indexes/podcasts/docs?api-version=2017-11-11&searchFields=podcastTitle&$top=100'
      }
    },
    {
      resolve: 'gatsby-source-qit-tags',
      options: {
        key: '18EA821D408444FCF3DC3EC4F3790FEC',
        showsByTagUrl:
          'https://podcasts.search.windows.net/indexes/podcasts/docs?api-version=2017-11-11&facet=podcastTitle,count:9999&$top=0',
        episodesByTagUrl:
          'https://podcasts.search.windows.net/indexes/podcasts/docs?api-version=2017-11-11&$top=100',
        tags: [
          'Docker',
          'Kubernetes',
          'React',
          'Vue',
          'GraphQL',
          'Elasticsearch'
        ]
      }
    }
  ]
}
