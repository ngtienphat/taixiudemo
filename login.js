document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Ngừng hành động gửi form mặc định

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const errorNotification = document.getElementById('login-notification');
    const successNotification = document.getElementById('success-notification');

    // Lấy thông tin đăng ký đã lưu trong localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Kiểm tra tài khoản và mật khẩu
    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('userLoggedIn', true);
        localStorage.setItem('username', username); // Lưu username

        // Hiển thị thông báo thành công
        successNotification.classList.add('show'); // Hiển thị thông báo thành công
        setTimeout(function() {
            successNotification.classList.remove('show'); // Ẩn thông báo sau 3 giây
        }, 3000);

        // Chuyển hướng sang trang chính
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 3000);
    } else {
        // Hiển thị thông báo lỗi
        errorNotification.classList.add('show'); // Hiển thị thông báo lỗi
        setTimeout(function() {
            errorNotification.classList.remove('show'); // Ẩn thông báo sau 3 giây
        }, 3000);
    }
});

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
