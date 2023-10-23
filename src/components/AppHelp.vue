<template>
  <p class="app-help">
    Use <span class="app-help__key">w</span>, <span class="app-help__key">a</span>,
    <span class="app-help__key">s</span>, <span class="app-help__key">d</span> or the arrow keys to
    move.
  </p>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-help {
  text-align: center;
}

.app-help__key {
  border: 1px solid var(--color-app-help-key-border);
  border-radius: 3px;
  display: inline-block;
  background: var(--color-app-help-key);
  color: var(--color-app-help-key-text);
  font-family: 'Courier New', Courier, monospace;
  padding: 0 4px;
  font-weight: 700;
  margin: 0 2px;
}
</style>
