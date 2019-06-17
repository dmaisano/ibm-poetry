<script>
  import { fade, fly } from "svelte/transition";

  // TODO: use poemist https://poemist.github.io/poemist-apidoc/

  function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node != null) {
      if (node == parent) return true;

      node = node.parentNode;
    }
    return false;
  }

  document.addEventListener("mouseup", event => {
    if (!visibility.menu) return;

    if (!isDescendant(document.querySelector(".search-box"), event.target)) {
      visibility.menu = false;
    }
  });

  const searchOption = {
    selected: "author",
    value: "",
    poemTitle: "",
    author: "Author",
    title: "Title",
    lines: "Phrases",
    linecount: "Number of Lines",
    placeholder: "Search by Author"
  };

  let visibility = {
    poem: false,
    menu: false
  };

  let poems = {
    all: [],
    filtered: [],
    selected: {}
  };

  let vocabulary = {};

  const changeSearchValue = event => {
    searchOption.value = event.target.value;

    if (poems.all.length) {
      visibility.menu = true;
      filterPoems(searchOption.value);
    }

    if (event.keyCode === 13 && searchOption.value.length) {
      return fetchPoem();
    }
  };

  const hideMouseMenu = event => {
    console.log(event);
    visibility.menu = false;
  };

  const filterPoems = text => {
    searchOption.placeholder = `Filter by Title or Search by ${
      searchOption[searchOption.selected]
    }`;

    if (!text) {
      poems.filtered = poems.all;
      return;
    }

    poems.filtered = poems.all.filter(poem =>
      poem.title.toLowerCase().includes(text.toLowerCase())
    );
  };

  const changeSearchOption = event => {
    const option = event.target.value;
    searchOption.selected = option;
    searchOption.placeholder = `Search by ${searchOption[option]}`;
  };

  // populate the vocabulary
  for (const letter of "abcdefghijklmnopqrstuvwxyz".split("")) {
    vocabulary[letter] = "";
  }

  const generatePoem = () => {
    console.log(searchOption);
  };

  const fetchPoem = async () => {
    try {
      let res = await fetch(
        `http://poetrydb.org/${searchOption.selected}/${searchOption.value}`
      );

      visibility.menu = true;

      res = await res.json();

      if (res.length) {
        poems.all = poems.filtered = res;
      } else {
        poems.all = poems.filtered = [];
        setTimeout(() => {
          visibility.menu = false;
        }, 5000);
      }
    } catch (error) {
      poems.all = poems.filtered = [];
      setTimeout(() => {
        visibility.menu = false;
      }, 5000);
    }
  };

  const selectPoem = poem => {
    console.log(poem);
  };
</script>

<style>
  .hidden {
    display: none;
  }

  .vocabulary-container {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .poem-title {
    width: 20rem;
  }

  .search-box {
    width: 992px;
    display: grid;
    grid-template-columns: 1fr 0.5fr auto;
  }

  .search-box .form-input:first-child {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-right: 0;
  }

  .search-box .form-input:first-child:focus {
    border-right: 1px solid #5755d9;
  }

  .search-box .form-select {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }

  .search-box .btn {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  .search-box *:focus {
    z-index: 3;
  }

  .search-box .menu {
    display: block;
    position: absolute;
    z-index: 10;
    max-height: 330px;
    overflow-y: auto;
    max-width: 75vw;
  }

  .search-box .menu .menu-item {
    padding: 0.5rem;
  }

  .search-box .menu .menu-item:hover:not(.placeholder) {
    background: #f1f1fc;
    color: #5755d9;
    cursor: pointer;
  }

  .vocabulary {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
  }

  .vocabulary .letter {
    display: grid;
    grid-template-columns: 0.1fr 1fr;
  }

  .vocabulary .letter .character,
  .vocabulary .letter input {
    display: flex;
    align-self: center;
    justify-self: center;
  }

  .poem-title,
  .vocabulary {
    margin-top: 1rem;
  }

  .randomize {
    min-width: 250px;
    width: 65%;
    margin: auto;
    grid-column: span 2;
  }
</style>

<div class={!visibility.poem ? 'vocabulary-container' : 'hidden'}>
  <div class="search-box">
    <div>
      <input
        type="text"
        class="form-input input-lg"
        placeholder={searchOption.placeholder}
        on:keyup={changeSearchValue} />

      <ul class={visibility.menu ? 'menu' : 'hidden'} data-search-menu>
        {#each poems.filtered as poem, idx}
          <li
            on:click={() => selectPoem(poem)}
            class="menu-item"
            data-search-menu-item>
             {poem.title} - {poem.author}
          </li>
        {:else}
          <li class="menu-item">No matches</li>
        {/each}
      </ul>

    </div>
    <select class="form-select select-lg" on:change={changeSearchOption}>
      <option value="author">Author</option>
      <option value="title">Title</option>
      <option value="lines">Phrase</option>
      <option value="linecount">Number of Lines</option>
    </select>
    <button class="btn btn-lg btn-primary input-group-btn" on:click={fetchPoem}>
      Search
      <i class="icon icon-search" />
    </button>
  </div>

  <div class="input-group poem-title">
    <input type="text" class="form-input" placeholder="3 Letter Poem Title" />
    <button class="btn btn-primary input-group-btn" on:click={generatePoem}>
      Generate
    </button>
  </div>

  <div class="vocabulary">
    {#each Object.keys(vocabulary) as letter}
      <div class="letter">
        <div class="character">{letter.toUpperCase()}</div>
        <input type="text" class="form-input" />
      </div>
    {/each}

    <button class="btn btn-primary randomize">Randomize</button>
  </div>
</div>
