<template>
    <svg aria-hidden="true" class="svg-icon" :style="'width:' + size + ';height:' + size">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
    prefix: {
        type: String,
        default: "icon",
    },
    iconClass: {
        type: String,
        required: false,
        default: "",
    },
    color: {
        type: String,
        default: "",
    },
    size: {
        type: String,
        default: "1em",
    },
});

const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`);
</script>

<style scoped>
.svg-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    overflow: hidden;
    vertical-align: -0.15em;
    outline: none;
    fill: currentcolor;
}
</style>