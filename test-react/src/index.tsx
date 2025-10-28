// Test React Component Library
export interface TestComponentProps {
  message?: string;
  count?: number;
}

export const TestReactComponent: React.FC<TestComponentProps> = ({ 
  message = "Hello from Test React!", 
  count = 0 
}) => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <h3>Test React Component</h3>
      <p>{message}</p>
      <p>Count: {count}</p>
      <p>Version: 1.2.3</p>
    </div>
  );
};

export const TestReactHook = () => {
  const [count, setCount] = React.useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return { count, increment, decrement };
};

export default TestReactComponent;
