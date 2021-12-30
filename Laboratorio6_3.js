// Agenda -------------------------------------

// Constantes
var WORK_HOURS = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
];

// Datos
var myTeam = [
    {
        name: "María",
        availability: new Array(8).fill(true)
    },
    {
        name: "Pedro",
        availability: new Array(8).fill(true)
    },
    {
        name: "Esther",
        availability: new Array(8).fill(true)
    },
    {
        name: "Marcos",
        availability: new Array(8).fill(true)
    },
];

var randomInit = () => {
    for (const valor of myTeam) {
        var schedule = valor.availability;
        for (const key in schedule) {
            schedule[key] = (Math.round(Math.random()) ? true : false);
        }
    }
}

var showSchedule = () => {
    for (const valor of myTeam) {
        console.log("Disponibilidad de " + valor.name)
        var schedule = valor.availability;
        for (const key in schedule) {
            console.log("    " + WORK_HOURS[key] + ": " + (schedule[key] ? "Si" : "No"));
        }
    }
}

var lookForMeeting = () => {
    var meetingFound = false;
    var workHoursIter = 0;
    do {
        var myTeamIter = 0;
        do {
            meetingFound = myTeam[myTeamIter].availability[workHoursIter];
        } while (meetingFound && ++myTeamIter < myTeam.length);
    } while (!meetingFound && ++workHoursIter < WORK_HOURS.length);
    if (meetingFound) {
        console.log("Hueco encontrado en el horario " + WORK_HOURS[workHoursIter]);
    }
    else {
        console.log("Lo siento. No hay hueco disponible en el equipo.");
    }
}
// MAIN (Agenda)
randomInit();
showSchedule();
lookForMeeting();

// Calculo del cambio -------------------------
var WORK_MONEY = {
    avail200: {
        value: 200,
        count: 0,
        returned: 0,
        type: ["billete", "billetes"],
        name: "200€"
    },
    avail100: {
        value: 100,
        count: 0,
        returned: 0,
        type: ["billete", "billetes"],
        name: "100€"
    },
    avail50: {
        value: 50,
        count: 0,
        returned: 0,
        type: ["billete", "billetes"],
        name: "50€"
    },
    avail20: {
        value: 20,
        count: 0,
        returned: 0,
        type: ["billete", "billetes"],
        name: "20€"
    },
    avail10: {
        value: 10,
        count: 0,
        returned: 0,
        type: ["billete", "billetes"],
        name: "10€"
    },
    avail5: {
        value: 5,
        count: 0,
        returned: 0,
        type: ["billete", "billetes"],
        name: "5€"
    },
    avail2: {
        value: 2,
        count: 0,
        returned: 0,
        type: ["moneda", "monedas"],
        name: "2€"
    },
    avail1: {
        value: 1,
        count: 0,
        returned: 0,
        type: ["moneda", "monedas"],
        name: "1€"
    },
    avail050: {
        value: 0.5,
        count: 0,
        returned: 0,
        type: ["moneda", "monedas"],
        name: "50 centimos"
    },
    avail020: {
        value: 0.2,
        count: 0,
        returned: 0,
        type: ["moneda", "monedas"],
        name: "20 centimos"
    },
    avail010: {
        value: 0.1,
        count: 0,
        returned: 0,
        type: ["moneda", "monedas"],
        name: "10 centimos"
    },
    avail005: {
        value: 0.05,
        count: 0,
        returned: 0,
        type: ["moneda", "monedas"],
        name: "5 centimos"
    },
    avail002: {
        value: 0.02,
        count: 0,
        returned: 0,
        type: ["moneda", "monedas"],
        name: "2 centimos"
    },
    avail001: {
        value: 0.01,
        count: 0,
        returned: 0,
        type: ["moneda", "monedas"],
        name: "1 centimo"
    }
}

var fillMoneyAll = (newValue) => {
    for (const key in WORK_MONEY) {
        document.getElementById(key).value = newValue;
        WORK_MONEY[key].count = newValue;
    }
}

var availInputChangeHandler = event => {
    target = document.getElementById(event.target.id);
    if (target.value < 0) {
        target.value = 0;
    }
    WORK_MONEY[target.id].count = parseInt(target.value);
}

var moneyInputChangeHandler = event => {
    value = Number(document.getElementById(event.target.id).value);
    document.getElementById(event.target.id).value = value.toFixed(2);
}

var calculate = () => {
    for (const key in WORK_MONEY) {
        WORK_MONEY[key].returned = 0;
    }
    const resultCalculation = recursiveCalculation((Number(document.getElementById("pagado").value) - Number(document.getElementById("precio").value)).toFixed(2));
    document.getElementById("cambio").value = CambioOutput(Number(resultCalculation));
}

var recursiveCalculation = (rest) => {
    if (rest > 0) {
        var oldRest = rest;
        for (const key in WORK_MONEY) {
            if (rest >= WORK_MONEY[key].value && (WORK_MONEY[key].count - WORK_MONEY[key].returned) > 0) {
                WORK_MONEY[key].returned++;
                rest = recursiveCalculation(Math.round((rest - WORK_MONEY[key].value) * 100) / 100);
                if (rest <= 0 || rest == oldRest) { break; }
            }
        }
    }
    return rest;
}

var CambioOutput = (calcResult) => {
    if (calcResult >= 0) {
        var result = "";
        for (var key in WORK_MONEY) {
            if (WORK_MONEY[key].returned > 0) {
                if (result == "") {
                    result = "A devolver: ";
                }
                else {
                    result += ", ";
                }
                result += WORK_MONEY[key].returned + " " + (WORK_MONEY[key].returned == 1 ? WORK_MONEY[key].type[0] : WORK_MONEY[key].type[1]) + " de " + WORK_MONEY[key].name;
            }
        }
        if (result == "") {
            result = "No hay cambio.";
        }
        else {
            result += ".";
        }
        if (calcResult > 0) {
            result += "\nPor falta de disponibilidad no se puede devolver " + calcResult.toFixed(2) + "€.";
        }
        return result;
    }
    else {
        return "No hay cambio.\nFalta " + (calcResult * -1).toFixed(2) + "€ por pagar.";
    }
}

// MAIN (Cambio)
for (const key in WORK_MONEY) {
    document.getElementById(key).addEventListener("change", availInputChangeHandler);
}
document.getElementById("precio").addEventListener("change", moneyInputChangeHandler);
document.getElementById("pagado").addEventListener("change", moneyInputChangeHandler);