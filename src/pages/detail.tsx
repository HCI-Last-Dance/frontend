import React from 'react'
import Comment from '../components/comment'
import { COMMENT_DATA } from '../data/comments/7bdoq_zUvEs/information'

const Detail: React.FC = () => {
    return (
        <div className='flex flex-col gap-10 items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>Detail</h1>
            <div className='flex flex-col gap-7 w-full'>
                {/* {COMMENT_DATA.map((comment) => (
                    <Comment
                        key={comment.comment_id}
                        comment={comment}
                        repliesData={comment.replies}
                    />
                ))} */}
                <Comment
                    key={COMMENT_DATA[0].comment_id}
                    comment={COMMENT_DATA[0]}
                    repliesData={COMMENT_DATA[0].replies || []}
                />
            </div>
        </div>
    )
}

export default Detail
