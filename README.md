# Bookmarks CLI

A command-line tool for storing links to online articles, along with some tags.

## Installation and Setup
[Node.js](https://nodejs.org/en/)
[SQLite](https://www.sqlite.org/download.html)

### Install Node.js & SQLite

### Clone Repository and Install Dependencies
```
$ git clone https://github.com/rickvlzdev/bookmarks-cli bookmarks
$ cd bookmarks
$ npm install
```
### Initialize Database
with sample data
```
$ npm run init
```
or with no sample data
```
$ npm run init-empty
```

### Create Executable (optional)
add exectable file permissions
```
$ sudo chmod +x index.js
```
create symbolic link to file
```
$ ln -s index.js bookmarks
```
add to environment variable PATH
```
$ PATH='path/to/project/directory':${PATH}
```
The section below assumes you followed this step. If you did not, just replace all occurrences of 'bookmarks' with 'node index.js'.

## Usage

### Add Command
Add an article along with some tags
```
$ bookmarks add \
> "An Introduction to Javascript Programming" \
> "http://jsprogramming.com/articles" \
> 'javascript' 'programming' 'introduction' 'tutorial' \
```
Options
* `-a --all` show when article was created and updated

### List Command
List recently added articles
```
$ bookmarks list
```
Output
```
title An Introduction to Javascript Programming
url http://jsprogramming.com/articles
tags 'javascript', 'programming', 'introduction', 'tutorial'
nickname ob_hasegawa_bat
```
Options
* `-l --limit <n>` show *n* most recent articles
* `-a --all` show when article was created and updated\
\
`nickname` field is a unique identifier to refer to an article entry

### Search Command
Search for articles that have at least one tag
```
$ bookmarks search javascript economics clouds
```
Options
* `-s` only show articles that have every tag
* `-n --nickname` search by nickname
* `-t --title` search by title
* `-u --uniformResourceLocator` search by URL
* `-b --backwards` order by oldest articles
* `-l limit <n>` show *n* most recent articles
* `-a --all` show when article was created and updated\
\
Nickname, title, and URL options can be set at once. To enable tag search exclude title, nickname, URL options

### Remove Command
Remove an article with nickname 'ob_hasegawa_bat'
```
$ bookmarks remove ob_hasegawa_bat
```
Options
* `-a --all` show when article was created and updated
