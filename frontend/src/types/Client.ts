export type Client = {
    id: number
    famille: string[]
    maille: string[]
    nb_achat: number
    nb_passage: number
    univers: string[]
}

export const defaultClient = {
    id: 0,
    famille: [],
    maille: [],
    nb_achat: 0,
    nb_passage: 0,
    univers: [],
}
