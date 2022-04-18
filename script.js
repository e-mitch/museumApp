/*var museumArr = [];
function getLatLong(){
    event.preventDefault();
    var lat;
    var lng;
    var zipcode = document.getElementById("zipcodeField").value;
    if(isNaN(zipcode-1)){
        alert("Please enter a valid numeric zipcode.");
        return;
    } else if (zipcode.length != 5){
        alert("Please enter a 5-digit zipcode.")
        return;
    }
    var url = "https://us-east1-final-project-346820.cloudfunctions.net/getCoords2?zip=" + zipcode;
    fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                //console.log(myJson);
                lat = myJson['lat'];
                lng = myJson['lng'];
                findMuseums(lat, lng, zipcode);
            })
            .catch(function (error) {
                console.log("Error: " + error);
            });
}

function findMuseums(lat, lng, zip){
    //console.log("Lat: ", lat);
    //console.log("Lng: ", lng);
    //console.log("Zip: ", zip);
    url = "https://us-east1-final-project-346820.cloudfunctions.net/getData?lat="+lat+"&lon="+lng+"&zip="+zip;
    fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                const data = myJson;
                processData(data);
            })
            .catch(function (error) {
                console.log("Error: " + error);
            });
}

function processData(data){
    console.log(data);
    var saveButtons = [];
    var table = document.getElementById('resultsTable');
    table.style.display = "block";
    for(var i = 0; i < data.length; i++){
        var row = table.insertRow(i+1);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = data[i]["name"];
        var cell2 = row.insertCell(1);
        try{
            cell2.innerHTML = data[i]["address"];
        } catch (error){
            cell2.innerHTML = "Unknown";
        }
        var cell3 = row.insertCell(2);
        try{
            cell3.innerHTML = data[i]["rating"]
        }catch(error){
            cell2.innerHTML = "Unknown";
        }
        var cell4 = row.insertCell(3);
        try{
            var open = data[i]["openNow"];
            if (open == undefined){
                cell4.innerHTML = "Unknown";
            } else {
                if(open == true){
                    cell4.innerHTML = "Open!"
                } else if (open == false){
                    cell4.innerHTML = "Closed"
                }
            }
        }catch(error){
            cell4.innerHTML = "Unknown";
        }
        var cell5 = row.insertCell(4);
        cell5.innerHTML = "Save Museum";
        cell5.id = i;
        cell5.classList.add("saveButton");
        saveButtons.push(cell5);
    }
    console.log(saveButtons[0].id);
    setUpListeners(saveButtons);
}

function setUpListeners(sButtons){
    console.log(sButtons);
    for(var counter = 0; counter < sButtons.length; counter++){
        console.log(sButtons[counter].id);
        var rowNumber = parseInt(sButtons[counter].id) + 1;
        var cells = document.getElementById("resultsTable").rows[rowNumber].cells;
        var museumName = cells[0].innerHTML;
        var address = cells[1].innerHTML;
        console.log(museumName);
        console.log(address);
        sButtons[counter].addEventListener("click", async(e) => {
            e.preventDefault();
            try {
                await saveMuseum(museumName, address);
            } catch (error){
            console.log(error);
            }
        });
    }
}*/