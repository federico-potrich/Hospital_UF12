@echo off
title Launcher

:: Avvia serverless offline in una nuova finestra
start "serverlessWindow" cmd /k "cd AFPHospitalAPI && npx serverless offline"

:: Avvia Angular in una nuova finestra
start "angularWindow" cmd /k "cd AFPHospitalSIOV2 && npx ng serve"

:: Attendi qualche secondo (puoi regolare il tempo in base alla tua macchina)
timeout /t 10 /nobreak >nul

:: Apri il browser all'indirizzo localhost:4200
start http://localhost:4200
