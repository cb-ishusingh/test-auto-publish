// Test Vue Component Library
import { defineComponent, ref } from 'vue';

export interface TestComponentProps {
  message?: string;
  count?: number;
}

export const TestVueComponent = defineComponent({
  name: 'TestVueComponent',
  props: {
    message: {
      type: String,
      default: 'Hello from Test Vue!'
    },
    count: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const localCount = ref(props.count);
    
    const increment = () => localCount.value++;
    const decrement = () => localCount.value--;
    
    return {
      localCount,
      increment,
      decrement
    };
  },
  template: `
    <div style="padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
      <h3>Test Vue Component</h3>
      <p>{{ message }}</p>
      <p>Count: {{ localCount }}</p>
      <p>Version: 1.2.3</p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
  `
});

export const useTestComposable = () => {
  const count = ref(0);
  
  const increment = () => count.value++;
  const decrement = () => count.value--;
  
  return { count, increment, decrement };
};

export default TestVueComponent;
