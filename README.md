# wip-check

A GitHub Action tests that the PR does not contain any label or keyword in the title intended to prevent premature merging of the PR

## Usage
Add .github/workflows/sanity-check.yml with the following:

```
name: Sanity check
on:
  pull_request:
    types:
      - opened
      - synchronize
      - reopened
      - edited
      - labeled
      - unlabeled]

jobs:
  pr_wip_check:
    runs-on: ubuntu-latest
    name: WIP Check
    steps:
    - name: WIP Check
      uses: tim-actions/wip-check@master
      with:
        labels: '["do-not-merge", "wip", "rfc"]'
        keywords: '["WIP", "wip", "RFC", "rfc"]'


```
