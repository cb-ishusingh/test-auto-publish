// Test Angular Component Library
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface TestComponentProps {
  message?: string;
  count?: number;
}

@Component({
  selector: 'test-angular-component',
  template: `
    <div style="padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
      <h3>Test Angular Component</h3>
      <p>{{ message }}</p>
      <p>Count: {{ count }}</p>
      <p>Version: 2.1.3</p>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
    </div>
  `
})
export class TestAngularComponent {
  @Input() message: string = 'Hello from Test Angular!';
  @Input() count: number = 0;
  @Output() countChange = new EventEmitter<number>();
  
  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }
  
  decrement() {
    this.count--;
    this.countChange.emit(this.count);
  }
}

export class TestAngularService {
  private count = 0;
  
  getCount(): number {
    return this.count;
  }
  
  increment(): number {
    return ++this.count;
  }
  
  decrement(): number {
    return --this.count;
  }
}

export { TestAngularComponent as default };
