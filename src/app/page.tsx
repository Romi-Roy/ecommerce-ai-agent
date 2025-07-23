import Image from "next/image";
import ChatInterface from '@/components/chatInterface';

export default function Home() {
   return (
    <main className="min-h-screen bg-[#0E0E10]">
      <ChatInterface />
    </main>
  );
}
