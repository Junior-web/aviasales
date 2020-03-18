const formSearch = document.querySelector('.form-search'),
	  inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
	  dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
	  inputCitiesTo = formSearch.querySelector('.input__cities-to'),
	  dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
	  inputDateDepart = formSearch.querySelector('.input__date-depart');


// данные
const citiesApi = 'dataBase/cities.json',
	  proxy = 'https://cors-anywhere.herokuapp.com/';

	   
let city = []; 

let rememberCity = city.slice();

// функции

const getData = (url, callback) => {
	const request = new XMLHttpRequest();
	
	request.open('GET', url);
	
	request.addEventListener('readystatechange', () => {
		if(request.readyState !== 4) return;
		
		if(request.status === 200) {
			callback(request.response);
		} else {
			console.log(request.status);
		}
	});
	
	request.send();
};

// убрать возможность выбора двух одинаковых городов
			  
// удалить выбранный город

const duplicateRemove = (currentCity) => {
	let index = city.indexOf(currentCity);
	
	if(index > -1) city.splice(index, 1);
};

// обновить массив при очистки поля ввода

const updateCitiesArr = () => {
	city = rememberCity.slice();
};

// показать список городов

const showCity = (input, list) => {
	list.textContent = '';
	
	if(input.value !== '') {
		const filterCity = city.filter((item) => { // отфильтровать в соответствии с введенным в input
			if(item.name) {
				return item.name.toLowerCase().includes(input.value.toLowerCase());
			}
		});
		
		filterCity.forEach((item) => {
			const li = document.createElement('li');
			li.classList.add('dropdown__city');
			li.textContent = item.name;
			list.append(li);
		});
	} else {
		updateCitiesArr();
	}
};

// выбрать определенный город из списка

const chooseCity = (target, input, dropdown) => {
	if(target.tagName.toLowerCase() === 'li') {
		input.value = target.textContent;
		duplicateRemove(target.textContent);	
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


// вызовы функций

getData(citiesApi, (data) => {
	const dataCities = JSON.parse(data);

	city = dataCities.filter((item) => {
		return true;
	});

	console.log(city);
});