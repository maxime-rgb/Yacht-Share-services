/*
* Usage
*/
/*
let opts = {
  date: // if you need another initial date state
  onDayClickCallback: //function to call after a day is clicked [returns object -> {selectedDays:timestamp }]
  urlToPost :// url to post the submit to
  onPostCallback://successfully called url after submitting [returns object]
  reservations:// json object with locations and reservation data defained below
										{
												locations:[
																		{
																			"id": 1,
																			"name": location_name,
																			"reservedTimes":[
																												`2020-05-25 19:10:59`,
																												`2020-05-25 10:20:59`,
																												`2020-05-25 23:30:59`
																											]
																		},
																		...
																	]
										}
	outputPrimary:
	outputSecondary:
	outputLocation:
};
var instance = new BookingCalendar(opts); // call calendar instance as such
*/
var BookingCalendar  = function(options){
    this.options           = options;
    this.selectedDays      = [];
    this.date              = this.options.date || new Date();
      this.currentYear       = this.date.getFullYear();
      this.currentMonth      = this.date.getMonth();
    this.currentDay        = this.date.getDate();
      this.primaryTime       = null;
      this.secondaryTime     = null;
      this.primaryLocationId   = null;
      this.secondaryLocationId = null;
      this.reservationData   = {};
      this.outputPrimary     = this.options.outputPrimary || ".calendar-booking-primary";
      this.outputSecondary   = this.options.outputSecondary || ".calendar-booking-secondary";
      this.outputLocationPrimary    = this.options.outputLocationPrimary || ".calendar-booking-location-primary";
      this.outputLocationSecondary  = this.options.outputLocationSecondary || ".calendar-booking-location-secondary";
    this.calendarContainer = document.querySelector('.calendar-container');
      this.calendarStep1     = this.calendarContainer.querySelector('.calendar-step1');
      this.calendarStep2     = this.calendarContainer.querySelector('.calendar-step2');
      this.calendarStep3     = this.calendarContainer.querySelector('.calendar-step3');
      this.calendarFooter    = this.calendarContainer.querySelector('.calendar-footer');
      this.locationPrimary   = this.calendarContainer.querySelector(".calendar-primary-location");
      this.locationSecondary = this.calendarContainer.querySelector(".calendar-secondary-location");
      this.calendarSubmit    = this.calendarContainer.querySelector('.submit');
      this.calendarReset     = this.calendarContainer.querySelector('.reset');
    this.nextBtn           = this.calendarContainer.querySelector('.calendar-container .next-month');
    this.prevBtn           = this.calendarContainer.querySelector('.calendar-container .prev-month');
    this.monthTitle        = this.calendarContainer.getElementsByClassName('calendar-month-title')[0];
    this.yearTitle         = this.calendarContainer.getElementsByClassName('calendar-year-title')[0];
    this.daysContainer     = this.calendarContainer.getElementsByClassName('calendar-days')[0];
    this.weekdaysContainer = this.calendarContainer.getElementsByClassName('weekdays')[0];
      this.daysShort    = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
      this.monthNames   = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                      ];
    //Set Default month name
    this.printWeekDays();
    this.setMonthName();
    this.setYearTitle();
    this.addListener(this.nextBtn, 'click', this.nextMonth);
    this.addListener(this.prevBtn, 'click', this.prevMonth);
      this.addListener(this.calendarSubmit, 'click', this.postData);
      this.addListener(this.calendarReset,'click', ()=>{
                  this.selectedDays = [];
                  this.primaryTime = null;
                  this.secondaryTime = null;
                  this.locationPrimary.length = 0;
                  this.locationSecondary.length = 0;
                  let days = this.calendarContainer.querySelectorAll("li[data-value]");
                  days.forEach((item)=>{item.classList.remove("active");});
                  this.scrollToStep(this.calendarStep1);
      });
  }
  
  BookingCalendar.prototype.getDaysInMonth = function() {
    return new Date(this.currentYear, this.currentMonth + 1 , 0).getDate(); 
  }
  
  BookingCalendar.prototype.createElement = function(element, className, data) {
      var el = document.createElement(element);
    className.forEach((item) => el.classList.add(item));
      el.innerHTML = data;
      return el;
  }
  
  BookingCalendar.prototype.onDayClick = function(event){
    //On Date click
    let el = event.target;
    let dayValue = parseInt(el.innerHTML);
    let tmpDateObj = new Date(this.currentYear,this.currentMonth, dayValue);
    let tmpDate = tmpDateObj.getTime();
      let locationsDiv = this.calendarContainer.querySelector(".calendar-locations");
      
    if(this.selectedDays.length == 2 && !this.selectedDays.includes(tmpDate)
      || tmpDateObj.getDay() === 0 || tmpDateObj.getDay() === 6 ){
       return;
    }
    
    this.currentDay = dayValue;
    //this.setCurrentDate();
    if(!this.selectedDays.includes(tmpDate)){
          this.selectedDays.push(tmpDate);
          el.classList.add('active'); 
     }else{
         this.selectedDays.splice(this.selectedDays.indexOf(tmpDate),1);
         el.classList.toggle('active');
     }
  
      if(this.selectedDays.length == 2){
              this.scrollToStep(this.calendarStep2);		
      }
        
      this.showLocationStep();
    //Run callback function if any
    if(this.options.onDayClickCallback && typeof(this.options.onDayClickCallback) === "function")
        this.options.onDayClickCallback({selectedDates: this.selectedDays});
  }
  
  BookingCalendar.prototype.setCurrentDate = function(){
    this.date = new Date(this.currentYear,this.currentMonth,this.currentDay);
  }
  
  BookingCalendar.prototype.getFirstDayOfWeek = function(){
    return new Date(this.currentYear, this.currentMonth, 0).getDay();
  }
  
  BookingCalendar.prototype.printWeekDays = function(){
    for(var i=0; i < this.daysShort.length; i++){
        this.weekdaysContainer.innerHTML += `<li>${this.daysShort[i]}</li>`;
    }
  }
  
  BookingCalendar.prototype.printDays = function(){
    //print blank days for previous month
      for(let i=0; i <= this.getFirstDayOfWeek(); i++){
            let el = this.createElement('li', ['blank', 'day'], '--');
            this.addElement(this.daysContainer,el);
      }
    
    let tmpDateObj1 = new Date(this.selectedDays[0]);
    let tmpDateObj2 = new Date(this.selectedDays[1]);
    let tmpDate1 = tmpDateObj1.getDate();
    let tmpDate2 = tmpDateObj2.getDate();
    let tmpMonth1 = tmpDateObj1.getMonth();
    let tmpMonth2 = tmpDateObj2.getMonth();
    let tmpYear1  = tmpDateObj1.getFullYear();
    let tmpYear2  = tmpDateObj2.getFullYear();
    
    //Print days of current month
     for(let i=1; i <= this.getDaysInMonth(); i++){
            let el = this.createElement('li', ['day'], i);
                       el.dataset.value = i;
            this.addListener(el,'click',this.onDayClick);
            this.addElement(this.daysContainer,el);
       ///Only highlight days that are in the current month that was selected
           if(tmpDate1 === i && this.currentMonth === tmpMonth1 && this.currentYear === tmpYear1 ||
              tmpDate2 === i && this.currentMonth === tmpMonth2 && this.currentYear === tmpYear2){
                el.classList.add('active');
              }
      }
    
    //Add blank squares after last date if not ending on a saturday
      
  } 
  
  BookingCalendar.prototype.setMonthName = function(){
    this.monthTitle.innerHTML = this.monthNames[this.currentMonth];
  }
  
  BookingCalendar.prototype.setYearTitle = function(){
    this.yearTitle.innerHTML = this.currentYear;
  }
  
  BookingCalendar.prototype.clearDays = function(){
    this.daysContainer.innerHTML = "";
  }
  
  BookingCalendar.prototype.addElement = function(parent, el){
    parent.appendChild(el); 
  }
  
  BookingCalendar.prototype.addListener = function(el, eventType ,func){
    el.addEventListener(eventType, func.bind(this));
  }
  
  BookingCalendar.prototype.removeListener = function(el){
    let new_element = el.cloneNode(true);
      el.parentNode.replaceChild(new_element, el);
  }
  
  BookingCalendar.prototype.nextMonth = function(){
    this.currentMonth++;
    if(this.currentMonth > 11){
            this.currentMonth = 0;
        this.currentYear++;
    }
    this.setCurrentDate();
    this.setMonthName();
    this.setYearTitle();
    this.clearDays();
    this.printDays();
  }
  
  BookingCalendar.prototype.prevMonth = function(){
    this.currentMonth--;
    if(this.currentMonth < 0){
         this.currentMonth = 11;
        this.currentYear--;
    }
    this.setCurrentDate();
    this.setMonthName();
    this.setYearTitle();
    this.clearDays();
    this.printDays();
  }
  
  BookingCalendar.prototype.getDateObj = function(){
    return new Date(this.currentYear, this.currentMonth,this.currentDay);
  }
  
  BookingCalendar.prototype.postData = function(){
    //Post data to server
      let primaryDate = new Date(this.selectedDays[0]);
      let secondaryDate = new Date(this.selectedDays[1]);
      let tmpDateObj = this.parseTimeToDateObj(this.primaryTime);
          
  primaryDate.setHours(tmpDateObj.getHours(),tmpDateObj.getMinutes(),0);
      tmpDateObj = this.parseTimeToDateObj(this.secondaryTime);
      secondaryDate.setHours(tmpDateObj.getHours(),tmpDateObj.getMinutes(),0);
      document.querySelector(this.outputPrimary).value = primaryDate.toLocaleString('en-us');
      document.querySelector(this.outputSecondary).value = secondaryDate.toLocaleString('en-us');
      document.querySelector(this.outputLocationPrimary).value = this.primaryLocationId;
      document.querySelector(this.outputLocationSecondary).value = this.secondaryLocationId;
      this.scrollToStep(document.querySelector(".output"));
  }
  
  BookingCalendar.prototype.showTimeStep = function(){
    //Toggle visibility of time step here
      let timeFormat = {"timeStyle":"short","hour12": true,"minute": "2-digit","hour":"2-digit"};
    let startTime = new Date(2020,01,01,9,0,0); // 9am
      let endTime = new Date(2020,01,01,16,0,0);  // 4pm
      let inc = 1000 * 60 * 10 ; //milliseconds/seconds/minutes/hours
      let optionList = this.calendarContainer.querySelector(".calendar-time-primary");
      let optionList2 = this.calendarContainer.querySelector(".calendar-time-secondary");
      let confirmTimeBtn = this.calendarContainer.querySelector(".calendar-confirm-time");
      optionList.length = 0;
      optionList2.length = 0;
      
      let availableTimes = [];
      let reservedTimes = [];
      let allTimes = [];
  
      //populate all times that are allowed
      while(startTime < endTime){
                  allTimes.push(startTime.toLocaleString('en-US',timeFormat));
                  startTime.setMinutes(startTime.getMinutes() + 10);
                  }
      
      //populate all blocked time slots
      this.options.reservations.locations.forEach((item)=>{
                  item["reservedTimes"].forEach((time)=>{
                          reservedTimes.push(new Date(time).toLocaleString('en-US',timeFormat));
                  });
          });
                  
      
      //Filter blcoked times
      availableTimes = allTimes.filter((element)=>{
                  return !reservedTimes.includes(element);
          });
          
      
      
           availableTimes.forEach((time)=>{		
                  optionList2.add(new Option(time, time));
                optionList.add(new Option(time, time));
           });
      
          this.addListener(confirmTimeBtn,'click', ()=>{
                                                  this.primaryTime = optionList.value;
                                                  this.secondaryTime = optionList2.value;
                                              this.scrollToStep(this.calendarFooter);
                                          });
      return;
  }
  
  BookingCalendar.prototype.showLocationStep = function(){
    //Toggle visibility of location step here
      let continueBtn = this.calendarContainer.querySelector(".calendar-confirm-locations");
      this.locationPrimary.length = 0;
      this.locationSecondary.length = 0;
  
      this.options.reservations.locations.forEach((location)=>{
                          this.locationPrimary.add(new Option(location.name,location.id));
                          this.locationSecondary.add(new Option(location.name,location.id));
              });
  
      this.addListener(continueBtn,'click',()=>{
                          this.scrollToStep(this.calendarStep3);
                          this.primaryLocationId = this.locationPrimary.value;
                          this.secondaryLocationId = this.locationSecondary.value;
                          this.showTimeStep();
                      });
  }
  
  BookingCalendar.prototype.scrollToStep = function(element){
                  window.scrollTo({
                      top: element.offsetTop,
                      left: 0,
                      behavior: 'smooth'
                  });
  }
  
  BookingCalendar.prototype.getReservationData = function(){
      let primaryDate = new Date(this.selectedDays[0]);
      let secondaryDate = new Date(this.selectedDays[1]);
      let tmpDateObj = new Date();
      tmpDateObj.setTime(this.primaryTime);
      primaryDate.setHours(tmpDateObj.getHours(),tmpDateObj.getMinutes(), 0);
      tmpDateObj.setTime(this.secondaryTime);
      secondaryDate.setHours(tmpDateObj.getHours(),tmpDateObj.getMinutes(), 0);
      this.reservationData["reservations"] = [
                                                                                          {
                                                                                              locationId: this.primaryLocationId,
                                                                                              testDate: primaryDate.toLocaleString('en-us')
                                                                                          },
                                                                                          {
                                                                                              locationId: this.secondaryLocationId,
                                                                                              testDate: secondaryDate.toLocaleString('en-us')
                                                                                          }
                                                                              ];
      return this.reservationData;
  }
  
  BookingCalendar.prototype.parseTimeToDateObj = function(time){
      let regexp = /\d?\d:\d\d/;
      let tmpTime = time.match(regexp)[0];
  
          let tmpHour = tmpTime.split(":")[0];	
        let tmpMinute = tmpTime.split(":")[1]
          
          return new Date(`1970-01-01 ${tmpTime}:00`);
  } 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  function apiCall(){
      let timeArr = { locations: [] };
          for(let h=0;h < 15;h+=1){
              
                  timeArr.locations.push(
                                                  {
                                                      "id": `${h}`,
                                                      "name": `Depot ${h}`,
                                                      "reservedTimes":[
                                                                                       '5/26/2020 10:40:00 AM',
                                                                                       '5/22/2020 12:20:00 PM',
                                                                                       '5/21/2020 03:40:00 PM'
                                                                                      ]
                                                  }
                                          ); 
          }
      return timeArr;
  }
  
  
  //setup options
  let reservations = apiCall();
  let opts = {
    date: new Date(),
    onDayClickCallback: (obj) => { console.log(obj.selectedDates); },
    onPostCallback: (data) => { console.log(data); },
    reservations: reservations
      
  };		    
  
  
  //Initialize calendar
  let book = new BookingCalendar(opts);
  book.printDays();
  book.parseTimeToDateObj("9:00 AM ");
  
  
  
  
  //console.log(document.querySelector("input[name='ampm-primary']").value);
  
  //console.log("B " + new Date(2020, 4, 25,7,7,0).toString());
  //"5/25/2020 1:26:04 PM"
  
  // Parse from C#
  /*console.log(new Date("	2020-05-25 19:38:59").getDate());
  console.log(new Date("	2020-05-25 19:38:59").getMonth());
  console.log(new Date("	2020-05-25 19:38:59").getFullYear());
  console.log(new Date("2020-05-25 19:38:59").getHours() % 12 || 12);
  console.log(new Date("	2020-05-25 19:38:59").getMinutes());
  console.log(new Date("	2020-05-25 19:38:59").getHours() > 12? "PM" : "AM");
  
  
  */  