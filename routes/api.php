<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('store', 'StoreController@index');
Route::post('/login', 'Api\AuthController@login');
// Route::post('customer-save', 'Api\CustomerController@store')->middleware('auth:api');
// Route::get('customer', 'Api\CustomerController@index')->middleware('auth:api');



Route::get('join-call', 'JoinCallController@index');
Route::post('organization-store', 'OrganizationController@store');
Route::get('student-list', 'StudentsController@index');
Route::get('organization-list', 'OrganizationController@index');
Route::get('conference-list', 'ConferenceController@index');

Route::group([
    'middleware' => 'auth:api'
  ], function() {
    Route::post('student-store', 'StudentsController@store');
    Route::post('class-store', 'ClassController@store');
    Route::post('conference-store', 'ConferenceController@store');
});    

// Route::middleware(['cors'])->group(function () {
//     Route::get('join-call', 'JoinCallController@index');
// });

//Route::get('join-call', 'Api\JoinCallController@index')->middleware('cors');

//Route::apiResource('customer', 'Api\CustomerController')->middleware('auth:api');
//Route::post('customer-store', 'Api\CustomerController@store');