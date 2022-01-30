<template>
  <aside class="controls" v-nice>
    <h1>v-nice</h1>
    <button @click="key++">Play</button>
    <div class="zoom-controls">
      <button @click="zoomIn">+</button>
      <button @click="zoomOut">-</button>
    </div>
  </aside>
  <transition mode="out-in" name="fade">
    <main :key="key + zoom" :style="{fontSize}">
      <section v-for="i in 3" :key="i" v-nice.leaves.stagger.order>
        <div class="body">
          <h2></h2>
          <p></p>
          <p></p>
          <button></button>
        </div>
        <img src="./images/abstract.jpg" width="1528" height="1161" alt="abstract">
      </section>
    </main>
  </transition>
</template>

<script setup lang="ts">
import vNice from '../src/directive';
import {computed, ref} from "vue";

const key = ref(0);
const zoomStep = 1.25;
const zoom = ref(-1);
const zoomMin = -4;
const zoomMax = 4;
const zoomIn = () => {
  zoom.value = Math.max(zoomMin, Math.min(zoom.value+1, zoomMax));
}
const zoomOut = () => {
  zoom.value = Math.max(zoomMin, Math.min(zoom.value-1, zoomMax));
}
const fontSize = computed(() => {
  return zoomStep ** zoom.value + 'rem';
})
</script>

<style scoped lang="scss">
h1 {
  white-space: nowrap;
}

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
  cursor: pointer;

  transition: transform 0.15s ease;
  will-change: transform;
  &:hover, &:focus {
    outline: none;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
}

img {
  display: block;
  background-color: var(--blue);
  height: auto;

  border-radius: .5em;
}

main {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-large);
  justify-content: center;
  padding: var(--gap-large);
  align-content: space-evenly;
  flex-grow: 1;

  > * {
    flex: 1 1 auto;
  }
}

section {
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  gap: var(--gap-base);
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
    max-width: min(var(--measure), 100%);
  }
}

.controls {
  background-color: var(--black);
  border-bottom: 2px solid var(--dark);
  padding: var(--gap-small) var(--gap-large);
  position: sticky;
  top: 0;
  z-index: var(--z-controls);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--gap-base);

  > * {
    margin: 0;
  }

  @media (max-width: 60ch) {
    grid-template-columns: 1fr auto;
  }
}

.zoom-controls {
  font-size: 1.25em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--gap-x-small);

  > * {
    margin: 0;
  }

  button {
    background-color: var(--dark);
    aspect-ratio: 1 / 1;
    color: white;
    min-width: initial;
    height: 2em;
  }
}

.fade-leave-active {
  transition: opacity 0.15s linear;
}

.fade-leave-to {
  opacity: 0;
}

</style>
