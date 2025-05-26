import React from 'react'

const Home: React.FC = () => {
    return (
        <div className='flex flex-col gap-10 items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>Home</h1>
            <button
                className='px-4 py-2 bg-blue-500 text-white rounded'
                onClick={() => {
                    window.location.href = '/detail'
                }}
            >
                Go to Detail
            </button>
        </div>
    )
}

export default Home
