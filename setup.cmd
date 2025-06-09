@echo off
title Setup

:: Avvia lo script API
start "serverlessWindow" cmd /k "call setup_api.bat"

:: Avvia lo script Angular
start "angularWindow" cmd /k "call setup_angular.bat"
