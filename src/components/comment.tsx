import React, { useState } from 'react'

type Reaction = {
    key: string
    label: string
    iconSrc: string
    initialCount: number
    colorClass: string
    selectedColorClass: string
}

type CommentProps = {
    profileImage: string
    author: string
    timeTaken: string
    timeAgo: string
    content: string
    replyIds: string[]
    repliesData?: CommentProps[]
}

const Comment: React.FC<CommentProps> = ({
    profileImage,
    author,
    timeTaken,
    timeAgo,
    content,
    replyIds,
    repliesData = [],
}) => {
    const [showReplies, setShowReplies] = useState(false)

    const defaultReactions: Reaction[] = [
        {
            key: 'useful',
            label: '유익해요',
            iconSrc: '/icons/star.svg',
            initialCount: 16,
            colorClass: 'text-black-600 border-zinc-200',
            selectedColorClass: 'text-[#337CED] bg-[#E8F2FF] border-[#337CED] border-1',
        },
        {
            key: 'empathy',
            label: '공감해요',
            iconSrc: '/icons/heart.svg',
            initialCount: 1,
            colorClass: 'text-black-600 border-zinc-200',
            selectedColorClass: 'text-[#337CED] bg-[#E8F2FF] border-[#337CED] border-1',
        },
        {
            key: 'curious',
            label: '더 알고싶어요',
            iconSrc: '/icons/question.svg',
            initialCount: 1,
            colorClass: 'text-black-600 border-zinc-200',
            selectedColorClass: 'text-[#337CED] bg-[#E8F2FF] border-[#337CED] border-1',
        },
        {
            key: 'original',
            label: '독창적이에요',
            iconSrc: '/icons/light.svg',
            initialCount: 2,
            colorClass: 'text-black-600 border-zinc-200',
            selectedColorClass: 'text-[#337CED] bg-[#E8F2FF] border-[#337CED] border-1',
        },
        {
            key: 'disagree',
            label: '반대예요',
            iconSrc: '/icons/anger.svg',
            initialCount: 15,
            colorClass: 'text-black-600 border-zinc-200',
            selectedColorClass: 'text-[#337CED] bg-[#E8F2FF] border-[#337CED] border-1',
        },
    ]

    const [reactions, setReactions] = useState(
        defaultReactions.map((r) => ({ ...r, count: r.initialCount, selected: false })),
    )

    const toggleReaction = (index: number) => {
        setReactions((prev) =>
            prev.map((r, i) =>
                i === index
                    ? {
                          ...r,
                          selected: !r.selected,
                          count: r.selected ? r.count - 1 : r.count + 1,
                      }
                    : r,
            ),
        )
    }

    const onClickReport = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        console.log('신고!!')
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='flex w-full justify-between'>
                {/* Profile Image & Content */}
                <div className='flex gap-5 items-start'>
                    <img
                        src={profileImage}
                        alt='Profile'
                        className='w-10 h-10 rounded-full object-cover'
                    />

                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-4'>
                            <span className='text-base font-semibold'>{author}</span>
                            <div className='flex items-center gap-1'>
                                <img src='/icons/write.svg' alt='Time Taken' className='w-3 h-3' />
                                <span className='text-zinc-500 text-sm font-regular'>
                                    {timeTaken}
                                </span>
                            </div>
                        </div>
                        <p className='text-base text-black whitespace-pre-line'>{content}</p>

                        {/* Reactions */}
                        <div className='flex flex-wrap gap-2 mt-1'>
                            {reactions.map((r, i) => (
                                <button
                                    key={r.key}
                                    onClick={() => toggleReaction(i)}
                                    className={`flex items-center gap-1 border rounded-md px-[6px] py-[2px] transition w-fit ${
                                        r.selected ? `${r.selectedColorClass}` : r.colorClass
                                    }`}
                                >
                                    <img src={r.iconSrc} alt={r.label} className='w-4 h-4' />
                                    <span className='font-regular text-sm'>{r.label}</span>
                                    <span className='font-regular text-sm'>({r.count})</span>
                                </button>
                            ))}
                        </div>

                        {/* Reply toggle */}
                        {replyIds.length > 0 && (
                            <div
                                className='mt-2 text-sm text-gray-600 cursor-pointer select-none'
                                onClick={() => setShowReplies(!showReplies)}
                            >
                                {showReplies ? (
                                    <div className='flex flex-row gap-1 items-center'>
                                        <img
                                            src='/icons/chevron_up.svg'
                                            alt='Hide Replies'
                                            className='w-6 h-6'
                                        />
                                        <span className='font-regular text-base text-zinc-900'>
                                            대댓글 ({replyIds.length})
                                        </span>
                                    </div>
                                ) : (
                                    <div className='flex flex-row gap-1 items-center'>
                                        <img
                                            src='/icons/chevron_down.svg'
                                            alt='Show Replies'
                                            className='w-6 h-6'
                                        />
                                        <span className='font-regular text-base text-zinc-900'>
                                            대댓글 ({replyIds.length})
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Report button and Time Ago */}
                <div className='flex gap-3'>
                    <img
                        src='/icons/report.svg'
                        alt='Report'
                        className='w-6 h-6 cursor-pointer'
                        onClick={onClickReport}
                    />
                    <span className='text-base text-zinc-500'>{timeAgo}</span>
                </div>
            </div>

            {/* Reply Comments */}
            {showReplies && (
                <div className='flex flex-col gap-7 mt-5 ml-16'>
                    {repliesData.map((reply, idx) => (
                        <Comment key={replyIds[idx]} {...reply} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comment
