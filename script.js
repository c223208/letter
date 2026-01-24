// ウィンドウのドラッグ処理（共通）
const windows = document.querySelectorAll('.window');

windows.forEach(win => {
    // ヘッダー部分（title-bar）でのみドラッグ可能にする
    const titleBar = win.querySelector('.title-bar');
    
    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
        // ボタンをクリックした場合はドラッグを開始しない
        if(e.target.tagName === 'BUTTON') return;

        isDragging = true;
        // クリック位置とウィンドウ左上の差分を取得
        offsetX = e.clientX - win.getBoundingClientRect().left;
        offsetY = e.clientY - win.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        // 新しい位置を計算
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;

        win.style.left = newX + 'px';
        win.style.top = newY + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
        }
    });
});

// 赤ボタン：ウィンドウを閉じる（非表示にする）
function closeWindow(id) {
    const targetWindow = document.getElementById(id);
    if (targetWindow) {
        // アニメーションっぽく消す
        targetWindow.style.transition = 'opacity 0.2s, transform 0.2s';
        targetWindow.style.opacity = '0';
        targetWindow.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            targetWindow.style.display = 'none';
            // スタイルをリセット（次に表示する時のため）
            targetWindow.style.transform = ''; 
            targetWindow.style.opacity = '';
        }, 200);
    }
}

// フォルダアイコン：閉じたウィンドウを復活させる
function restoreWindows() {
    const msgWindows = document.querySelectorAll('.message-window');
    msgWindows.forEach(win => {
        if (win.style.display === 'none') {
            win.style.display = 'flex';
            // ふわっと表示させるアニメーション
            win.style.opacity = '0';
            win.style.transform = 'scale(0.9)';
            
            // 少し待ってから不透明に戻す
            requestAnimationFrame(() => {
                win.style.transition = 'opacity 0.3s, transform 0.3s';
                win.style.opacity = '1';
                win.style.transform = 'scale(1)';
            });
            
            // アニメーション設定が残らないように後始末
            setTimeout(() => {
                win.style.transition = '';
            }, 300);
        }
    });
}

// 緑ボタン：別ページへ移動する（詳細ページ）
function goToPage() {
    // 実際に移動したいURLに書き換えてください
    // 例: window.location.href = 'detail.html';
    alert('詳細ページへ移動します（リンク先を設定してください）');
}