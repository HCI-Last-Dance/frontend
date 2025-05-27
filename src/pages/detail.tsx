import React from 'react'
import { useParams } from 'react-router-dom'
import Comment from '../components/comment'
import CommentWriteForm from '../components/commentWriteForm'
import { COMMENT_DATA } from '../data/comments/7bdoq_zUvEs/information'
import { TEST_USER } from '../data/users/test'
import { VIDEOS } from '../data/videos/videos'

const Detail: React.FC = () => {
    const { videoId } = useParams<{ videoId: string }>()
    const video = VIDEOS.find((v) => v.id === videoId)
    if (!video)
        return (
            <div className='p-10 text-center text-xl text-red-500'>비디오를 찾을 수 없습니다.</div>
        )

    return (
        <main className='flex flex-col gap-10 items-center justify-center'>
            {/* Video Section */}
            <div className='w-full flex flex-col gap-2 mt-5'>
                <div className='w-full aspect-video rounded-xl overflow-hidden'>
                    <iframe
                        width='100%'
                        height='100%'
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                        className='w-full h-full rounded-xl'
                    ></iframe>
                </div>
                <p className='text-xl font-bold mt-2 text-zinc-950'>{video.title}</p>
                <p className='text-base text-zinc-500'>{video.date}</p>
            </div>

            {/* Comments Section */}
            <CommentWriteForm key={TEST_USER.id} user={TEST_USER} commentType='댓글' />
            <div className='flex flex-col gap-7 w-full'>
                {COMMENT_DATA.map((comment) => (
                    <Comment
                        key={comment.comment_id}
                        comment={comment}
                        repliesData={comment.replies || []}
                    />
                ))}
                {/* <Comment
                    key={COMMENT_DATA[0].comment_id}
                    comment={COMMENT_DATA[0]}
                    repliesData={COMMENT_DATA[0].replies || []}
                /> */}
            </div>
        </main>
    )
}

export default Detail
