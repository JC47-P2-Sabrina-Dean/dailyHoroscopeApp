const app = {};

app.enterBirthday = () => {
    app.openModal.addEventListener("click", () => {
        app.modal.showModal();
    });
}

app.handleClick = function(event) {
    event.preventDefault();
    modal.close();
    // find the value of the month select and store in a variable
    let month = Number(document.querySelector("#month").value);
    // find the value of the day select and store in a variable 
    let day = Number(document.querySelector("#day").value);
    let monthDay = new Date(app.currentYear, month, day);
    app.getStarSign(monthDay);
    console.log('getStarSign',monthDay);

    // switch to other page
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

app.submitUserDate = () => {
    app.enter.addEventListener("click", app.handleClick);
}

// Method to compare users birthday with star sign array
app.getStarSign = (date) => {
    console.log('array length', app.starSignArr.length);
    for (let i = 0; i < app.starSignArr.length; i++) {
        if (date >= app.starSignArr[i].start && date <= app.starSignArr[i].end) {
            app.apiSign = app.starSignArr[i].sign;
            console.log(app.apiSign);
        } else {
            // hard coded as the default if error
            app.apiSign = 'Capricorn';
        }
    }
}

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
            });

            // add .open to clicked panel
            this.classList.add('open');
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

    // star sign chooser
    app.todaysDate = new Date();
    app.currentYear = app.todaysDate.getFullYear();
    app.openModal = document.querySelector("#choose");
    app.modal = document.querySelector("#modal");
    const closeModal = document.querySelector("#yes");
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
    app.enterBirthday();

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