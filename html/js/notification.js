///Disclaimer: this is only a demonstration of a possible teknique, this code is written for brevity to convey a principle not as an example of best practice


//a place to store all notifications
let notifications = [];
try{
  // try to get a list of notifications from localStorage
  notifications = JSON.parse(localStorage.myNotifications||`[]`);
}
catch(e){
  notifications = [];
}


//Method to convert a JS date to ISO8601 date string
const jsDateToISO = date =>`${date.getFullYear()}-${(1+date.getMonth()+'').padStart(2,'0')}-${(date.getDate()+'').padStart(2,'0')}`;
//Today as ISO date string
const today = jsDateToISO(new Date());
//Set datepicker to today
notifydate.value=today;
//method to get all current notifications, using js filter function
const getNotifications =(strISODate)=>notifications.filter(o=>o.notifyDate===strISODate);

/// Shows an alert (hello 1999 style js) for each notifications scheduled for today
//getNotifications(today).forEach(notification=>alert(notification.msg));

function showNotifications(){
  ulNotifications.innerHTML='';
  let notifyCnt=0; 
  getNotifications(today).forEach((notification, index)=>{
    notifyCnt++;
    const li = document.createElement('li');
    li.innerHTML = `"${notification.msg}"`;
    ulNotifications.appendChild(li);
  });
  if(notifyCnt>0){
    document.body.className='show-notifications';
  }
}



//Add a notification and save it to localstorage
// this is a no-no in real world UI :-)
btnAddNotification.onclick=_=>{
  const jsDate = new Date(notifydate.value);
  notifications.push({
    notifyDate:jsDateToISO(jsDate),
    msg:txtNotifyMsg.value
  });
  saveNotificationsToLocalStorage();
  txtNotifyMsg.value='';
  renderNotifications();
};

//Method to serialize ans save data to local storage
function saveNotificationsToLocalStorage(){
  localStorage.myNotifications=JSON.stringify(notifications);
}

//Delete notification - UI helper
function deleteNotification(idx){
  notifications.splice(idx,1);
  saveNotificationsToLocalStorage();
  renderNotifications();
}

// render the notifications - UI helper
function renderNotifications(){
  ulAllNotifications.innerHTML='';
  notifications.forEach((notification, index)=>{
    const li= document.createElement('li');
    li.innerHTML = `<a href="javascript:deleteNotification(${index});void 0">Delete</a> <span>${notification.notifyDate}</span> - "${notification.msg}"${notification.notifyDate===today?' - <b>Shown today</b>':''}`;
    ulAllNotifications.appendChild(li);
  });
}
//Render notifications on load
renderNotifications();
//Show notifications (if any)
showNotifications();
