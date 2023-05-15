<?php

namespace App\Http\Controllers;

use App\Http\Requests\Login;
use App\Http\Requests\Register;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Login $request)
    {
        $user = User::where('email',$request['email'])->first();

        if (!Hash::check($request['password'],$user->password)){
            return response()->json([
                'message' => 'Password not correct!',
                'status' => false,
            ]);
        }
        $token = $user->createToken(env('TOKEN_NAME', 'test'));


        return response()->json([
            'message' => 'User success login',
            'token' => $token->plainTextToken,
            'status' => true
        ]);
    }

    public function register(Register $request)
    {
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password'])
        ]);
        $token = $user->createToken(env('TOKEN_NAME', 'test'));

        return response()->json([
            'message' => 'User success register!',
            'token' => $token->plainTextToken,
            'status' => true
        ]);
    }
}
