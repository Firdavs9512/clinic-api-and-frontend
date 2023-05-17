<?php

namespace App\Http\Controllers;

use App\Http\Resources\User;
use App\Models\Clinic;
use App\Models\Doctor;
use App\Models\User as ModelsUser;
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

    public function get(Request $request)
    {
        $users = ModelsUser::where('role', 'user')->select('id', 'name', 'email', 'created_at')->paginate(5);

        return response()->json($users);
    }

    public function upDoctor(Request $request)
    {
        $u = $request['user'];

        $user = ModelsUser::find($u);
        $user->role = 'doctor';
        $user->save();

        Doctor::create([
            'user_id' => $u,
            'clinic_id' => Clinic::where('user_id',$request->user()->id)->first()->id,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'New doctor success added!',
        ]);
    }
}
