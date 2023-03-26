const app = {};

// method to open or close user input modal
app.userBirthday = () => {
    //event listener for opening the the birthday selector modal
    app.openModal.addEventListener("click", () => {
        app.modal.showModal();

        // event listener for closing the birthday selector modal
        app.closeModal.addEventListener('click', () => {
            modal.close();
        })
    });
}

// event Listener listening for when the user clicks the enter button after submitting thier birthday and month
app.submitUserDate = () => {
    app.enter.addEventListener("click", app.handleClick);
}

// method to convert user birthday input and run conditional against star sign array
app.handleClick = function(event) {
    // prevents the browser from refreshing after the enter button is clicked on the form
    event.preventDefault();
    modal.close();
    // find the value of the month select and store in a variable
    let month = Number(document.querySelector("#month").value);
    // find the value of the day select and store in a variable 
    let day = Number(document.querySelector("#day").value);
    // method to filter the users birthday
    app.checkCapricorn(month, day);

}

// method to check if the users birthday is in January before Jan 20th
app.checkCapricorn = (userMonth, userDay) => {

    // conditional if users birthday is in January before Jan 20th
    if (userMonth === 0 && userDay < 20) {
        // constructor builds users birthday into correct format add's one year to the current year (2023 + 1 = 2024)
        userDate = new Date(app.currentYear + 1, userMonth, userDay);
        // call Star Sign Array compare
        app.getStarSign(userDate);

    } else {
        // constructor builds users birthday into correct format
        userDate = new Date(app.currentYear, userMonth, userDay);
        // call Star Sign Array compare
        app.getStarSign(userDate);
    }
};

// Method to compare users birthday with star sign array
app.getStarSign = (date) => {
    console.log('array length', app.starSignArr.length);
    for (let i = 0; i < app.starSignArr.length; i++) {
        if (date >= app.starSignArr[i].start && date <= app.starSignArr[i].end) {
            app.apiSign = app.starSignArr[i].sign;

            // call API fetches using users star sign
            app.getHoroscopeYesterday();
            app.getHoroscopeToday();
            app.getHoroscopeTomorrow();
            app.changeSign();
            setTimeout(function () {
                app.signsViewSection.style.display = 'none';
                app.horoscopeSection.style.display = 'block';
                app.backButton.style.visibility = 'visible';
                app.backButton.style.opacity = '1';
                app.horoscopeSection.style.opacity = '1';
            }, 250);
        }
    }
}

