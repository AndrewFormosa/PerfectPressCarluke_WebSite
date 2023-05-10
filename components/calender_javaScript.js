 //Create the calander detail.
    //all dates must be in DD/MM/YYYY format.
     //SET UP WEEKLY DETAILS
     const regularClosedDays = [0];//Set days closed where 0-6 is Monday - Saturday.
     const specialClosedDays = ['8/5/2023']; //Set special P/P holidays that are comming up.
 
     
     //use Lead timmes and Holiday details
     const ironLeadTimes=[0,4,4,5,5,5,5];//must be 7 long
     const dcLeadTimes=[0,4,3,7,6,5,4];//must be 7 long
     const altLeadTimes=[0,7,7,7,7,7,7];//must be 7 long
     const ironHolidays=[['8/5/2023','9/5/2023','9/5/2023']];
     const dcHolidays=[['8/5/2023','9/5/2023','9/5/2023']];
     const altHolidays=[['8/5/2023','9/5/2023','9/5/2023']];
     //stating next long holiday
     //2d array - array of holiday exeptions. is exepction has three dates init. 
     //if the return date is between the first two dates then make return date last one.
 
 
 
     const dayInMS = 24*60*60*1000; //1 day in ms
     const today = new Date(); //current date
     var viewedMonth=today.getMonth();
     var viewedYear=today.getFullYear();
     var dayListDetails=[]
     var selectedDate = null;
     var readyDateCell=null;
     
     
     const serviceElement=document.getElementById('service');
     console.log("service:"+serviceElement.value);
     const informationElement=document.getElementById('information');
     
     const mydate = dateObjectFromUKDate('23/1/23');
         console.log(returnDateNumber(mydate));
     
     //DATE CONVERSIONS
     console.log("test:"+mydate.toDateString());
     console.log("test:"+mydate.toLocaleDateString('en-GB',{weekday:"long"}));
     console.log("test:"+mydate.toLocaleDateString('en-GB',{month:"long"}));
     console.log("test:"+mydate.getDate());//date in month ie 23
 
     function renderCalendar(){
     var calendarBody = document.getElementById("calendar").getElementsByTagName("tbody")[0];
     var monthLabel = document.getElementById("currentMonth");
     monthLabel.innerHTML=(firstDateObjectOfTheMonth(viewedMonth,viewedYear).toLocaleDateString('en-GB',{month:"long",year:"2-digit"}));
 
  // Clear the calendar
  calendarBody.innerHTML = ""
     
 
         //get the date object for the first day showing on that month's calendar which would be a sunday.
     const firstSundayDateObject= addDaysToDate(firstDateObjectOfTheMonth(viewedMonth,viewedYear),(0-firstDateObjectOfTheMonth(viewedMonth,viewedYear).getDay()));
     console.log(firstDateObjectOfTheMonth(viewedMonth,viewedYear));
     console.log(firstSundayDateObject);
     var calanderDate=new Date(firstSundayDateObject);
     for (var i = 0; i < 7; i++) { //increase size of calander to allow second month
         var row = document.createElement("tr");
         for (var weekday = 0; weekday < 7; weekday++) {
           var cell = document.createElement("td");
           cell.id=ukDateFromDateObject(calanderDate);
             cell.appendChild(document.createTextNode(calanderDate.getDate()));         
             if(cell.id==ukDateFromDateObject(today)){
                 cell.classList.add('today');
             }
 
             //grey for other month days
             if(viewedMonth!=calanderDate.getMonth()){
                 cell.classList.add('other_month');
             }else if(specialClosedDays.includes(ukDateFromDateObject(calanderDate)))   
             {
                 //red for special closed days
                 cell.classList.add('closed');
             }else if (regularClosedDays.includes(calanderDate.getDay())){
 
              //red for weekly closed days
           
                 cell.classList.add('closed');
             }else if(calanderDate.getMonth()!=today.getMonth()||calanderDate.getFullYear()>today.getFullYear() || (calanderDate.getMonth()==today.getMonth()&&calanderDate.getDate()>=today.getDate())){            
             //make the cell selectable
             cell.classList.add('selectable');
                 cell.addEventListener("click", selectDay);  
             }
 
 
           
            
             //cellid=
             //Other opeations on cell
             calanderDate = addDaysToDate(calanderDate,1);
             //calanderDate.setDate(calanderDate.getDate() +1);    
 
           row.appendChild(cell);
         }
          calendarBody.appendChild(row);
       }
     }
    
     function selectDay() {
 
       var service=serviceElement.value;
       if(service>0){ 
   
 
       if (selectedDate != null) {
         selectedDate.classList.remove("selected");
         console.log("oo");
         //document.getElementById(readyDate).classList.remove("ready");
       }  
       if (readyDateCell != null) {
         readyDateCell.classList.remove("ready");
         console.log("oo");
         //document.getElementById(readyDate).classList.remove("ready");
       }  
 
       var leadTimes;
       var holidays;
       var serviceName;
       
       if(service==1){
         serviceName='ironing';
         leadTimes=ironLeadTimes;
         holidays=ironHolidays;
       }
       if(service==2){
         serviceName='dry cleanning or laundry';
         leadTimes=dcLeadTimes;
         holidays=dcHolidays;
       }
       if(service==3){
         serviceName='alterations';
         leadTimes=altLeadTimes;
         holidays=altHolidays;
       }
 
       console.log("serv:"+service);
       selectedDate = this;
       selectedDate.classList.add("selected");
       console.log("select");
       //document.getElementById("selectedDay").innerHTML = currentDate.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"}) + ": " + selectedDate.innerHTML;
 
       //set ready date
       var selectedDateObject=dateObjectFromUKDate(selectedDate.id);
       var index = selectedDateObject.getDay();
       console.log(index);
       var leadTime=leadTimes[index];
       console.log("lt:"+leadTime);
       var readyDateObject=addDaysToDate(selectedDateObject,leadTime);
       var readyDateTime=readyDateObject.getTime();
       var readyDateString = ukDateFromDateObject(readyDateObject);
 
     //chech if ready date is in holidays
       holidays.forEach(element => {
         var holidayStartTime=dateObjectFromUKDate(element[0]).getTime()-1000;
         var holidayFinishTime=dateObjectFromUKDate(element[1]).getTime();
         if(readyDateTime>holidayStartTime && readyDateTime<holidayFinishTime){
             readyDateString=element[2];
         }
       });
 
       //console.log(selectedDate.id+" , "+readyDate);
       informationElement.style="background:white";
       var informationText="If you drop off your "+serviceName+" on the <b>"+selectedDate.id+"</b>. Then we will aim to have it ready to collect on the <b>"+readyDateString+"</b>.";
 
      
       informationElement.innerHTML=informationText;
       readyDateCell = document.getElementById(readyDateString)
       readyDateCell.classList.add("ready");
       }else{
         informationElement.style="background:yellow";
         informationElement.innerHTML="Please select a service from the drop down menu above the calendar. Then select a drop-off date from the calendar and the date on which your items should be ready will be highlighted in green.";
       }
 
 
     }   
 
 
     function addDaysToDate(dateObject,noOfDays){
         dateObject.setDate(dateObject.getDate() +noOfDays);  
         return dateObject;
     }
 
     function firstDateObjectOfTheMonth(month,year){
         return new Date(month+1+'/1/'+year);
     }
 
 
 
     function dateObjectFromUKDate(ukDateString){  
         parts=ukDateString.split('/');
         usDateString = parts[1]+"/"+parts[0]+"/"+parts[2];
         dateObject=new Date(usDateString);
         return dateObject;
     }
 
     function ukDateFromDateObject(dateObject){
         ukDateString = dateObject.getDate()+"/"+(dateObject.getMonth()+1)+"/"+dateObject.getFullYear();
         return ukDateString;
     }
 
 
     function nextMonth() {
         viewedMonth++;
         if(viewedMonth>11){viewedYear++;viewedMonth=0;}
         renderCalendar();
     }
 
     function previousMonth() {
         if(viewedMonth>today.getMonth()||viewedYear>today.getFullYear())
         {
             viewedMonth--;
             if(viewedMonth<0){viewedYear--;viewedMonth=11;}
             renderCalendar();
         }
     }
 
     function returnDateNumber(dateObject){
         return dateObject.toLocaleDateString('en-GB',{month:"long",year:"2-digit"});
     }
 
 
     renderCalendar();