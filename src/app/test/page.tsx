export default function TestPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ef4444', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
        INLINE STYLE TEST
      </h1>
      
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg mb-4">
        <h2 className="text-2xl font-bold mb-2">TAILWIND CLASSES TEST</h2>
        <p>If this has blue background and white text, Tailwind classes are working.</p>
      </div>
      
      <div className="bg-red-600 text-white p-4 rounded mb-4">
        <p>Red background with Tailwind</p>
      </div>
      
      <div className="bg-green-500 text-white p-4 rounded mb-4">
        <p>Green background with Tailwind</p>
      </div>
      
      <div className="flex gap-4 mb-4">
        <div className="bg-purple-500 text-white p-4 rounded flex-1">Flex 1</div>
        <div className="bg-orange-500 text-white p-4 rounded flex-1">Flex 2</div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-pink-500 text-white p-2 rounded text-center">Grid 1</div>
        <div className="bg-indigo-500 text-white p-2 rounded text-center">Grid 2</div>
        <div className="bg-teal-500 text-white p-2 rounded text-center">Grid 3</div>
      </div>
    </div>
  )
}
