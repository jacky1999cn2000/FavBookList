#!/usr/bin/env bash

export MONGOLAB_URI=mongodb://root:root@ds055525.mongolab.com:55525/favbooklist
export secret="secret"

node_modules/nodemon/bin/nodemon.js app.js
