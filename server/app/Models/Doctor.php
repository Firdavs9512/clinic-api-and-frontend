<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'clinic_id',
        'images'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
