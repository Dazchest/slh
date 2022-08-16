<?php

use App\Http\Controllers\CustomGuidesHeaderController;
use App\Http\Controllers\MineController;
use App\User as AppUser;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/importheaders', 'CustomGuidesHeaderController@importHeaders');
Route::get('/loadguidelist/{type}', 'CustomGuidesHeaderController@loadGuideList');
// Route::get('/loadsharedguidelist', 'CustomGuidesHeaderController@loadSharedGuideList');
Route::get('/fetchguide/{id}', 'CustomGuidesHeaderController@index');
Route::post('/addwave', 'CustomGuidesController@store');
Route::get('/createnewguide', 'CustomGuidesHeaderController@createNewGuide');
Route::get('/deletewave/{id}', 'CustomGuidesController@destroy');
Route::get('/deleteguide/{id}', 'CustomGuidesHeaderController@destroy');
Route::get('/toggleshareguide/{id}', 'CustomGuidesHeaderController@toggleShareGuide');


Route::post('/saveguideinfo/name', 'CustomGuidesHeaderController@savename');
Route::post('/saveguideinfo', 'CustomGuidesHeaderController@saveinfo');

Route::get('/testrel', 'CustomGuidesHeaderController@testRel');

Route::get('/checklogin', function() {
    if(Auth::check()) {
        return Auth::user();
    } else {
        return false;
    }
});
Route::get('/loginn', function() {
    return "adlkasd";
});

// Route::resources([
//     'mines' => MineController::class
// ]);
Route::get('/mines', 'MineController@index');
Route::post('/mines', 'MineController@store');
// Route::delete('/mines/{id}', 'MineController@destroy');
Route::get('/delmines/{id}', 'MineController@destroy');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
