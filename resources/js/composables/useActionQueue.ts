export const useActionQueue = defineStore('action_queue', () => {
    const game = useGameState()

    const queue = ref<Action[]>([])
    const isAnimating = ref(false)
    const animatingCardIds = ref<Set<number>>(new Set())

    function queueAction(action: Action) {
        queue.value.push(action)
        processQueue()
    }

    async function processQueue() {
        if (isAnimating.value || queue.value.length === 0) return

        isAnimating.value = true
        const action = queue.value.shift()
        if (!action) {
            isAnimating.value = false
            return
        }

        console.log('processing action:', action)

        animatingCardIds.value.add(action.id)

        await animateMove(action)

        game.moveCard(action.id, action.zone)

        animatingCardIds.value.delete(action.id)
        isAnimating.value = false

        processQueue()
    }

    async function animateMove(action: Action) {
        const cardEl = document.getElementById(`card-${action.id}`) as HTMLElement
        const toEl = document.getElementById(action.zone)

        if (!cardEl || !toEl) return

        const fromEl = cardEl.closest('[id]') as HTMLElement
        if (!fromEl) return

        const fromRect = fromEl.getBoundingClientRect()
        const toRect = toEl.getBoundingClientRect()

        const clone = cardEl.cloneNode(true) as HTMLElement
        document.body.appendChild(clone)

        // Set clone initial styles
        clone.style.position = 'absolute'
        clone.style.left = `${fromRect.left}px`
        clone.style.top = `${fromRect.top}px`
        clone.style.width = `${fromRect.width}px`
        clone.style.height = `${fromRect.height}px`
        clone.style.zIndex = '1000'
        clone.style.pointerEvents = 'none'
        clone.style.transition = 'left 0.4s ease, top 0.4s ease'

        // Optional: copy appearance
        const style = getComputedStyle(cardEl)
        clone.style.borderRadius = style.borderRadius
        clone.style.background = style.background
        clone.style.boxShadow = style.boxShadow

        // Force reflow (important!)
        clone.getBoundingClientRect() // or: void clone.offsetWidth

        // Now trigger the animation
        requestAnimationFrame(() => {
            clone.style.left = `${toRect.left}px`
            clone.style.top = `${toRect.top}px`
        })

        // Wait for transition to complete
        await new Promise(resolve => setTimeout(resolve, 400))
        document.body.removeChild(clone)
    }

    function isCardAnimating(id: number): boolean {
        return animatingCardIds.value.has(id)
    }

    return {
        queueAction,
        isCardAnimating,
    }
})
