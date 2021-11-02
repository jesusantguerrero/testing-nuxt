<template>
<div class="w-full h-32 flex gap-2 overflow-auto flex-wrap">
    <div v-for="picture in pictures" :key="picture" class="h-full p-2">
      <img :src="picture" alt="" class="h-full cover border border-white rounded-md">
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Gallery",
  props: {
    pictures: {
      type: Array,
      required: true
    }
  }
});
</script>
