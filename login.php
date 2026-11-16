<?php
session_start();
require_once __DIR__ . '/db.php';

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
if (!empty($_SESSION['user_id'])) {
    header('Location: index.php'); exit;
}
function fa_digits($v) {
    return strtr($v, ['۰'=>'0','۱'=>'1','۲'=>'2','۳'=>'3','۴'=>'4','۵'=>'5','۶'=>'6','۷'=>'7','۸'=>'8','۹'=>'9',
    '٠'=>'0','١'=>'1','٢'=>'2','٣'=>'3','٤'=>'4','٥'=>'5','٦'=>'6','٧'=>'7','٨'=>'8','٩'=>'9']);
}
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'] ?? '')) {
        $error = 'درخواست نامعتبر است. صفحه را تازه کنید.';
    } else {
        $phone = fa_digits(trim($_POST['phone'] ?? ''));
        $password = $_POST['password'] ?? '';
        if (!preg_match('/^09[0-9]{9}$/D', $phone)) {
            $error = 'شماره موبایل معتبر نیست.';
        } else {
            $stmt = $db->prepare('SELECT id, phone, password FROM users WHERE phone = ? LIMIT 1');
            $stmt->execute([$phone]);
            $user = $stmt->fetch();
            if ($user && password_verify($password, $user['password'])) {
                session_regenerate_id(true);
                $_SESSION['user_id'] = (int)$user['id'];
                $_SESSION['user_phone'] = $user['phone'];
                $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
                header('Location: index.php'); exit;
            } else {
                $error = 'شماره موبایل یا رمز عبور اشتباه است.';
            }
        }
    }
}
?>
<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>ورود به دیوار من</title><link rel="stylesheet" href="style.css">
<style>
.auth-wrap{min-height:100vh;display:grid;place-items:center;background:#f7f7f7;padding:20px}
.auth-box{width:100%;max-width:410px;background:#fff;border:1px solid #eee;border-radius:14px;padding:30px;box-shadow:0 8px 30px #0000000a}
.auth-box h2{text-align:center;margin:0 0 8px}.auth-sub{text-align:center;color:#777;font-size:13px;margin-bottom:25px}
.auth-box label{display:block;font-size:13px;margin:15px 0 7px}
.auth-box input{width:100%;padding:13px;border:1px solid #ddd;border-radius:8px;outline:none;font:inherit}
.auth-box input:focus{border-color:#a62626}.auth-submit{width:100%;padding:13px;border:0;border-radius:8px;background:#a62626;color:#fff;font:inherit;cursor:pointer;margin-top:18px}
.auth-error{background:#fff0f0;color:#b42318;padding:11px;border-radius:8px;font-size:13px;margin:15px 0}
.auth-foot{text-align:center;font-size:13px;margin-top:22px;color:#666}.auth-foot a{color:#a62626;text-decoration:none;font-weight:bold}
</style></head>
<body><main class="auth-wrap"><section class="auth-box">
<h2>ورود به دیوار من</h2><p class="auth-sub">برای ادامه شماره موبایل و رمز عبورت را وارد کن.</p>
<?php if ($error): ?><div class="auth-error"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div><?php endif; ?>
<?php if (isset($_GET['registered'])): ?><div class="auth-error" style="background:#edf9f0;color:#237a3b">ثبت‌نام با موفقیت انجام شد؛ حالا وارد شو.</div><?php endif; ?>
<form method="post">
<input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8') ?>">
<label for="phone">شماره موبایل</label><input id="phone" name="phone" type="tel" inputmode="numeric" maxlength="11" placeholder="09123456789" required value="<?= htmlspecialchars($_POST['phone'] ?? '', ENT_QUOTES, 'UTF-8') ?>">
<label for="password">رمز عبور</label><input id="password" name="password" type="password" required autocomplete="current-password">
<button class="auth-submit" type="submit">ورود به حساب</button>
</form>
<div class="auth-foot">اگر ثبت‌نام نکرده‌ای، <a href="register.php">ثبت‌نام کن</a></div>
<div class="auth-foot"><a href="index.php">بازگشت به صفحه اصلی</a></div>
</section></main></body></html>
