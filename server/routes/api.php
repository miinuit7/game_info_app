<?php

use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('reviews/{media_id}',[ReviewController::class, 'index']);
Route::post('/reviews',[ReviewController::class, 'store']);
Route::delete('/review/{review}',[ReviewController::class, 'destroy']);

Route::put('/review/{review}',[ReviewController::class, 'update']);