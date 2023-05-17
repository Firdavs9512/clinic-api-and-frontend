<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Elasticsearch\Client;
use Illuminate\Support\Facades\DB;

class IndexDoctorsData extends Command
{
    protected $signature = 'doctors:index';

    protected $description = 'Index doctors data in Elasticsearch';

    protected $elasticsearch;

    public function __construct(Client $elasticsearch)
    {
        parent::__construct();
        $this->elasticsearch = $elasticsearch;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $indexName = 'doctors';
        $tableName = 'doctors';

        // Delete the existing index
        // $this->elasticsearch->indices()->delete(['index' => $indexName]);

        // Create the index
        $this->elasticsearch->indices()->create(['index' => $indexName]);

        // Get the doctors' data from the database
        $doctors = DB::table($tableName)
            ->select('users.name as name', 'clinics.name as clinic_name', 'doctors.id as id')
            ->join('users', 'doctors.user_id', 'users.id')
            ->join('clinics', 'doctors.clinic_id', 'clinics.id')
            ->get();


        foreach ($doctors as $doctor) {
            $params = [
                'index' => $indexName,
                'id' => $doctor->id,
                'body' => [
                    'name' => $doctor->name,
                    'clinic_name' => $doctor->clinic_name,
                ],
            ];

            $this->elasticsearch->index($params);
        }

        $this->info('Doctors data has been indexed successfully.');
    }
}
