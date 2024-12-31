export default function SearchBar() {
  return (
    <div
      className='flex w-full -mt-20 h-16 rounded-lg border-4 text-black'
      style={{ borderColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <input
        type='text'
        placeholder='Where are you going?'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className='w-1/3 rounded-tl-lg rounded-bl-lg border-r-2 px-4'
        style={{ borderColor: 'rgba(0, 0, 0, 0.3)' }}
      />
      <input
        type='text'
        placeholder='Price range (e.g., 100-500)'
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className='w-1/3 border-r-2 px-4'
        style={{ borderColor: 'rgba(0, 0, 0, 0.3)' }}
      />
      <input
        type='text'
        placeholder='Time budget'
        value={timeBudget}
        onChange={(e) => setTimeBudget(e.target.value)}
        className='w-1/3  border-r-2 px-4'
        style={{ borderColor: 'rgba(0, 0, 0, 0.3)' }}
      />
      <button className='w-32 text-center p-2 bg-blue-700 text-white text-lg hover:bg-blue-900 rounded-tr-lg rounded-br-lg'>
        Search
      </button>
    </div>
  )
}
