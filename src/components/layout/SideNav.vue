<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <nav
    class="hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:scrollbar-thin text-[length:var(--text-md)] leading-[var(--text-md-lh)]"
    aria-label="Main navigation"
  >
    <div class="p-[2rem_2.5rem_2.5rem_1.5rem]">
      <!-- Framework Toggle -->
      <div class="flex bg-gray-100 rounded-full p-[0.2rem] mb-6 border border-gray-200">
        <span
          class="flex-1 flex items-center justify-center gap-1.5 text-[0.8125rem] font-medium py-1 rounded-full bg-content text-blue shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-gray-200"
        >
          <svg
            class="shrink-0 block"
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
        <span
          class="flex-1 flex items-center justify-center gap-1.5 text-[0.8125rem] font-medium py-1 rounded-full text-gray-600 opacity-45 cursor-not-allowed"
          title="React docs coming soon"
        >
          <svg
            class="shrink-0 block"
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

      <div>
        <div class="text-[0.8125rem] font-bold text-foreground mt-6 mb-2 pl-3">Overview</div>
        <ul class="flex flex-col gap-px">
          <li class="relative">
            <router-link
              to="/overview/quick-start"
              class="block py-[calc(1rem-var(--text-md-lh)/2)] px-3 rounded-md text-[length:var(--text-md)] leading-[var(--text-md-lh)] whitespace-nowrap select-none transition-colors duration-150 hover:bg-gray-100 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-blue focus-visible:-outline-offset-1 data-[active]:bg-gray-100 data-[active]:outline data-[active]:outline-1 data-[active]:outline-gray-200 data-[active]:-outline-offset-1 data-[active]:cursor-default"
              :data-active="route.path === '/overview/quick-start' || undefined"
            >
              Quick start
            </router-link>
          </li>
          <li class="relative">
            <router-link
              to="/overview/accessibility"
              class="block py-[calc(1rem-var(--text-md-lh)/2)] px-3 rounded-md text-[length:var(--text-md)] leading-[var(--text-md-lh)] whitespace-nowrap select-none transition-colors duration-150 hover:bg-gray-100 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-blue focus-visible:-outline-offset-1 data-[active]:bg-gray-100 data-[active]:outline data-[active]:outline-1 data-[active]:outline-gray-200 data-[active]:-outline-offset-1 data-[active]:cursor-default"
              :data-active="route.path === '/overview/accessibility' || undefined"
            >
              Accessibility
            </router-link>
          </li>
        </ul>
      </div>

      <div>
        <div class="text-[0.8125rem] font-bold text-foreground mt-6 mb-2 pl-3">Components</div>
        <ul class="flex flex-col gap-px">
          <li class="relative">
            <router-link
              to="/components/field"
              class="block py-[calc(1rem-var(--text-md-lh)/2)] px-3 rounded-md text-[length:var(--text-md)] leading-[var(--text-md-lh)] whitespace-nowrap select-none transition-colors duration-150 hover:bg-gray-100 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-blue focus-visible:-outline-offset-1 data-[active]:bg-gray-100 data-[active]:outline data-[active]:outline-1 data-[active]:outline-gray-200 data-[active]:-outline-offset-1 data-[active]:cursor-default"
              :data-active="route.path === '/components/field' || undefined"
            >
              Field
            </router-link>
          </li>
          <li class="relative">
            <router-link
              to="/components/input"
              class="block py-[calc(1rem-var(--text-md-lh)/2)] px-3 rounded-md text-[length:var(--text-md)] leading-[var(--text-md-lh)] whitespace-nowrap select-none transition-colors duration-150 hover:bg-gray-100 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-blue focus-visible:-outline-offset-1 data-[active]:bg-gray-100 data-[active]:outline data-[active]:outline-1 data-[active]:outline-gray-200 data-[active]:-outline-offset-1 data-[active]:cursor-default"
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
