<?php

namespace App\Http\Controllers;
Use DB;
use Illuminate\Http\Request;
use App\User;
use App\Role;
use App\ViewUsersRole;
class UserController extends Controller
{
    private $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    public function index()
    {
        $users = ViewUsersRole::all();

        return response()->json($users);
    }
    public function store(Request $request)
    {   
        
            $UserD=User::where('email',$request->email)->first();
            if($UserD==null){
                $role_user = Role::where('name', 'user')->first();
                $user = new User();
                $user->name = $request->name;
                $user->email = $request->email;
                $user->password = bcrypt($request->password);
                $user->save();
                $user->roles()->attach($role_user);
                return response()->json($user);
        

        }
        
    }
    
    public function show($user)
    {
        $userF=User::find($user);
        return response()->json($userF);
    }
    public function update(Request $request, $user)
    {
        $data = Career::find($user);
        if ($data == null) {
            return null;
        } else {
            $data->fill($request->all());
            $data->save();
            
            return response()->json($data);
        }
    }
    public function destroy($user)
    {
        $data = User::where('id',$user)->first();
        $role=ViewUsersRole::where('user_id',$data->id)->first();
       
        if($data!==null){
            if($role->name_rol=="user"){
                //$data->carrerSubject()->delete();
                $role_user = Role::where('name', 'user')->first();
                $data->roles()->detach($role_user);
                $data->delete();
            }
        

    }
}
}
