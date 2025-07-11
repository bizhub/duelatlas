<?php

namespace App\Jobs;

use App\Events\GameActionEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessGameAction implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $gameId,
        public $action,
    ) {}

    public function handle(): void
    {
        $gameState = [];

        match ($this->action['type']) {
            'move' => $this->applyMoveCard($gameState, $this->action['payload']),
        };
    }

    protected function applyMoveCard($gameState, $payload)
    {
        broadcast(
            new GameActionEvent(
                gameId: 'test',
                sequenceId: 1,
                action: $payload,
            ),
        );
    }
}
