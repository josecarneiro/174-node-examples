const instance = axios.create({
  baseURL: 'http://localhost:8080'
});

const listCities = () =>
  axios
    .get('http://localhost:8080/cities')
    .then(response => Promise.resolve(response.data));

const loadCity = id =>
  instance
    .get(`/cities/${id}`)
    .then(response => Promise.resolve(response.data));

const createCity = data =>
  instance
    .post('/cities', {
      ...data,
      id: Math.floor(Math.random() * 100000)
    })
    .then(response => Promise.resolve(response.data));

const updateCity = (id, data) =>
  instance
    .patch(`/cities/${id}`, data)
    .then(response => Promise.resolve(response.data));

const deleteCity = id =>
  instance
    .delete(`/cities/${id}`)
    .then(response => Promise.resolve(response.data));

/*{
    id: Math.floor(Math.random() * 10000),
    name: 'Buenos Aires'
  } */

const createListElementNodeAndAddToList = ($listNode, city) => {
  const $listItem = document.createElement('li');
  $listItem.textContent = city.name;

  const $deleteButton = document.createElement('button');
  $deleteButton.textContent = 'Delete City';
  $deleteButton.addEventListener('click', () => {
    deleteCity(city.id).then(() => {
      $list.removeChild($listItem);
    });
  });

  $listItem.appendChild($deleteButton);

  $listNode.appendChild($listItem);
};

window.addEventListener('load', () => {
  const $body = document.querySelector('body');

  const $list = document.createElement('ul');

  listCities().then(cities => {
    for (let city of cities) {
      createListElementNodeAndAddToList($list, city);
    }
    $body.appendChild($list);
  });

  const $form = document.querySelector('form');

  $form.addEventListener('submit', event => {
    event.preventDefault();

    const $cityNameInput = document.querySelector('input[name="city"]');
    const name = $cityNameInput.value;

    createCity({ name })
      .then(city => {
        createListElementNodeAndAddToList($list, city);
      })
      .finally(() => {
        $cityNameInput.value = '';
      });
  });
});
