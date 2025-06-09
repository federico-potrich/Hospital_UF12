cd AFPHospitalAPI

echo Installing dependencies for API...

echo Writing credentials.yml...

echo database: > credentials.yml
echo.  host: localhost >> credentials.yml
echo.  port: 3306 >> credentials.yml
echo.  user: root >> credentials.yml
echo.  password: root >> credentials.yml
echo.  name: ospedale >> credentials.yml

echo Done setting up API.
npm install

pause