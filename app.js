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
let currentNotification = null; // Biến để lưu thông báo hiện tại

function closeNotification() {
    if (currentNotification) {
        currentNotification.classList.remove('show');
        setTimeout(() => {
            currentNotification.remove();
            currentNotification = null;
        }, 500); // Thời gian để thông báo biến mất hoàn toàn
    }
}
function showJackpotNotification(message, isWin) {
    closeNotification(); // Đóng thông báo hiện tại nếu có

    const jackpotNotification = document.createElement('div');
    jackpotNotification.classList.add('jackpot-notification');
    if (!isWin) {
        jackpotNotification.classList.add('lose');
    }
    jackpotNotification.innerText = message;
    document.body.appendChild(jackpotNotification);

    // Lưu thông báo hiện tại
    currentNotification = jackpotNotification;

    // Hiển thị thông báo
    setTimeout(() => {
        jackpotNotification.classList.add('show');
    }, 100);

    // Tạo hiệu ứng pháo hoa nếu thắng
    if (isWin) {
        createFireworks();
    }

    // Ẩn thông báo sau 15 giây
    setTimeout(() => {
        closeNotification();
    }, 15000); // 15 giây
}



function createFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.classList.add('fireworks');
    document.body.appendChild(fireworksContainer);

    for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        firework.style.animationDelay = `${Math.random() * 1}s`;
        fireworksContainer.appendChild(firework);
    }

    // Xóa hiệu ứng pháo hoa sau 2 giây
    setTimeout(() => {
        fireworksContainer.remove();
    }, 2000);
}
function playGame(choice) {
    closeNotification(); // Đóng thông báo hiện tại khi bắt đầu lượt cược mới

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

            // Hiển thị thông báo nổ hũ khi thắng
            showJackpotNotification(`🎉 Nổ Hũ! Bạn đã thắng ${winnings.toLocaleString("vi-VN")} VND`, true);
        } else {
            gameResult.innerHTML = `❌ Bạn đã thua! Mất: ${betAmount.toLocaleString("vi-VN")} VND`;
            gameResult.style.color = "red";

            // Hiển thị thông báo thua
            showJackpotNotification(`❌ Bạn đã thua ${betAmount.toLocaleString("vi-VN")} VND`, false);
        }

        // Xóa số tiền đã cược sau khi hiển thị kết quả
    
    }, 1200); // Kết thúc quay trong 1.2 giây
}
let snowflakes = [];

function createSnowflake() {
    if (snowflakes.length >= 50) return; // Giảm số lượng bông tuyết từ 100 xuống 50

    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.innerHTML = "❄";

    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.fontSize = Math.random() * 10 + 10 + "px"; // Kích thước bông tuyết
    snowflake.style.animationDuration = Math.random() * 3 + 2 + "s"; // Tốc độ rơi

    document.getElementById("snow-container").appendChild(snowflake);
    snowflakes.push(snowflake);

    setTimeout(() => {
        snowflake.remove();
        snowflakes = snowflakes.filter(s => s !== snowflake);
    }, parseFloat(snowflake.style.animationDuration) * 1000);
}

function snowLoop() {
    createSnowflake();
    setTimeout(snowLoop, 200); // Giảm tốc độ tạo bông tuyết (thay vì requestAnimationFrame)
}

snowLoop();

// Kiểm tra đăng nhập khi truy cập vào sảnh chính
checkLogin();
