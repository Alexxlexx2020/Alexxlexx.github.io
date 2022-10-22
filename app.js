//----------------база данных в массиве по месяцам и дням месяца находится в файле database.js ---------------------------------------------------------

// ---------------------------- функция формирования блока одного месяца календаря конкретного года и вставки в элемент elem --------------------
function createCalendar(year, month, elem) {
    let days = [];
    let myDate = new Date(year, month, 1);
    let myDay;
    let Month1 = [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь",
    ];
    for (let i = 1; i < 33; i++) {
        let curDate = new Date(year, month, i);
        if (curDate.getDay() == 0) {
            myDay = 6
        } else {
            myDay = curDate.getDay() - 1
        }
        if (curDate.getMonth() == myDate.getMonth()) {
            days[i] = myDay;
        } else break
    }
    let Table = document.createElement('table');
    let Thead = document.createElement('thead');
    let Tbody = document.createElement('tbody');
    Table.className = "ClassCalendar";
    Table.append(Thead);
    Table.append(Tbody);
    Table.insertAdjacentHTML("afterbegin", `<caption>${Month1[month].toUpperCase()}</caption>`)
    Thead.insertAdjacentHTML("afterbegin", `<tr><th>пн.</th><th>вт.</th><th>ср.</th><th>чт.</th><th>пт.</th><th class="wday">сб.</th><th class="wday">вс.</th></tr>`);
    document.getElementById(elem).append(Table);

    Table.id = "calendar." + month;
    Table.classList.add('table_style');
    let i1 = 0;
    let z;

    for (let i = days[1]; i < days[1] + days.length; i++) {
        i1++;
        let y1 = Math.floor(i / 7);
        let x1 = i - y1 * 7;
        if (days[i1] != undefined) {
            if (y1 != z) {
                Tbody.insertAdjacentHTML("beforeend", "<tr><td></td><td></td><td></td><td></td><td></td><td class = 'celebrate'></td><td class = 'celebrate'></td></tr>");
                z = y1
            }
            Table.rows[y1 + 1].cells[x1].innerHTML = i1;
            Table.rows[y1 + 1].cells[x1].classList.add('date_no_empty');
            if (massive[month][i1 - 1] != undefined) {
                if (massive[month][i1 - 1].indexOf('<img class = "photo"') != -1) {
                    Table.rows[y1 + 1].cells[x1].classList.remove('date_no_empty');
                    Table.rows[y1 + 1].cells[x1].classList.add('td_full')
                }
            };
            let Date1 = new Date(year, month, i1);
            if (Date1.getDate() == new Date().getDate() && Date1.getMonth() == new Date().getMonth() && Date1.getFullYear() == new Date().getFullYear()) {
                Table.rows[y1 + 1].cells[x1].style.backgroundColor = "#9ACD32";
            }
        } else break
    }
}

// ----------------- функция запуска и вставки часов в элемент elem ---------------------------------
function myTime(elem) {
    let month2 = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];
    elem.insertAdjacentHTML("afterbegin",
        `<div id="clock"><span class="spanH"></span><span class="spanX">:</span><span class="spanM"></span><span class="spanX">.</span><span class="spanS"></span><span></span><br><span class="current_date"></span></div>`);

    function timeCalc() {
        let h1 = new Date().getHours();
        let m1 = new Date().getMinutes();
        let s1 = new Date().getSeconds();
        if (m1 < 10) m1 = '0' + m1;
        if (s1 < 10) s1 = '0' + s1;
        for (let i of document.getElementsByClassName('spanH')) {
            i.innerHTML = h1;
        };
        for (let i of document.getElementsByClassName('spanM')) {
            i.innerHTML = m1;
        };
        for (let i of document.getElementsByClassName('spanS')) {
            i.innerHTML = s1;
        };
        document.getElementsByClassName("current_date")[0].innerHTML = new Date().getDate() + "  " + month2[new Date().getMonth()] + " " + new Date().getFullYear();
    }
    timeCalc();
    setInterval(timeCalc, 1000);
}

