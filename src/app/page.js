import Feed from "@/components/Feed";
import Input from "@/components/Input";


export default function page() {
  return (
    <main className="max-w-xl mx-auto border-r border-l min-h-screen overflow-y-auto">
      <div className="py-2 px-3 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-400">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
      </div>
      <Input/>
      <Feed/>
    </main>
  )
}
