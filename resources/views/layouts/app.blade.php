<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/loading.css') }}" rel="stylesheet">
    <link href="{{ asset('css/notFound.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/v4-shims.css">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="admin">
                    <img src="/img/logo-cread.png" width="100"  alt="">
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Iniciar sesión') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Registrarse') }}</a>
                                </li>
                            @endif
                        @else
                            @if(Auth::user()->name == "Admin")
                                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul class="navbar-nav mr-auto">
                                            <li class="nav-item @if(Request::is('admin')) active @endif">
                                                <a class="nav-link" href="/admin">
                                                    <i class="fas fa-home"></i>
                                                    Inicio 
                                                    <span class="sr-only">(current)</span>
                                                </a>
                                            </li>
                                            <li class="nav-item @if(Request::is('careers')) active @endif">
                                                <a class="nav-link" href="/careers">
                                                    <i class="fas fa-brain"></i>
                                                    Programas
                                                </a>
                                            </li>
                                            <li class="nav-item @if(Request::is('subjects')) active @endif">
                                                <a class="nav-link" href="/subjects">
                                                    <i class="fas fa-book-reader"></i>
                                                    Asignaturas
                                                </a>
                                            </li>
                                            <li class="nav-item @if(Request::is('teachers')) active @endif">
                                                <a class="nav-link" href="/teachers">
                                                    <i class="fas fa-chalkboard-teacher"></i>
                                                    Docentes
                                                </a>
                                            </li>
                                            <li class="nav-item @if(Request::is('classrooms')) active @endif">
                                                <a class="nav-link" href="/classrooms">
                                                    <i class="fas fa-building"></i>
                                                    Salones
                                                </a>
                                            </li>
                                            <li class="nav-item dropdown">
                                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                                    <i class="fas fa-tools"></i>
                                                    {{ Auth::user()->name }} <span class="caret"></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                                    <a class="dropdown-item" href="/profile">
                                                        <i class="fas fa-id-card"></i>
                                                        Perfil de usuario
                                                    </a>
                                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                                        onclick="event.preventDefault();
                                                        document.getElementById('logout-form').submit();">
                                                        <i class="fas fa-sign-out-alt"></i>
                                                        {{ __('Cerrar sesión') }}
                                                    </a>
                                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                                        @csrf
                                                    </form>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            @else
                                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul class="navbar-nav mr-auto">
                                            <li class="nav-item @if(Request::is('user')) active @endif">
                                                <a class="nav-link" href="/user">Inicio 
                                                    <span class="sr-only">(current)</span>
                                                </a>
                                            </li>
                                            <li class="nav-item @if(Request::is('user/reportes')) active @endif">
                                                <a class="nav-link" href="/user/reportes">Reportes</a>
                                            </li>
                                            <li class="nav-item dropdown">
                                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                                    {{ Auth::user()->name }} <span class="caret"></span>
                                                </a>

                                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                                    <a class="dropdown-item" href="/profile">Perfil de usuario</a>
                                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                                    onclick="event.preventDefault();
                                                                    document.getElementById('logout-form').submit();">
                                                        {{ __('Cerrar sesión') }}
                                                    </a>
                                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                                        @csrf
                                                    </form>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            @endif
                        @endguest
                </div>
            </div>
        </nav>
        <main class="py-4">
            @yield('content')
        </main>
    </div>
    @if(Auth::check())
        <script>    
            const user = '{{ $user }}' 
        </script>
    @endif
    <script src="{{ asset('/js/app.js') }}"> </script>
    <script defer src="https://use.fontawesome.com/releases/v5.9.0/js/all.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.9.0/js/v4-shims.js"></script>
</body>
</html>
