<script>
  import { fade, fly } from "svelte/transition";

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

  const visibility = {
    poem: false,
    menu: false
  };

  let poems = {
    all: [],
    filtered: []
  };

  const changeSearchValue = event => {
    if (event.keyCode === 13 && searchOption.value.length) {
      return fetchPoem();
    }

    searchOption.value = event.target.value;
  };

  const changeSearchOption = event => {
    const option = event.target.value;
    searchOption.selected = option;
    searchOption.placeholder = `Search by ${searchOption[option]}`;
  };

  const vocabulary = {};

  // populate the vocabulary
  for (const letter of "abcdefghijklmnopqrstuvwxyz".split("")) {
    vocabulary[letter] = "";
  }

  const generatePoem = () => {
    console.log(searchOption);
  };

  const fetchPoem = async () => {
    visibility.menu = true;

    try {
      let res = await fetch(
        `http://poetrydb.org/${searchOption.selected}/${searchOption.value}`
      );

      res = await res.json();

      if (res.length) {
        poems.all = poems.filtered = res;
      } else {
        poems.all = poems.filtered = [];
      }
    } catch (error) {
      console.log({
        error
      });
      poems = [];
    } finally {
      console.log(poems);
    }
  };

  const foo = poem => {
    console.log(poem);
  };
</script>

<style>
  .hidden {
    display: none;
  }

  .container {
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
    z-index: 10;
    position: absolute;
    max-height: 330px;
    overflow-y: auto;
    max-width: 75vw;
  }

  .search-box .menu .menu-item:hover:not(.placeholder) {
    background: #f1f1fc;
    color: #5755d9;
    cursor: pointer;
  }

  .search-box .menu .placeholder {
    transition: opacity 3s ease-in-out;
    -webkit-transition: opacity 3s ease-in-out;
    -moz-transition: opacity 3s ease-in-out;
    -ms-transition: opacity 3s ease-in-out;
    -o-transition: opacity 3s ease-in-out;
    opacity: 1;
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

<div class={visibility.poem ? 'hidden' : 'container'}>
  <div class="search-box">
    <div>
      <input
        type="text"
        class="form-input input-lg"
        placeholder={searchOption.placeholder}
        on:keyup={changeSearchValue} />

      <ul class={visibility.menu ? 'menu' : 'hidden'}>
        {#each poems.filtered as poem, idx}
          <li in:fly={{ x: -1080, duration: 1500 }} class="menu-item">
             {idx}) {poem.title} - {poem.author}
          </li>
        {:else}
          <li out:fade={{ duration: 5000 }} class="menu-item placeholder">
            No matches
          </li>
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
      Submit
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
