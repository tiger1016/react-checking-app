#!/bin/bash

DEPLOY_PATH=~/petcheck2.0

tar -xzf dist.tar.gz

# VERSION_ID=`find . | grep main\. | sed 's/^.*main\.//g' | sed 's/\.js$//g'`
#perl -pi -e "s/var bundleHash.*/var bundleHash = \'$VERSION_ID\'; /g" index.html

rm -rf $DEPLOY_PATH/dist
rm $DEPLOY_PATH/*
# mv dist/index.html $DEPLOY_PATH/
mv dist/* $DEPLOY_PATH/

rm -rf dist
rm dist.tar.gz
