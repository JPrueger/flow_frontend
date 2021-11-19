<template>
    <div class="Button">
        <div class="bg-pink text-white rounded p-2 text-center">
          <input type="submit" :value="submitButton" class="bg-pink font-bold" />
        </div>
    </div>
</template>

<script>

export default {
  name: "TestVideo",
};
</script>

<style lang="scss">
.Button {
  margin-top: 50px;
  max-width: 300px;
}
</style>

