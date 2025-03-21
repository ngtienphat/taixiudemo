// Giả lập việc kiểm tra đăng nhập người dùng
function checkLogin() {
    const username = localStorage.getItem('username');
    if (!localStorage.getItem('userLoggedIn') || !username) {
        window.location.href = 'dangnhap.html';
    } else {
        // Cập nhật lời chào người dùng
        document.getElementById('welcome-message').innerText = `Chào ${username}, đã đến với trò chơi!`;
    }
}

// Hàm đăng xuất
function logout() {
    localStorage.removeItem('userLoggedIn'); // Xóa thông tin đăng nhập
    window.location.href = 'dangnhap.html'; // Chuyển hướng về trang đăng nhập
}
function formatCurrency(input) {
    let value = input.value.replace(/\D/g, ""); // Loại bỏ ký tự không phải số
    value = parseInt(value, 10) || 0;
    input.value = value.toLocaleString("vi-VN") + " VND"; // Thêm dấu phẩy và đơn vị
}
function playGame(choice) {
    const betInput = document.getElementById("bet-amount").value.replace(/\D/g, "");
    const betAmount = parseInt(betInput, 10);

    if (!betAmount || betAmount <= 0) {
        alert("Vui lòng nhập số tiền cược hợp lệ!");
        return;
    }

    const diceElements = [document.getElementById("dice1"), document.getElementById("dice2"), document.getElementById("dice3")];

    // Reset số về "?" và thêm hiệu ứng xoay
    diceElements.forEach(dice => {
        dice.innerHTML = "?"; 
        dice.classList.add("rolling");
    });

    setTimeout(() => {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const dice3 = Math.floor(Math.random() * 6) + 1;
        const total = dice1 + dice2 + dice3;

        // Hiển thị số và đảm bảo không xoay tiếp
        diceElements[0].innerHTML = dice1;
        diceElements[1].innerHTML = dice2;
        diceElements[2].innerHTML = dice3;

        // Dừng xoay ngay sau khi hiện số
        setTimeout(() => {
            diceElements.forEach(dice => dice.classList.remove("rolling"));
        }, 50); // Dừng ngay sau khi có số

        // Hiển thị kết quả ngay lập tức
        const gameResult = document.getElementById("game-result");

        if ((choice === "tai" && total > 10) || (choice === "xiu" && total <= 10)) {
            const winnings = betAmount * 2;
            gameResult.innerHTML = `🎉 Bạn đã thắng! Nhận được: ${winnings.toLocaleString("vi-VN")} VND`;
            gameResult.style.color = "green";
        } else {
            gameResult.innerHTML = `❌ Bạn đã thua! Mất: ${betAmount.toLocaleString("vi-VN")} VND`;
            gameResult.style.color = "red";
        }
    }, 1200); // Kết thúc quay trong 1.2 giây
}
let snowflakes = [];

function createSnowflake() {
    if (snowflakes.length >= 100) return; // Giới hạn số lượng bông tuyết

    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.innerHTML = "❄";

    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
    snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";

    document.getElementById("snow-container").appendChild(snowflake);
    snowflakes.push(snowflake);

    setTimeout(() => {
        snowflake.remove();
        snowflakes = snowflakes.filter(s => s !== snowflake);
    }, parseFloat(snowflake.style.animationDuration) * 1000);
}

function snowLoop() {
    createSnowflake();
    requestAnimationFrame(snowLoop);
}

snowLoop();

// Kiểm tra đăng nhập khi truy cập vào sảnh chính
checkLogin();