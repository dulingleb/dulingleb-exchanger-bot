<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = DB::table('users')->insert([
            'name' => 'Dulin Hleb',
            'email' => 'dulingleb@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('gleb12345'),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('exchangers')->insert([
            'user_id' => $user->id
        ]);
    }
}
