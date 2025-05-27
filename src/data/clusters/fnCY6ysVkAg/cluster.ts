import type { ClusterType } from "../../../types/clusters";

export const CLUSTERS: ClusterType[] = [
    {
        id: "cluster_A",
        name: "개혁안 찬성",
        description: "자유전공 확대, 수능 다회 등 긍정 반응 중심",
    },
    {
        id: "cluster_B",
        name: "개혁안 반대",
        description: "시행 현실성, 부담 증가 등 부정 시각 중심",
    },
    {
        id: "cluster_C",
        name: "중립적",
        description: "단편적, 질문 섞인 의견 중심",
    },
    {
        id: "cluster_D",
        name: "구조적 제안",
        description: "제도 전반에 대한 깊은 분석 및 비판",
    },
    {
        id: "cluster_E",
        name: "정치적 비판",
        description: "전 정권·전교조 중심의 반말, 강한 어투 (조작 시나리오 포함)",
    },
]
