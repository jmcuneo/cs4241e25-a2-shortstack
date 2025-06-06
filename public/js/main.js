// FRONT-END (CLIENT) JAVASCRIPT HERE

const addEntry = async function (event) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const form = document.getElementById('addForm'),
        compInfo = document.getElementById('compInfo').value,
        vaultScore = document.getElementById('vaultScore').value,
        barScore = document.getElementById('barScore').value,
        beamScore = document.getElementById('beamScore').value,
        floorScore = document.getElementById('floorScore').value,
        possibleLevels = document.getElementsByName('level')

    let level = ""

    for (let i = 0; i < possibleLevels.length; i++) {
        if (possibleLevels[i].checked) {
            level = possibleLevels[i].value
        }
    }

    const json = {"compInfo": compInfo, "level": level, "vaultScore": vaultScore, "barScore": barScore, "beamScore": beamScore, "floorScore": floorScore},
        body = JSON.stringify(json)

    const response = await fetch("/submit", {
        method: "POST",
        body
    })

    const appdata = await response.text()

    const data = JSON.parse(appdata)

    updateData(data)
    form.reset()
}

const delEntry = async function (event) {
    event.preventDefault()

    const form = document.getElementById('delForm'),
        id = document.getElementById('toDel').value,
        body = JSON.stringify(id)

    const response = await fetch("/submit", {
        method: "POST",
        body
    })

    const appdata = await response.text()

    const data = JSON.parse(appdata)

    updateData(data)
    form.reset()
}

const editEntry = async function (event) {
    event.preventDefault()

    const form = document.getElementById('editForm'),
        id = document.getElementById('num').value,
        compInfo = document.getElementById('editComp').value,
        vaultScore = document.getElementById('editVault').value,
        barScore = document.getElementById('editBars').value,
        beamScore = document.getElementById('editBeam').value,
        floorScore = document.getElementById('editFloor').value,
        possibleLevels = document.getElementsByName('editLevel')

    let level = ""

    for (let i = 0; i < possibleLevels.length; i++) {
        if (possibleLevels[i].checked) {
            level = possibleLevels[i].value
        }
    }

    const json = {"id": id, "compInfo": compInfo, "level": level, "vaultScore": vaultScore, "barScore": barScore, "beamScore": beamScore, "floorScore": floorScore},
        body = JSON.stringify(json)

    const response = await fetch("/submit", {
        method: "POST",
        body
    })

    const appdata = await response.text()

    const data = JSON.parse(appdata)

    updateData(data)
    form.reset()
    swapForm("addForm")
}

const updateData = function (data) {
    const display = document.getElementById("storedData");

    display.innerHTML = ''

    for (let element of data) {
        let row = display.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            let info = document.createTextNode(element[key]);
            cell.appendChild(info);
        }
        let buttonCell = row.insertCell();
        let button = document.createElement("button");
        button.innerHTML = "Edit Entry";
        button.id = `edit`;
        button.onclick = () => swapForm("editForm", element)
        buttonCell.appendChild(button);
    }
}

const swapForm = function (desiredForm, editInfo) {

    const addForm = document.getElementById('addForm')
    const delForm = document.getElementById('delForm')
    const editForm = document.getElementById('editForm')

    if (desiredForm === "addForm") {
        addForm.hidden = false;
        delForm.hidden = true;
        editForm.hidden = true;
    } else if (desiredForm === "delForm") {
        addForm.hidden = true;
        delForm.hidden = false;
        editForm.hidden = true;
    } else if (desiredForm === "editForm") {
        addForm.hidden = true;
        delForm.hidden = true;
        editForm.hidden = false;
        prefillEdit(editInfo);
    }

}

const prefillEdit = function (info) {
    //const editForm = document.getElementById('editForm')

    document.getElementById('num').value = info.id
    document.getElementById('editComp').value = info.compInfo
    document.getElementById('editVault').value = info.vaultScore
    document.getElementById('editBars').value = info.barScore
    document.getElementById('editBeam').value = info.beamScore
    document.getElementById('editFloor').value = info.floorScore

    if (info.level === "Bronze") {
        document.getElementById('editBronze').checked = true
    } else if (info.level === "Silver") {
        document.getElementById('editSilver').checked = true
    } else if (info.level === "Gold") {
        document.getElementById('editGold').checked = true
    } else if (info.level === "Platinum") {
        document.getElementById('editPlatinum').checked = true
    } else if (info.level === "Diamond") {
        document.getElementById('editDiamond').checked = true
    }

}

const loadData = async function () {

    const response = await fetch("/loadData", {
        method: "GET",
    })

    const appdata = await response.text()

    const data = JSON.parse(appdata)

    updateData(data)
}

window.onload = function () {
    loadData()

    const addSubmit = document.querySelector("#addSubmit");
    addSubmit.onclick = addEntry;

    const add = document.querySelector("#addEntry");
    add.onclick = () => swapForm("addForm", 0);

    const del = document.querySelector("#delEntry");
    del.onclick = () => swapForm("delForm", 0);

    const delSubmit = document.querySelector("#delSubmit");
    delSubmit.onclick = delEntry;

    const editSubmit = document.querySelector("#editSubmit");
    editSubmit.onclick = editEntry;
}