// API fetch to get users horoscope for today
app.getHoroscopeToday = () => {
    const url = new URL(app.apiURL);
    url.search = new URLSearchParams({
        sign: app.apiSign,
        day: 'today'
    });

    fetch(url, { method: 'POST' })
        .then((response) => {
            if (response.ok === true) { 
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then((jsonResult) => {

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

// API fetch to get users horoscope for yesterday
app.getHoroscopeYesterday = () => {
    const url = new URL(app.apiURL);
    url.search = new URLSearchParams({
        sign: app.apiSign,
        day: 'yesterday'
    });

    fetch(url, { method: 'POST' })
        .then((response) => {
            if (response.ok === true) {
                return response.json();
            } else {
                throw new Error(response.statusText); // 
            }
        })
        .then((jsonResult) => {

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

// API fetch to get users horoscope for tomorrow
app.getHoroscopeTomorrow = () => {
    const url = new URL(app.apiURL);
    url.search = new URLSearchParams({
        sign: app.apiSign,
        day: 'tomorrow'
    });

    fetch(url, { method: 'POST' })
        .then((response) => {
            if (response.ok === true) {
                return response.json();
            } else {
                throw new Error(response.statusText); // 
            }
        })
        .then((jsonResult) => {

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

// hover effects for sign buttons to display sign info
app.hovers = () => {
    // method to display sign info when user mouseovers symbol
    // if screen is big
    if (app.width > 960) {
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
}

// method to change back to the sign button selection screen
app.changeSign = () => {
    app.backButton.addEventListener('click', function () {
        app.backButton.style.opacity = '0';
        app.horoscopeSection.style.opacity = '0';
        app.apiSign = '';

        // gives opacity transition time, then switch views back
        setTimeout(function() {
            app.horoscopeSection.style.display = 'none';
            app.backButton.style.visibility = 'hidden';
            app.signsViewSection.style.display = 'block';
            app.signsViewSection.style.opacity = '1';
            
            // default to today, remove open from yesterday and tomorrow (for big screens)
            if (app.width > 960) {
                const today = Array.from(app.today);
                today.forEach((item) => {
                    item.classList.add('open');
                })

                const yesterday = Array.from(app.yesterday);
                const tomorrow = Array.from(app.tomorrow);
                const remove = yesterday.concat(tomorrow);
                remove.forEach((item) => {
                    item.classList.remove('open');
                });
            }
        }, 250);
    });
}

// method for listening to which sign button was clicked
// method for eventlistener listening for when a star sign icon is clicked, thne pass that as a value to the api and change the screen to horoscope view
app.getSignButtons = () => {

    // iterate through all star sign icons
    app.signsButtons.forEach((button) => {

        // event listener to listen for a particular click on an icon
        button.addEventListener('click', function () {

            // store that icon's value in a variable
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
    // listen for each panel
    app.horoscopePanels.forEach((panel) => {
        const today = Array.from(app.today);
        const yesterday = Array.from(app.yesterday);
        const tomorrow = Array.from(app.tomorrow);
        const allOpen = today.concat(yesterday, tomorrow);

        // if window width is more than 960px
        if (app.width > 960) {
        panel.addEventListener('click', function () {
            // remove .open off for all panels and children
            allOpen.forEach((item) => {
                item.classList.remove('open');
                item.disabled = false;
            });

            // add .open to clicked panel
            this.classList.add('open');
            // if the button is already open, it should not be in tabbing order
            this.disabled = true;
            // add .open to clicked panel's children
            const panelChildren = Array.from(this.children);
            panelChildren.forEach((child) => {
                child.classList.add('open');
            });
        })
        // if screen is smaller, just display everything
        } else {
            allOpen.forEach((item) => {
                item.classList.add('open');
            });
        }
    });
}

app.init = () => {
    app.signsButtons = document.querySelectorAll('.signsButton');
    app.backButton = document.querySelector('#backButton');
    app.horoscopeSection = document.querySelector('.horoscopeViewSection');
    app.signsViewSection = document.querySelector('.signButtonSection');
    app.horoscopeBox = document.querySelector('.horoscopeView');
    app.horoscopePanels = document.querySelectorAll('.horoscopeFlex');
    app.apiFacts = document.querySelector('.apiFacts');

    app.apiImage = document.querySelector('.apiImage');
    app.apiSelection = document.querySelector('.apiSelection');
    app.apiDateRange = document.querySelector('.apiDateRange');
    app.apiCurrentDate = document.querySelector('.apiCurrentDate');

    // star sign chooser
    app.todaysDate = new Date();
    app.currentYear = app.todaysDate.getFullYear();
    app.openModal = document.querySelector("#choose");
    app.modal = document.querySelector("#modal");
    app.closeModal = document.getElementById("exit");
    app.enter = document.querySelector("#enter");

    app.starSignArr = [
        {
            sign: 'aries',
            start: new Date(app.currentYear, 2, 21), // march 21
            end: new Date(app.currentYear, 3, 19)
        }, //'april 19
        {
            sign: 'taurus',
            start: new Date(app.currentYear, 3, 20), // april 20
            end: new Date(app.currentYear, 4, 20)
        }, // may 20
        {
            sign: 'gemini',
            start: new Date(app.currentYear, 4, 21), // may 21
            end: new Date(app.currentYear, 5, 20)
        }, // june 20
        {
            sign: 'cancer',
            start: new Date(app.currentYear, 5, 21), // june 21
            end: new Date(app.currentYear, 6, 22)
        }, // july 22
        {
            sign: 'leo',
            start: new Date(app.currentYear, 6, 23), // july 23
            end: new Date(app.currentYear, 7, 22)
        }, // august 22
        {
            sign: 'virgo',
            start: new Date(app.currentYear, 7, 23), // august 23
            end: new Date(app.currentYear, 8, 22)
        }, // september 22
        {
            sign: 'libra',
            start: new Date(app.currentYear, 8, 23), // september 23
            end: new Date(app.currentYear, 9, 22)
        }, // october 22
        {
            sign: 'scorpio',
            start: new Date(app.currentYear, 9, 23), // october 23
            end: new Date(app.currentYear, 10, 21)
        }, // november 21
        {
            sign: 'sagittarius',
            start: new Date(app.currentYear, 10, 22), // november 22
            end: new Date(app.currentYear, 11, 21)
        }, // december 21
        {
            sign: 'capricorn',
            start: new Date(app.currentYear, 11, 22), // December 22
            end: new Date(app.currentYear + 1, 0, 19)
        },// January 19
        {
            sign: 'aquarius',
            start: new Date(app.currentYear, 0, 20), // january 20
            end: new Date(app.currentYear, 1, 18)
        }, // february 18
        {
            sign: 'pisces',
            start: new Date(app.currentYear, 1, 19), // february 19
            end: new Date(app.currentYear, 2, 20) // march 20
        }
    ];

    // today
    app.apiDescriptionToday = document.querySelector('.apiDescriptionToday');
    app.apiCompatibilityToday = document.querySelector('.apiCompatibilityToday');
    app.apiMoodToday = document.querySelector('.apiMoodToday');
    app.apiColorToday = document.querySelector('.apiColorToday');
    app.apiNumberToday = document.querySelector('.apiLuckyNumberToday');
    app.apiTimeToday = document.querySelector('.apiLuckyTimeToday');

    app.today = document.querySelectorAll('.today');

    // yesterday
    app.apiDescriptionYesterday = document.querySelector('.apiDescriptionYesterday');
    app.apiCompatibilityYesterday = document.querySelector('.apiCompatibilityYesterday');
    app.apiMoodYesterday = document.querySelector('.apiMoodYesterday');
    app.apiColorYesterday = document.querySelector('.apiColorYesterday');
    app.apiNumberYesterday = document.querySelector('.apiLuckyNumberYesterday');
    app.apiTimeYesterday = document.querySelector('.apiLuckyTimeYesterday');

    app.yesterday = document.querySelectorAll('.yesterday');

    // tomorrow
    app.apiDescriptionTomorrow = document.querySelector('.apiDescriptionTomorrow');
    app.apiCompatibilityTomorrow = document.querySelector('.apiCompatibilityTomorrow');
    app.apiMoodTomorrow = document.querySelector('.apiMoodTomorrow');
    app.apiColorTomorrow = document.querySelector('.apiColorTomorrow');
    app.apiNumberTomorrow = document.querySelector('.apiLuckyNumberTomorrow');
    app.apiTimeTomorrow = document.querySelector('.apiLuckyTimeTomorrow');

    app.tomorrow = document.querySelectorAll('.tomorrow');

    app.apiURL = 'https://aztro.sameerkumar.website';

    app.apiSign = ''; // based on user input

    app.width = window.innerWidth;

    app.submitUserDate();
    app.userBirthday();

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