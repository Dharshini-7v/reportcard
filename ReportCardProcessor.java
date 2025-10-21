import static spark.Spark.*;
import com.google.gson.*;
import java.util.*;
import java.util.concurrent.*;
import java.nio.file.*;

class Student {
    String name;
    int[] marks;
    double average;
    String grade;

    void calculateResult() {
        int sum = 0;
        for (int m : marks) sum += m;
        average = (double) sum / marks.length;

        if (average >= 90) grade = "A+";
        else if (average >= 75) grade = "A";
        else if (average >= 60) grade = "B";
        else if (average >= 50) grade = "C";
        else grade = "F";
    }
}

public class ReportCardProcessor {
    public static void main(String[] args) {
        // Set port for backend
        port(8080);

        Gson gson = new Gson();

        // 🔹 Serve the index.html file when visiting the homepage
        get("/", (req, res) -> {
            res.type("text/html");
            try {
                return Files.readString(Paths.get("index.html"));
            } catch (Exception e) {
                res.status(500);
                return "<h3>Error loading index.html</h3><p>" + e.getMessage() + "</p>";
            }
        });

        // 🔹 Serve static assets (style.css, script.js)
        get("/style.css", (req, res) -> {
            res.type("text/css");
            return Files.readString(Paths.get("style.css"));
        });

        get("/script.js", (req, res) -> {
            res.type("application/javascript");
            return Files.readString(Paths.get("script.js"));
        });

        // 🔹 API endpoint to process student data
        post("/process", (req, res) -> {
            res.type("application/json");

            JsonObject input = gson.fromJson(req.body(), JsonObject.class);
            int subjects = input.get("subjects").getAsInt();
            JsonArray arr = input.getAsJsonArray("students");

            List<Student> results = new CopyOnWriteArrayList<>();
            ExecutorService executor = Executors.newFixedThreadPool(4);

            for (JsonElement elem : arr) {
                JsonObject sObj = elem.getAsJsonObject();
                Student s = new Student();
                s.name = sObj.get("name").getAsString();
                s.marks = gson.fromJson(sObj.get("marks"), int[].class);

                executor.execute(() -> {
                    s.calculateResult();
                    results.add(s);
                });
            }

            executor.shutdown();
            while (!executor.isTerminated()) {}

            JsonObject summary = new JsonObject();
            double totalAverage = 0;
            int aPlus = 0, a = 0, b = 0, c = 0, f = 0;

            for (Student s : results) {
                totalAverage += s.average;
                switch (s.grade) {
                    case "A+": aPlus++; break;
                    case "A": a++; break;
                    case "B": b++; break;
                    case "C": c++; break;
                    case "F": f++; break;
                }
            }

            summary.addProperty("classAverage", totalAverage / results.size());
            summary.addProperty("A+", aPlus);
            summary.addProperty("A", a);
            summary.addProperty("B", b);
            summary.addProperty("C", c);
            summary.addProperty("F", f);

            JsonObject output = new JsonObject();
            output.add("students", gson.toJsonTree(results));
            output.add("summary", summary);

            return gson.toJson(output);
        });

        System.out.println("✅ ReportCardProcessor running on http://localhost:8080/");
    }
}
