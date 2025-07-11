interface Card {
    id: string
    name: string
    // type: string
}

interface CardInPlay {
    id: number
    card: Card
    location: string
}

interface Action {
    id: number
    type: string
    zone: string
}
