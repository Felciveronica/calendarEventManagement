const daysTag = document.querySelector(".days"),
      currentYear = document.querySelector(".current-year"),
      outer = document.querySelector(".outer");

    //prevNextIcon = document.querySelectorAll(".icons span");
    let month_picker = document.querySelector('#month-picker');

    // getting new date, current year and month
    let date = new Date(),
      currYear = date.getFullYear(),
      currMonth = date.getMonth();

    // storing full name of all months in array
    const months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];




    month_picker.onclick = () => {
      month_list.classList.remove('hideonce');
      month_list.classList.remove('hide');
      month_list.classList.add('show');

    };

    let month_list = outer.querySelector('.month-list');
    months.forEach((e, index) => {
      let month = document.createElement('div');
      month.innerHTML = `<div>${e}</div>`;

      month_list.append(month);
      month.onclick = () => {
        currMonth = index;
        renderCalendar(currMonth, currYear);
        month_list.classList.replace('show', 'hide');

      };
    });
    (function () {
      month_list.classList.add('hideonce');
    })();

    // create calender 
    const renderCalendar = (currMonth, currYear) => {
      let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
      // getting last date of previous month
      currentYear.innerText = `${currYear}`;
      month_picker.innerText = months[`${currMonth}`];
      //${months[currMonth]} 
      if (currMonth < 10) { currMonth = "0" + currMonth }
      let liTag = "";

      for (let i = firstDayofMonth; i > 0; i--) {
        // creating li of previous month last days

        liTag += `<li class="inactive" data-date="${currYear}-${currMonth}-${lastDateofLastMonth - i + 1}">${lastDateofLastMonth - i + 1}</li>`;
      }
      currMonth = parseInt(currMonth)
      let thismonth = currMonth === new Date().getMonth()
        && currYear === new Date().getFullYear() ? 1 : 0;
      console.log("this month" + thismonth)
      currMonth = currMonth + 1
      if (currMonth < 10) { currMonth = "0" + currMonth }
      for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        //let isToday = i === date.getDate() && currMonth-1 === new Date().getMonth()
        //&& currYear === new Date().getFullYear() ? "active" : "";
        let isToday = thismonth && i === date.getDate() ? "active" : "";
        if (i < 10) {
          liTag += `<li class="${isToday}"  data-date="${currYear}-${currMonth}-0${i}" >${i}</li>`;
        }
        else {
          liTag += `<li class="${isToday}"  data-date="${currYear}-${currMonth}-${i}" >${i}</li>`;
        }
      }
      currMonth = parseInt(currMonth)
      currMonth = currMonth + 1
      if (currMonth < 10) {
        currMonth = "0" + currMonth

      }


      for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive"  data-date="${currYear}-${currMonth}-0${i - lastDayofMonth + 1}">${i - lastDayofMonth + 1}</li>`
      }

      // passing current mon and yr as currentDate text
      daysTag.innerHTML = liTag;
    }

    renderCalendar(currMonth, currYear);

    document.querySelector('#pre-year').onclick = () => {
      --currYear
      renderCalendar(currMonth, currYear);
    };
    document.querySelector('#next-year').onclick = () => {
      ++currYear
      renderCalendar(currMonth, currYear);
    };

    daysTag.addEventListener('click', function (event) {
      if (event.target.tagName === 'LI') {

        const date = event.target.dataset.date;
        console.log("yay" + date)
        // Call your JavaScript function here

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {

            var outputElement = document.querySelector('.panel');
            if (outputElement) {
              if (xhr.status === 200) {
                console.log("got it" + xhr.responseText)
                outputElement.innerHTML = xhr.responseText;
              } else {
                console.error('Request failed: ' + xhr.status);
              }
            } else {
              console.error('Output element not found');
            }
          }
        };

        xhr.open('GET', 'https://localhost/phpfile.php?id=' + date, true);
        xhr.send();
      }
    });


    function deleteevent(id)
    {console.log("---------------id="+id);
    $.ajax({
    type: "POST",
    url: "deleteevent.php",
    data: { event_id: id },
    success: function(response) {
      alert(response); // Display success message or handle response
    },
    error: function(xhr, status, error) {
      console.error(xhr.responseText); // Log error message
    }
  });
    }
function edit(eid)
{console.log("edit request");
const modal=document.querySelector(".editmodal")
modal
var xhr1 = new XMLHttpRequest();
        xhr1.onreadystatechange = function () {
          if (xhr1.readyState === XMLHttpRequest.DONE) {

            
              if (xhr1.status === 200) {
                console.log("got it" + xhr1.responseText)
                const outputmy = xhr1.responseText;
              } else {
                console.error('Request failed: ' + xhr1.status);
              }
          
          }
        };

        xhr1.open('GET', 'https://localhost/editphp.php?id=' + eid, true);
        xhr1.send();



}


   