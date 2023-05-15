<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'clinic_id'
    ];

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }
}
