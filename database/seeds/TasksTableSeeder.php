<?php

use Illuminate\Database\Seeder;
use App\Task;//la entidad

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Task::class, 35)->create();
    }
}