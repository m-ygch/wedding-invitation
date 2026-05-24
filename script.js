document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. カウントダウンタイマー
    // ==========================================================================
    // 挙式日を設定 (2026年9月26日 09:50)
    const targetDate = new Date('2026-09-26T09:50:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        // HTML要素のキャッシュ
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        // 要素が存在しない場合はスキップ
        if (!daysElement) return;

        if (difference <= 0) {
            document.getElementById('countdown').innerHTML = "<div class='wedding-started'>Happy Wedding Day!</div>";
            clearInterval(timerInterval);
            return;
        }

        // 時間の計算
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // 桁数のパディング (3桁/2桁表示の最適化)
        daysElement.textContent = String(days).padStart(3, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    };

    // 初回実行と1秒ごとの定期実行
    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);


    // ==========================================================================
    // 2. ナビゲーションのスクロールエフェクト & スムーズスクロール
    // ==========================================================================
    const nav = document.querySelector('.main-nav');
    
    // スクロール時の影エフェクト (スロットリングによるパフォーマンス最適化)
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // スムーズスクロール制御 (固定ナビの高さ分をオフセット)
    const navLinks = document.querySelectorAll('.main-nav a, .scroll-indicator');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || '#about'; // インジケーター用デフォルト
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.replace('#', '');
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navHeight = nav ? nav.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
