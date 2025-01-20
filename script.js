function openNav() {
	document.getElementById('mySidenav').style.width = '100%'
}

/* Close/hide the sidenav */
function closeNav() {
	document.getElementById('mySidenav').style.width = '0'
}

const btnUp = {
	el: document.querySelector('.btn-up'),
	show() {
		this.el?.classList.remove('btn-up_hide') // Убираем класс, если кнопка существует
	},
	hide() {
		this.el?.classList.add('btn-up_hide') // Добавляем класс, если кнопка существует
	},
	addEventListener() {
		window.addEventListener('scroll', () => {
			const scrollY = window.scrollY || document.documentElement.scrollTop
			scrollY > 400 ? this.show() : this.hide()
		})
		// При нажатии на кнопку перемещаемся вверх
		this.el?.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			})
		})
	},
}

btnUp.addEventListener()

// Функция для показа скрытых элементов при скролле
const hiddenElements = document.querySelectorAll('.hidden')

function revealOnScroll() {
	hiddenElements.forEach(element => {
		const elementTop = element.getBoundingClientRect().top
		const viewportHeight = window.innerHeight

		if (elementTop < viewportHeight - 100) {
			element.classList.add('visible') // Добавляем класс видимости
		}
	})
}

window.addEventListener('scroll', revealOnScroll)
revealOnScroll() // Запускаем функцию для проверки видимых элементов при загрузке страницы

// Ленивое изображение с использованием Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
	const lazyImages = document.querySelectorAll('img.lazy')

	if ('IntersectionObserver' in window) {
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target
					img.src = img.dataset.src // Устанавливаем изображение
					img.classList.add('loaded') // Добавляем класс loaded
					observer.unobserve(img) // Прекращаем наблюдение
				}
			})
		})

		lazyImages.forEach(img => observer.observe(img))
	} else {
		// Фолбэк для браузеров без Intersection Observer
		lazyImages.forEach(img => {
			img.src = img.dataset.src
			img.classList.add('loaded')
		})
	}
})

// Загрузка экрана с прогресс-баром
document.addEventListener('DOMContentLoaded', () => {
	const loader = document.querySelector('#loading-screen')
	const progressBar = document.querySelector('.loader-progress')
	let progress = 0

	function updateProgress(value) {
		progressBar.style.width = `${value}%`
	}

	// Симуляция загрузки
	const simulateProgress = setInterval(() => {
		if (progress < 90) {
			progress += 10
			updateProgress(progress)
		}
	}, 200)

	// Обработка полной загрузки страницы
	window.addEventListener('load', () => {
		clearInterval(simulateProgress) // Остановка симуляции
		progress = 100
		updateProgress(progress)

		// Скрытие загрузочного экрана
		setTimeout(() => {
			loader.style.opacity = '0'
			setTimeout(() => {
				loader.style.display = 'none'
			}, 500)
		}, 300)
	})
})

const NOTIFICATION_KEY = 'promoNotificationTimestamp'
const NOTIFICATION_COOLDOWN = 5 * 60 * 1000 // 5 минут в миллисекундах

function showNotification() {
	const promo = document.getElementById('promo')
	const isMobile = window.innerWidth <= 768

	promo.classList.add(isMobile ? 'mobile' : 'desktop')
	promo.classList.remove('hidden')
}

function closeNotification() {
	const promo = document.getElementById('promo')
	promo.classList.add('hidden')

	const now = Date.now()
	localStorage.setItem(NOTIFICATION_KEY, now)
}

document.addEventListener('DOMContentLoaded', () => {
	const lastShown = localStorage.getItem(NOTIFICATION_KEY)
	const now = Date.now()

	if (!lastShown || now - lastShown > NOTIFICATION_COOLDOWN) {
		showNotification()
	}
})
