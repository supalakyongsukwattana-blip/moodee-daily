function saveMood() {
    const date = document.getElementById("dateInput").value;
    const mood = document.getElementById("moodInput").value;
    const note = document.getElementById("noteInput").value;

    if (!date || !mood) {
        alert("กรุณาเลือกวันที่และอารมณ์");
        return;
    }
    const moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods.push({ date, mood, note });

    localStorage.setItem("moods", JSON.stringify(moods));   // เคลียร์ช่องกรอก
    document.getElementById("noteInput").value = "";    //วาดแผนที่ใหม่ทันที
    renderJourney();
}

function renderJourney() {
    const journey = document.getElementById("journey");
    journey.innerHTML = "";

    const moods = JSON.parse(localStorage.getItem("moods")) || [];

    moods.forEach(moodData => {
        const stop = document.createElement("div"); // กล่องแต่ละจุด
        stop.className = "stop";

        const dot = document.createElement("div"); // วงกลมอิโมจิ
        dot.className = "dot";
        dot.textContent = moodData.mood;

        const card = document.createElement("div"); // การ์ดข้อมูล
        card.className = "card";

        const date = document.createElement("div"); // วันที่
        date.className = "date";
        date.textContent = new Date(moodData.date).toLocaleDateString("th-TH");

        const note = document.createElement("div"); // โน้ต
        note.className = "note";
        note.textContent =
            moodData.note || "วันนี้เราผ่านมาอีกหนึ่งวัน 🤍";

        // รวมทั้งหมด
        card.appendChild(date);
        card.appendChild(note);

        stop.appendChild(dot);
        stop.appendChild(card);

        journey.appendChild(stop);
    });
}

function clearJourney() {
    const confirmClear = confirm("เริ่มการเดินทางใหม่ใช่ไหม");

    if (!confirmClear) return;
    localStorage.removeItem("moods");  // ลบข้อมูลทั้งหมด

    const journey = document.getElementById("journey");    // ล้างแผนที่บนหน้าจอทันที
    journey.innerHTML = "";
}


renderJourney();
