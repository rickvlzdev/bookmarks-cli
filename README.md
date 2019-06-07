# Bookmarks CLI

A command-line tool for storing links to online articles, along with some tags.

## Installation and Setup

### Install Node.js & SQLite
[Node.js](https://nodejs.org/en/)\
[SQLite](https://www.sqlite.org/download.html)

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
$ PATH=$(pwd):${PATH}
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

## Accessing Database Directly
Begin client session.
```
$ sqlite3 db.sqlite
```
Get all article ids, titles, creation dates & times, and nicknames.
```
sqlite> SELECT title, created_at nickname FROM article;
id          title                                           created_at                      nickname            
----------  ----------------------------------------------  ------------------------------  --------------------
1           How to test Express.js with Jest and Supertest  2019-06-07 01:14:09.970 +00:00  vof_costantini_eagle
2           How to escape async/await hell                  2019-06-07 01:14:10.006 +00:00  ibvob_benvenuti_guan
3           Setting Default Values with JavaScript’s Destr  2019-06-07 01:14:10.021 +00:00  jijetiinu_breton_mul
4           Teach yourself C++ — Where to start             2019-06-07 01:14:10.039 +00:00  zos_de_waal_raven   
5           How To Secure a Containerized Node.js Applicat  2019-06-07 01:14:10.092 +00:00  tih_lees_addax      
6           { Writing API Tests with Jest. }                2019-06-07 01:14:10.120 +00:00  nabecvoh_schofield_g
7           5 Easy Steps to Understanding JSON Web Tokens   2019-06-07 01:14:10.154 +00:00  pihpi_briggs_pigs_an
...
```
Get all tags.
```
sqlite> SELECT * FROM tag;
id          keyword     created_at                      updated_at                    
----------  ----------  ------------------------------  ------------------------------
1           javascript  2019-06-07 01:14:09.938 +00:00  2019-06-07 01:14:09.938 +00:00
2           jest        2019-06-07 01:14:09.959 +00:00  2019-06-07 01:14:09.959 +00:00
3           testing     2019-06-07 01:14:09.967 +00:00  2019-06-07 01:14:09.967 +00:00
4           async/awai  2019-06-07 01:14:10.000 +00:00  2019-06-07 01:14:10.000 +00:00
5           asynchrono  2019-06-07 01:14:10.004 +00:00  2019-06-07 01:14:10.004 +00:00
6           destructur  2019-06-07 01:14:10.019 +00:00  2019-06-07 01:14:10.019 +00:00
7           c++         2019-06-07 01:14:10.033 +00:00  2019-06-07 01:14:10.033 +00:00
...
```
Show some join table rows.
```
sqlite> SELECT article_id, tag_id, created_at FROM article_tag LIMIT 5;
article_id  tag_id      created_at                    
----------  ----------  ------------------------------
1           1           2019-06-07 01:14:09.986 +00:00
1           2           2019-06-07 01:14:09.986 +00:00
1           3           2019-06-07 01:14:09.986 +00:00
2           1           2019-06-07 01:14:10.014 +00:00
2           4           2019-06-07 01:14:10.014 +00:00
```
