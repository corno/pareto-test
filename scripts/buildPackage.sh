#!/usr/bin/env bash

echo $1

pushd $1
rm -rf ./dist && \
tsc
popd