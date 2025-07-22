import Image from "next/image";
import ChatInterface from '@/components/chatInterface';

export default function Home() {
   return (
    <main className="min-h-screen bg-gray-50 py-8">
      <ChatInterface />
    </main>
  );
}
