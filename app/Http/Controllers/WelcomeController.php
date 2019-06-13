<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    function index()
    {
        if (Auth::check()) {
            if (Auth::user()->name == 'Admin') {
                return view('admin.principal');
            } else {
                return view('user.principal');
            }
        } else {
            return view('auth.login');
        }
    }
}
