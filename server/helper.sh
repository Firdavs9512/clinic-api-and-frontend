echo "[+] Helper run";
php artisan migrate:fresh;
php artisan db:seed --class=UserSeeder;
php artisan db:seed --class=ClinicSeeder;
php artisan db:seed --class=DoctorSeeder;
php artisan db:seed --class=TreatmentSeeder;

echo "[+] All work running!";
