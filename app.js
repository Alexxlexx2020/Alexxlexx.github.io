//---------------- база данных в массиве находится в файле database.js ---------------------------------------------------------

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
    Table.insertAdjacentHTML("afterbegin", `<caption class = "caption_calendar">${Month1[month].toUpperCase()}</caption>`)
    Thead.insertAdjacentHTML("afterbegin", `<tr><th class = "head_calendar">пн.</th><th class = "head_calendar">вт.</th><th class = "head_calendar">ср.</th><th class = "head_calendar">чт.</th><th class = "head_calendar">пт.</th><th class="wday">сб.</th><th class="wday">вс.</th></tr>`);
    document.getElementById(elem).append(Table);

    Table.id = "calendar-" + month;
    Table.classList.add('table_style');
    let i1 = 0;
    let z;

    for (let i = days[1]; i < days[1] + days.length; i++) {
        i1++;
        let y1 = Math.floor(i / 7);
        let x1 = i - y1 * 7;
        if (days[i1] != undefined) {
            if (y1 != z) {
                Tbody.insertAdjacentHTML("beforeend", "<tr><td class = 'td_empty'></td><td class = 'td_empty'></td><td class = 'td_empty'></td><td class = 'td_empty'></td><td class = 'td_empty'></td><td class = 'celebrate td_empty'></td><td class = 'celebrate'></td></tr>");
                z = y1
            }
            Table.rows[y1 + 1].cells[x1].innerHTML = i1;
            Table.rows[y1 + 1].cells[x1].classList.add('date_no_empty');
            if (massive2[month][i1 - 1] != 1) {
                if (massive2[month][i1 - 1].indexOf('photo') != -1) {
                    Table.rows[y1 + 1].cells[x1].classList.remove('date_no_empty');
                    Table.rows[y1 + 1].cells[x1].classList.remove('td_empty');
                    Table.rows[y1 + 1].cells[x1].classList.add('td_full')
                }
            };
            let Date1 = new Date(year, month, i1);
            if (Date1.getDate() == new Date().getDate() && Date1.getMonth() == new Date().getMonth() && Date1.getFullYear() == new Date().getFullYear()) {
                Table.rows[y1 + 1].cells[x1].style.backgroundColor = "#9ACD32";
            }
        } else break;
    }
}

//------------ функция заполнения двухмерного массива massive2 из massive1 для обозначения полей в календаре --------------
let massive2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function massiveToMassive2() {
    for (let i = 0; i <= 11; i++) {
        massive2[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        for (let j = 0; j <= 31; j++) {
            for (item of massive1) {
                if (i == +item["birthday"].substr(8, 2) - 1 && j == +item["birthday"].substr(5, 2) - 1) {
                    massive2[i][j] = "photo";
                    break
                };
            }
        }
    }
}
massiveToMassive2();

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

//-------------- функция заполнения таблицы с людьми --------------------------
function table_list(array, arrayProp, arrayProp1, elem) {
    elem.innerHTML = "";
    let tableMan = document.createElement('table');
    tableMan.id = "tableMan";
    let thead_tableMan = document.createElement('thead');
    let tbody_tableMan = document.createElement('tbody');
    tableMan.className = "ClassTableMan";
    tableMan.append(thead_tableMan);
    tableMan.append(tbody_tableMan);
    tableMan.insertAdjacentHTML("afterbegin", `<caption>сортируется по колонкам</caption>`);
    let itemProp = "";
    let i = 0;
    for (item of arrayProp1) {
        itemProp = itemProp + `<th id = "${arrayProp[i]}">${item}</th>`;
        i++;
    }
    itemProp = `<tr>${itemProp}</tr>`;
    thead_tableMan.insertAdjacentHTML("afterbegin", itemProp);

    for (item of array) {
        let itemProp1 = "";
        for (item1 of arrayProp) {
            itemProp1 = itemProp1 + `<td id = "${item['id']}">${item[item1]}</td>`;
        }
        itemProp1 = `<tr>${itemProp1}</tr>`;
        tbody_tableMan.insertAdjacentHTML("beforeend", itemProp1);
    };
    elem.insertAdjacentElement("beforeend", tableMan);
    console.log(global_prop);
    // document.getElementById(global_prop).classList.add("column_sign");
    document.getElementById(global_prop).style.backgroundColor = "#FFA07A";
    let arrow;
    if (minmax_global == "max") {arrow = "⇩ "} else if (minmax_global == "min") {arrow = "⇧ "};
    document.getElementById(global_prop).innerHTML = arrow + document.getElementById(global_prop).innerHTML;
}

//---------- функция сортировки массива по свойству объекта -------------
let minmax_global = "min";
let global_prop = "days_for_bd";

function arraySort(array, prop) {
    global_prop = prop;
    let minmax = minmax_global;
    if (minmax == "min") {
        array.sort((a, b) => {
            if (a[prop] > b[prop]) {
                return 1
            } else return -1
        });
        minmax_global = "max";
    } else if (minmax == "max") {
        array.sort((a, b) => {
            if (a[prop] < b[prop]) {
                return 1
            } else return -1
        });
        minmax_global = "min";
    }
}

//-----------------функция записи остатка дней до ДР и вывода ближайшего день рождения в элемент-----------------------------

function closerDR() {
    let start_year = new Date(new Date().getFullYear(), 0, 1);
    let start_year1 = new Date(new Date().getFullYear() + 1, 0, 1);
    let date_now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    let before_year = date_now - start_year; // ------ сколько времени прошло с начала года до сегоднящней даты -----------------
    let after_year = start_year1 - date_now; // ------ сколько времени осталось от текущей даты до следующего года --------------
    for (item of massive1) {
        let date_man = new Date(new Date().getFullYear(), +item["birthday"].slice(8) - 1, +item["birthday"].slice(5, 7));
        let before_man = date_man - start_year; // -------- сколько времени прошло с начала года до дня рождения ------------
        if ((before_man - before_year) >= 0) {
            item["days_for_bd"] = Math.round((before_man - before_year) / 86400000);
        } else {
            item["days_for_bd"] = Math.round((after_year + before_man) / 86400000)
        }
    }
    arraySort(massive1, "days_for_bd");
    if (massive1[0]["days_for_bd"] == 0) {
        document.getElementById("dr").innerHTML = `${massive1[0]["photo"].slice(0,-4)} сегодня день рождения`
    } else
        document.getElementById("dr").innerHTML = `${massive1[0]["photo"].slice(0,-4)} через <strong>${massive1[0]["days_for_bd"]}</strong> д.`;
    document.getElementById("dr_photo").innerHTML = `<img class = "dr_photo_class" src="image/${massive1[0]["photo"]}" alt="фото" />`;
    minmax_global = "max";
    // arraySort(massive1, "surname");
}



//------- функция вывода окна с фотографией в существующий блок mess-----------------------

function showPhoto(idMan) {
    let k = {};
    for (item of massive1) {
        if (item["id"] == idMan) {
            k = item;
            break
        }
    }
    // console.log(k["name1"]);
    let realYear = document.getElementById('inputka').value;
    let oldYear = realYear - +k["birthday"].slice(0, 4);
    mess1.innerHTML = "";
    mess1.innerHTML = `<div class = "text"><b>в ${realYear} году:  ${oldYear} лет</b></div>`;
    mess1.insertAdjacentElement("beforeend", closer_point);
    mess2.innerHTML = `<img class = "photo" src="image/${k["photo"]}" alt="фото" />`;
    mess3.innerHTML = `${k["photo"].slice(0, -4)}`;

    //--------- проверка по ширине экрана комп или смартфон -------------
    // if (document.body.clientWidth >= document.body.clientHeight) {
    if (window.innerWidth >= window.innerHeight) {
        mess.classList.remove("mess_tel");
        mess.classList.remove("mess_comp");
        mess.classList.add('mess_comp');
    } else {
        mess.classList.remove('mess_comp');
        mess.classList.remove("mess_tel");
        mess.classList.add('mess_tel');
    }
    document.getElementsByClassName('osnova')[0].insertAdjacentElement("afterbegin", mess);
    mess.classList.add("OpacityAnimation");
    // mess.classList.add("big");
    mess.style.display = "block";
}

//--------- проверка по ширине экрана комп или смартфон для показа.скрытия иконки погоды-------------
if (window.innerWidth <= window.innerHeight) {
    console.log(window.innerWidth + "----" + window.innerHeight);
    document.getElementById('weather__icon').classList.remove('weather__icon');
    document.getElementById('weather__icon').classList.add('displayNone');
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
            let massiveMonth = +elem1.parentNode.parentNode.parentNode.id.split("-")[1];
            let massiveDate = elem1.innerText - 1;
            for (item of massive1) {
                if (+item["birthday"].substr(8, 2) == +massiveMonth + 1 && +item["birthday"].substr(5, 2) == +massiveDate + 1) {
                    showPhoto(item["id"]);
                    break;
                }
            }
        }
    })
}

