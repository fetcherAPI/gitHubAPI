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

  removeReposList() {
    this.reposList.innerHTML = "";
  }

  createRepoItem(repo) {
    console.log("repo", repo);
    const imgUrl = "./img/close.svg";
    const repoItem = this.createElement("li", "search__item");
    repoItem.innerHTML = `${repo.full_name}`;
    this.reposList.append(repoItem);
    repoItem.addEventListener("click", () => {
      this.searchInput.value = "";
      this.removeReposList();
      const choosedRepo = this.createElement("li", "choosed-list__item");
      choosedRepo.innerHTML = `<p>name: ${repo.name}<br/>owner: ${repo.owner.login}<br/>stars: ${repo.stargazers_count}</p>`;
      const removeChoosedRepo = this.createElement(
        "button",
        "choosed-list__btn"
      );
      removeChoosedRepo.innerHTML = `<img src=${imgUrl} alt="remove">`;
      choosedRepo.append(removeChoosedRepo);
      removeChoosedRepo.addEventListener("click", () => choosedRepo.remove());
      this.choosedRepoList.appendChild(choosedRepo);
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
      this.debounce(this.getReposInfo.bind(this), 500)
    );
  }

  async getReposInfo() {
    const inputValue = this.view.searchInput.value;
    if (inputValue) {
      this.removeReposList();
      await fetch(
        `https://api.github.com/search/repositories?q=${inputValue}&per_page=5`
      )
        .then((response) => response.json())
        .then((data) =>
          data.items.forEach((dataItem) => this.view.createRepoItem(dataItem))
        );
    } else {
      this.removeReposList();
    }
  }

  removeReposList() {
    this.view.reposList.innerHTML = "";
  }
  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

new Search(new View());
