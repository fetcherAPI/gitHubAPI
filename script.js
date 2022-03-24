// async function getRepositoryInfo(value) {
//   const inputValue = document.querySelector(".search-input");

//   return await fetch(
//     `https://api.github.com/search/repositories?q=ma&per_page=5`
//   ).then((response) => response.json());
// }

// getRepositoryInfo().then((data) => {
//   const ropoList = document.querySelector(".search__list"),
//     choosedRepoList = document.querySelector(".choosed-list");
//   data.items.forEach((li, i) => {
//     const liElement = document.createElement("li");
//     liElement.classList.add("search__item");
//     liElement.innerHTML = `<li>${li.full_name}</li>`;
//     ropoList.appendChild(liElement);
//     liElement.addEventListener("click", () => {
//       const choosedRepo = document.createElement("li");
//       choosedRepo.classList.add("choosed-list__item");
//       choosedRepo.innerHTML = `<p>name: ${li.name}<br/>owner: ${li.owner.login}<br/>stars: ${li.stargazers_count}</p>`;
//       choosedRepoList.appendChild(choosedRepo);
//     });
//   });
// });

class View {
  constructor() {
    this.app = document.querySelector(".search");

    this.searchInput = this.createElement("input", "search__input", "");
    this.reposList = this.createElement("ul", "search__list");
    this.choosedRepoList = this.createElement("ul", "choosed-list");

    this.app.append(this.searchInput);
    this.app.append(this.reposList);
    this.app.append(this.choosedRepoList);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  createRepoItem(repo) {
    const repoItem = this.createElement("li", "search__item");
    repoItem.innerHTML = `${repo.full_name}`;
    this.reposList.append(repoItem);
    repoItem.addEventListener("click", () => {
      const choosedRepo = this.createElement("li", "choosed-list__item");
      console.log("", choosedRepo);
      choosedRepo.innerHTML = `<p>name: ${repo.name}<br/>owner: ${repo.owner.login}<br/>stars: ${repo.stargazers_count}</p>`;
      this.choosedRepoList.appendChild(choosedRepo);
      this.reposList.style.display = "none";
    });
    console.log("this.repoList", this.reposList);
    console.log("repoItem", repoItem);
  }
}

class Search {
  constructor(view) {
    this.view = view;
    this.view.searchInput.addEventListener(
      "keyup",
      this.getReposInfo.bind(this)
    );
  }

  async getReposInfo() {
    return await fetch(
      `https://api.github.com/search/repositories?q=${this.view.searchInput.value}&per_page=5`
    )
      .then((response) => response.json())
      .then((data) =>
        data.items.forEach((dataItem) => this.view.createRepoItem(dataItem))
      );
  }
}

new Search(new View());
