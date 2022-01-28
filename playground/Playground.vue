<template>
  <main>
    <section v-for="i in 3" v-nice>
      <div class="body">
        <h2></h2>
        <p></p>
        <p></p>
        <button></button>
      </div>
      <img>
    </section>
  </main>
</template>

<script setup lang="ts">
import vNice from '../src/directive';
</script>

<style scoped lang="scss">
h2 {
  font-size: 1.5rem;
  background-color: var(--blue);
  height: 1em;
  content: "";
  max-width: 24ch;
  border-radius: .1em;
  margin-top: 0;
}

p {
  &::after, &::before {
    background-color: var(--dark);
    content: "";
    display: block;
    height: 1em;
    max-width: min(100%, var(--measure));
  }

  &::before {
    width: calc(var(--line-1-width, 1) * 100%);
  }

  &::after {
    margin-top: .5em;
    width: calc(var(--line-2-width, 0.8) * 100%);
  }

  &:nth-of-type(2) {
    --line-1-width: .9;
    --line-2-width: .75;
  }
}

button {
  background-color: var(--blue);
  font-size: 1em;
  height: 2.5em;
  min-width: 16ch;
  border: 0;
  border-radius: .2em;
  padding: 0;
}

img {
  display: block;
  background-color: var(--blue);

  border-radius: .5em;
}

main {
  display: flex;
  flex-wrap: wrap;
  --gap: min(6vw, 3em);
  gap: var(--gap);
  justify-content: center;
  padding: var(--gap);
  min-height: 100%;
  align-content: space-evenly;

  > * {
    flex: 1 1 auto;
  }
}

section {
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  --gap: min(5vw, 2em);
  gap: var(--gap);
  flex-basis: var(--measure);

  .body {
    min-width: min(var(--measure), 100%);
    flex-grow: 10;
    flex-basis: var(--measure);
  }

  img {
    flex-grow: 1;
    aspect-ratio: 16 / 9;
    flex-basis: 40ch;
  }

  > * {
    min-width: min(40ch, 100%);
    max-width: var(--measure);
  }
}
</style>
