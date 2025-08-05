import Calculator from '../components/Calculator';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Todo List hey latest code a is there</h1>
      <div className="w-full max-w-md">
        <Calculator />
        <TodoList />
      </div>
    </main>
  );
}
