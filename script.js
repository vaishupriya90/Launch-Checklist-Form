// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function () {

   let url = "https://handlers.education.launchcode.org/static/planets.json"
   fetch(url).then(function (response) {
      response.json().then(function (json) {
         console.log(json);
         let index = Math.round(Math.random() * json.length);
         console.log(index);
         let planet = json[index];
         //console.log(planet)
         let missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML =
            `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${planet.name}</li>
            <li>Diameter: ${planet.diameter}</li>
            <li>Star: ${planet.star}</li>
            <li>Distance from Earth: ${planet.distance}</li>
            <li>Number of Moons: ${planet.moons}</li>
         </ol>
        <img src="${planet.image}">`
      });
   });

   faultyItems.style.visibility = "hidden";
   launchStatus.innerHTML = "Awaiting information Before Launch";

   let form = document.querySelector("form");

   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");

   form.addEventListener("submit", function (event) {
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let pilotName = pilotNameInput.value;
      let pilotTest = Number(pilotName);

      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let copilotName = copilotNameInput.value;
      let copilotTest = Number(copilotName);

      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let rawFuelLevel = fuelLevelInput.value;
      let fuelLevel = Number(fuelLevelInput.value);

      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let rawCargoMass = cargoMassInput.value;
      let cargoMass = Number(cargoMassInput.value);

      let faultyItems = document.getElementById("faultyItems");

      if (pilotName === "" || copilotName === "" || rawFuelLevel === "" || rawCargoMass === "") {
         alert("All fields are required!");
         return;
      }
      else if (!isNaN(pilotTest) || !isNaN(copilotTest) || isNaN(fuelLevel) || isNaN(cargoMass)) {
         alert("Make sure to enter valid information in all the fields.");
         return;
      }

      faultyItems.style.visibility = "visible";
      pilotStatus.innerHTML = `Pilot ${pilotName} is ready for launch.`
      copilotStatus.innerHTML = `Co-pilot ${copilotName} is ready for launch.`

      let launchStatus = document.getElementById("launchStatus");
      launchStatus.innerHTML = "Shuttle Not Ready For Launch";
      launchStatus.style.color = "red";

      if (fuelLevel < 10000) {
         fuelStatus.innerHTML = "Fuel level is too low for launch."
      }
      if (cargoMass > 10000) {
         cargoStatus.innerHTML = "Cargo Mass is too high for launch.";
      } else if (fuelLevel >= 10000 && cargoMass <= 10000) {
         fuelStatus.innerHTML = "Fuel level is high enough for launch.";
         cargoStatus.innerHTML = "Cargo Mass is low enough for launch."
         launchStatus.innerHTML = "Shuttle is Ready For Launch!!";
         launchStatus.style.color = "green";
      }
   });

});