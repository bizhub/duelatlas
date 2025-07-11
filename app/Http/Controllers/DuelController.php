<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessGameAction;
use Illuminate\Http\Request;

class DuelController
{
    public function __invoke(Request $request)
    {
        $action = $request->validate([
            'type' => 'required|string',
            'payload' => 'required|array',
            'actionId' => 'sometimes|string|nullable', // For idempotency?
        ]);

        ProcessGameAction::dispatch('test', $action);

        return response()->json(['status' => 'queued']);
    }
}
