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
		// удалим у кнопки класс btn-up_hide
		this.el.classList.remove('btn-up_hide')
	},
	hide() {
		// добавим к кнопке класс btn-up_hide
		this.el.classList.add('btn-up_hide')
	},
	addEventListener() {
		// при прокрутке содержимого страницы
		window.addEventListener('scroll', () => {
			// определяем величину прокрутки
			const scrollY = window.scrollY || document.documentElement.scrollTop
			// если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
			scrollY > 400 ? this.show() : this.hide()
		})
		// при нажатии на кнопку .btn-up
		document.querySelector('.btn-up').onclick = () => {
			// переместим в начало страницы
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			})
		}
	},
}

btnUp.addEventListener()

// const btnHide = {
//     el: document.querySelector('.buttons-media'),
//     show() {
//       // удалим у кнопки класс btn-up_hide
//       this.el.classList.remove('btn-up_hide');
//     },
//     hide() {
//       // добавим к кнопке класс btn-up_hide
//       this.el.classList.add('btn-up_hide');
//     },
//     addEventListener() {
//       // при прокрутке содержимого страницы
//       window.addEventListener('scroll', () => {
//         // определяем величину прокрутки
//         const scrollY = window.scrollY || document.documentElement.scrollTop;
//         // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
//         scrollY > 400 ? this.hide() : this.show();
//       });
//       // при нажатии на кнопку .btn-up
//     }
//   }

//   btnHide.addEventListener();
// Выбор всех скрытых элементов
const hiddenElements = document.querySelectorAll('.hidden')

// Функция для обработки появления элементов
function revealOnScroll() {
	hiddenElements.forEach(element => {
		const elementTop = element.getBoundingClientRect().top
		const viewportHeight = window.innerHeight

		// Если элемент появляется в видимой области
		if (elementTop < viewportHeight - 100) {
			element.classList.add('visible')
		}
	})
}

// Привязка функции к событию прокрутки
window.addEventListener('scroll', revealOnScroll)

// Для появления элементов, которые уже видны на экране при загрузке
revealOnScroll()
document.addEventListener('DOMContentLoaded', () => {
	const loader = document.querySelector('#loading-screen')
	const progressBar = document.querySelector('.loader-progress')

	let progress = 0
	const interval = setInterval(() => {
		progress += 10
		progressBar.style.width = `${progress}%`

		if (progress >= 100) {
			clearInterval(interval)
		}
	}, 100) // Увеличение каждые 100ms

	// Убрать экран после полной загрузки страницы
	window.addEventListener('load', () => {
		loader.style.opacity = 0
		setTimeout(() => {
			loader.style.display = 'none'
		}, 500) // Удаление через 500ms после исчезновения
	})
})
