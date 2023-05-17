<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'appointment_id',
        'type',
        'status',
        'LMI_SYS_INVS_NO',
        'LMI_SYS_TRANS_NO',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }
}
