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
                                <h3 class="mb-0">Редактирование комиссии</h3>
                            </div>
                        </div>
                    </div>

                    <div class="card-body border-0">
                        <form action="{{ route('commission.update', $commission->id) }}" method="post">
                            @csrf
                            @method('PATCH')
                            <div class="form-group">
                                <label for="from-input" class="form-control-label">от, btc</label>
                                <input type="number" step="0.001" name="from" class="form-control{{ $errors->has('from') ? ' is-invalid' : '' }}" value="{{ old('from') ?? $commission->from }}" id="from-input">
                                @if ($errors->has('from'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('from') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="to-input" class="form-control-label">до, btc</label>
                                <input type="number" step="0.001" name="to" class="form-control{{ $errors->has('to') ? ' is-invalid' : '' }}" value="{{ old('to') ?? $commission->to }}" id="to-input">
                                @if ($errors->has('to'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('to') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="percent-input" class="form-control-label">Комиссия, %</label>
                                <input type="number" step="0.1" name="percent" class="form-control{{ $errors->has('percent') ? ' is-invalid' : '' }}" value="{{ old('percent') ?? $commission->percent }}" id="percent-input">
                                @if ($errors->has('percent'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('percent') }}</strong>
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
