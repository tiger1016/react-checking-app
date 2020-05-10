#!/bin/bash

tar -zcvf dist.tar.gz --directory=./ dist

rsync -vzP -e ssh dist.tar.gz forge@api2.petchecktechnology.com:/home/forge/petcheck-prod/

rm dist.tar.gz
