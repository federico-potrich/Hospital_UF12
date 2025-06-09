@echo off
cd AFPHospitalSIOV2

echo Creating environment folder and file...
cd src\app\core\services\login
mkdir environment 2>nul
cd environment

echo Writing environment.ts...

echo.  const firebaseConfig = { > environment.ts
echo.   apiKey: ^"AIzaSyACQ2ESzq0wBvByzFpRn23hJMRElUPPOwg^", >> environment.ts
echo.   authDomain: ^"uf12hospital.firebaseapp.com^", >> environment.ts
echo.   projectId: ^"uf12hospital^", >> environment.ts
echo.   storageBucket: ^"uf12hospital.firebasestorage}.app^", >> environment.ts
echo.   messagingSenderId: ^"603084757711^", >> environment.ts
echo.   appId: ^"1:603084757711:web:824bac1083e24343a435ba^", >> environment.ts
echo.   measurementId: ^"G-ZJDQL9PJCD^" >> environment.ts
echo }; >> environment.ts

echo Installing dependencies for Angular...
npm install --force

echo Done setting up Angular.
