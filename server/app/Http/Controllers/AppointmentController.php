<?php

namespace App\Http\Controllers;

use App\Helper\Times;
use App\Http\Requests\Appointment as RequestsAppointment;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
    use Times;
    public function story(RequestsAppointment $request)
    {

        $old = Appointment::where('appointments.doctor_id', $request['doctor'])
            ->join('payments', 'appointments.id', 'payments.appointment_id')
            ->where('payments.status', '<>', 'pending')
            ->where('appointments.status', '<>', 'cancelled')
            ->where('appointments.date', $request['date'])
            ->where('appointments.time', $request['time'])->first();

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
            'status' => $request['type'] === 'cash' ? 'booked' : 'pending',
        ]);

        $payment = Payment::create([
            'user_id' => $request->user()->id,
            'appointment_id' => $appointment->id,
            'type' => $request['type'],
            'status' => $request['type'] === 'cash' ? 'success' : 'pending',
        ]);

        return response()->json([
            'status' => true,
            'payment_id' => $payment->id,
            'message' => 'You have been successfully registered. Your id: ' . $appointment->id
        ]);
    }

    public function index(Request $request)
    {
        if ($request->user()->role === 'user') {
            $appointments = DB::table('appointments')
                ->join('doctors', 'appointments.doctor_id', '=', 'doctors.id')
                ->join('users', 'doctors.user_id', '=', 'users.id')
                ->join('payments', 'appointments.id', '=', 'payments.appointment_id')
                ->where('appointments.user_id', '=', $request->user()->id)
                ->where('appointments.status', '<>', 'pending')
                ->select('appointments.id', DB::raw("CONCAT(users.name) AS doctor_name, doctors.id as doctor_id"), 'appointments.time', 'appointments.date', 'appointments.status', 'payments.type', 'payments.status as payment_status')
                ->orderBy('appointments.created_at', 'desc')
                ->paginate(10);
        }

        if ($request->user()->role === 'doctor') {
            $appointments = DB::table('appointments')
                ->join('doctors', 'appointments.doctor_id', 'doctors.id')
                ->join('users', 'appointments.user_id', 'users.id')
                ->where('appointments.doctor_id', '=', $request->user()->doctor->id)
                ->where('appointments.status', '<>', 'pending')
                ->join('payments', 'appointments.id', '=', 'payments.appointment_id')
                ->select('appointments.id', DB::raw("CONCAT(users.name) AS doctor_name"), 'appointments.time', 'appointments.date', 'appointments.status', 'payments.type', 'payments.status as payment_status')
                ->orderBy('appointments.created_at', 'desc')
                ->paginate(10);
        }
        if ($request->user()->role === 'clinic') {
            $appointments = DB::table('doctors')
                ->join('clinics', 'clinics.id', 'doctors.clinic_id')
                ->join('users','doctors.user_id','users.id')
                ->join('appointments','doctors.id','=','appointments.doctor_id','left outer')
                ->where('appointments.status','<>','pending')
                ->select('doctors.id as doctor_id','users.name as doctor_name',DB::raw('count(appointments.doctor_id) as orders'),DB::raw('sum(doctors.payment) as payments'))
                ->groupBy('appointments.doctor_id')
                ->orderBy('doctors.created_at', 'desc')
                ->paginate(10);
        }

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
        $appointments = Appointment::where('appointments.date', $request['date'])
            ->join('payments', 'appointments.id', 'payments.appointment_id')
            ->where('appointments.doctor_id', $request['doctor'])
            ->where('appointments.status', '<>', 'cancelled')
            ->where('payments.status', '<>', 'pending')
            ->select(DB::raw('TIME_FORMAT(appointments.time, "%H:%i") as time'))
            ->get();

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
