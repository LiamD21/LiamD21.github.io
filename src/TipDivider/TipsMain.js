function getNumPeople(form){
    return form.numPeople.value;
}

function getTotalCash(form){
    return form.numCash.value;
}

function getTotalCard(form){
    return form.numCard.value;
}

function getHours(form){
    let hoursArray = form.numHours.value;
    let floatHoursArr = [];
    for (let i = 0; i < hoursArray.length; i++){
        floatHoursArr[i] = parseFloat(hoursArray[i]);
    }
    return floatHoursArr;
}

function main(form){
    let numPeople = getNumPeople(form);
    let totalCash = getTotalCash(form);
    let totalCard = getTotalCard(form);
    let hours = getHours(form);
}