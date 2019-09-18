const { Client } = require('@elastic/elasticsearch')
const esClient = new Client({ 
  node: 'https://4c8849023a8d47fab57c067bf7c3f722.us-west-1.aws.found.io:9243/',
  auth: {
    username: 'elastic',
    password: 'huQszg2v3RvCS2ppT1qvhBqT'
  }
})

module.exports = esClient;
