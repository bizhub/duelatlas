<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GameActionEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public string $gameId,
        public int $sequenceId,
        public array $action,
    ) {}

    public function broadcastOn(): Channel
    {
        return new PrivateChannel('game.test');
    }

    public function broadcastWith(): array
    {
        return [
            'gameId' => $this->gameId,
            'sequenceId' => $this->sequenceId,
            'action' => $this->action,
        ];
    }

    public function broadcastAs(): string
    {
        return 'GameAction';
    }
}
