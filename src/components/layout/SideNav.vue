<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <nav class="SideNavRoot" aria-label="Main navigation">
    <div class="SideNavViewport">
      <!-- Framework Toggle -->
      <div class="FrameworkToggle">
        <span class="FrameworkBtn active">
          <svg
            class="FrameworkIcon"
            width="14"
            height="14"
            viewBox="0 0 261.76 226.69"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M161.096.001l-30.225 52.351L100.647.001H0l130.877 226.688L261.749.001z"
              fill="#41B883"
            />
            <path
              d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z"
              fill="#34495E"
            />
          </svg>
          Vue
        </span>
        <span class="FrameworkBtn disabled" title="React docs coming soon">
          <svg
            class="FrameworkIcon"
            width="14"
            height="14"
            viewBox="-11.5 -10.232 23 20.463"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle r="2.05" fill="#61DAFB" />
            <g stroke="#61DAFB" stroke-width="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
          React
        </span>
      </div>

      <div class="SideNavSection">
        <div class="SideNavHeading">Overview</div>
        <ul class="SideNavList">
          <li class="SideNavItem">
            <router-link
              to="/overview/quick-start"
              class="SideNavLink"
              :data-active="route.path === '/overview/quick-start' || undefined"
            >
              Quick start
            </router-link>
          </li>
          <li class="SideNavItem">
            <router-link
              to="/overview/accessibility"
              class="SideNavLink"
              :data-active="route.path === '/overview/accessibility' || undefined"
            >
              Accessibility
            </router-link>
          </li>
        </ul>
      </div>

      <div class="SideNavSection">
        <div class="SideNavHeading">Components</div>
        <ul class="SideNavList">
          <li class="SideNavItem">
            <router-link
              to="/components/field"
              class="SideNavLink"
              :data-active="route.path === '/components/field' || undefined"
            >
              Field
            </router-link>
          </li>
          <li class="SideNavItem">
            <router-link
              to="/components/input"
              class="SideNavLink"
              :data-active="route.path === '/components/input' || undefined"
            >
              Input
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
