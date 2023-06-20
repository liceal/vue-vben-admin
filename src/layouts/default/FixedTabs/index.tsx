import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return () => [<div class="bg-white border-b border-gray-400">hello world</div>];
  },
});
