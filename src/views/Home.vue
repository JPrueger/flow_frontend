<template>
  <div class="xl:flex justify-between">
    <div class="xl:w-1/4">
      <h1 class="font-bold  mb-6 ">A fun way to manage
        your projects.</h1>
      <p class="mb-6">Flow is a powerful tool to manage your projects in a still simple way. First choose your character and see it’s growth every time you finish up a ticket. All you need to do first is register and we’ll help you to keep your projects going.</p>

      <div class="bg-pink text-white rounded p-2 text-center">
        <input type="submit" :value="submitButton" class="bg-pink font-bold" />
      </div>
    </div>

    <img class="invisible lg:visible xl:w-2/3" src="../assets/images/home/home_header_img.png" alt="preview of the project board">
  </div>
</template>

<script>



export default {
  name: "Home",

}
</script>
