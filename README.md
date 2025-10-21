
## 🧾 Report Card Processor — Teacher Dashboard

### 🎯 Overview

**Report Card Processor** is a web-based tool for teachers to manage and evaluate student marks efficiently.
It calculates averages, assigns grades, and provides class-level analytics like overall class average and grade distribution.

---

### 🧩 Features

✅ Enter number of subjects and students dynamically
✅ Input marks for each student
✅ Automatically calculates average and grade
✅ Displays class summary (A+, A, B, C, F count)
✅ Responsive teacher dashboard UI
✅ Real-time backend processing with Spark Java
✅ Export-ready (PDF/CSV options coming soon!)

---

### 🧠 Tech Stack

**Frontend:** HTML, CSS, JavaScript
**Backend:** Java (Spark Framework, Gson Library)
**Build Tool:** Maven
**Deployment:** GitHub Pages + Java backend (local/server)

---

### ⚙️ Setup Instructions

#### 🔹 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

#### 🔹 2. Run the Java Backend

Make sure you have **JDK 17+** and **Spark framework** dependencies added.
If using Maven:

```bash
mvn clean compile exec:java -Dexec.mainClass="ReportCardProcessor"
```

Or directly:

```bash
java -cp "lib/*;." ReportCardProcessor
```

#### 🔹 3. Open Frontend

Open `index.html` in your browser.
Your app will connect to the backend endpoint at `http://localhost:4567/process`.


**Class Summary:**

* Class Average: 88.75
* A+: 1 | A: 1 | B: 0 | C: 0 | F: 0

---

### 📁 Folder Structure

```
ReportCardProcessor/
│
├── index.html
├── script.js
├── style.css
├── src/
│   └── main/java/ReportCardProcessor.java
├── lib/
│   ├── spark-core.jar
│   └── gson.jar
└── README.md
```
### 💡 Future Enhancements

* [ ] Add login for teachers
* [ ] Export report to PDF/Excel
* [ ] Graphical performance charts
* [ ] Student progress tracking over semesters
