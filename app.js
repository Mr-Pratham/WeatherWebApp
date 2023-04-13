const express = require('express')
const https = require('https');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true })); // bodyParser CODE

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {   // taking input from form using index.html form and post
    const city = req.body.cityName;
    const apiKey = "3b81c7a41ee559bd33a4c84ee76be531";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        // console.log(response);   USE THIS TO GET DETAILED DATA
        console.log(response.statusCode);  // returns status code=200 if all correct

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)  // makes data in terminal very precise
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            // console.log(weatherData);
            // console.log(temp); 
            // console.log(weatherDescription);
            res.write("<p>The weather in " + city + " is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();


        })
    })
});



app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});