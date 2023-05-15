<?php

namespace Database\Seeders;

use App\Models\Clinic;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $doctors = User::where('role','doctor')->pluck('id')->toArray();

        foreach ($doctors as $id) {
            $clinic = Clinic::inRandomOrder()->first();
            Doctor::create([
                'user_id' => $id,
                'clinic_id' => $clinic->id,
                'images' => Str::random(10)
            ]);
        }
    }
}
