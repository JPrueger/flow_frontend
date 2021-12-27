<template>
  <header class="shadow-on-scroll">
    <nav class="main-header bg-white scroll-navigation">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo.svg" alt="flow" class="block h-6" />
        </router-link>
      </div>

      <input type="checkbox" class="menu-btn" id="menu-btn" />
      <label for="menu-btn" class="menu-icon">
        <span class="menu-icon-line"></span>
      </label>

      <ul class="nav-links">
        <li v-if="!userData" class="nav-link">
          <router-link class="hover:text-pink-hover" to="/register">
            Register
          </router-link>
        </li>

        <li v-if="userData" class="nav-link">
          <router-link class="hover:text-pink-hover" to="/add-project">
            Add Projekt
          </router-link>
        </li>

        <li v-if="userData" class="nav-link">
          <router-link class="hover:text-pink-hover" to="/projects">
            Dashboard
          </router-link>
        </li>

        <li v-if="userData" class="nav-link">
          <router-link class="hover:text-pink-hover" to="/user-profile">
            Profile
          </router-link>
        </li>

        <li v-if="!userData" class="nav-link">
          <router-link
            class="hover:text-pink-hover mobile-menu-item extern-link"
            to="/login"
          >
            Login
          </router-link>
        </li>

        <li v-if="userData" class="nav-link">
          <button
            @click="logout()"
            class="hover:text-pink-hover mobile-menu-item extern-link"
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
    };
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      // redirect auf die Startseite nach 3 Sekunden
      window.location.href = "/";
    },
  },
  created() {
    userDataService.me().then((userData) => {
      this.userData = userData;
      this.isAdmin = userData.is_admin;
    });
  },
};

// const header = document.querySelector(".main-header");

// window.addEventListener("scroll", () => {
//   const scrollPos = window.scrollY;

//   if (scrollPos > 10) {
//     header.classList.add("scrolled");
//   } else {
//     header.classList.remove("scrolled");
//   }
// });
</script>

<style lang="scss">
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
    // transform: translateY(15px);
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

      a:hover {
        color: #99154e;
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
      height: 2px;
      width: 20px;
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
        transform: translateY(-5px);
      }

      &::after {
        transform: translateY(5px);
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
</style>
