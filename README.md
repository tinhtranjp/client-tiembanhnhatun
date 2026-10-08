# Tun Tun học tiếng nhật !

// db uml

<div style="page-break-after: always;"></div>

# User action

Register, login, update profile, chat vs admin...

# Role

1. Admin
2. User

### Đăng ký user

![Flow register](doc-img/user-register-action.png)

#send mail: String url = "https://tuntunhoctiengnhat.com/account/confirm-email?email=" + email + "&" + "code=" + maKichHoat;

#check mail: click link -> client control

#send code confirm: post -> /users/confirm-email (String email, String confirmCode)

#lấy mã code mới: post -> /users/confirm-email-code (String email)

<div style="page-break-after: always;"></div>

# User login

### Đăng nhập

#login -> post -> /users/login [UserDTO.LoginRequest]

          success -> [UserDTO.LoginResponse]

          fail    -> case user ban : contact admin
                     case password invalid : #forward-password

<div style="page-break-after: always;"></div>

### Quên mật khẩu

#forward-password -> post -> /users/forward-password (String email)

            success -> #reset-password

            fail    -> ##forward-password

### Thay đổi mật khẩu

#reset-password -> post -> /users/reset-password [UserDTO.resetPassRequest]

            success -> change password

            fail    -> #forward-password

<div style="page-break-after: always;"></div>
