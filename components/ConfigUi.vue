<template>
  <div>
    <v-btn
      class="menu-button"
      icon
      color="rgba(100, 100, 100, 0.6)"
      :class="{open: drawerOpen}"
      @click="drawerOpen=!drawerOpen"
    >
      ☰
    </v-btn>
    <v-navigation-drawer
      v-model="drawerOpen"
      class="nav-drawer"
      color="rgba(100, 100, 100, 0.5)"
      absolute
    >
      <v-container>
        <v-row>
          <v-col>
            <v-container pt-3 />
            <div
              v-for="(param, name) in params"
              :key="name"
            >
              <v-slider
                v-if="param.type=='slider'"
                v-model="param.model.value"
                color="#ccc"
                :label="param.label"
                :min="param.min"
                :max="param.max"
                :thumb-label="true"
                hide-details
              />
              <v-checkbox
                v-if="param.type=='checkbox'"
                v-model="param.model.value"
                :label="param.label"
                hide-details
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">

const {params} = usePrefs()

const drawerOpen = ref(true)

</script>

<style scoped>
 .menu-button {
   position: absolute;
   left: 0;
   z-index: 10;
   transition: left 0.2s;
 }
 .menu-button.open {
   left: 256px;
 }
</style>
