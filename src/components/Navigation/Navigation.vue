<template>
  <header class="main-header">
    <div class="logo">
      <router-link
          to="/"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="145" height="103"><text transform="translate(0 70)" fill="#212121" font-size="64" font-family="Catamaran-ExtraBold, Catamaran" font-weight="800"><tspan x="0" y="0">flow</tspan><tspan y="0" fill="#49a6aa">.</tspan></text></svg>
      </router-link>
    </div>

    <input type="checkbox" class="menu-btn" id="menu-btn">
    <label for="menu-btn" class="menu-icon">
      <span class="menu-icon-line"></span>
    </label>

    <ul class="nav-links">
      <li class="nav-link">
        <router-link class="hover:text-pink-hover"
                     to="/projects"
        >
          Dashboard
        </router-link>
      </li>

      <li class="nav-link">
        <router-link class="mx-4 hover:text-pink-hover"
                     to="/user-profile"
        >
          Profile
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
  </header>
<!--    <nav class="mb-8 xl:mb-4 xl:pb-5">
        <div class="flex justify-between items-center">



          <div class="flex">

              <router-link class="hover:text-pink-hover"
                  to="/project-board"
              >
                Dashboard
              </router-link>


              <router-link class="mx-4 hover:text-pink-hover"
                  to="/user-profile"
              >
                Profile
              </router-link>

          </div>
        </div>
    </nav>-->
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

const header = document.querySelector(".main-header");

console.log(header);

window.addEventListener('scroll', () =>  {
  const scrollPos = window.scrollY;

  if (scrollPos > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
})

</script>

<style lang="scss">
.main-header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:65px;
  width: 100vw;
  padding: 0 10vw;
  color: #000;
  z-index: 1;
  transition: .4s ease-out;

  a {
    text-decoration: none;
    color: inherit;
  }

  .nav-links {
    display: flex;
    list-style: none;

    .nav-link {
      transition:
          opacity .4s ease-in-out,
        transform .6s cubic-bezier(0.175,0.885,0.32,1.275);

      &:nth-of-type(2) {
        transition-delay: .1s;
      }

      a {
        margin: .2rem;
        padding: 1rem 0.5rem;
      }

      a:hover {
        color: #99154E;
      }
    }
  }

  .menu-icon {
    position: relative;
    padding: 26px 10px;
    cursor: pointer;
    z-index: 1;
    display: none;

    .menu-icon-line{
      display: block;
      position: relative;
      background-color: black;
      height:2px;
      width:20px;
      border-radius: 4px;
      transition: background-color .8s ease;

      &::before, &::after {
      content: '';
      position: absolute;
      height: 100%;
      width:100%;
      border-radius: 4px;
      background-color: black;
      transition: background-color .8s ease;
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
  .main-header{
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
      top:0;
      left:0;
      opacity: 0;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      padding: 10rem 0;
      width: 100vw;
      height:100vh;
      font-size: 2rem;
      color: white;
      background-color: #99154E;
      transition:
        opacity .8s .5s,
        clip-path 1s .5s;
      clip-path: circle(200px at top right);

      .nav-link {
        opacity: 0;
        transform: translateX(100%);
        width: 100%;
        text-align: center;

        a {
          display: block;
          padding: 2rem 0;
        }
      }
    }

    .menu-btn:checked ~ .nav-links {
      opacity: 1;
      clip-path: circle(100% at center);

      .nav-link {
        opacity: 1;
        transform: translateX(0);
        transition:
            opacity .4s ease-in-out,
            transform .6s cubic-bezier(0.175, 0.885,0.32,1.275);

        &:nth-of-type(1) {
          transition-delay: .7s;
        }
        &:nth-of-type(2) {
          transition-delay: .8s;
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
    box-shadow: 0 0 0 0px rgba(255,255,255,0.6);
    background-color: rgb(255,255,255,0.6);
  }
  to {
    box-shadow: 0 0 0 1000px rgba(255,255,255,0);
    background-color: rgb(255,255,255,0);
  }
}

@keyframes openTop {
  0% {
    transform: translateY(-5px)
    rotate(0deg);
  }
  50% {
    transform: translateY(0px)
    rotate(0deg);
  }
  100% {
    transform: translateY(0px)
    rotate(90deg);
  }
}

@keyframes closedTop {
  0% {
    transform: translateY(-5px)
    rotate(0deg);
  }
  50% {
    transform: translateY(0px)
    rotate(0deg);
  }
  100% {
    transform: translateY(0px)
    rotate(90deg);
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
    transform: translateY(5px)
    rotate(0deg);
  }
  50% {
    transform: translateY(0px)
    rotate(0deg);
  }
  100% {
    transform: translateY(0px)
    rotate(90deg);
  }
}

@keyframes closedBtm {
  0% {
    transform: translateY(5px)
    rotate(0deg);
  }
  50% {
    transform: translateY(0px)
    rotate(0deg);
  }
  100% {
    transform: translateY(0px)
    rotate(90deg);
  }
}
</style>