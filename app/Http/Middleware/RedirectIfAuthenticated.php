<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {

        if (Auth::guard($guard)->check()) {
            
            $user=Auth::user(); /** sacar el usuario autenticado */
            $roleName=$user->roleUser();
            //dd($roleName);
            if($roleName=="admin"){
                return redirect()->route('admin.index');
            }
            else if($roleName=="user"){
                return redirect()->route('user.index');
            }
           // return redirect('/home');
        }

    return $next($request);
    }
}
