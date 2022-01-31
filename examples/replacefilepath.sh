#!/bin/bash
jssum=$(md5sum build/bundle.js | awk '{print $1}')
csssum=$(md5sum build/bundle.css | awk '{print $1}')

cp build/bundle.js "build/bundle.$jssum.js"
cp build/bundle.js.map "build/bundle.$jssum.js.map"
cp build/bundle.css "build/bundle.$csssum.css"
sed -i "s/bundle.js/bundle.$jssum.js/g; s/bundle.css/bundle.$csssum.css/g" index.html
sed -i "s/bundle.js.map/bundle.$jssum.js.map/g" "build/bundle.$jssum.js"