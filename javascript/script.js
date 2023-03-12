const app = {};

app.getHoroscopeToday = () => {
    const url = new URL(app.apiURL);
    url.search = new URLSearchParams({
        sign: app.apiSign,
        day: 'today'
    });

    fetch(url, { method: 'POST' })
        .then((response) => {
            console.log(response);
            if (response.ok === true) { 
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then((jsonResult) => {
            console.log(jsonResult);

            app.apiImage.attributes.src.textContent = `./assets/${app.apiSign}.png`;
            app.apiImage.attributes.alt.textContent = `${app.apiSign} symbol`;
            app.apiSelection.innerText = app.apiSign;
            app.apiDateRange.innerText = jsonResult.date_range;
            app.apiCurrentDate.innerText = jsonResult.current_date;

            app.apiDescriptionToday.innerText = jsonResult.description;
            app.apiCompatibilityToday.innerText = jsonResult.compatibility;
            app.apiMoodToday.innerText = jsonResult.mood;
            app.apiColorToday.innerText = jsonResult.color;
            app.apiNumberToday.innerText = jsonResult.lucky_number;
            app.apiTimeToday.innerText = jsonResult.lucky_time;
        })
        .catch ((error) => {
            alert("Something went wrong, try again later (1)");
            window.location.reload(true);
        })
};

app.getHoroscopeYesterday = () => {
    const url = new URL(app.apiURL);
    url.search = new URLSearchParams({
        sign: app.apiSign,
        day: 'yesterday'
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

            app.apiDescriptionYesterday.innerText = jsonResult.description;
            app.apiCompatibilityYesterday.innerText = jsonResult.compatibility;
            app.apiMoodYesterday.innerText = jsonResult.mood;
            app.apiColorYesterday.innerText = jsonResult.color;
            app.apiNumberYesterday.innerText = jsonResult.lucky_number;
            app.apiTimeYesterday.innerText = jsonResult.lucky_time;
        })
        .catch((error) => {
            alert("Something went wrong, try again later (0)");
            window.location.reload(true);
        })
};

app.getHoroscopeTomorrow = () => {
    const url = new URL(app.apiURL);
    url.search = new URLSearchParams({
        sign: app.apiSign,
        day: 'tomorrow'
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

            app.apiDescriptionTomorrow.innerText = jsonResult.description;
            app.apiCompatibilityTomorrow.innerText = jsonResult.compatibility;
            app.apiMoodTomorrow.innerText = jsonResult.mood;
            app.apiColorTomorrow.innerText = jsonResult.color;
            app.apiNumberTomorrow.innerText = jsonResult.lucky_number;
            app.apiTimeTomorrow.innerText = jsonResult.lucky_time;
        })
        .catch((error) => {
            alert("Something went wrong, try again later (2)");
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
    app.backButton.addEventListener('click', function () {
        console.log('click');
        app.backButton.style.opacity = '0';
        app.horoscopeSection.style.opacity = '0';

        // gives opacity transition time, then switch views back
        setTimeout(function() {
            app.horoscopeSection.style.display = 'none';
            app.backButton.style.visibility = 'hidden';
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
            // call api fetching methods
            app.getHoroscopeYesterday();
            app.getHoroscopeToday();
            app.getHoroscopeTomorrow();
            app.changeSign();
            
            // gives opacity transition time, then switch views
            setTimeout(function(){
                app.signsViewSection.style.display='none';
                app.horoscopeSection.style.display='block';
                app.backButton.style.visibility='visible';
                app.backButton.style.opacity = '1';
                app.horoscopeSection.style.opacity = '1';
            }, 250);
        });
    });
};


app.toggleHoroscope = () => {
    function toggleCards() {
        // app.horoscopePanels.classList.remove('open');
        // app.horoscopePanels.children.classList.remove('open');
        this.classList.toggleClass('open');
        this.children.classList.toggle('open');  
    };

    app.horoscopePanels.forEach((panel) => {
        console.log('hello');
        panel.addEventListener('click', toggleCards());
    });
};

app.init = () => {
    app.signsButtons = document.querySelectorAll('.signsButton');
    app.backButton = document.querySelector('.backButton');
    app.horoscopeSection = document.querySelector('.horoscopeViewSection');
    app.signsViewSection = document.querySelector('.signButtonSection');
    app.horoscopeBox = document.querySelector('.horoscopeView');
    app.horoscopePanels = document.querySelectorAll('.horoscopeFlex');
    app.apiFacts = document.querySelector('.apiFacts');

    app.apiImage = document.querySelector('.apiImage');
    app.apiSelection = document.querySelector('.apiSelection');
    app.apiDateRange = document.querySelector('.apiDateRange');
    app.apiCurrentDate = document.querySelector('.apiCurrentDate');

    // today
    app.apiDescriptionToday = document.querySelector('.apiDescriptionToday');
    app.apiCompatibilityToday = document.querySelector('.apiCompatibilityToday');
    app.apiMoodToday = document.querySelector('.apiMoodToday');
    app.apiColorToday = document.querySelector('.apiColorToday');
    app.apiNumberToday = document.querySelector('.apiLuckyNumberToday');
    app.apiTimeToday = document.querySelector('.apiLuckyTimeToday');

    // yesterday
    app.apiDescriptionYesterday = document.querySelector('.apiDescriptionYesterday');
    app.apiCompatibilityYesterday = document.querySelector('.apiCompatibilityYesterday');
    app.apiMoodYesterday = document.querySelector('.apiMoodYesterday');
    app.apiColorYesterday = document.querySelector('.apiColorYesterday');
    app.apiNumberYesterday = document.querySelector('.apiLuckyNumberYesterday');
    app.apiTimeYesterday = document.querySelector('.apiLuckyTimeYesterday');

    // tomorrow
    app.apiDescriptionTomorrow = document.querySelector('.apiDescriptionTomorrow');
    app.apiCompatibilityTomorrow = document.querySelector('.apiCompatibilityTomorrow');
    app.apiMoodTomorrow = document.querySelector('.apiMoodTomorrow');
    app.apiColorTomorrow = document.querySelector('.apiColorTomorrow');
    app.apiNumberTomorrow = document.querySelector('.apiLuckyNumberTomorrow');
    app.apiTimeTomorrow = document.querySelector('.apiLuckyTimeTomorrow');
    
    app.apiURL = 'https://aztro.sameerkumar.website';

    app.apiSign = ''; // based on user input

    app.hovers();
    app.getSignButtons();
    app.toggleHoroscope();
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



// on click
    // add .openActive to clicked
    // take off .openActive for others
    // writing-mode: horizontal-tb
    // display: block