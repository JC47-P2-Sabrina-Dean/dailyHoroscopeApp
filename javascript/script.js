const app = {};

app.apiSelection = document.querySelector('.apiSelection');
app.apiDateRange = document.querySelector('.apiDateRange');
app.apiCurrentDate = document.querySelector('.apiCurrentDate');
app.apiDescription = document.querySelector('.apiDescription');
app.apiCompatibility = document.querySelector('.apiCompatibility');
app.apiMood = document.querySelector('.apiMood');
app.apiColor = document.querySelector('.apiColor');
app.apiLuckyNumber = document.querySelector('.apiLuckyNumber');
app.apiLuckyTime = document.querySelector('.apiLuckyTime');

app.apiImage = document.getElementById('apiImage');

app.apiURL = "https://aztro.sameerkumar.website";

app.apiSign = 'cancer';
app.apiDay = 'today';

app.getHoroscope = () => {
const url = new URL(app.apiURL);
url.search = new URLSearchParams({
        sign: app.apiSign,
        day: app.apiDay
    });

fetch(url, {method: 'POST'})
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((jsonResult) => {
        console.log(jsonResult);

        app.apiImage.attributes.src.textContent = `./assets/${app.apiSign}.png`;

        app.apiSelection.innerText = app.apiSign;
        app.apiDateRange.innerText = jsonResult.date_range;

        app.apiCurrentDate.innerText = jsonResult.current_date;
        app.apiDescription.innerText = jsonResult.description;

        app.apiCompatibility.innerText = jsonResult.compatibility;
        app.apiMood.innerText = jsonResult.mood;
        app.apiColor.innerText = jsonResult.color;
        app.apiLuckyNumber.innerText = jsonResult.lucky_number;
        app.apiLuckyTime.innerText = jsonResult.lucky_time;
    });
};

    app.init = () => {
        app.getHoroscope();
    }
    
        app.init();





// create an app object

// getHoroscope method that requests info from API
 	// create URL constructor
	// search params based on user input (sign, day)

// fetch method from URL above
	// parse response into JSON
	// pass json data into method that will display the horoscope reading

// displayHoroscope method
	// query select right div/elements
	
	// create new elements and append as children
	// OR
	// update innerText
// remember to clear at the beginning of the method if not empty, or text will add on instead of replace

// horoscope image method
	// create a forEach() method with an eventListener for each star sign image listening for a click
// store chosen starsign into a temporary variable

// create init method
	// should include getHoroscope method but not displayHoroscope method
	// global variable for user input query select (Form based inputs or image selector?)
	// init the horoscope image method

// initialize