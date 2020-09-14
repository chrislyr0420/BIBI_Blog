#!/bin/sh
cd /Users/chrislyr/Document/BIBI_Blog/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log