function startCalendar(year) {
    mess.style.display = "none";
    document.getElementById('allArea').innerHTML = ``;
    document.getElementById('allArea').innerHTML = `<div id = "container"></div>`;
    for (let month = 0; month < 12; month++) {
        createCalendar(year, month, 'container')
    }

    let month2 = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];

    // ----------------------------обработка клика по таблице ----------------------------------
    document.getElementById('allArea').addEventListener("click", function f333(event) {
        let xClick = event.clientX;
        let yClick = event.clientY;
        let elem1 = document.elementFromPoint(xClick, yClick);
        if (elem1.tagName == "TD" && elem1.innerText != "") {
            event.stopPropagation();
            let t1 = "<div class = 'no_info'><br>  *Нет информации по этой дате.*  </div>";
            let massiveMonth = +elem1.parentNode.parentNode.parentNode.id.split(".")[1];
            let massiveDate = elem1.innerText - 1;
            if (massive[massiveMonth][massiveDate] != undefined)
                t1 = massive[massiveMonth][massiveDate];
            // elem1.insertAdjacentElement("beforeend", mess);
            let oldYear = "-";
            let innerName = " ";
            if (t1.indexOf('.jpg') != -1) {
                oldYear = document.getElementById('inputka').value - t1.slice(t1.indexOf('. ') + 2, t1.indexOf('. ') + 6);
                innerName = t1.slice(32,(t1.indexOf('.jpg')));
            };
            if (isNaN(oldYear) || +oldYear < 0) oldYear = "-";
           
            mess1.innerHTML = "";
            mess1.innerHTML = `<div class = "text"><b>${elem1.innerText} ${month2[massiveMonth]}  ${document.getElementById('inputka').value} года, ${oldYear}</b></div>`;
                // `<div class = "text"><b>${elem1.innerText} ${month2[massiveMonth]}  ${document.getElementById('inputka').value} года, ${oldYear}</b></div>${t1}`;
                
            //---------- вставка в mess3 имени человека --------------
            // let nameMess = document.createElement('div'); 
            mess1.insertAdjacentElement("beforeend", closer_point);
            mess2.innerHTML = t1;
            mess3.innerText = innerName;

            //--------- проверка по ширине экрана комп или смартфон -------------
            // if (document.body.clientWidth >= document.body.clientHeight) {
            //     mess.classList.remove("mess_tel");
            //     mess.classList.remove("mess_comp");
            //     mess.classList.add('mess_comp');
            // } else {
            //     mess.classList.remove('mess_comp');
            //     mess.classList.remove("mess_tel");
            //     mess.classList.add('mess_tel');
            // }
            // document.getElementById('all').insertAdjacentElement("afterbegin", mess);
            document.getElementsByClassName('osnova')[0].insertAdjacentElement("afterbegin", mess);
            mess.style.display = "block";
        }

    })
}

// ------------------- функция запроса и записи погоды в массив data--------------------------------------------------
function Weather() {
    // let data = {};
    fetch('https://api.openweathermap.org/data/2.5/weather?id=710719&lang=ru&appid=ed7cbb7322e69c56dd6645d9c8ee8748').then(function (resp) {
            return resp.json()
        }).then(function (data) {
            //добавляем название города "lat":48.2864702,"lon":25.9376532
            document.getElementById("weather__city").innerHTML =
                data.name + ' ' + Math.round(data.main.temp - 273) + '°, ' + Math.round(data.main.pressure * 0.750062) + " мм.<br>" + data.weather[0]['description'];
                // + "/" + data.main.grnd_level;
            //data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
            //Добавляем иконку погоды
            document.getElementById('weather__icon').innerHTML = `<img class = "imageIcon" src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        })
        .catch(function () {
            // Обрабатываем ошибки при загрузке погоды
            document.getElementById("weather__city").innerHTML = "ошибка загрузки погоды"
        });
}

// ----------------- создание окна mess с данными по человеку или дате ---------------------------------------
let mess = document.createElement('div');
mess.id = 'mess';
mess.style.display = "none";

let mess1 = document.createElement('div');
mess1.id = 'mess1';

let mess2 = document.createElement('div');
mess2.id = 'mess2';

let mess3 = document.createElement('div');
mess3.id = 'mess3';

mess.insertAdjacentElement("afterbegin", mess3);
mess.insertAdjacentElement("afterbegin", mess2);
mess.insertAdjacentElement("afterbegin", mess1);

let closer_point = document.createElement('button');
closer_point.id = 'closer_point';
closer_point.innerText = 'X';

// mess1.insertAdjacentElement("beforeend", closer_point);


// ----------------- первый старт календаря -----------------------------------------
startCalendar(new Date().getFullYear());

//------------------ запуск часов ------------------
myTime(document.getElementById('f4'));

// ----------------- первый и периодический запуск погоды -------------------------------------
Weather();
setInterval(() => Weather(), 100000);


//------------------ обработчики событий таблицы, закрытия окна mess, погоды, текущей даты, поля ввода года ---------------
document.getElementById("all").addEventListener("click", function (event) {
    if (document.elementFromPoint(event.clientX, event.clientY).closest('#mess') != mess && mess.style.display != "none") {
        mess.style.display = "none";
    }
})

closer_point.addEventListener("click", function (event) {
    mess.style.display = "none";
    event.stopPropagation()
});

// mess.addEventListener("touchend", function (event) {    
//     event.stopPropagation();
//     mess.style.display = "none";
// });

// mess.addEventListener("click", function (event) {
//     event.stopPropagation();
//     mess.style.display = "none";
// });

document.getElementsByClassName('weather')[0].addEventListener("click", function (event) {
    Weather()
});
document.getElementsByClassName('current_date')[0].addEventListener("click", function (event) {
    document.getElementById('inputka').value = new Date().getFullYear();
    startCalendar(2022)
}); //
document.getElementById('inputka').oninput = function (event) {
    startCalendar(this.value)
};