import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Comment from '../components/comment'
import CommentNone from '../components/commentNone'
import CommentWriteForm from '../components/commentWriteForm'
import Tab from '../components/tab'
import SortBox from '../components/sortBox'
import Filter from '../components/filter'
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

    type SortKey = 'useful' | 'agree' | 'curious' | 'creative' | 'disagree' | 'latest'
    const [sortKey, setSortKey] = useState<SortKey>('useful')

    const [onlyWithReplies, setOnlyWithReplies] = useState(false)

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

    const rawComments = useMemo(() => {
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

    const sortedComments = useMemo(() => {
        if (sortKey === 'latest') {
            return [...rawComments].sort(
                (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
            )
        }

        return [...rawComments].sort((a, b) => {
            const aVal = a.reactions?.[sortKey as keyof typeof a.reactions] || 0
            const bVal = b.reactions?.[sortKey as keyof typeof b.reactions] || 0
            return bVal - aVal
        })
    }, [rawComments, sortKey])

    const filteredComments = useMemo(() => {
        const base = [...rawComments]
        const sorted =
            sortKey === 'latest'
                ? base.sort(
                      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
                  )
                : base.sort((a, b) => (b.reactions?.[sortKey] || 0) - (a.reactions?.[sortKey] || 0))

        return onlyWithReplies
            ? sorted.filter((c) => c.reply_ids && c.reply_ids.length > 0)
            : sorted
    }, [rawComments, sortKey, onlyWithReplies])

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
            {tab === 'information' && (
                <>
                    <div className='w-full flex justify-between items-center'>
                        <span className='text-base font-semibold'>
                            정보성 댓글 {sortedComments.length}개
                        </span>
                        <SortBox sortKey={sortKey} setSortKey={setSortKey} />
                    </div>
                    <CommentWriteForm
                        key={TEST_USER.id}
                        user={TEST_USER}
                        commentType='정보를 공유해보세요!'
                    />
                    <div className='flex flex-col gap-7 w-full'>
                        {sortedComments.length === 0 && <CommentNone />}
                        {sortedComments.length > 0 &&
                            sortedComments.map((comment) => (
                                <Comment
                                    key={comment.comment_id}
                                    comment={comment}
                                    repliesData={comment.replies || []}
                                />
                            ))}
                    </div>
                </>
            )}

            {tab === 'opinion' && ( // TODO: 이후 클러스터로 변경
                <>
                    <div className='w-full flex justify-between items-center'>
                        <span className='text-base font-semibold'>
                            의견 댓글 {sortedComments.length}개
                        </span>
                        <SortBox sortKey={sortKey} setSortKey={setSortKey} />
                    </div>
                    <CommentWriteForm
                        key={TEST_USER.id}
                        user={TEST_USER}
                        commentType='의견을 나눠보세요!'
                    />
                    <div className='flex flex-col gap-7 w-full'>
                        {sortedComments.length === 0 && <CommentNone />}
                        {sortedComments.length > 0 &&
                            sortedComments.map((comment) => (
                                <Comment
                                    key={comment.comment_id}
                                    comment={comment}
                                    repliesData={comment.replies || []}
                                />
                            ))}
                    </div>
                </>
            )}

            {tab === 'question' && (
                <>
                    <div className='w-full flex justify-between items-center'>
                        <span className='text-base font-semibold'>
                            질문 {sortedComments.length}개
                        </span>
                        <div className='flex items-center gap-4'>
                            <Filter
                                label='대댓글 달린 댓글만 보기'
                                filterValue={onlyWithReplies}
                                setFilterValue={setOnlyWithReplies}
                            />
                            <SortBox sortKey={sortKey} setSortKey={setSortKey} />
                        </div>
                    </div>
                    <CommentWriteForm
                        key={TEST_USER.id}
                        user={TEST_USER}
                        commentType='질문을 남겨보세요!'
                    />
                    <div className='flex flex-col gap-7 w-full'>
                        {filteredComments.length === 0 && <CommentNone />}
                        {filteredComments.length > 0 &&
                            filteredComments.map((comment) => (
                                <Comment
                                    key={comment.comment_id}
                                    comment={comment}
                                    repliesData={comment.replies || []}
                                />
                            ))}
                    </div>
                </>
            )}
        </main>
    )
}

export default Detail
