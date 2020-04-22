# git-branch-status
show status for branches in git

## Installation
```bash
npm i -g @eraz7/git-branch-status
```
## Usage Example
### Without Args
```bash
branch-status
```
### Sort
```bash
branch-status --sortBy=date --sortType=desc
```
```bash
branch-status --sortBy=count --sortType=asc
```
## Arguments
### sortBy
sets property for sorting rows. default is `date`. options are:
* `count`: sort by commit count
* `date`: sort by last commit date 
### sortOrder
sets sort order. defaults to asc. options are : 
* `asc`: sort in ascending order
* `desc`: sort in descending order
