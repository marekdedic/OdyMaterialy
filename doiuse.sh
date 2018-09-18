#!/bin/sh

BROWSERLIST="> 1%, > 1% in CZ, IE >= 6, last 5 Firefox versions, last 5 FirefoxAndroid versions, last 5 Chrome versions, last 5 ChromeAndroid versions, last 5 iOS versions, last 5 Opera versions, last 5 Edge versions, last 5 Safari versions"

 doiuse --browsers "$BROWSERLIST" styles/*
 doiuse --browsers "$BROWSERLIST" admin/styles/*