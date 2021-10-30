<template>
    <button type="submit" @click.prevent="method">
        Submit hier
    </button>
</template>

<script>
export default {
    name: "submitbtn",
    props: {
        text: String,
        method: {
            type: Function,
        }
    },
};
</script>

<style>
button {
    border: 1px solid red;
}
</style>
