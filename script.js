const formSearch = document.querySelector('.form-search'),
	  inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
	  dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
	  inputCitiesTo = formSearch.querySelector('.input__cities-to'),
	  dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
	  inputDateDepart = formSearch.querySelector('.input__date-depart');
	   
const city = ['Санкт-Петербург', 'Москва', 'Анапа', 'Белгород', 'Братск', 'Волгоград', 'Иркутск', 'Казань',
			  'Кемерово', 'Краснодар', 'Магадан', 'Новосибирск', 'Псков', 'Саранск', 'Элиста', 'Череповец', 'Якутск']; 
			  

// показать список городов

const showCity = (input, list) => {
	list.textContent = '';
	
	if(input.value !== '') {
		const filterCity = city.filter((item) => { // отфильтровать в соответствии с введенным в input
			return item.toLowerCase().includes(input.value.toLowerCase());
		});
		
		filterCity.forEach((item) => {
			const li = document.createElement('li');
			li.classList.add('dropdown__city');
			li.textContent = item;
			list.append(li);
		});
	}
};

// выбрать определенный город из списка

const chooseCity = (target, input, dropdown) => {
	if(target.tagName.toLowerCase() === 'li') {
		input.value = target.textContent;
		dropdown.textContent = '';
	}	
};

inputCitiesFrom.addEventListener('input', () => {
	showCity(inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesFrom.addEventListener('click', (event) => {
	chooseCity(event.target, inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('input', () => {
	showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesTo.addEventListener('click', (event) => {
	chooseCity(event.target, inputCitiesTo, dropdownCitiesTo);	
});