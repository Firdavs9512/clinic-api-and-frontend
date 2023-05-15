<?php

namespace Database\Seeders;

use App\Models\Clinic;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ClinicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clinics = User::where('role', 'clinic')->pluck('id')->toArray();

        $faker = Faker::create();
        foreach ($clinics as $id) {
            Clinic::create([
                'user_id' => $id,
                'name' => $faker->company(),
                'address' => $faker->address(),
                'desc' => $faker->paragraph(),
            ]);
        }
    }
}
