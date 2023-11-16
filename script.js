document.getElementById("get_data").addEventListener("click", loadJokes);
// function loadJokes() {
//   let str = document.getElementById("numberJokes").value;
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", `https://api.chucknorris.io/jokes/${str}`, true);
//   xhr.onload = function () {
//     if (this.status === 200) {
//       let data = JSON.parse(this.responseText);
//       document.getElementById("output").innerHTML = data.value;
//     }
//   };
//   xhr.send();
// }

function loadJokes() {
  fetch(`https://bau.edu.bd/api/ComplainList`)
    .then((res) => res.json())
    .then((data) => {
      let outputHTML = ""; // Initialize an empty string
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === 0) {
          outputHTML += `<tr>
          <td>${data[i].id}</td>
          <td>${data[i].complain_user}</td>
          <td>${data[i].complain_user_desc}</td>
          <td>${data[i].entry_time}</td>
        </tr>`; // Concatenate the ids
        }
        if (data[i].status === 1) {
          outputHTML += `<tr>
          <td>${data[i].id}</td>
          <td>${data[i].complain_user}</td>
          <td>${data[i].complain_user_desc}</td>
          <td>${data[i].entry_time}</td>
        </tr>`; // Concatenate the ids
        }
      }
      document.getElementById("output").innerHTML = outputHTML;
      // console.log(data);
    })
    .catch((err) => console.log(err));
}
