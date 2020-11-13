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
                                <h3 class="mb-0">Создание реквизита</h3>
                            </div>
                        </div>
                    </div>

                    <div class="card-body border-0">
                        <form action="{{ route('bankDetail.store') }}" method="post">
                            @csrf
                            <div class="form-group">
                                <label for="title-input" class="form-control-label">Заголовок</label>
                                <input type="text" name="title" class="form-control{{ $errors->has('title') ? ' is-invalid' : '' }}" value="{{ old('title') ?? '' }}" id="title-input">
                                @if ($errors->has('title'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('title') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="text-input" class="form-control-label">Текст</label>
                                <textarea name="text" class="form-control{{ $errors->has('text') ? ' is-invalid' : '' }}" id="text-input">{{ old('text') ?? '' }}</textarea>
                                @if ($errors->has('text'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('text') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-group">
                                <label class="form-control-label">Показывать</label>
                                <div>
                                    <label class="custom-toggle">
                                        <input type="checkbox" name="status" checked>
                                        <span class="custom-toggle-slider rounded-circle" data-label-off="Нет" data-label-on="Да"></span>
                                    </label>
                                </div>

                            </div>

                            <button class="btn btn-primary" type="submit">Создать</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
