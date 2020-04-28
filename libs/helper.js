module.exports = {
  getOutput(commitInfos) {
    const lines = commitInfos.map(info => `  ${info.sha}    ${info.message}`)

    return `The commit check failed

${lines.join('\n')}`
  },
}
