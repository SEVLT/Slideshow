var n = 1;
var timer = null;
//为了避免切换标签页产生“动画积累”问题，使用以下方法：
//即页面加载和 onfocus 开始计时器，页面 onblur 清除计时器
window.onload = function () {
	this.slide();
};
window.onfocus = function () {
	this.slide();
};
window.onblur = function () {
	clearInterval(timer);
};
function slide() {
	timer = setInterval(() => {
		$(`.window .imga img:nth-child(${num(n)})`) /* 字符串插值法插入num(n) */
			.removeClass('current')
			.addClass('leave')
			// 当前页面进入 leave 状态后，再切换到enter状态（“transitionend” 表示之前效果完成后再执行）
			// 且仅执行一次，因此此处为 one() 而不是 on()，若使用 on() 则会在第二次轮播出现 BUG
			.one('transitionend', (e) => {
				$(e.currentTarget).removeClass('leave').addClass('enter');
			});
		$(`.window .imga img:nth-child(${num(n + 1)})`)
			.removeClass('enter')
			.addClass('current');
		n += 1;
	}, 3000);
}

/* n 的取值始终为 1-5 */
function num(n) {
	if (n > 5) {
		n = n % 5;
		if (n === 0) {
			n = 5;
		}
	}
	return n;
}