// ------------------- функция запроса и записи погоды в массив data--------------------------------------------------
function Weather() {
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
// ---кнопка закрытия mess----------------
let closer_point = document.createElement('button');
closer_point.id = 'closer_point';
closer_point.innerText = 'X';

let table_area = document.getElementsByClassName('table_area')[0]; //--- создание области таблицы людей  ----------


//------------------ заполнение массива числом остатка дней до дня рождения ------------
closerDR();
// ----------------- первый старт календаря -----------------------------------------

startCalendar(new Date().getFullYear());


//------------------ запуск часов ------------------
myTime(document.getElementById('f4'));

// ----------------- первый и периодический запуск погоды -------------------------------------
Weather();
setInterval(() => Weather(), 100000);


//----------------- запуск постоения таблицы людей и вставки в elem ----------------------------
table_list(massive1, ["surname", "name1", "name2", "birthday", "days_for_bd"], ["фамилия", "имя", "отчество", "дата", "дней до ДР"], table_area);


//------------------ обработчики событий таблицы, закрытия окна mess, погоды, текущей даты, поля ввода года ---------------
document.getElementById("all").addEventListener("click", function (event) {
    if (document.elementFromPoint(event.clientX, event.clientY).closest('#mess') != mess && mess.style.display != "none") {
        mess.style.display = "none";
    }
    if (!document.elementFromPoint(event.clientX, event.clientY).closest('.button_table') && table_area.style.display == "block") {
        table_area.style.display = "none"
    }
})

closer_point.addEventListener("click", function (event) {
    mess.style.display = "none";
    event.stopPropagation()
});

document.getElementsByClassName('button_table')[0].addEventListener("click", function (event) {
    if (table_area.style.display == "none") {
        table_area.style.display = "block"
    } else table_area.style.display = "none";
})

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

document.getElementsByClassName("table_area")[0].addEventListener("click", function (event) {
    event.stopPropagation();
    let th = event.target.closest("th");
    let td = event.target.closest("td");
    if (th) {
        arraySort(massive1, event.target.closest("th").id);
        // table_list(massive1, ["surname", "name1", "name2", "birthday"], ["фамилия", "имя", "отчество", "дата"], table_area);
        table_list(massive1, ["surname", "name1", "name2", "birthday", "days_for_bd"], ["фамилия", "имя", "отчество", "дата", "дней до ДР"], table_area);
        return;
    }
    if (td) {
        showPhoto(td.id);
    }
})
