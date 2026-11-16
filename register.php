<?php
session_start();
require_once __DIR__ . '/db.php';
if (empty($_SESSION['csrf_token'])) $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
if (!empty($_SESSION['user_id'])) { header('Location: index.php'); exit; }
function fa_digits_reg($v) {
 return strtr($v, ['۰'=>'0','۱'=>'1','۲'=>'2','۳'=>'3','۴'=>'4','۵'=>'5','۶'=>'6','۷'=>'7','۸'=>'8','۹'=>'9','٠'=>'0','١'=>'1','٢'=>'2','٣'=>'3','٤'=>'4','٥'=>'5','٦'=>'6','٧'=>'7','٨'=>'8','٩'=>'9']);
}
$error=''; $step=$_SESSION['register_step'] ?? 1;
if ($_SERVER['REQUEST_METHOD']==='POST') {
 if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'] ?? '')) {
  $error='درخواست نامعتبر است. صفحه را تازه کنید.';
 } elseif (isset($_POST['send_code'])) {
  $phone=fa_digits_reg(trim($_POST['phone'] ?? ''));
  $password=$_POST['password'] ?? ''; $confirm=$_POST['confirm_password'] ?? '';
  if (!preg_match('/^09[0-9]{9}$/D',$phone)) $error='شماره موبایل را با ۰۹ و ۱۱ رقم وارد کن.';
  elseif (strlen($password)<8 || strlen($password)>72) $error='رمز عبور باید بین ۸ تا ۷۲ کاراکتر باشد.';
  elseif ($password!==$confirm) $error='تکرار رمز عبور یکسان نیست.';
  else {
   $q=$db->prepare('SELECT id FROM users WHERE phone=?'); $q->execute([$phone]);
   if ($q->fetch()) $error='این شماره قبلاً ثبت‌نام کرده است.';
   else {
    $_SESSION['register_phone']=$phone;
    $_SESSION['register_password']=password_hash($password,PASSWORD_DEFAULT);
    $_SESSION['register_code']=(string)random_int(10000,99999);
    $_SESSION['register_expires']=time()+300;
    $_SESSION['register_step']=2; $step=2;
   }
  }
 } elseif (isset($_POST['verify_code'])) {
  $code=fa_digits_reg(trim($_POST['captcha'] ?? ''));
  if (empty($_SESSION['register_code']) || time()>($_SESSION['register_expires'] ?? 0)) {
   $error='کد نمایشی منقضی شده است؛ دوباره درخواست کد کن.';
   unset($_SESSION['register_code'],$_SESSION['register_step'],$_SESSION['register_expires']);
   $step=1;
  } elseif (!hash_equals($_SESSION['register_code'],$code)) {
   $error='کد نمایشی اشتباه است.';
   $_SESSION['register_code']=(string)random_int(10000,99999); $step=2;
  } else {
   try {
    $q=$db->prepare('INSERT INTO users (phone,password) VALUES (?,?)');
    $q->execute([$_SESSION['register_phone'],$_SESSION['register_password']]);
    unset($_SESSION['register_phone'],$_SESSION['register_password'],$_SESSION['register_code'],$_SESSION['register_expires'],$_SESSION['register_step']);
    header('Location: login.php?registered=1'); exit;
   } catch (PDOException $e) { $error='ثبت‌نام انجام نشد؛ این شماره ممکن است قبلاً ثبت شده باشد.'; $step=1; }
  }
 }
}
?>
<!doctype html><html lang="fa" dir="rtl"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>ثبت‌نام در دیوار من</title><link rel="stylesheet" href="style.css">
<style>
.auth-wrap{min-height:100vh;display:grid;place-items:center;background:#f7f7f7;padding:20px}
.auth-box{width:100%;max-width:410px;background:#fff;border:1px solid #eee;border-radius:14px;padding:30px;box-shadow:0 8px 30px #0000000a}
.auth-box h2{text-align:center;margin:0 0 8px}.auth-sub{text-align:center;color:#777;font-size:13px;margin-bottom:25px}
.auth-box label{display:block;font-size:13px;margin:15px 0 7px}
.auth-box input{width:100%;padding:13px;border:1px solid #ddd;border-radius:8px;outline:none;font:inherit}
.auth-box input:focus{border-color:#a62626}.auth-submit{width:100%;padding:13px;border:0;border-radius:8px;background:#a62626;color:#fff;font:inherit;cursor:pointer;margin-top:18px}
.auth-error{background:#fff0f0;color:#b42318;padding:11px;border-radius:8px;font-size:13px;margin:15px 0}
.auth-foot{text-align:center;font-size:13px;margin-top:22px;color:#666}.auth-foot a{color:#a62626;text-decoration:none;font-weight:bold}
.demo-code{background:#fff5f5;border:2px dashed #a62626;color:#a62626;border-radius:10px;text-align:center;font-size:29px;font-weight:bold;letter-spacing:9px;padding:17px;margin:18px 0;user-select:none}
.demo-note{font-size:12px;color:#888;text-align:center;line-height:1.9}
</style></head><body><main class="auth-wrap"><section class="auth-box">
<h2>ثبت‌نام در دیوار من</h2><p class="auth-sub">برای ساخت حساب اطلاعاتت را وارد کن.</p>
<?php if($error): ?><div class="auth-error"><?= htmlspecialchars($error,ENT_QUOTES,'UTF-8') ?></div><?php endif; ?>
<?php if($step===1): ?>
<form method="post">
<input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token'],ENT_QUOTES,'UTF-8') ?>">
<label>شماره موبایل</label><input type="tel" name="phone" maxlength="11" inputmode="numeric" placeholder="09123456789" required value="<?= htmlspecialchars($_POST['phone'] ?? '',ENT_QUOTES,'UTF-8') ?>">
<label>رمز عبور</label><input type="password" name="password" minlength="8" required>
<label>تکرار رمز عبور</label><input type="password" name="confirm_password" minlength="8" required>
<button class="auth-submit" name="send_code" type="submit">ارسال کد نمایشی</button>
</form>
<?php else: ?>
<p class="demo-note">کد نمایشی برای آزمایش ثبت‌نام ساخته شده است. این کد پیامک نمی‌شود.</p>
<div class="demo-code"><?= htmlspecialchars($_SESSION['register_code'],ENT_QUOTES,'UTF-8') ?></div>
<form method="post">
<input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token'],ENT_QUOTES,'UTF-8') ?>">
<label>کد ۵ رقمی را وارد کن</label><input name="captcha" maxlength="5" inputmode="numeric" autocomplete="off" required autofocus>
<button class="auth-submit" name="verify_code" type="submit">تأیید کد و تکمیل ثبت‌نام</button>
</form>
<?php endif; ?>
<div class="auth-foot">قبلاً ثبت‌نام کرده‌ای؟ <a href="login.php">ورود به حساب</a></div>
<div class="auth-foot"><a href="index.php">بازگشت به صفحه اصلی</a></div>
</section></main></body></html>
