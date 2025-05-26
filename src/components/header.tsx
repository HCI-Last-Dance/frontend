import React from 'react'

const Header: React.FC = () => {
    const onClickLogin = () => {
        window.location.href = '/login'
    }

    return (
        <header className='flex w-full items-center justify-between px-16 py-6'>
            {/* Logo */}
            <h1
                className='text-3xl font-bold text-[#4F46E5] cursor-pointer'
                onClick={() => (window.location.href = '/')}
            >
                MeTube
            </h1>

            {/* Search Bar */}
            <div className='flex items-center bg-zinc-200 rounded-full px-4 w-[600px]'>
                <img src='/icons/search.svg' alt='검색' className='w-5 h-5 mr-2' />
                <input
                    type='text'
                    placeholder="'인컴상'을 검색해보세요!"
                    className='flex-1 bg-transparent py-[10px] text-sm focus:outline-none'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            console.log('검색어:', (e.target as HTMLInputElement).value)
                        }
                    }}
                />
            </div>

            {/* Login Button */}
            <button
                className='text-sm px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition-colors'
                onClick={onClickLogin}
            >
                로그인
            </button>
        </header>
    )
}

export default Header
