@extends('layouts.app')

@section('content')
    @include('layouts.headers.empty')

    <div class="container-fluid mt--7">
        <div class="row">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h3 class="mb-0">Редактирование {{ $user->name }}</h3>
                            </div>

                            @if(session()->has('success'))
                                <div class="col-12">
                                    <div class="alert alert-success alert-dismissible mt-4 fade show" role="alert">
                                        <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                        <span class="alert-text"><strong>Успех!</strong> {{ session()->get('success') }}</span>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>

                    <div class="card-body border-0">
                        <form action="{{ route('user.update', $user) }}" method="post">
                            @csrf
                            @method('PUT')
                            <div class="form-group">
                                <label for="name-input" class="form-control-label">Имя</label>
                                <input type="text" name="name" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" value="{{ old('name') ?? $user->name }}" id="name-input">
                                @if ($errors->has('name'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="email-input" class="form-control-label">Email</label>
                                <input type="email" name="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" value="{{ old('email') ?? $user->email }}" id="email-input">
                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="password-input" class="form-control-label">Пароль</label>
                                <input type="password" name="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" value="{{ old('password') ?? '' }}" id="password-input">
                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="c_password-input" class="form-control-label">Повторите пароль</label>
                                <input type="password" name="c_password" class="form-control{{ $errors->has('c_password') ? ' is-invalid' : '' }}" value="{{ old('c_password') ?? '' }}" id="c_password-input">
                                @if ($errors->has('c_password'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('c_password') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <button class="btn btn-primary" type="submit">Сохранить</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
