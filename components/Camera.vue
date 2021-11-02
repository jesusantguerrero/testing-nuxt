<template>
  <div class="bg-black h-screen cursor-pointer">
    <video ref="VideoRef" class="absolute w-full h-screen" :class="[hasPictureInMemory ? 'z-30': 'z-40']" />
    <div class="absolute w-full h-screen mx-auto bg-black bg-opacity-75 transition" :class="[hasPictureInMemory ? 'z-40': 'z-30']">
      <canvas ref="CanvasRef" class="mx-auto" />
    </div>
    <audio ref="AudioRef"/>

    <Gallery class="absolute bottom-32 bg-black z-50 bg-opacity-75" :pictures="pictures" />

    <div class="absolute bottom-0 h-32 bg-black w-full flex z-50">
      <div v-if="!hasPictureInMemory" class="w-1/2 flex justify-center">
        <button class="w-full hover:bg-gray-900 transition text-white font-bold py-2 px-4" @click="takePhoto">
          Take Photo
        </button>
      </div>
      <div v-else class="w-1/2 flex justify-center">
        <button class="w-full hover:bg-gray-900 transition text-white font-bold py-2 px-4" @click="onSaved()">
          Save Picture
        </button>
      </div>
      <div class="w-1/2 flex justify-center blur">
        <button class="w-full hover:bg-gray-900  transition text-white font-bold py-2 px-4" @click="onRemoved()">
          Remove picture
        </button>
      </div>
      <div class="w-1/2 flex justify-center blur">
        <button class="w-full hover:bg-gray-900  transition text-white font-bold py-2 px-4" @click="onDone()">
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "@nuxtjs/composition-api";
import Gallery from "./Gallery.vue";

export default defineComponent({
    name: "Camera",
    components: { Gallery },
    props: {
        pictures: {
            type: Array,
            default: () => []
        }
    },
    setup(_props, { emit }) {
        const VideoRef = ref<null | HTMLVideoElement>();
        const CanvasRef = ref<null | HTMLCanvasElement>();
        const pictureInMemory = ref<string>();
        const hasPictureInMemory = computed(() => Boolean(pictureInMemory.value));
        const takePhoto = () => {
            if (CanvasRef.value && VideoRef.value) {
                CanvasRef.value.width = VideoRef.value.videoWidth;
                CanvasRef.value.height = VideoRef.value.videoHeight;
                CanvasRef.value.getContext("2d")?.drawImage(VideoRef.value, 0, 0);
                pictureInMemory.value = CanvasRef.value.toDataURL("image/png");
            }
        };
        const allowCamera = () => {
            const video = VideoRef.value;
            if (video) {
                navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                    video.srcObject = stream;
                    video.play();
                });
            }
        };
        const onSaved = () => {
            emit("saved", pictureInMemory.value);
            pictureInMemory.value = undefined;
        };
        const onRemoved = () => {
            pictureInMemory.value = undefined;
        };
        const onDone = () => {
            emit("done");
        };
        onMounted(() => {
            allowCamera();
        });
        return {
            VideoRef,
            CanvasRef,
            takePhoto,
            allowCamera,
            hasPictureInMemory,
            onSaved,
            onRemoved,
            onDone,
        };
    }
});
</script>
