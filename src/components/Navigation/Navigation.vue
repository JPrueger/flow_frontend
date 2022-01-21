<template>
  <header class="shadow-on-scroll">
    <nav class="main-header bg-white scroll-navigation">
      <div class="logo">
        <router-link to="/">
          <svg class="logo" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 142.2 45.9" style="enable-background:new 0 0 142.2 45.9" xml:space="preserve"><path d="M0 22.7v-7.8h5v-2.6c0-3.8 1.2-6.7 3.7-8.8C11.2 1.4 14.4.3 18.3.3c1.2 0 2.6.2 4.1.7 1.4.4 2.6 1 3.3 1.6l-2.9 7c-1.3-.7-2.6-1-4-1-1.2 0-2.2.4-2.9 1.3-.7.9-1 2.1-1 3.6v1.4h7.2l1.9 7.8h-9v22.5H5V22.7H0zm29.7 22.5V.7l10-.7v45.2h-10zm47.5-6.9c-1.5 2.4-3.5 4.3-6.1 5.6-2.6 1.3-5.6 2-8.9 2-3.4 0-6.3-.6-8.9-1.9-2.6-1.3-4.6-3.1-6-5.6-1.4-2.5-2.1-5.4-2.1-8.9 0-3.3.7-6.2 2.2-8.7 1.5-2.5 3.5-4.4 6.1-5.7 2.6-1.3 5.5-2 8.9-2 3.4 0 6.3.7 8.9 2 2.6 1.3 4.6 3.2 6 5.7 1.4 2.5 2.1 5.4 2.1 8.9 0 3.3-.8 6.2-2.2 8.6zm-10.1-2.8c1.2-1.5 1.9-3.4 1.9-5.8s-.6-4.4-1.8-5.9-2.8-2.3-4.8-2.3c-2.1 0-3.8.7-5 2.2-1.2 1.5-1.9 3.4-1.9 5.9 0 2.4.6 4.4 1.8 5.9 1.2 1.5 2.8 2.2 4.9 2.2s3.7-.8 4.9-2.2zm43 9.7-5.3-17.5-5.2 17.5h-8.8l-9.4-29.4 9.5-2.8 4.7 18.9 4.4-17.8h10l4.7 17.8 4.2-17.8h10.2l-10.1 31h-8.9z" style="fill:#212121" class="st0"/><path id="logo-dot" d="M137 45.2c-1.5 0-2.8-.5-3.8-1.5s-1.5-2.3-1.5-3.7c0-1.5.5-2.8 1.5-3.8s2.3-1.5 3.8-1.5 2.7.5 3.7 1.5 1.5 2.3 1.5 3.8-.5 2.7-1.5 3.7-2.2 1.5-3.7 1.5z" style="fill:#49a6aa" class="st0"/></svg>
        </router-link>
      </div>
      <input type="checkbox" class="menu-btn" id="menu-btn" v-model="menuBtn" />
      <label for="menu-btn" class="menu-icon">
        <span class="menu-icon-line"></span>
      </label>
      <ul class="nav-links">
        <li
          v-if="!userData"
          class="nav-link font-medium"
          @click="closeNavigation"
        >
          <router-link to="/register"> Register </router-link>
        </li>
        <li
          v-if="userData"
          class="nav-link font-medium"
          @click="closeNavigation"
        >
          <router-link to="/projects"> Projects </router-link>
        </li>
        <li
          v-if="userData"
          class="nav-link font-medium"
          @click="closeNavigation"
        >
          <router-link to="/user-profile"> Profile </router-link>
        </li>
        <li v-if="!userData" class="nav-link font-medium" @click="closeNavigation">
          <router-link class="mobile-menu-item extern-link" to="/login">
            Login
          </router-link>
        </li>
        <li v-if="userData" class="nav-link">
          <button
            @click="logout(); closeNavigation();"
            class="
              hover:text-pink-hover
              mobile-menu-item
              extern-link
              font-medium
            "
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import userDataService from "@/services/userDataService";

export default {
  name: "Navigation",
  data: () => {
    return {
      userData: null,
      showMobileNav: false,
      menuBtn: false,
    };
  },

  methods: {
    /**
     * When user logges out, the token gets removed and success message is shown.
     */
    logout() {
      localStorage.removeItem("token");
      setTimeout(() => {
        this.$router.push("/login", () => {
          this.$toasted.show("Successfully logged out. See you soon!", {
            duration: 5000,
            type: "success",
            position: "top-center",
          });
        });
      }, 2000);
    },
    closeNavigation() {
      this.menuBtn = false;
    },
  },
  /**
   * The me() function gets the current user that is logged in.
   * See userDataService.js file in src/services
   */
  created() {
    userDataService.me().then((userData) => {
      this.userData = userData;
      this.isAdmin = userData.is_admin;
    });
  },
};
</script>

<style lang="scss">

