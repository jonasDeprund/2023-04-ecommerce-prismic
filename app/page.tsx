import Link from 'next/link';

const fetchTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();
  return data;
};

export default async function Home() {
  const todos = await fetchTodos();

  return (
    <main>
      <Link href={'/about'}>Navigate to home page</Link>
      <h1>Hello Next 13</h1>
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </main>
  );
}
