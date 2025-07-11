<?php

use App\Http\Controllers\DuelController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Duel');
})->name('home');

Route::get('test', function(){
    Auth::loginUsingId(1);
});

Route::post('duel', DuelController::class);