.logo {
  height:35px;
}

#logo-dot {
  animation: change-logo-dot 6s infinite step-end;
}

@media screen and (min-width: 767px) {
  nav li:hover {
    @apply text-pink-main;
  }
  nav a.router-link-active {
    @apply text-pink-main;
    font-weight: 700;
  }
}

// Animation for mobile navigation
.main-header {
  @apply px-6 py-10 lg:px-12;
  position: fixed;
  display: flex;
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  width: 100vw;
  color: #000;
  z-index: 1;
  transition: 0.4s ease-out;

  a {
    text-decoration: none;
    color: inherit;
  }

  .nav-links {
    display: flex;
    list-style: none;
    font-weight: 400;

    > li {
      margin: 0.2rem;
      padding: 1rem 1.05rem;

      &:last-child {
        padding-right: 0;
      }
    }

    > li {
      margin: 0.2rem;
      padding: 1rem 0.5rem;
    }

    .nav-link {
      transition: opacity 0.4s ease-in-out,
        transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      &:nth-of-type(2) {
        transition-delay: 0.1s;
      }
    }
  }

  .menu-icon {
    position: relative;
    cursor: pointer;
    z-index: 1;
    display: none;

    .menu-icon-line {
      display: block;
      position: relative;
      background-color: black;
      height: 4px;
      width: 30px;
      border-radius: 4px;
      transition: background-color 0.8s ease;

      &::before,
      &::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 4px;
        background-color: black;
        transition: background-color 0.8s ease;
        right: 0.1px;
      }

      &::before {
        transform: translateY(-9px);
      }

      &::after {
        transform: translateY(9px);
      }
    }
  }

  .menu-btn {
    display: none;
  }

  &.scrolled {
    height: 50px;
    background-color: red;
  }
}

@media screen and (max-width: 767px) {
  .main-header {
    .menu-icon {
      display: block;

      .menu-icon-line {
        animation: closedMid 0.8s backwards;
        animation-direction: reverse;

        &::before {
          animation: closedTop 0.8s backwards;
          animation-direction: reverse;
        }

        &::after {
          animation: closedBtm 0.8s backwards;
          animation-direction: reverse;
        }
      }
    }

    .nav-links {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      padding: 10rem 0;
      width: 100vw;
      height: 100vh;
      font-size: 2rem;
      color: white;
      background-color: #99154e;
      transition: opacity 0.8s 0.5s, clip-path 1s 0.5s;
      clip-path: circle(200px at top right);

      .nav-link {
        opacity: 0;
        transform: translateX(100%);
        width: 100%;
        text-align: center;

        a {
          display: block;
        }
      }
    }

    .menu-btn:checked ~ .nav-links {
      opacity: 1;
      clip-path: circle(100% at center);

      .nav-link {
        opacity: 1;
        transform: translateX(0);
        transition: opacity 0.4s ease-in-out,
          transform 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        &:nth-of-type(1) {
          transition-delay: 0.7s;
        }
        &:nth-of-type(2) {
          transition-delay: 0.8s;
        }
        &:nth-of-type(3) {
          transition-delay: 0.9s;
        }
        &:nth-of-type(4) {
          transition-delay: 1s;
        }
      }
    }

    .menu-btn:checked ~ .menu-icon {
      border-radius: 50%;
      animation: pulse 1s;

      .menu-icon-line {
        background-color: white;
        animation: openMid 0.8s forwards;

        &::before {
          background-color: white;
          animation: openTop 0.8s forwards;
        }

        &::after {
          background-color: white;
          animation: openBtm 0.8s forwards;
        }
      }
    }
  }
}

@keyframes pulse {
  from {
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.6);
    background-color: rgb(255, 255, 255, 0.6);
  }
  to {
    box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0);
    background-color: rgb(255, 255, 255, 0);
  }
}

@keyframes openTop {
  0% {
    transform: translateY(-5px) rotate(0deg);
  }
  50% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(0px) rotate(90deg);
  }
}

@keyframes closedTop {
  0% {
    transform: translateY(-5px) rotate(0deg);
  }
  50% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(0px) rotate(90deg);
  }
}

@keyframes openMid {
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(45deg);
  }
}

@keyframes closedMid {
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(45deg);
  }
}

@keyframes openBtm {
  0% {
    transform: translateY(5px) rotate(0deg);
  }
  50% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(0px) rotate(90deg);
  }
}

@keyframes closedBtm {
  0% {
    transform: translateY(5px) rotate(0deg);
  }
  50% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(0px) rotate(90deg);
  }
}

@keyframes change-logo-dot {
  0% {
    fill: white;
  }
  16% {
    fill: #49A6AA;
  }
  32% {
    fill:white;
  }
  48% {
    fill: #99154e;
  }
  64% {
    fill: white;
  }
  80% {
    fill: #ffb319;
  }
  100%{
    fill: white;
  }
}
</style>
