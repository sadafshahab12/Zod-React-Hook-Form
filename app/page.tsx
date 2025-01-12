"use client";

import Form from "./components/Form";
import SnowFall from "./components/ui/SnowFall";

function Home() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center p-4 bg-slate-800">
      <SnowFall />
      <div className="relative z-10">
        <Form />
      </div>
    </main>
  );
}

export default Home;
