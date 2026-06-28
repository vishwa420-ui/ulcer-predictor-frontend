const API_URL = "https://ulcer-predictor-backend.vercel.app/";

const predictBtn = document.getElementById("predictBtn");

predictBtn.addEventListener("click", predictRisk);

async function predictRisk() {

    const data = {

        gender: document.getElementById("gender").value,

        age_group: document.getElementById("age_group").value,

        burning_pain: document.getElementById("burning_pain").checked,

        pain_empty_stomach: document.getElementById("pain_empty_stomach").checked,

        pain_after_eating: document.getElementById("pain_after_eating").checked,

        night_pain: document.getElementById("night_pain").checked,

        bloating: document.getElementById("bloating").checked,

        nausea: document.getElementById("nausea").checked,

        heartburn: document.getElementById("heartburn").checked,

        chest_pain: document.getElementById("chest_pain").checked,

        swallowing_difficulty: document.getElementById("swallowing_difficulty").checked,

        appetite_loss: document.getElementById("appetite_loss").checked,

        black_stool: document.getElementById("black_stool").checked,

        vomiting_blood: document.getElementById("vomiting_blood").checked,

        stress: document.getElementById("stress").checked,

        nsaid_use: document.getElementById("nsaid_use").checked,

        h_pylori: document.getElementById("h_pylori").checked

    };

    predictBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Predicting...';

    predictBtn.disabled = true;

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        if (!response.ok) {

            throw new Error("Prediction Failed");

        }

        const result = await response.json();

        updateResult(result);

    }

    catch (error) {

        alert("Cannot connect to FastAPI Server.");

        console.log(error);

    }

    finally {

        predictBtn.innerHTML =
            '<i class="fa-solid fa-magnifying-glass"></i> Predict Risk';

        predictBtn.disabled = false;

    }

}

function updateResult(result) {

    const risk = Number(result.risk);

    document.getElementById("riskValue").innerHTML =
        risk.toFixed(2) + "%";

    document.getElementById("progressBar").style.width =
        risk + "%";

    document.getElementById("riskLevel").innerHTML =
        result.level;

    document.getElementById("ulcerType").innerHTML =
        result.ulcer_type;

    const suggestionBox =
        document.getElementById("suggestions");

    suggestionBox.innerHTML = "";

    result.suggestions.forEach(function (item) {

        const li = document.createElement("li");

        li.innerHTML =
            '<i class="fa-solid fa-circle-check" style="color:green;margin-right:8px;"></i>' +
            item;

        suggestionBox.appendChild(li);

    });

    const circle = document.querySelector(".circle");

    if (risk < 30) {

        circle.style.background =
            "linear-gradient(135deg,#16a34a,#4ade80)";

    }

    else if (risk < 60) {

        circle.style.background =
            "linear-gradient(135deg,#eab308,#facc15)";

    }

    else if (risk < 80) {

        circle.style.background =
            "linear-gradient(135deg,#f97316,#fb923c)";

    }

    else {

        circle.style.background =
            "linear-gradient(135deg,#dc2626,#ef4444)";

    }

}
