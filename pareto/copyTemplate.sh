#!/usr/bin/env bash

cp -R ./node_modules/pareto-ts-validator/data/projectTemplate/. .. \

#npm messes with .gitignore, that's why I need to handle it separately
cp ./node_modules/pareto-ts-validator/data/gitignore ../.gitignore \