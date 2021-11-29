<template>
    <nav class="mb-8 xl:mb-4">
        <ul>
            <li>
                <router-link
                    to="/"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="145" height="103"><text transform="translate(0 70)" fill="#212121" font-size="64" font-family="Catamaran-ExtraBold, Catamaran" font-weight="800"><tspan x="0" y="0">flow</tspan><tspan y="0" fill="#49a6aa">.</tspan></text></svg>
                </router-link>
            </li>
            <li>
                <button
                    @click="
                        logout();
                    "
                    class="mobile-menu-item extern-link"
                >
                    logout
                </button>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: "Navigation",
     methods: {
        logout() {
            localStorage.removeItem("token");
            // redirect auf die Startseite nach 3 Sekunden
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        },
    },
};
</script>