#!/bin/sh
rsync -rcv --exclude .git --exclude '*~' --chmod=Dugo+x,ugo+r ./ jadedresearcher@50.116.40.89:/var/www/html/knucklessux.com/public_html/InfoTokenReader/Bullshit/
