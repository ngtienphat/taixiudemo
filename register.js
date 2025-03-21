document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Ngừng hành động gửi form mặc định

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const notification = document.getElementById('notification');
    const registerNotification = document.getElementById('register-notification');

    // Nếu mật khẩu và xác nhận mật khẩu không khớp
    if (password !== confirmPassword) {
        registerNotification.classList.add('show'); // Hiển thị thông báo lỗi
        setTimeout(function() {
            registerNotification.classList.remove('show'); // Ẩn thông báo lỗi sau 3 giây
        }, 3000);
        return;
    }

    // Lưu thông tin đăng ký vào localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Hiển thị thông báo đăng ký thành công
    notification.classList.add('show');
    setTimeout(function() {
        notification.classList.remove('show');
        window.location.href = 'dangnhap.html'; // Chuyển hướng sang trang đăng nhập
    }, 3000);
});
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