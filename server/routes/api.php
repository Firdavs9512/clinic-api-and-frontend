<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/user/information', [UserController::class, 'information']);
    Route::post('/user/update',[UserController::class,'update']);
    Route::get('/users/get',[UserController::class,'get'])->middleware('role:clinic');
    Route::post('/users/up-doctor',[UserController::class,'upDoctor'])->middleware('role:clinic');
    Route::get('/clinics/list', [ClinicController::class, 'index']);
    Route::get('/clinics/{id}', [ClinicController::class, 'show']);
    Route::get('/doctors/list', [DoctorController::class, 'index']);
    Route::get('/doctors/search', [DoctorController::class, 'search']);
    Route::get('/doctors/{id}', [DoctorController::class, 'show']);
    Route::post('/appointments', [AppointmentController::class, 'story']);
    Route::get('/appointments/list', [AppointmentController::class, 'index']);
    Route::post('/appointments/daily', [AppointmentController::class, 'daily']);
    Route::post('/appointments/update/{id}', [AppointmentController::class, 'update']);
    Route::post('/payment/create', [PaymentController::class, 'create']);
});
