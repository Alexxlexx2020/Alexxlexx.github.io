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
            if (new Date(year, month, i1).getDate() == new Date().getDate() && new Date(year, month, i1).getMonth() == new Date().getMonth() && new Date(year, month, i1).getFullYear() == new Date().getFullYear()) {
                Table.rows[y1 + 1].cells[x1].style.backgroundColor = "#9ACD32";
            }
        } else break
    }
}

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
    elem.insertAdjacentHTML("afterbegin", `<div id="clock"><span class="spanH"></span><span>:</span><span class="spanM"></span><span>:</span><span class="spanS"></span><span></span><br><span class="current_date"></span></div>`);
    
    console.log (new Date().getFullYear());

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
        // console.log(document.getElementByClassName("current_date").classList);
        document.getElementsByClassName("current_date")[0].innerHTML = new Date().getDate() + "  " + month2[new Date().getMonth()] + " " + new Date().getFullYear();
    }
    timeCalc();
    setInterval(timeCalc, 1000);
}

function startCalendar(year) {
    let f3 = document.getElementById('f3');
    year = +year;
    if (year < 0 || year > 5000) year = new Date().getFullYear();
    f3.innerText = year;
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
    document.getElementById('all').addEventListener("click", function f333(event) {
        let xClick = event.clientX;
        let yClick = event.clientY;
        let elem1 = document.elementFromPoint(xClick, yClick);
        if (elem1.tagName == "TD" && elem1.innerText != "" && mess.style.display == "none" ) {
            let t1 = "Неизвестная информация.";
            if (massive[+elem1.parentNode.parentNode.parentNode.id.split(".")[1]][elem1.innerText - 1] != undefined) t1 = massive[+elem1.parentNode.parentNode.parentNode.id.split(".")[1]][elem1.innerText - 1];
            elem1.insertAdjacentElement("beforeend", mess);
            mess.innerHTML = "";
            mess.innerHTML = `<b>${elem1.innerText} ${month2[+elem1.parentNode.parentNode.parentNode.id.split(".")[1]]}  ${year} года</b><br><br>${t1}`;
            mess.insertAdjacentElement('afterbegin', closer_point);
            if (xClick > document.documentElement.clientWidth / 2) {
                mess.style.left = "";
                mess.style.right = "40px";
            } else {
                mess.style.right = "";
                mess.style.left = "40px";
            };
            if (yClick > document.documentElement.clientHeight / 2) {
                mess.style.bottom = "30px";
                mess.style.top = "";
            } else {
                mess.style.bottom = "";
                mess.style.top = "30px";
            };
            mess.style.display = "";
            elem1.insertAdjacentElement("beforeend", mess);
        } else if (mess.style.display != "none" && document.elementFromPoint(xClick,yClick) != mess){ mess.style.display = "none"}
    
    })
}
//---------запуск часов------------------
myTime(document.getElementById('f4'));

// ----------------------------------------запрос погоды в массив data--------------------------------------------------
let data = {};
function Weather() {
    fetch('http://api.openweathermap.org/data/2.5/weather?id=710719&lang=ru&appid=ed7cbb7322e69c56dd6645d9c8ee8748').then(function (resp) {
            return resp.json()
        }).then(function (data) {
            //добавляем название города
            document.getElementById("weather__city").innerHTML = data.name + ', ' + Math.round(data.main.temp - 273) + '°  ' + `<br>` + data.weather[0]['description'] + "  " + data.main.pressure + "/" + data.main.grnd_level;
            //data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
            //Добавляем иконку погоды
            document.getElementById('weather__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        })
        .catch(function () {
            // Обрабатываем ошибки при загрузке погоды
            document.getElementById("weather__city").innerHTML = "ошибка загрузки погоды"
            // prompt('погода не загрузилась');
        });
}

Weather();
setInterval(() => Weather(), 100000);

let mess = document.createElement('div');
mess.id = 'mess';
mess.style.display = "none";
let closer_point = document.createElement('button');
closer_point.id = 'closer_point';
closer_point.innerText = 'X';


startCalendar(2022);

//--------------обработчики событий--------------------------------------

// one.addEventListener("click",() => startCalendar(document.getElementById("inputka").value));
closer_point.addEventListener("click",function(event){ mess.style.display = "none"; event.stopPropagation()});
document.getElementsByClassName('current_date')[0].addEventListener("click", function(event){startCalendar(2022)});
document.getElementById('inputka').oninput = ()=>{ mess.style.display = "none"; startCalendar(document.getElementById("inputka").value)};

//----------------база данных в массиве по месяцам и дням месяца---------------------------------------------------------
let massive = [
    [],
    [],
    [],
    [],
    [1, 2, "День рождения Виты"],
    [],
    [],
    [1, "Мой день рождения"],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, "<b><u>Православие:</u></b><br><br>—отдание праздника Рождества Пресвятой Богородицы;<br>—память священномученика Автонома, епископа Италийского (313 год);<br>—память преподобного Афанасия Высоцкого, Серпуховского чудотворца (1395 год);<br>—память священномучеников Феодора Лебедева, Иоанна Прудентова, Николая Житова, пресвитеров, мученика Алексия (Ворошина) (1937 год);<br>—воспоминание перенесения мощей праведного Симеона Верхотурского (1704 год);<br>—память преподобного Вассиана Тиксненского (1624 год);<br>—память мученика Иулиана и с ним 40 мучеников (IV век)[6];<br>—память мученика Феодора Александрийского;<br>—память священномученика Корнута, епископа Никомидийского (Иконийского) (249-259 годы)[7];<br>—память мучеников Авадира и Ирая.<hr><b><u>Именины:</u></b><br><br>Католические: Аврелия, Амелия.<br>Православные: Семён, Фёдор, Юлиан, Святополк.",
        "<b><u>Католическая церковь:</u></b><br>—память святых бессребреников Космы и Дамиана.<br><b><u>Православие:</u></b><br>—память обновления (освящения) храма Воскресения Христова в Иерусалиме (Воскресение словущее) (335 год);<br>—предпразднство Воздвижения Честно́го и Животворящего Креста Господня;<br>—память священномученика Корнилия сотника (I век);<br>—память священномучеников Стефана Костогрыза, Александра Аксёнова, пресвитеров и Николая Васюковича, диакона (1937 год);<br>—память мучеников Кронида, Леонтия и Серапиона (около 237 года);<br>—память мучеников Селевка и Стратоника (III век);<br>—память мучеников Макровия и Гордиана (320 год);<br>—память священномученика Иулиана пресвитера (IV век);<br>—память мучеников Илии, Зотика, Лукиана и Валериана (320 год);<br>—память преподобного Петра в Атрое (IX век);<br>—память великомученицы Кетевани, царицы Кахетинской (1624 год) (Груз.).<hr><u><b>Именины:</b></u><br> Православные: Валериан, Илья, Корнелий, Леонтий, Лукьян, Пётр, Юлиан.<br>Католические: Люция, Юстина, Дамиан, Киприан."
    ],
    [],
    [],
    [],
]