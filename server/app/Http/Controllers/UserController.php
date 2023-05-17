<?php

namespace App\Http\Controllers;

use App\Http\Resources\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function information(Request $request)
    {
        return User::make($request->user())->response();
    }


    public function update(Request $request)
    {
        $request->validate([
            'email' => 'email|unique:users,email',
            'password' => 'min:6'
        ]);

        $user = $request->user();

        if (!empty($request['name'])) {
            $user->name = $request['name'];
        }

        if (!empty($request['email'])) {
            $user->email = $request['email'];
        }

        if (!empty($request['password'])) {
            $user->password = Hash::make($request['password']);
        }

        $user->save();
        return response()->json($user);
    }
}
