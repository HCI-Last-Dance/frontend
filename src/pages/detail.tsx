import React from 'react'
import Comment from '../components/comment'

const Detail: React.FC = () => {
    return (
        <div className='flex flex-col gap-10 items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>Detail</h1>
            <Comment
                profileImage='/icons/avatar.svg'
                author='작성자 이름'
                timeTaken='24초 소요'
                timeAgo='2시간 전'
                content='외국에서는 실제로 SAT를 1년에 4번씩 본다고 함.'
                replyIds={['reply1', 'reply2']}
                repliesData={[
                    {
                        profileImage: '/icons/avatar.svg',
                        author: '대댓글 작성자',
                        timeTaken: '13초 소요',
                        timeAgo: '1시간 전',
                        content: '오 그런가요? 처음 알았어요!',
                        replyIds: [],
                    },
                    {
                        profileImage: '/icons/avatar.svg',
                        author: '대댓글 작성자',
                        timeTaken: '13초 소요',
                        timeAgo: '1시간 전',
                        content: '오 그런가요? 처음 알았어요!',
                        replyIds: [],
                    },
                ]}
            />
        </div>
    )
}

export default Detail
