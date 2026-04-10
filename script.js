const notes = [
    "G3", "A3", "B3", "C4", "D4", "E4", "F4",
    "G4", "A4", "B4", "C5", "D5", "E5", "F5",
    "G5", "A5", "B5", "C6"
];

const letters = ["G", "A", "B", "C", "D", "E", "F"];

let currentNote = "";
let correctLetter = "";

const noteImg = document.getElementById("note-image");
const optionsDiv = document.getElementById("options");
const feedbackDiv = document.getElementById("feedback");
const newRoundBtn = document.getElementById("new-round");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createOptions(correct) {
    let opts = [correct];
    while (opts.length < 4) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        if (!opts.includes(randomLetter)) opts.push(randomLetter);
    }
    return shuffle(opts);
}

function renderOptions(options) {
    optionsDiv.innerHTML = "";
    options.forEach(letter => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = letter;
        btn.addEventListener("click", () => checkAnswer(letter, btn));
        optionsDiv.appendChild(btn);
    });
}

// Hàm kiểm tra đáp án + hiệu ứng chớp button
function checkAnswer(selected, clickedBtn) {
    // Vô hiệu hóa tất cả button
    document.querySelectorAll(".option-btn").forEach(b => b.disabled = true);

    const allButtons = document.querySelectorAll(".option-btn");

    if (selected === correctLetter) {
        // === CHỌN ĐÚNG ===
        feedbackDiv.innerHTML = `✅ Bạn Chọn Đúng Rồi 🎉`;
        feedbackDiv.classList.add("correct");
        feedbackDiv.classList.remove("wrong");

        // Button người dùng chọn sẽ chớp chớp
        clickedBtn.classList.add("flash-correct");
        clickedBtn.style.backgroundColor = "rgba(0, 255, 136, 0.4)";
    } 
    else {
        // === CHỌN SAI ===
        feedbackDiv.innerHTML = `❌ Ồ Tiếc Nha Sai Rồi !`;
        feedbackDiv.classList.add("wrong");
        feedbackDiv.classList.remove("correct");

        // Tìm và làm button đúng chớp chớp
        allButtons.forEach(btn => {
            if (btn.textContent === correctLetter) {
                btn.classList.add("flash-correct");
                btn.style.backgroundColor = "rgba(0, 255, 136, 0.4)";
            }
        });

        // Button người dùng chọn (sai) sẽ có màu đỏ nhạt
        clickedBtn.style.backgroundColor = "rgba(255, 51, 102, 0.3)";
    }
}

function newRound() {
    // Reset mọi thứ
    feedbackDiv.textContent = "";
    feedbackDiv.classList.remove("correct", "wrong");

    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.classList.remove("flash-correct");
        btn.style.backgroundColor = "";
    });

    // Chọn note mới
    currentNote = notes[Math.floor(Math.random() * notes.length)];
    correctLetter = currentNote[0];

    // Đổi ảnh
    noteImg.src = currentNote + ".jpg";

    // Tạo lựa chọn mới
    const options = createOptions(correctLetter);
    renderOptions(options);
}

// Sự kiện nút Lượt Mới
newRoundBtn.addEventListener("click", newRound);

// Khởi động game
newRound();