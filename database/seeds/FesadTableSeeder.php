<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;
class FesadTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_admin = Role::where('name', 'admin')->first();
        $user = new User();
        $user->name = 'Gustavo A.';
        $user->email = 'cread.sogamoso@uptc.edu.co';
        $user->password = bcrypt('uptc2019');
        $user->save();
        $user->roles()->attach($role_admin);
    }
}
