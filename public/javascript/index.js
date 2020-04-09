const charactersAPI = new APIHandler('http://localhost:8000');

document.getElementById('fetch-all').onclick = function (btn) {
  btn.preventDefault();
  charactersAPI.getFullList()
    .then((data) => {
      let container = document.querySelector(".characters-container");
      container.innerHTML = "";
      data.forEach((character) => {
        let divElement = document.createElement("div");
        divElement.className = "character-info";
        divElement.innerHTML =
          `<div class="name">${character.name}</div>
          <div class="occupation">${character.occupation}</div>
          <!--<div class="cartoon">${character.cartoon}</div>-->
          <div class="weapon">${character.weapon}</div>`
        container.appendChild(divElement);
      })
    });
}

document.getElementById('fetch-one').onclick = function (btn) {
  btn.preventDefault();
  charactersAPI.getFullList()
    .then((allElements) => {
      let ids = [];
      allElements.forEach((character) => {
        return ids.push(character.id);
      })
      let characterId = document.getElementById("create-character-id");
      if (ids.includes(parseInt(characterId.value))) {
        charactersAPI.getOneRegister(characterId.value)
          .then((character) => {
            let container = document.querySelector(".characters-container");
            container.innerHTML = "";
            let divElement = document.createElement("div");
            divElement.className = "character-info";
            divElement.innerHTML =
              `<div class="name">${character.name}</div>
          <div class="occupation">${character.occupation}</div>
          <!--<div class="cartoon">${character.cartoon}</div>-->
          <div class="weapon">${character.weapon}</div>`
            container.appendChild(divElement);
          })
      } else {
        console.log("That id does not match with any character.");
      }
      characterId.value = "";
    })
}

document.getElementById('delete-one').onclick = function (btn) {
  btn.preventDefault();
  charactersAPI.getFullList()
    .then((allElements) => {
      let ids = [];
      allElements.forEach((character) => {
        return ids.push(character.id);
      })
      let characterId = document.getElementById("delete-character-id");
      if (ids.includes(parseInt(characterId.value))) {
        charactersAPI.deleteOneRegister(characterId.value);
      } else {
        console.log("That id does not match with any character.");
      }
      characterId.value = "";
    })
}

document.getElementById("edit-character-form").onsubmit = function (event) {
  event.preventDefault();
  charactersAPI.getFullList()

    .then((allElements) => {

      let allCharacters = allElements;
      let ids = [];

      allCharacters.forEach((character) => {
        return ids.push(character.id);
      })

      let theId = document.getElementById("update-character-id");
      let theName = document.getElementById("update-character-name");
      let theOccupation = document.getElementById("update-character-occupation");
      let theWeapon = document.getElementById("update-character-weapon");
      let theCartoon = document.getElementById("update-character-cartoon");

      if (ids.includes(parseInt(theId.value)) && (theName.value !== "")
        && (theOccupation.value !== "") && (theWeapon.value !== "")) {

        const updatedcharacterInfo = {
          name: theName.value,
          occupation: theOccupation.value,
          weapon: theWeapon.value,
          cartoon: theCartoon.checked
        };

        charactersAPI.updateOneRegister(theId.value, updatedcharacterInfo);

      } else {
        console.log("Introduce the information correctly.");
      }

      theId.value = "";
      theName.value = "";
      theOccupation.value = "";
      theWeapon.value = "";
      theCartoon.checked = false;

    })
};

document.getElementById("new-character-form").onsubmit = function (event) {

  event.preventDefault();

  let theName = document.getElementById("new-character-name");
  let theOccupation = document.getElementById("new-character-occupation");
  let theWeapon = document.getElementById("new-character-weapon");
  let theCartoon = document.getElementById("new-character-cartoon");

  if (theName.value !== "" && theOccupation.value !== "" && theWeapon.value !== "") {
    let characterInfo = {
      name: theName.value,
      occupation: theOccupation.value,
      weapon: theWeapon.value,
      cartoon: theCartoon.checked
    };
    charactersAPI.createOneRegister(characterInfo);
  } else {
    console.log("You have not introduced the information.")
  }

  theName.value = "";
  theOccupation.value = "";
  theWeapon.value = "";
  theCartoon.checked = false;

};
