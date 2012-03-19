echo off
        set di=%cd%
        :boucle
        cd ..
        set d=%cd%
        if exist "%d%\DidacDoc" goto suite
        goto boucle
        :suite
        cd DidacDoc\bin
        la29.exe "%di%" "tust" False
