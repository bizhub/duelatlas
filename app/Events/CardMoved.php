<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CardMoved
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public function __construct(
        public $game,
        public $player,
        public $action,
    ) {}

    public function broadcastOn()
    {
        return new PrivateChannel("game.{$this->game->id}");
    }

    public function broadcastWith()
    {
        return $this->action;
    }
}
