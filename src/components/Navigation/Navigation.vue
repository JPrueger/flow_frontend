<template>
    <nav class="mb-8 xl:mb-4 xl:pb-5">
        <div class="flex justify-between items-center">

                <router-link
                    to="/"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="145" height="103"><text transform="translate(0 70)" fill="#212121" font-size="64" font-family="Catamaran-ExtraBold, Catamaran" font-weight="800"><tspan x="0" y="0">flow</tspan><tspan y="0" fill="#49a6aa">.</tspan></text></svg>
                </router-link>

          <div class="flex">

              <router-link
                  to="/project-board"
              >
                Dashboard
              </router-link>


              <router-link class="mx-4"
                  to="/user-profile"
              >
                Profile
              </router-link>

          </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>