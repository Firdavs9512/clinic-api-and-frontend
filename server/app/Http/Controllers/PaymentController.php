<?php

namespace App\Http\Controllers;

use App\Http\Requests\Appointment;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    // ?LMI_PAYMENT_NO=1234&RW=523716357715&LMI_SYS_INVS_NO=521&LMI_SYS_TRANS_NO=347&LMI_SYS_TRANS_DATE=20230516+23%3A04%3A02&LMI_LANG=en-US //success
    // LMI_PAYMENT_NO=1234&LMI_SYS_INVS_NO=&LMI_SYS_TRANS_NO=&LMI_SYS_TRANS_DATE=&LMI_LANG=en-US // fail

    public function success(Request $request)
    {
        $payment = Payment::find($request['LMI_PAYMENT_NO']);
        if (!empty($payment)) {
            if ($request['LMI_SYS_INVS_NO'] && $request['LMI_SYS_TRANS_NO']) {
                $payment->LMI_SYS_TRANS_NO = $request['LMI_SYS_TRANS_NO'];
                $payment->LMI_SYS_INVS_NO = $request['LMI_SYS_INVS_NO'];
                $payment->status = 'success';
                $payment->appointment->status = 'booked';
            } else {
                $payment->appointment->status = 'cancelled';
                $payment->status = 'error';
            }
            $payment->save();
        }

        return redirect(env('APP_FRONTEND') . '/dashboard/home');
    }

    public function fail(Request $request)
    {
        $payment = Payment::find($request['LMI_PAYMENT_NO']);
        if (!empty($payment)) {
            if ($payment->status != 'success') {
                $payment->status = 'error';
                $payment->appointment->status = 'cancelled';
                $payment->save();
            }
        }
        return redirect(env('APP_FRONTEND') . '/dashboard/home');
    }

    public function create(Appointment $request)
    {
        //
    }
}
