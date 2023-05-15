<?php

namespace App\Http\Controllers;

use App\Http\Resources\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function information(Request $request)
    {
        return User::make($request->user())->response();
    }

}
