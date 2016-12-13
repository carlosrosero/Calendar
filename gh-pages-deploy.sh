#!/bin/sh

if [ -z "$1" ]
then
  echo "Please enter commit message"
  exit 1
fi

PROJECT_SUBDIR=react-calendar-app npm run build

cp ./gh-pages/404.html ./build/404.html

git add build
git commit -am '$1' --no-verify

git subtree push --prefix build origin gh-pages --force
