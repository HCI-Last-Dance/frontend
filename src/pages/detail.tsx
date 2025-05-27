import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Comment from '../components/comment'
import CommentNone from '../components/commentNone'
import CommentWriteForm from '../components/commentWriteForm'
import Tab from '../components/tab'
import { COMMENT_DATA_INFO } from '../data/comments/fnCY6ysVkAg/information'
import { COMMENT_DATA_OPINION } from '../data/comments/fnCY6ysVkAg/opinion'
import { COMMENT_DATA_QUESTION } from '../data/comments/fnCY6ysVkAg/question'
import { TEST_USER } from '../data/users/test'
import { VIDEOS } from '../data/videos/videos'

const Detail: React.FC = () => {
    const { videoId } = useParams<{ videoId: string }>()
    const location = useLocation()
    const initialTab = new URLSearchParams(location.search).get('tab') || 'information'
    const [tab, setTab] = useState(initialTab)

    useEffect(() => {
        const newSearchParams = new URLSearchParams(location.search)
        newSearchParams.set('tab', tab)
        window.history.replaceState(null, '', `${location.pathname}?${newSearchParams.toString()}`)
    }, [tab, location.pathname])

    const video = VIDEOS.find((v) => v.id === videoId)
    if (!video)
        return (
            <div className='p-10 text-center text-xl text-red-500'>비디오를 찾을 수 없습니다.</div>
        )

    const COMMENT_DATA = useMemo(() => {
        switch (tab) {
            case 'information':
                return COMMENT_DATA_INFO
            case 'opinion':
                return COMMENT_DATA_OPINION
            case 'question':
                return COMMENT_DATA_QUESTION
            default:
                return COMMENT_DATA_INFO
        }
    }, [tab])

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

            {/* Tab Section */}
            <Tab tab={tab} setTab={setTab} />

            {/* Comments Section */}
            <div className='w-full text-start'>
                <span className='text-base font-semibold'>
                    {tab === 'information'
                        ? '정보성 댓글'
                        : tab === 'opinion'
                          ? '의견 댓글'
                          : '질문'}{' '}
                    {COMMENT_DATA.length}개
                </span>
            </div>
            <CommentWriteForm key={TEST_USER.id} user={TEST_USER} commentType='댓글' />
            <div className='flex flex-col gap-7 w-full'>
                {COMMENT_DATA.length === 0 && <CommentNone />}
                {COMMENT_DATA.length > 0 &&
                    COMMENT_DATA.map((comment) => (
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
