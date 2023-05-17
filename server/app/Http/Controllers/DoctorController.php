<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DoctorController extends Controller
{
    public function index(Request $request)
    {
        $doctors = Doctor::select('doctors.id', 'clinics.opening_time', 'clinics.closing_time', 'users.name as doctor_name', 'images', 'clinics.opening_time', 'clinics.closing_time')
            ->join('users', 'doctors.user_id', '=', 'users.id')
            ->join('clinics', 'doctors.clinic_id', '=', 'clinics.id')
            ->inRandomOrder()
            ->selectRaw('IF(CURRENT_TIME BETWEEN clinics.opening_time AND clinics.closing_time, "true", "false") AS status')
            ->paginate(is_numeric($request['count']) ? $request['count'] : 10);

        return response()->json($doctors);
    }

    public function show(Request $request, $id)
    {
        $doctor =  DB::table('doctors')->select('doctors.id', 'doctors.images', DB::raw('users.name as doctor_name'),
        DB::raw('clinics.name as clinic_name, clinics.id as clinic_id'), DB::raw('doctors.payment'))
            ->join('users', 'doctors.user_id', 'users.id')
            ->leftJoin('appointments', 'doctors.id', '=', 'appointments.doctor_id')
            ->join('clinics', 'doctors.clinic_id', 'clinics.id')
            ->selectRaw('count(appointments.id) as orders')
            ->groupBy('doctors.id', 'doctors.images')
            ->where('doctors.id', $id)
            ->first();

        return response()->json($doctor);
    }
}
