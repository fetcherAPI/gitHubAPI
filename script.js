// console.log('it is work')
// let a = null;
// const inputValue = document.querySelector('.search__input')
// inputValue.addEventListener('input', () => {
//     a = inputValue.value
//     console.log(a)
// })

async function getRepositoryInfo(value) {
  return await fetch(
    `https://api.github.com/search/repositories?q=${value}&per_page=5`
  ).then((response) => response.json());
}
getRepositoryInfo().then((data) => {
  //   console.log(data.items);

  const ropoList = document.querySelector(".search__list"),
    choosedRepoList = document.querySelector(".choosed-list");

  data.items.forEach((li, i) => {
    const liElement = document.createElement("li");
    liElement.classList.add("search__item");
    liElement.innerHTML = `<li>${li.full_name}</li>`;
    ropoList.appendChild(liElement);
    liElement.addEventListener("click", () => {
      //   ropoList.remove();
      const choosedRepo = document.createElement("li");
      choosedRepo.classList.add("choosed-list__item");
      choosedRepo.innerHTML = `<p>name: ${li.name}<br/>owner: ${li.owner.login}<br/>stars: ${li.stargazers_count}</p>`;
      choosedRepoList.appendChild(choosedRepo);
    });
  });
});
