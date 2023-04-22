'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      // setData(todos);
    };
    fetchTodos();
  }, []);
  return (
    <main>
      <Link href={'/about'}>Navigate to home page</Link>
      <h1>Hello Next 13</h1>
      {data.map((todo) => (
        <h2 key={todo.id}>{todo.title}</h2>
      ))}
    </main>
  );
}
