// FRONT-END (CLIENT) JAVASCRIPT HERE

/*
* Name: addEntry
* Input: onClick event
* Output: N/A
* Purpose: Collect data for new entry, send it to server, send updated data from server to be displayed
*/
const addEntry = async function (event) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    // get form and values inputted into form
    const form = document.getElementById('addForm'),
        compInfo = document.getElementById('compInfo').value,
        vaultScore = document.getElementById('vaultScore').value,
        barScore = document.getElementById('barScore').value,
        beamScore = document.getElementById('beamScore').value,
        floorScore = document.getElementById('floorScore').value,
        possibleLevels = document.getElementsByName('level') // get radio buttons for possible level

    let level = ""

    // check which level is selected and store it
    for (let i = 0; i < possibleLevels.length; i++) {
        if (possibleLevels[i].checked) {
            level = possibleLevels[i].value
        }
    }

    // send object to server with the proper data format
    const json = {"compInfo": compInfo, "level": level, "vaultScore": vaultScore, "barScore": barScore, "beamScore": beamScore, "floorScore": floorScore},
        body = JSON.stringify(json)

    const response = await fetch("/submit", {
        method: "POST",
        body
    })

    // wait for response from server
    const appdata = await response.text()

    const data = JSON.parse(appdata)

    // send data sent from server to be displayed and reset the form
    updateData(data)
    form.reset()
}

/*
* Name: delEntry
* Input: onClick event
* Output: N/A
* Purpose: Collect data for entry to be deleted, send data to server, send updated data from server to be displayed
*/
const delEntry = async function (event) {
    event.preventDefault()

    // get form and ID of entry to be deleted
    const form = document.getElementById('delForm'),
        id = document.getElementById('toDel').value,
        body = JSON.stringify(id)

    // send ID to server
    const response = await fetch("/submit", {
        method: "POST",
        body
    })

    // wait for response from server
    const appdata = await response.text()

    const data = JSON.parse(appdata)

    // send data sent from server to be displayed and reset the form
    updateData(data)
    form.reset()
}

/*
* Name: editEntry
* Input: onClick event
* Output: N/A
* Purpose: Collect data for entry to be updated, send data to server, send updated data from server to be displayed
*/
const editEntry = async function (event) {
    event.preventDefault()

    // get form and values inputted into form
    const form = document.getElementById('editForm'),
        id = document.getElementById('num').value,
        compInfo = document.getElementById('editComp').value,
        vaultScore = document.getElementById('editVault').value,
        barScore = document.getElementById('editBars').value,
        beamScore = document.getElementById('editBeam').value,
        floorScore = document.getElementById('editFloor').value,
        possibleLevels = document.getElementsByName('editLevel') // get radio buttons for possible level

    let level = ""

    // check which level is selected and store it
    for (let i = 0; i < possibleLevels.length; i++) {
        if (possibleLevels[i].checked) {
            level = possibleLevels[i].value
        }
    }

    // send object to server with the proper data format
    const json = {"id": id, "compInfo": compInfo, "level": level, "vaultScore": vaultScore, "barScore": barScore, "beamScore": beamScore, "floorScore": floorScore},
        body = JSON.stringify(json)

    const response = await fetch("/submit", {
        method: "POST",
        body
    })

    // wait for response from server
    const appdata = await response.text()

    const data = JSON.parse(appdata)

    // send data sent from server to be displayed, reset the form, swap to AddEntry form
    updateData(data)
    form.reset()
    swapForm("addForm")
}

/*
* Name: updateData
* Input: object of data wanting to be displayed
* Output: N/A
* Purpose: Format and display data given
*/
const updateData = function (data) {
    // get element that displays data
    const display = document.getElementById("storedData");

    // clear content currently in display
    display.innerHTML = ''

    // fill display with data given and add button to allow editing
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

/*
* Name: swapForm
* Input: name of form to be displayed, data object for edit form (if applicable)
* Output: N/A
* Purpose: Swap what form is being displayed
*/
const swapForm = function (desiredForm, editInfo) {
    // get form objects from the HTML
    const addForm = document.getElementById('addForm')
    const delForm = document.getElementById('delForm')
    const editForm = document.getElementById('editForm')

    // hide other forms and display the proper one
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
        prefillEdit(editInfo); // send edit data to be prefilled into form
    }

}

/*
* Name: prefillEdit
* Input: object with data to be put into form
* Output: N/A
* Purpose: Prefill edit form with existing data in the entry
*/
const prefillEdit = function (info) {

    // assign each form element the corresponding value from the current data entry
    document.getElementById('num').value = info.id
    document.getElementById('editComp').value = info.compInfo
    document.getElementById('editVault').value = info.vaultScore
    document.getElementById('editBars').value = info.barScore
    document.getElementById('editBeam').value = info.beamScore
    document.getElementById('editFloor').value = info.floorScore

    // select the proper radio button to check based on current data
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

/*
* Name: loadData
* Input: N/A
* Output: N/A
* Purpose: Sends request to server to get data when website is first loaded
*/
const loadData = async function () {

    // send Get request asking for data
    const response = await fetch("/loadData", {
        method: "GET",
    })

    // wait for data and then send it to be displayed
    const appdata = await response.text()

    const data = JSON.parse(appdata)

    updateData(data)
}

/*
* Name: clearEntryForm
* Input: N/A
* Output: N/A
* Purpose: clear add form
*/
const clearEntryForm = function () {
    const form = document.getElementById('addForm')

    form.reset()
}


window.onload = function () {
    // load and display database from server when window loads
    loadData()

    // listen for submit on add form and call addEntry when clicked
    const addSubmit = document.querySelector("#addSubmit");
    addSubmit.onclick = addEntry;

    // listen for click on button to display add form and call swapForm when clicked
    const add = document.querySelector("#addEntry");
    add.onclick = () => swapForm("addForm", 0);

    // listen for click on button to display delete form and call swapForm when clicked
    const del = document.querySelector("#delEntry");
    del.onclick = () => swapForm("delForm", 0);

    // listen for submit on delete form and call delEntry when clicked
    const delSubmit = document.querySelector("#delSubmit");
    delSubmit.onclick = delEntry;

    // listen for submit on edit form and call editEntry when clicked
    const editSubmit = document.querySelector("#editSubmit");
    editSubmit.onclick = editEntry;

    // listen for click on button to clear add form and call clearEntryForm when clicked
    const clearEntry = document.querySelector("#clearForm");
    clearEntry.onclick = () => clearEntryForm();
}