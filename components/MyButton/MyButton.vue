<template>
   <div id="button">
      <p class="buttonName">
         <slot />
      </p>
   </div>
</template>

<script setup>

</script>

<style lang="less">
#button {
   width: 200px;
   height: 60px;
   background-color: darkviolet;
   border-radius: 50px;
   margin: 0 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;

   transition: all 0.3s ease 0s;

   &:hover {
      background-color: rgb(125, 20, 223);
   }

   &:active {
      background-color: rgb(200, 15, 224);
      transition: all 0s ease 0s;
   }

   .buttonName {
      width: 90%;
      height: auto;
      text-align: center;
      font-family: inter;
      color: azure;
      font-size: 20px;
      font-weight: 500;
   }
}</style>