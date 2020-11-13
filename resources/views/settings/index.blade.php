@extends('layouts.app')

@section('content')
    @include('layouts.headers.empty')
    <div class="container-fluid mt--7">
        @if(session()->has('success'))
            <div class="alert alert-success alert-dismissible mt-4 fade show" role="alert">
                <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                <span class="alert-text"><strong>Успех!</strong> {{ session()->get('success') }}</span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        @endif

        @if($errors->any())
            <div class="alert alert-danger alert-dismissible mt-4 fade show" role="alert">
                <span class="alert-icon"><i class="ni ni-air-baloon"></i></span>
                {!! implode('', $errors->all('<span class="alert-text">:message</span>')) !!}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        @endif
        <div class="card-columns">
            <div class="card">
                <div class="card-header border-0">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">Лимиты</h3>
                        </div>
                        <div class="card-body">
                            <form action="{{ route('settings.set.limits') }}" method="post">
                                @csrf
                                @method('PATCH')
                                <div class="form-group">
                                    <label for="course" class="form-control-label">Курс</label>
                                    <div class="input-group">
                                        <input name="course" class="form-control" type="number" value="{{ old('course') ?? $exchanger->course }}" id="telegram-course-input" min="0" step="1">
                                        <div class="input-group-append">
                                            <span class="input-group-text" id="basic-addon2">руб.</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="min-exchange" class="form-control-label">Мин. покупка</label>
                                    <div class="input-group">
                                        <input name="min_exchange" class="form-control" type="number" value="{{ old('min_exchange') ?? floatval($exchanger->min_exchange) }}" id="min-exchange" min="0" step="0.0001">
                                        <div class="input-group-append">
                                            <span class="input-group-text" id="basic-addon2">btc</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="max-exchange" class="form-control-label">Макс. покупка</label>
                                    <div class="input-group">
                                        <input name="max_exchange" class="form-control" type="number" value="{{ old('max_exchange') ?? floatval($exchanger->max_exchange) }}" id="max-exchange" min="0" step="0.0001">
                                        <div class="input-group-append">
                                            <span class="input-group-text" id="basic-addon2">btc</span>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary">Сохранить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header border-0">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">Телеграм</h3>
                        </div>

                    </div>
                </div>

                <div class="card-body">
                    <form action="{{ route('settings.set.telegram-token') }}" method="post">
                        @csrf
                        @method('PATCH')
                        <div class="form-group">
                            <label for="telegram-token-input" class="form-control-label">Токен</label>
                            <input name="telegram_token" class="form-control" type="text" value="{{ old('telegram_token') ?? $exchanger->telegram_token }}" id="telegram-token-input">
                        </div>

                        <div class="form-group">
                            <label for="username" class="form-control-label">Логин</label>
                            <input name="username" class="form-control" type="text" value="{{ old('username') ?? $exchanger->username }}" id="username">
                        </div>

                        <button type="submit" class="btn btn-primary">Сохранить</button>
                    </form>

                </div>
            </div>

            <div class="card">
                <div class="card-header border-0">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">Ключи coinbase</h3>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <form action="{{ route('settings.set.coinbaseKey') }}" method="post">
                        @csrf
                        @method('PATCH')
                        <div class="form-group">
                            <label for="coinbase-key-input" class="form-control-label">Key</label>
                            <input name="coinbase_key" class="form-control" type="text" value="{{ old('coinbase_key') ?? $exchanger->coinbase_key }}" id="coinbase-key-input">
                        </div>

                        <div class="form-group">
                            <label for="coinbase-secret-input" class="form-control-label">Secret</label>
                            <input name="coinbase_secret" class="form-control" type="text" value="{{ old('coinbase_secret') ?? $exchanger->coinbase_secret }}" id="coinbase-secret-input">
                        </div>

                        <button type="submit" class="btn btn-primary">Сохранить</button>
                    </form>

                </div>
            </div>
        </div>
    </div>

@endsection
