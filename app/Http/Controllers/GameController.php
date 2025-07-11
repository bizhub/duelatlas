<?php

namespace App\Http\Controllers;

use App\Events\CardMoved;
use Illuminate\Http\Request;

class GameController
{
    public function moveCard(Request $request)
    {
        // $request->validate([
        //     'card_id' => 'required|string',
        //     'from' => 'required|string',
        //     'to' => 'required|string',
        //     'index' => 'required|integer',
        //     'face_down' => 'boolean',
        // ]);

        // $player = auth()->user();

        // // Check it's player's turn & owns the card & move is valid
        // if (!$game->canPlayerMoveCard($player, $request->card_id, $request->from, $request->to)) {
        //     return response()->json(['error' => 'Invalid move'], 403);
        // }

        // // Update game state in DB or cache
        // $game->moveCard($request->card_id, $request->from, $request->to, $request->index, $request->face_down);

        // Broadcast event to other player(s)
        broadcast(new CardMoved('test', 'self', $request->all()))->toOthers();

        // return response()->json(['success' => true]);
    }
}
