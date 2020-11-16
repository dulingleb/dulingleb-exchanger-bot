<nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
        <!-- Toggler -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Brand -->
        <a class="navbar-brand pt-0" href="{{ route('home') }}">
            <img src="{{ asset('argon') }}/img/brand/blue.png" class="navbar-brand-img" alt="...">
        </a>
        <!-- User -->
        <ul class="nav align-items-center d-md-none">
            <li class="nav-item dropdown">
                <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div class="media align-items-center">
                        <span class="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" src="{{ asset('argon') }}/img/theme/team-1-800x800.jpg">
                        </span>
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                    <div class=" dropdown-header noti-title">
                        <h6 class="text-overflow m-0">{{ __('Welcome!') }}</h6>
                    </div>
                    <a href="{{ route('profile.edit') }}" class="dropdown-item">
                        <i class="ni ni-single-02"></i>
                        <span>{{ __('My profile') }}</span>
                    </a>
                    <a href="#" class="dropdown-item">
                        <i class="ni ni-settings-gear-65"></i>
                        <span>{{ __('Settings') }}</span>
                    </a>
                    <a href="#" class="dropdown-item">
                        <i class="ni ni-calendar-grid-58"></i>
                        <span>{{ __('Activity') }}</span>
                    </a>
                    <a href="#" class="dropdown-item">
                        <i class="ni ni-support-16"></i>
                        <span>{{ __('Support') }}</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="{{ route('logout') }}" class="dropdown-item" onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();">
                        <i class="ni ni-user-run"></i>
                        <span>{{ __('Logout') }}</span>
                    </a>
                </div>
            </li>
        </ul>
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">
            <!-- Collapse header -->
            <div class="navbar-collapse-header d-md-none">
                <div class="row">
                    <div class="col-6 collapse-brand">
                        <a href="{{ route('home') }}">
                            <img src="{{ asset('argon') }}/img/brand/blue.png">
                        </a>
                    </div>
                    <div class="col-6 collapse-close">
                        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Form -->
            <form class="mt-4 mb-3 d-md-none">
                <div class="input-group input-group-rounded input-group-merge">
                    <input type="search" class="form-control form-control-rounded form-control-prepended" placeholder="{{ __('Search') }}" aria-label="Search">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <span class="fa fa-search"></span>
                        </div>
                    </div>
                </div>
            </form>
            <!-- Navigation -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('home') }}">
                        <i class="ni ni-tv-2 text-primary"></i> {{ __('Dashboard') }}
                    </a>
                </li>

                @if(auth()->user()->isSuperAdmin())
                <li class="nav-item">
                    <a class="nav-link active" href="{{ route('user.index') }}">
                        <i class="fas fa-users" style="color: #f4645f;"></i>
                        <span class="nav-link-text" style="color: #f4645f;">Пользователи</span>
                    </a>
                </li>
                @endif

                <li class="nav-item">
                    <a class="nav-link active" href="{{ route('telegramUser.index') }}">
                        <i class="fas fa-users" style="color: #f4645f;"></i>
                        <span class="nav-link-text" style="color: #f4645f;">Пользователи</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="{{ route('operations.index') }}">
                        <i class="ni ni-money-coins text-blue"></i> Сделки
                        @if($oCount = \App\Models\Operation::where('exchanger_id', auth()->user()->exchanger->id)->where('status', \App\Models\Operation::STATUS_CHECKING)->count())
                            <span class="badge badge-sm ml-3 badge-circle badge-floating badge-danger border-white">
                                {{ $oCount }}
                            </span>
                        @endif
                    </a>
                </li>

                @if(\Route::has('send.index'))
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('send.index') }}">
                        <i class="ni ni-curved-next text-blue"></i> Отправить btc
                    </a>
                </li>
                @endif

                <li class="nav-item">
                    <a class="nav-link" href="{{ route('mailing.index') }}">
                        <i class="ni ni-email-83 text-blue"></i> Рассылка
                    </a>
                </li>


                <li class="nav-item" >
                    <a class="nav-link" href="#navbar-settings" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="navbar-settings">
                        <i class="ni ni-settings-gear-65 text-orange"></i> Настройки
                    </a>

                    <div class="collapse" id="navbar-settings">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('settings.index') }}">
                                    Общие
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('settings.messages.index') }}">
                                    Сообщения
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('commission.index') }}">
                                    Коммиссии
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('bankDetail.index') }}">
                                    Реквизиты
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('settings.buttons.index') }}">
                                    Кнопки
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>

            </ul>

        </div>
    </div>
</nav>
