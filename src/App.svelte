<script>
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

  let poemTitle = "";

  let poemIsVisible = false;

  const generatePoem = () => {
    console.log(searchOption);
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
    width: 75%;
  }

  .search-box select {
    flex: 0.25;
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
</style>

<div class={poemIsVisible ? 'hidden' : 'container'}>
  <div class="input-group search-box">
    <input
      type="text"
      class="form-input input-lg"
      placeholder={searchOption.placeholder}
      on:keyup={event => (searchOption.value = event.target.value)} />
    <select class="form-select select-lg" on:change={changeSearchOption}>
      <option value="author">Author</option>
      <option value="title">Title</option>
      <option value="lines">Phrase</option>
      <option value="linecount">Number of Lines</option>
    </select>
    <button class="btn btn-lg btn-primary input-group-btn">Submit</button>
  </div>

  <div class="poem-title">
    <div class="input-group">
      <input type="text" class="form-input" placeholder="3 Letter Poem Title" />
      <button class="btn btn-primary input-group-btn" on:click={generatePoem}>
        Generate
      </button>
    </div>
  </div>

  <div class="vocabulary">
    {#each Object.keys(vocabulary) as letter}
      <div class="letter">
        <div class="character">{letter.toUpperCase()}</div>
        <input type="text" class="form-input" />
      </div>
    {/each}
  </div>
</div>
