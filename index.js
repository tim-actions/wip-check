const core = require('@actions/core')
const github = require('@actions/github')

const helper = require('./libs/helper.js')


async function main() {
  try {
    const labelsStr = core.getInput('labels')
    const keywordsStr = core.getInput('keywords')
    const blockingLabels = JSON.parse(labelsStr)
    const blockingKeywords = JSON.parse(keywordsStr)

    const {payload: {pull_request: pr}} = github.context
    const title = pr.title
    const labels = pr.labels.map(x => x.name)

    const effected = {
      labels: [],
      keywords: [],
    }

    blockingLabels.forEach(bl => {
      if (labels.includes(bl)) effected.labels.push(bl)
    })

    blockingKeywords.forEach(bk => {
      if (title.includes(bk)) effected.keywords.push(bk)
    })


    let summarys = []
    if (effected.labels.length) {
      summarys.push(`Blocking labels: ${effected.labels.join(', ')}`)
    }

    if (effected.keywords.length) {
      summarys.push(`Blocking keywords in title: ${effected.keywords.join(', ')}`)
    }

    if (summarys.length) core.setFailed(summarys.join(" "))

  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
