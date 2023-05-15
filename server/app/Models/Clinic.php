<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'address',
        'opening_time',
        'closing_time',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function doctors()
    {
        return $this->hasMany(Doctor::class);
    }

    public function treatments()
    {
        return $this->hasMany(Treatment::class);
    }
}
