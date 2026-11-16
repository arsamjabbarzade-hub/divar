<?php

session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
require_once __DIR__ . '/db.php';

date_default_timezone_set("Asia/Tehran");

?>

<!doctype html>
<html lang="fa" dir="rtl">

<head>

    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="theme-color" content="#a62626">

    <title>دیوار</title>

    <link rel="icon" href="divar.png">

    <link rel="stylesheet" href="style.css">

</head>

<body style="font-family: ;" data-logged-in="<?= isset($_SESSION['user_id']) ? '1' : '0' ?>" data-csrf="<?= htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8') ?>">

    <!-- ============================= -->
    <!-- نوار بالایی سایت -->
    <!-- ============================= -->

    <header class="topbar">

        <a class="brand" href="#" aria-label="دیوار">

            <img src="divar2.png" alt="دیوار">

            <b>دیوار</b>

        </a>

        <button class="city" id="cityBtn">

            📍 تهران

            <span>⌄</span>

        </button>

        <div class="searchbox">

            <span>⌕</span>

            <input
                id="searchInput"
                placeholder="جستجو در همهٔ آگهی‌ها..."
                autocomplete="off"
            >

            <button id="clearSearch" title="پاک کردن">×</button>

        </div>

        <button
            class="icon-btn"
            id="themeBtn"
            title="تغییر پوسته"
        >
            🌙
        </button>
<button class="login-btn" id="profileBtn">
    👤 دیوار من
</button>
        <button class="post-btn" id="postBtn">

            ＋ ثبت آگهی

        </button>

    </header>


    <!-- ============================= -->
    <!-- جستجوی نسخه موبایل -->
    <!-- ============================= -->

    <div class="mobile-search">

        <div class="searchbox">

            <span>⌕</span>

            <input
                id="mobileSearch"
                placeholder="جستجو در همهٔ آگهی‌ها"
            >

            <button id="mobileClear">×</button>

        </div>

    </div>


    <!-- ============================= -->
    <!-- محتوای اصلی سایت -->
    <!-- ============================= -->

    <main class="layout">


        <!-- ============================= -->
        <!-- نوار کناری و فیلترها -->
        <!-- ============================= -->

        <aside class="sidebar">

            <h3>دسته‌بندی‌ها</h3>

            <button class="cat active" data-cat="همه">

                ▦ همهٔ آگهی‌ها

            </button>


            <div class="side-line"></div>

            <h3>فیلترها</h3>


            <label class="filter-label">

                حداقل قیمت (تومان)

                <input
                    id="minPrice"
                    type="number"
                    min="0"
                    placeholder="مثلاً ۱۰۰۰۰۰۰"
                >

            </label>


            <label class="filter-label">

                حداکثر قیمت (تومان)

                <input
                    id="maxPrice"
                    type="number"
                    min="0"
                    placeholder="مثلاً ۵۰۰۰۰۰۰۰"
                >

            </label>


            <label class="checkline">

                <input id="onlyPhoto" type="checkbox">

                فقط عکس‌دارها

            </label>


            <button class="apply-btn" id="applyFilters">

                اعمال فیلتر

            </button>

            <button class="reset-btn" id="resetFilters">

                حذف فیلترها

            </button>

        </aside>


        <!-- ============================= -->
        <!-- بخش نمایش آگهی‌ها -->
        <!-- ============================= -->

        <section class="content">


            <!-- عنوان و مرتب‌سازی -->

            <div class="heading">

                <div>

                    <h1 id="pageTitle">آگهی‌های تهران</h1>

                    <p id="resultCount">در حال نمایش آگهی‌ها</p>

                </div>


                <select id="sortSelect" aria-label="مرتب‌سازی">

                    <option value="new">جدیدترین</option>

                    <option value="cheap">ارزان‌ترین</option>

                    <option value="expensive">گران‌ترین</option>

                </select>

            </div>


            <!-- ============================= -->
            <!-- دسته‌بندی‌های سریع -->
            <!-- ============================= -->

            <div class="chips">

                <button class="chip selected" data-cat="همه">

                    همه

                </button>

                <button class="chip" data-cat="املاک">

                    املاک

                </button>

                <button class="chip" data-cat="وسایل نقلیه">

                    خودرو

                </button>

                <button class="chip" data-cat="کالای دیجیتال">

                    موبایل و دیجیتال

                </button>

                <button class="chip" data-cat="خانه و آشپزخانه">

                    خانه

                </button>

            </div>


            <!-- ============================= -->
            <!-- فهرست آگهی‌ها -->
            <!-- ============================= -->

            <div
                id="listingGrid"
                class="listing-grid"
            ></div>


            <!-- صفحه‌بندی -->

            <div
                id="pagination"
                class="pagination"
            ></div>


            <!-- ============================= -->
            <!-- وضعیت خالی بودن آگهی‌ها -->
            <!-- ============================= -->

            <div
                id="emptyState"
                class="empty hidden"
            >

                <div>🔎</div>

                <h2>آگهی‌ای پیدا نشد!</h2>

                <p>
                    عبارت جستجو یا فیلترها را تغییر بده.
                </p>
<a href="login.php">
                <button
                    class="apply-btn"
                    id="emptyReset"
                >
                
                    ثبت نام
                
                </button>
</a>
            </div>


        </section>

    </main>


    <!-- ============================= -->
    <!-- منوی پایین صفحه موبایل -->
    <!-- ============================= -->

    <nav class="bottom-nav">

        <button
            class="nav-item active"
            data-page="home"
        >

            <span>▦</span>

            آگهی‌ها

        </button>


        <button
            class="nav-item"
            data-page="categories"
        >

            <span>☷</span>

            دسته‌ها

        </button>


        <button
            class="nav-item post-nav"
            id="mobilePost"
        >

            <span>＋</span>

            ثبت آگهی

        </button>


        <button
            class="nav-item"
            data-page="chat"
        >

            <span>☏</span>

            چت

        </button>


        <button
            class="nav-item"
            data-page="profile"
        >

            <span>♙</span>

            دیوار من

        </button>

    </nav>


    <!-- ============================= -->
    <!-- پنجره مودال -->
    <!-- ============================= -->

    <div
        id="modalRoot"
        class="modal-root hidden"
        role="dialog"
        aria-modal="true"
    >

        <div
            class="modal-backdrop"
            data-close="1"
        ></div>


        <div
            class="modal"
            id="modalBox"
        >

            <button
                class="modal-close"
                data-close="1"
            >

                ×

            </button>


            <div id="modalContent"></div>

        </div>

    </div>




        <!-- ============================= -->
    <!-- پیام‌های اطلاع‌رسانی -->
    <!-- ============================= -->

    <div id="toast" class="toast"></div>


    <!-- ============================= -->
    <!-- فایل جاوااسکریپت -->
    <!-- ============================= -->

    <script src="script.js"></script>

</body>

</html>