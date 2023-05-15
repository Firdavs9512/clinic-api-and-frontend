<?php

namespace App\Http\Controllers;

use App\Helper\Times;
use App\Http\Requests\Appointment as RequestsAppointment;
use App\Models\Appointment;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
    use Times;
    public function story(RequestsAppointment $request)
    {

        $old = Appointment::where('doctor_id', $request['doctor'])->where('date', $request['date'])->where('time', $request['time'])->first();

        if (!empty($old)) {
            return response()->json([
                'status' => false,
                'message' => 'The Doctor has another appointment at this hour',
            ]);
        }

        $appointment = Appointment::create([
            'user_id' => $request->user()->id,
            'doctor_id' => $request['doctor'],
            'date' => $request['date'],
            'time' => $request['time'],
            'status' => 'booked',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'You have been successfully registered. Your id: ' . $appointment->id
        ]);
    }

    public function index(Request $request)
    {
        $appointments = DB::table('appointments')
            ->join('doctors', 'appointments.doctor_id', '=', 'doctors.id')
            ->join('users', 'doctors.user_id', '=', 'users.id')
            ->where('appointments.user_id', '=', $request->user()->id)
            ->select('appointments.id', DB::raw("CONCAT(users.name) AS doctor_name"), 'appointments.time', 'appointments.date', 'appointments.status')
            ->orderBy('appointments.created_at', 'desc')
            ->paginate(10);
        return response()->json($appointments);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::where('id', $id)->where('user_id', $request->user()->id)->first();
        if (!empty($appointment)) {
            $appointment->status = 'cancelled';
            $appointment->save();
        }
        return response()->json([
            'status' => true
        ]);
    }

    public function daily(Request $request)
    {
        $appointments = Appointment::where('date', $request['date'])->where('doctor_id', $request['doctor'])->where('status','<>', 'completed')->select(DB::raw('TIME_FORMAT(time, "%H:%i") as time'))->get();

        $results = [];

        foreach (Times::times() as $time) {
            $status = true;
            foreach ($appointments as $appointment) {
                if ($appointment["time"] === $time) {
                    $status = false;
                    break;
                }
            }
            $results[] = ["time" => $time, "status" => $status];
        }

        return response()->json($results);
    }
}
