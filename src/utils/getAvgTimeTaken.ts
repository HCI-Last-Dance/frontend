import type { CommentType } from '../types/comments'

export const getAvgTimeTaken = (
    comments: CommentType[],
    cluster: string,
    isManipulationFilter: boolean,
): number => {
    console.log(comments, cluster, isManipulationFilter)
    const filtered = comments.flatMap((comment) => {
        if (comment.cluster !== cluster) return [] // 클러스터 불일치 시 건너뜀

        const results = []

        if (comment.manipulated === isManipulationFilter) {
            results.push(comment)
        }

        if (comment.replies) {
            const matchedReplies = comment.replies.filter(
                (reply) => reply.manipulated === isManipulationFilter,
            )
            results.push(...matchedReplies)
        }

        return results
    })

    if (filtered.length === 0) return 0

    const totalTime = filtered.reduce((sum, c) => sum + c.time_taken_to_write, 0)
    return totalTime / filtered.length
}
