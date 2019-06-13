<?php

namespace App\Http\Middleware;
use Illuminate\Contracts\Auth\Guard;
use Closure;

class Admin
{

    protected $auth;

    public function __construct (Guard $guard) {
        $this->auth = $guard;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
      if ( $this->auth->user()->roleUser() == "admin" ) {
          return $next($request);
      } else {
          $this->auth->logout();
          return redirect('/');

      }
    }
}
