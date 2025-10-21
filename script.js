// Add student input blocks dynamically
document.getElementById("generate").addEventListener("click", () => {
  const subjects = parseInt(document.getElementById("subjects").value);
  const studentCount = parseInt(document.getElementById("studentCount").value);

  if (!subjects || !studentCount) {
    alert("Please enter both number of subjects and students!");
    return;
  }

  const container = document.getElementById("students");
  container.innerHTML = "";

  for (let i = 1; i <= studentCount; i++) {
    const div = document.createElement("div");
    div.className = "student-block";
    div.innerHTML = `<h3>Student ${i}</h3>
      <input type="text" placeholder="Enter name" class="sname" required />
      <div class="marks">`;

    for (let j = 1; j <= subjects; j++) {
      div.innerHTML += `<input type="number" class="mark" placeholder="Subject ${j}" min="0" max="100" required />`;
    }

    // Profile toggle button & container
    div.innerHTML += `</div>
      <button type="button" class="toggleProfile" data-id="${i}">👁️ Show Profile</button>
      <div class="profile" id="profile-${i}" style="display:none;"></div>
      <hr>`;
    container.appendChild(div);
  }

  // Add toggle event listeners
  document.querySelectorAll(".toggleProfile").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const profileDiv = document.getElementById(`profile-${id}`);
      if (profileDiv.style.display === "none") {
        profileDiv.style.display = "block";
        btn.textContent = "Hide Profile";
      } else {
        profileDiv.style.display = "none";
        btn.textContent = " Show Profile";
      }
    });
  });
});

// Process student data and calculate averages/grades
document.getElementById("studentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const studentDivs = document.querySelectorAll(".student-block");
  const students = [];
  const gradeCount = { "A+": 0, "A": 0, "B": 0, "C": 0, "F": 0 };
  let totalAverage = 0;

  studentDivs.forEach((div, index) => {
    const name = div.querySelector(".sname").value;
    const marks = Array.from(div.querySelectorAll(".mark")).map(m => parseInt(m.value));
    const avg = marks.reduce((a,b)=>a+b,0)/marks.length;

    let grade = "";
    if (avg >= 90) grade = "A+";
    else if (avg >= 80) grade = "A";
    else if (avg >= 70) grade = "B";
    else if (avg >= 60) grade = "C";
    else grade = "F";

    gradeCount[grade]++;
    totalAverage += avg;
    students.push({ name, average: avg, grade });

    // Update profile content
    const profileDiv = document.getElementById(`profile-${index+1}`);
    profileDiv.innerHTML = `
      <strong>Profile:</strong> Name: ${name}, Average: ${avg.toFixed(2)}, Grade: ${grade}
    `;
  });

  const classAverage = totalAverage / students.length;

  // Display results in table
  const tableBody = document.querySelector("#resultTable tbody");
  tableBody.innerHTML = "";
  students.forEach(s => {
    tableBody.innerHTML += `<tr>
      <td>${s.name}</td>
      <td>${s.average.toFixed(2)}</td>
      <td>${s.grade}</td>
    </tr>`;
  });

  document.getElementById("summary").innerHTML = `
    Class Average: ${classAverage.toFixed(2)} | 
    A+: ${gradeCount["A+"]}, A: ${gradeCount["A"]}, 
    B: ${gradeCount["B"]}, C: ${gradeCount["C"]}, F: ${gradeCount["F"]}
  `;
});
