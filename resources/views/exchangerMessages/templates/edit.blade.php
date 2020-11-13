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
                                <h3 class="mb-0">Редактирование сообщения</h3>
                            </div>
                        </div>
                    </div>

                    <div class="card-body border-0">
                        @if(session()->has('success'))
                            <div class="alert alert-success alert-dismissible mb-4 fade show" role="alert">
                                <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                <span class="alert-text"><strong>Успех!</strong> {{ session()->get('success') }}</span>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        @endif

                        <form action="{{ route('settings.messages.default.update', ['message' => $message->id]) }}" method="post">
                            @csrf
                            @method('PATCH')

                            <div class="form-group">
                                <label for="title-input" class="form-control-label">Title</label>
                                <input type="text" name="title" class="form-control{{ $errors->has('title') ? ' is-invalid' : '' }}" value="{{ old('title') ?? $message->title }}" id="title-input">
                                @if ($errors->has('title'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('title') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="slug-input" class="form-control-label">Slug</label>
                                <input type="text" name="slug" class="form-control{{ $errors->has('slug') ? ' is-invalid' : '' }}" value="{{ old('slug') ?? $message->slug }}" id="slug-input">
                                @if ($errors->has('slug'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('slug') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="description-input" class="form-control-label">Описание</label>
                                <textarea name="description" class="form-control{{ $errors->has('description') ? ' is-invalid' : '' }}" id="description-input">{{ old('description') ?? $message->description }}</textarea>
                                @if ($errors->has('description'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('description') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="text-input" class="form-control-label">Сообщение</label>
                                <textarea name="text" class="form-control{{ $errors->has('text') ? ' is-invalid' : '' }}" id="text-input">{{ old('text') ?? $message->text }}</textarea>
                                @if ($errors->has('text'))
                                    <span class="invalid-feedback" style="display: block;" role="alert">
                                        <strong>{{ $errors->first('text') }}</strong>
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

@push('js')
    @include('func.tinymce')
@endpush
