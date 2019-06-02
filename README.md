# Bookmarks CLI

A command-line tool for storing links to online articles, along with some tags.

## Installation and Setup

1. Install Node.js & SQLite if don't have them installed

2. Clone repository and install its dependencies
```
$ git clone https://github.com/rickvlzdev/bookmarks-cli bookmarks
$ cd bookmarks
$ npm install
```
3. Initialize Database
with sample data
```
$ npm run init
```
or with no sample data
```
$ npm run init-empty
```

4. Create Executable (optional)
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
(The section below assumes you followed this step. If you did not, just replace all occurrences of 'bookmarks' with 'node index.js').

## Usage

### Add Command
To add an article along with some tags
```
$ bookmarks add "An Introduction to Javascript Programming" "http://jsprogramming.com/articles" javascript programming introduction tutorial
```