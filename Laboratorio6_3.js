// Agenda -------------------------

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
// MAIN -------------------------
randomInit();
showSchedule();
lookForMeeting();