<template>
  <div>
    <form v-if="!isTakingPictures" class="px-10 py-5" @submit.prevent="onSave">
    <h1 class="text-purple-500 font-bold text-2xl"> The Action you know</h1>
      <div class="flex-col mt-5">
        <label for="exampleInputEmail1" class="text-purple-500 font-bold">Name of the car</label>
        <input v-model="form.name" class="block border-b w-full focus:outline-none" placeholder="Enter car name">
      </div>
      <div class="mt-5">
        <label for="takePics" class="text-purple-500 font-bold">Take pictures of the car</label>
        <button id="takePics" class="btn btn-primary block font-bold bg-purple-500 px-3 py-1 rounded-md text-white mt-2" @click="isTakingPictures=true"> Take Pictures </button>
      </div>
      <Gallery  v-if="form.pictures.length" class="mt-5 bg-gray-100 rounded-md" :pictures="form.pictures" />
      <button type="submit" class="btn block font-bold bg-purple-500 px-3 py-1 rounded-md text-white mt-2">Submit</button>
    </form>
    <Camera v-if="isTakingPictures" @done="onPicturesSelected" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import Camera from "./Camera.vue";
import { IForm, validateForm } from "~/utils";

export default defineComponent({
    name: "Form",
    components: { Camera },
    setup() {
        const isTakingPictures = ref(false);

        const form = reactive<IForm>({
            name: '',
            pictures: []
        });

        const onPicturesSelected = (pictures: string[]) => {
            form.pictures = pictures;
            isTakingPictures.value = false;
        };

        const onSave = () => {
            if (validateForm(form)) {
                alert("Congratulations the form has been submitted");
            } else {
                alert("Form is not valid");
            }
        };

        return {
            isTakingPictures,
            form,
            onPicturesSelected,
            onSave,
        };
    }
});
</script>
