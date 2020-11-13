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
                                <h3 class="mb-0">{{ $message->title }}</h3>
                            </div>
                        </div>
                    </div>

                    <div class="card-body border-0">
                        @if(session()->has('success'))
                            <div class="alert alert-success alert-dismissible mb-4 4ade show" role="alert">
                                <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                <span class="alert-text"><strong>Успех!</strong> {{ session()->get('success') }}</span>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        @endif

                        <form action="{{ route('settings.messages.update', ['message' => $message->id]) }}" method="post">
                            @csrf
                            @method('PATCH')

                            @if($description)
                                <div class="alert alert-secondary">{!! $description !!}</div>
                            @endif

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
