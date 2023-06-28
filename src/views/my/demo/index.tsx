import { defineComponent, ref } from 'vue';
import { Input } from 'ant-design-vue';

export default defineComponent({
  name: 'Demo',
  setup() {
    const inputValue = ref('');
    return () => [<Input v-model:value={inputValue.value} />, inputValue.value];
  },
});
