<?php

// تلاش برای اتصال به MySQL؛ اگر در دسترس نبود، به SQLite محلی برگرد
// تا ثبت‌نام و ورود بدون نصب MySQL هم کار کنند.

$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'arsamjab_project';
$DB_PORT = 3306;

$pdo_options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $dsn = "mysql:host={$DB_HOST};port={$DB_PORT};dbname={$DB_NAME};charset=utf8mb4";
    $db = new PDO($dsn, $DB_USER, $DB_PASS, $pdo_options);
} catch (PDOException $e) {
    $sqlite_path = __DIR__ . '/divar.sqlite';
    $db = new PDO('sqlite:' . $sqlite_path, null, null, $pdo_options);
    $db->exec('PRAGMA journal_mode = WAL');
    $db->exec('PRAGMA foreign_keys = ON');
    // ساختار مشابه جدول users در database.sql
    $db->exec('CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone VARCHAR(11) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )');
}
