// Đăng ký tài khoản mới (trong trang đăng ký)
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Ngừng hành động mặc định của form

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Kiểm tra xem tên đăng nhập đã tồn tại chưa
    if (localStorage.getItem(username)) {
        alert('Tên đăng nhập đã tồn tại!');
        return;
    }

    // Lưu thông tin người dùng vào Local Storage
    localStorage.setItem(username, password);

    alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');

    // Chuyển hướng về trang đăng nhập sau một thời gian ngắn để đảm bảo mọi thứ đã hoàn tất
    setTimeout(function () {
        window.location.href = 'dangnhap.html'; // Chuyển hướng về trang đăng nhập
    }, 100); // Trì hoãn 100ms để đảm bảo quá trình đăng ký hoàn tất
});

// Đăng nhập (trong trang đăng nhập)
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Ngừng hành động mặc định của form

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Kiểm tra thông tin đăng nhập
    const storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        localStorage.setItem('loggedIn', true);
        window.location.href = 'index.html';
    } else {
        alert('Tên đăng nhập hoặc mật khẩu sai!');
    }
});
