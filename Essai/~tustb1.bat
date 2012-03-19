echo off
        set di=%cd%
        :boucle
        cd ..
        set d=%cd%
        if exist "%d%\DidacDoc" goto suite
        goto boucle
        :suite
        cd DidacDoc\bin
        c:/Python25/python.exe la29.py "%di%" "tust" True
pausepause
