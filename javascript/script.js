const app = {};

app.getHoroscope = () => {
    const url = new URL(app.apiURL);
    url.search = new URLSearchParams({
        sign: app.apiSign,
        day: app.apiDay
    });

    fetch(url, { method: 'POST' })
        .then((response) => {
            console.log(response);
            if (response.ok === true) { 
                return response.json();
            } else {
                throw new Error(response.statusText); // 
            }
        })
        .then((jsonResult) => {
            console.log(jsonResult);

            app.apiImage.attributes.src.textContent = `./assets/${app.apiSign}.png`;
            app.apiImage.attributes.alt.textContent = `${app.apiSign} symbol`;

            app.apiSelection.innerText = app.apiSign;
            app.apiDateRange.innerText = jsonResult.date_range;

            app.apiCurrentDate.innerText = jsonResult.current_date;
            app.apiDescription.innerText = jsonResult.description;

            app.apiCompatibility.innerText = jsonResult.compatibility;
            app.apiMood.innerText = jsonResult.mood;
            app.apiColor.innerText = jsonResult.color;
            app.apiLuckyNumber.innerText = jsonResult.lucky_number;
            app.apiLuckyTime.innerText = jsonResult.lucky_time;
        })
        .catch ((error) => {
            alert("Something went wrong, try again later");
            window.location.reload(true);
        })
};

app.hovers = () => {
    // method to display sign info when user mouseovers symbol
    app.signsButtons.forEach((button) => {
        button.addEventListener('mouseover', function () {
            let sign = this.attributes.id.textContent;
            app.signInfo = document.getElementById(`${sign}Info`);
            app.signInfo.style.transform = 'scale(1, 1)';
        })
    });

    // method to hide sign info when user mouseout of symbol
    app.signsButtons.forEach((button) => {
        button.addEventListener('mouseout', function () {
            let sign = (this.attributes.id.textContent);
            app.signInfo = document.getElementById(`${sign}Info`);
            app.signInfo.style.transform = 'scale(0)';
        })
    });

    // method to display sign info when user focus in on symbol
    app.signsButtons.forEach((button) => {
        button.addEventListener('focusin', function () {
            let sign = this.attributes.id.textContent;
            app.signInfo = document.getElementById(`${sign}Info`);
            app.signInfo.style.transform = 'scale(1, 1)';
        })
    });

    // method to hide sign info when user focus out on symbol
    app.signsButtons.forEach((button) => {
        button.addEventListener('focusout', function () {
            let sign = (this.attributes.id.textContent);
            app.signInfo = document.getElementById(`${sign}Info`);
            app.signInfo.style.transform = 'scale(0)';
        })
    });
}

// method to change back to the sign button selection screen
app.changeSign = () => {
    app.changeButton.addEventListener('click', function () {
        console.log('click');
        app.changeButton.style.opacity = '0';
        app.horoscopeSection.style.opacity = '0';

        // gives opacity transition time, then switch views back
        setTimeout(function() {
            app.horoscopeSection.style.display = 'none';
            app.changeButton.style.visibility = 'hidden';
            app.signsViewSection.style.display = 'block';
            app.signsViewSection.style.opacity = '1';
        }, 250);
    });
}

    // method for listening to which sign button was clicked
app.getSignButtons = () => {

    //depending in which was clicked, give that as input to the api and changes the screen to horoscope view
    app.signsButtons.forEach((button) => {
        button.addEventListener('click', function () {
            app.apiSign = this.attributes.id.textContent;
            app.signsViewSection.style.opacity = '0';
            // call api fetching method
            app.getHoroscope();
            app.changeSign();
            
            // gives opacity transition time, then switch views
            setTimeout(function(){
                app.signsViewSection.style.display='none';
                app.horoscopeSection.style.display='block';
                app.changeButton.style.visibility='visible';
                app.changeButton.style.opacity = '1';
                app.horoscopeSection.style.opacity = '1';
            }, 250);
        });
    });
};

app.init = () => {
    app.signsButtons = document.querySelectorAll('.signsButton');
    app.changeButton = document.querySelector('.changeButton');
    app.horoscopeSection = document.querySelector('.horoscopeViewSection');
    app.signsViewSection = document.querySelector('.signButtonSection');

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

    app.apiURL = 'https://aztro.sameerkumar.website';

    app.apiSign = ''; // based on user input
    app.apiDay = 'today';

    app.hovers();
    app.getSignButtons();
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