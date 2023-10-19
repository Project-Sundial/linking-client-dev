#!/bin/bash

# MUST RUN WITHIN cli ROOT

# Get the current working directory
root_directory=$(pwd)

# Transpile directory
npx babel $root_directory/bin/sundial -o $root_directory/dist/sundial

# Give executable privileges to transpiled
chmod +x $root_directory/dist/sundial

# Execute transpiled with arguments
$root_directory/dist/sundial "$@"
