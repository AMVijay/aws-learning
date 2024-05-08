#!/bin/sh

echo $1
libreoffice7.6 --headless --convert-to pdf --outdir /tmp/ /tmp/hello.txt > /tmp/conversion/txt