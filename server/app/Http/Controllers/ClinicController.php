<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClinicController extends Controller
{
    public function index(Request $request)
    {
        $clinics = Clinic::select('id', 'name', 'address', 'opening_time', 'closing_time', DB::raw('IF(CURRENT_TIME BETWEEN opening_time AND closing_time, "true", "false") AS status'))
            ->inRandomOrder()
            ->paginate(is_numeric($request['count']) ? $request['count'] : 10);
        return response()->json($clinics);
    }

    public function show(Request $request, $id)
    {
        $clinic = DB::table('clinics')
            ->join('doctors', 'clinics.id', '=', 'doctors.clinic_id')
            ->select(
                'clinics.name',
                'clinics.address',
                'clinics.desc',
                'clinics.opening_time',
                'clinics.closing_time',
                DB::raw('COUNT(doctors.id) as doctor_count')
            )
            ->where('clinics.id', '=', $id)
            ->groupBy('clinics.name', 'clinics.address', 'clinics.desc', 'clinics.opening_time', 'clinics.closing_time')
            ->first();

        $doctors = DB::table('doctors')
            ->join('users', 'doctors.user_id', 'users.id')
            ->select('doctors.id', 'doctors.images', DB::raw('users.name as doctor_name'))
            ->where('clinic_id',$id)
            ->paginate(9);

        $date = [
            'doctors' => $doctors,
            'clinic' => $clinic
        ];

        return response()->json($date);
    }
}
