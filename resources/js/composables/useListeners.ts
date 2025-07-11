import { useActionQueue } from '@/composables/useActionQueue'
import Echo from 'laravel-echo'

export function useSocketListeners(matchId: string) {
    const { queueAction } = useActionQueue()

    Echo.private(`game.${matchId}`).listenForWhisper('moveCard', action => {
        queueAction(action)
    })
}
