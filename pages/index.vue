<template>
  <Camera :pictures="pictures" @saved="addPicture" />
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const pictures = reactive<string[]>([]);
    const addPicture = (picture: string) => {
      pictures.push(picture);
    }

    return {
      addPicture,
      pictures
    }
  }
})
</script>
